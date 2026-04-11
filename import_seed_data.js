const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

loadLocalEnv();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI_DIRECT = process.env.MONGODB_URI_DIRECT;
const CURRENT_YEAR = new Date().getFullYear();
const TEST_NOTE_MARKER = "DU_LIEU_TEST_CUA_CODEX";
const DEFAULT_STOCK_QUANTITY = 500;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env.");
}

const drugSchema = new mongoose.Schema(
  {
    activeIngredient: { type: String, required: true, trim: true },
    brandName: { type: String, required: true, trim: true },
    unit: { type: String, trim: true, default: "Vien" },
    usage: { type: String, trim: true, default: "" },
    quantity: { type: Number, min: 0, default: 0 },
    price: { type: Number, min: 0, default: 0 },
    notes: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    birthYear: { type: Number, min: 1900, max: 3000 },
    gender: { type: String, trim: true, default: "Nam" },
    address: { type: String, trim: true, default: "" },
    province: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

const visitDrugSchema = new mongoose.Schema(
  {
    drugId: { type: mongoose.Schema.Types.ObjectId, ref: "Drug", required: true },
    activeIngredient: { type: String, required: true, trim: true },
    brandName: { type: String, required: true, trim: true },
    usage: { type: String, trim: true, default: "" },
    unit: { type: String, trim: true, default: "Vien" },
    quantity: { type: Number, min: 1, required: true },
    morning: { type: String, trim: true, default: "" },
    noon: { type: String, trim: true, default: "" },
    night: { type: String, trim: true, default: "" },
    instruction: { type: String, trim: true, default: "" },
    unitPrice: { type: Number, min: 0, required: true },
    subtotal: { type: Number, min: 0, required: true }
  },
  { _id: false }
);

const visitSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    patientName: { type: String, required: true, trim: true },
    patientPhone: { type: String, required: true, trim: true },
    doctor: { type: String, trim: true, default: "Bác sĩ phụ trách", index: true },
    visitNo: { type: Number, required: true, min: 1 },
    visitType: { type: String, trim: true, default: "revisit" },
    visitDate: { type: Date, required: true, index: true },
    symptom: { type: String, trim: true, default: "" },
    diagnosis: { type: String, trim: true, default: "" },
    note: { type: String, trim: true, default: "" },
    followUpDate: { type: Date, default: null },
    serviceFee: { type: Number, min: 0, default: 0 },
    drugTotal: { type: Number, min: 0, default: 0 },
    totalMoney: { type: Number, min: 0, default: 0 },
    drugs: { type: [visitDrugSchema], default: [] },
    printedAt: { type: Date, default: null },
    printHistory: { type: [Date], default: [] }
  },
  { timestamps: true }
);

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    clinicInfo: { type: Object, default: {} },
    clinicProfiles: { type: Array, default: [] },
    activeClinicProfileId: { type: String, trim: true, default: "" },
    icdList: { type: Array, default: [] }
  },
  { timestamps: true }
);

const Drug = mongoose.model("SeedDrug", drugSchema, "drugs");
const Patient = mongoose.model("SeedPatient", patientSchema, "patients");
const Visit = mongoose.model("SeedVisit", visitSchema, "visits");
const Settings = mongoose.model("SeedSettings", settingsSchema, "settings");

async function main() {
  await connectWithFallback();

  const drugData = readJson("drug-import.json");
  const icdData = readJson("icd-import.json");

  if (!drugData.length) {
    throw new Error("drug-import.json is empty.");
  }

  if (!icdData.length) {
    throw new Error("icd-import.json is empty.");
  }

  await Drug.deleteMany({});
  const insertedDrugs = await Drug.insertMany(
    drugData.map((item) => ({
      activeIngredient: item.activeIngredient,
      brandName: item.brandName,
      unit: item.unit || "Vien",
      usage: item.usage || "",
      quantity: Number(item.quantity || DEFAULT_STOCK_QUANTITY),
      price: Number(item.price || 0),
      notes: "Imported from kho thuốc.xlsx"
    }))
  );

  await Settings.updateOne(
    { key: "app-settings" },
    {
      $set: {
        icdList: icdData.map((item) => ({ code: item.code, name: item.name }))
      }
    },
    { upsert: true }
  );

  const oldPatients = await Patient.find({ notes: TEST_NOTE_MARKER }).select("_id").lean();
  const oldPatientIds = oldPatients.map((item) => item._id);
  if (oldPatientIds.length) {
    await Visit.deleteMany({ patientId: { $in: oldPatientIds } });
    await Patient.deleteMany({ _id: { $in: oldPatientIds } });
  }

  const samplePatients = buildSamplePatients();
  const createdPatients = await Patient.insertMany(samplePatients);
  const visits = buildSampleVisits(createdPatients, insertedDrugs, icdData);
  await Visit.insertMany(visits);

  console.log(
    JSON.stringify(
      {
        importedDrugs: insertedDrugs.length,
        importedIcd: icdData.length,
        createdPatients: createdPatients.length,
        createdVisits: visits.length
      },
      null,
      2
    )
  );
}

function readJson(filename) {
  const fullPath = path.join(__dirname, filename);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function buildSamplePatients() {
  const names = [
    "Bệnh nhân mẫu 01 - Trần Minh Anh",
    "Bệnh nhân mẫu 02 - Nguyễn Hoàng Nam",
    "Bệnh nhân mẫu 03 - Lê Thu Hà",
    "Bệnh nhân mẫu 04 - Phạm Gia Huy",
    "Bệnh nhân mẫu 05 - Võ Mỹ Linh",
    "Bệnh nhân mẫu 06 - Đặng Quốc Bảo",
    "Bệnh nhân mẫu 07 - Bùi Thanh Tâm",
    "Bệnh nhân mẫu 08 - Hồ Ngọc Diễm",
    "Bệnh nhân mẫu 09 - Dương Đức Phúc",
    "Bệnh nhân mẫu 10 - Trịnh Yến Nhi",
    "Bệnh nhân mẫu 11 - Nguyễn Nhật Minh",
    "Bệnh nhân mẫu 12 - Lâm Khánh Vy",
    "Bệnh nhân mẫu 13 - Phan Tuấn Kiệt",
    "Bệnh nhân mẫu 14 - Đỗ Minh Thư",
    "Bệnh nhân mẫu 15 - Cao Gia Bảo"
  ];
  const provinces = [
    "Đồng Nai",
    "TP Hồ Chí Minh",
    "Bình Dương",
    "Bà Rịa - Vũng Tàu",
    "Long An"
  ];
  const symptoms = [
    "Mất ngủ kéo dài, lo âu",
    "Kích động, nói nhiều, ít ngủ",
    "Buồn bã, giảm động lực",
    "Hoang tưởng, nghi ngờ",
    "Run tay, bồn chồn, khó ngủ"
  ];

  return names.map((fullName, index) => ({
    fullName,
    phone: `0999000${String(index + 1).padStart(3, "0")}`,
    birthYear: 1980 + (index % 20),
    gender: index % 2 === 0 ? "Nam" : "Nữ",
    address: `Số ${index + 10}, Khu phố test ${index + 1}`,
    province: provinces[index % provinces.length],
    notes: TEST_NOTE_MARKER,
    _seedSymptom: symptoms[index % symptoms.length]
  }));
}

function buildSampleVisits(patients, drugs, icdList) {
  const doctor = "BSCKI: Trần Nguyễn Thanh Minh";
  const matchingIcdCodes = ["F51.0", "F41.1", "F32.2", "F20.0", "F31.2"];
  const diagnoses = matchingIcdCodes
    .map((code) => icdList.find((item) => item.code === code))
    .filter(Boolean);

  return patients.map((patient, index) => {
    const selectedDiagnosis = diagnoses[index % diagnoses.length] || icdList[index % icdList.length];
    const chosenDrugs = pickDrugsForVisit(drugs, index);
    const drugItems = chosenDrugs.map((drug, drugIndex) => {
      const quantity = drugIndex === 0 ? 30 : 14;
      const morning = drugIndex === 0 ? "1" : "";
      const night = drugIndex === 0 ? "" : "1";
      return {
        drugId: drug._id,
        activeIngredient: drug.activeIngredient,
        brandName: drug.brandName,
        usage: drug.usage,
        unit: drug.unit,
        quantity,
        morning,
        noon: "",
        night,
        instruction: drug.usage,
        unitPrice: drug.price,
        subtotal: drug.price * quantity
      };
    });
    const drugTotal = drugItems.reduce((sum, item) => sum + item.subtotal, 0);
    const serviceFee = 200000 + ((index % 4) * 50000);
    const visitDate = new Date(Date.now() - (index * 86400000));
    const followUpDate = new Date(visitDate.getTime() + 14 * 86400000);

    return {
      patientId: patient._id,
      patientName: patient.fullName,
      patientPhone: patient.phone,
      doctor,
      visitNo: 1,
      visitType: "initial",
      visitDate,
      symptom: patient._seedSymptom,
      diagnosis: `${selectedDiagnosis.code} - ${selectedDiagnosis.name}`,
      note: "Dữ liệu khám mẫu để kiểm thử giao diện và báo cáo.",
      followUpDate,
      serviceFee,
      drugTotal,
      totalMoney: serviceFee + drugTotal,
      drugs: drugItems,
      printedAt: null,
      printHistory: []
    };
  });
}

function pickDrugsForVisit(drugs, index) {
  if (!drugs.length) {
    throw new Error("No drugs available to build sample visits.");
  }
  const first = drugs[index % drugs.length];
  const second = drugs[(index + 3) % drugs.length];
  return first._id.equals(second._id) ? [first] : [first, second];
}

function loadLocalEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex <= 0) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  });
}

async function connectWithFallback() {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    if (!shouldUseDirectMongoUri(error) || !MONGODB_URI_DIRECT) {
      throw error;
    }
    await mongoose.connect(MONGODB_URI_DIRECT);
  }
}

function shouldUseDirectMongoUri(error) {
  const message = String(error && error.message ? error.message : error || "");
  return (
    message.includes("querySrv") ||
    message.includes("ENOTFOUND") ||
    message.includes("ESERVFAIL") ||
    message.includes("ETIMEOUT")
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
