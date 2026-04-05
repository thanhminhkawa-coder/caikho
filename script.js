const STORAGE_KEYS={patients:'pms_patients_v6',icd:'pms_icd_v6',stock:'pms_stock_v6',clinic:'pms_clinic_v1'};
const DEFAULT_CLINIC_INFO={name:'Phong kham chuyen khoa',doctor:'Bac si phu trach',address:'Chua cap nhat dia chi',hours:'Chua cap nhat gio lam viec',phone:'Chua cap nhat so dien thoai'};
const PROVINCES=['An Giang','Bà Rịa - Vũng Tàu','Bắc Giang','Bắc Kạn','Bạc Liêu','Bắc Ninh','Bến Tre','Bình Định','Bình Dương','Bình Phước','Bình Thuận','Cà Mau','Cần Thơ','Cao Bằng','Đà Nẵng','Đắk Lắk','Đắk Nông','Điện Biên','Đồng Nai','Đồng Tháp','Gia Lai','Hà Giang','Hà Nam','Hà Nội','Hà Tĩnh','Hải Dương','Hải Phòng','Hậu Giang','Hòa Bình','Hưng Yên','Khánh Hòa','Kiên Giang','Kon Tum','Lai Châu','Lâm Đồng','Lạng Sơn','Lào Cai','Long An','Nam Định','Nghệ An','Ninh Bình','Ninh Thuận','Phú Thọ','Phú Yên','Quảng Bình','Quảng Nam','Quảng Ngãi','Quảng Ninh','Quảng Trị','Sóc Trăng','Sơn La','Tây Ninh','Thái Bình','Thái Nguyên','Thanh Hóa','Thừa Thiên Huế','Tiền Giang','TP Hồ Chí Minh','Trà Vinh','Tuyên Quang','Vĩnh Long','Vĩnh Phúc','Yên Bái'];
const DEFAULTconst STORAGE_KEYS={patients:'pms_patients_v6',icd:'pms_icd_v6',stock:'pms_stock_v6',clinic:'pms_clinic_v1'};
const DEFAULT_CLINIC_INFO={name:'Phong kham chuyen khoa',doctor:'Bac si phu trach',address:'Chua cap nhat dia chi',hours:'Chua cap nhat gio lam viec',phone:'Chua cap nhat so dien thoai'};
const PROVINCES=['An Giang','Bà Rịa - Vũng Tàu','Bắc Giang','Bắc Kạn','Bạc Liêu','Bắc Ninh','Bến Tre','Bình Định','Bình Dương','Bình Phước','Bình Thuận','Cà Mau','Cần Thơ','Cao Bằng','Đà Nẵng','Đắk Lắk','Đắk Nông','Điện Biên','Đồng Nai','Đồng Tháp','Gia Lai','Hà Giang','Hà Nam','Hà Nội','Hà Tĩnh','Hải Dương','Hải Phòng','Hậu Giang','Hòa Bình','Hưng Yên','Khánh Hòa','Kiên Giang','Kon Tum','Lai Châu','Lâm Đồng','Lạng Sơn','Lào Cai','Long An','Nam Định','Nghệ An','Ninh Bình','Ninh Thuận','Phú Thọ','Phú Yên','Quảng Bình','Quảng Nam','Quảng Ngãi','Quảng Ninh','Quảng Trị','Sóc Trăng','Sơn La','Tây Ninh','Thái Bình','Thái Nguyên','Thanh Hóa','Thừa Thiên Huế','Tiền Giang','TP Hồ Chí Minh','Trà Vinh','Tuyên Quang','Vĩnh Long','Vĩnh Phúc','Yên Bái'];
const DEFAULT_FEES=['50000','100000','150000','200000','250000','300000','350000','400000','450000','500000','1000000','1500000'];
const DEFAULT_ICD=[{code:'F20.0',name:'Tâm thần phân liệt thể hoang tưởng'},{code:'F20.1',name:'Tâm thần phân liệt thể thanh xuân'},{code:'F20.2',name:'Tâm thần phân liệt thể căng trương lực'},{code:'F31.2',name:'Rối loạn cảm xúc lưỡng cực hiện tại giai đoạn hưng cảm có triệu chứng loạn thần'},{code:'F41.1',name:'Rối loạn lo âu lan tỏa'},{code:'F43.1',name:'Rối loạn stress sau sang chấn'}];
const DEFAULT_STOCK=[{active:'Olanzapine 10mg',brand:'Zapnex',unit:'Viên',usage:'Chống loạn thần',price:5000,qty:120},{active:'Quetiapine 100mg',brand:'Seroquel',unit:'Viên',usage:'An thần, chống loạn thần',price:7500,qty:85},{active:'Risperidone 2mg',brand:'Risperdal',unit:'Viên',usage:'Chống loạn thần',price:4000,qty:150},{active:'Diazepam 5mg',brand:'Seduxen',unit:'Viên',usage:'Giảm lo âu',price:1200,qty:200}];
let visits=[],icdList=[],stock=[],clinicInfo={},currentVisitId=null,currentPatientKey='',groupedPatients=[],showAllPatients=false;
let symptomSuggestTimer=null;

const byId=id=>document.getElementById(id);
const saveStore=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const loadStore=(k,f)=>{try{const raw=localStorage.getItem(k);return raw?JSON.parse(raw):f}catch{return f}};
const normalizeText=(str='')=>str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'d');
const toNumber=str=>typeof str==='number'?str:Number(String(str||'').replace(/\./g,'').replace(/,/g,'.').replace(/[^0-9.]/g,''))||0;
const formatMoney=num=>(Number(num)||0).toLocaleString('vi-VN');
const cryptoRandom=()=> 'id_'+Math.random().toString(36).slice(2,10)+Date.now().toString(36);
function safeText(str=''){return String(str).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))}
function nowDateTimeLocal(){const d=new Date(),pad=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`}
function formatVisitDate(v){if(!v)return'';const d=new Date(v);return Number.isNaN(d.getTime())?v:d.toLocaleDateString('vi-VN')}
function patientKeyOf(data){return normalizeText(`${data.name||''}|${data.phone||''}|${data.birthYear||''}`)}
function startOfDay(d){const x=new Date(d);x.setHours(0,0,0,0);return x}
function getFollowStatus(followDate){
  if(!followDate) return {label:'Chua hen',cls:'neutral'};
  const today=startOfDay(new Date());
  const target=startOfDay(new Date(followDate));
  if(Number.isNaN(target.getTime())) return {label:'Khong hop le',cls:'neutral'};
  const diff=Math.round((target-today)/86400000);
  if(diff>0) return {label:`Con ${diff} ngay`,cls:'up'};
  if(diff===0) return {label:'Tai kham hom nay',cls:'down'};
  return {label:`Qua ${Math.abs(diff)} ngay`,cls:'down'};
}
function ensurePatientFollowHeader(){
  const head=document.querySelector('.patient-head');
  if(!head||head.children.length>=7) return;
  const col=document.createElement('div');
  col.textContent='Tai kham';
  head.insertBefore(col,head.children[5]||null);
}
function ensureShowAllPatientsButton(){
  const clearBtn=byId('clearSearchBtn');
  if(!clearBtn||byId('showAllPatientsBtn')) return;
  const btn=document.createElement('button');
  btn.className='btn small soft';
  btn.id='showAllPatientsBtn';
  btn.type='button';
  btn.textContent='Xem tat ca';
  clearBtn.insertAdjacentElement('afterend',btn);
}
function moveStatsToClinicTop(){
  const clinicCard=document.querySelector('.clinic-card');
  const statsCard=byId('statWeekCount')?.closest('.card');
  if(!clinicCard||!statsCard) return;
  const clinicTitle=clinicCard.querySelector('.card-title');
  const clinicActions=clinicTitle?.querySelector('.row-actions');
  if(clinicTitle&&statsCard.parentNode!==clinicTitle){
    statsCard.classList.add('stats-card-top');
    clinicTitle.insertBefore(statsCard,clinicActions||null);
  }
  const parentGrid=document.querySelector('.main-layout');
  if(parentGrid){
    const emptyColumns=parentGrid.querySelectorAll('.form-grid');
    emptyColumns.forEach(grid=>{
      const cards=[...grid.children].filter(el=>el.classList.contains('card'));
      if(cards.length===1&&cards[0].querySelector('#historyRows')) grid.style.gridTemplateColumns='1fr';
    });
  }
}
function updateShowAllPatientsButton(){
  const btn=byId('showAllPatientsBtn');
  if(!btn) return;
  btn.textContent=showAllPatients?'Thu gon':'Xem tat ca';
}

function init(){
  visits=loadStore(STORAGE_KEYS.patients,[]);
  icdList=loadStore(STORAGE_KEYS.icd,DEFAULT_ICD);
  stock=loadStore(STORAGE_KEYS.stock,DEFAULT_STOCK);
  clinicInfo={...DEFAULT_CLINIC_INFO,...loadStore(STORAGE_KEYS.clinic,{})};
  moveStatsToClinicTop();
  ensurePatientFollowHeader();
  ensureShowAllPatientsButton();
  ensureDrugUsageHeader();
  renderProvinceList();
  renderFeeList();
  renderCodeData();
  renderStockSheet();
  renderClinicInfo();
  bindEvents();
  renderPatientList();
  renderHistory();
  renderStats();
  createNewPatient();
}

function bindEvents(){
  byId('patientListBody').addEventListener('click',e=>{
    const delBtn=e.target.closest('.del-patient');
    const row=e.target.closest('.patient-row');
    if(delBtn){ deleteVisit(delBtn.dataset.id); return; }
    if(row&&row.dataset.id){ openVisit(row.dataset.id); }
  });
  byId('historyRows').addEventListener('click',e=>{
    const openBtn=e.target.closest('.history-open');
    const row=e.target.closest('.history-row');
    if(openBtn){ openVisit(openBtn.dataset.id); return; }
    if(row&&row.dataset.id){ openVisit(row.dataset.id); }
  });
  byId('birthYear').addEventListener('input',calcAge);
  byId('searchInput').addEventListener('input',()=>{showAllPatients=false;renderPatientList();});
  byId('searchBtn').addEventListener('click',()=>{showAllPatients=false;renderPatientList();});
  byId('clearSearchBtn').addEventListener('click',()=>{showAllPatients=false;byId('searchInput').value='';renderPatientList();});
  byId('showAllPatientsBtn')?.addEventListener('click',()=>{showAllPatients=!showAllPatients;byId('searchInput').value='';renderPatientList();});
  byId('icdInput').addEventListener('input',renderIcdSuggest);
  byId('icdInput').addEventListener('focus',renderIcdSuggest);
  byId('toggleCodeDataBtn').addEventListener('click',()=>{renderCodeData();byId('codeDataBox').classList.toggle('hidden');});
  byId('addCodeBtn').addEventListener('click',addNewCode);
  byId('addDrugBtn').addEventListener('click',()=>addDrugRow());
  byId('toggleStockBtn').addEventListener('click',()=>{renderStockSheet();byId('stockSheet').classList.toggle('hidden');});
  byId('serviceFee').addEventListener('input',updateTotals);
  byId('symptom')?.addEventListener('input',queueSymptomDrugSuggestions);
  byId('symptom')?.addEventListener('change',applySymptomDrugSuggestions);
  byId('symptom')?.addEventListener('blur',applySymptomDrugSuggestions);
  byId('saveBtn').addEventListener('click',saveVisit);
  byId('newBtn').addEventListener('click',createNewPatient);
  byId('newPrescriptionBtn').addEventListener('click',createNewPrescription);
  byId('refreshBtn').addEventListener('click',()=>location.reload());
  byId('reloadHistoryBtn').addEventListener('click',renderHistory);
  byId('previewPrintBtn').addEventListener('click',showPrescriptionPreview);
  byId('toggleClinicBtn')?.addEventListener('click',()=>byId('clinicForm').classList.toggle('hidden'));
  byId('saveClinicBtn')?.addEventListener('click',saveClinicInfo);
  byId('rxCloseBtn').addEventListener('click',()=>byId('rxModal').classList.add('hidden'));
  byId('rxPrintBtn').addEventListener('click',printPrescription);
  byId('exportBtn').addEventListener('click',exportData);
  document.addEventListener('click',e=>{
    if(!e.target.closest('#icdInput')&&!e.target.closest('#icdSuggestBox')) byId('icdSuggestBox').classList.add('hidden');
  });
}

function renderProvinceList(){ byId('provinceList').innerHTML=PROVINCES.map(p=>`<option value="${p}"></option>`).join(''); }
function renderFeeList(){ byId('feeOptions').innerHTML=DEFAULT_FEES.map(v=>`<option value="${formatMoney(v)}"></option>`).join(''); }
function ensureDrugUsageHeader(){ const head=document.querySelector('.drug-head'); if(!head||head.children.length>=8) return; const cell=document.createElement('div'); cell.textContent='Cong dung'; head.insertBefore(cell,head.children[3]||null); }
function renderClinicInfo(){
  byId('clinicDisplayName').textContent=clinicInfo.name||DEFAULT_CLINIC_INFO.name;
  byId('clinicDisplayDoctor').textContent=clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor;
  byId('clinicDisplayAddress').textContent=clinicInfo.address||DEFAULT_CLINIC_INFO.address;
  byId('clinicDisplayHours').textContent=clinicInfo.hours||DEFAULT_CLINIC_INFO.hours;
  byId('clinicDisplayPhone').textContent=clinicInfo.phone||DEFAULT_CLINIC_INFO.phone;
  byId('clinicNameInput').value=clinicInfo.name||'';
  byId('clinicDoctorInput').value=clinicInfo.doctor||'';
  byId('clinicAddressInput').value=clinicInfo.address||'';
  byId('clinicHoursInput').value=clinicInfo.hours||'';
  byId('clinicPhoneInput').value=clinicInfo.phone||'';
}
function saveClinicInfo(){
  clinicInfo={
    name:byId('clinicNameInput').value.trim()||DEFAULT_CLINIC_INFO.name,
    doctor:byId('clinicDoctorInput').value.trim()||DEFAULT_CLINIC_INFO.doctor,
    address:byId('clinicAddressInput').value.trim()||DEFAULT_CLINIC_INFO.address,
    hours:byId('clinicHoursInput').value.trim()||DEFAULT_CLINIC_INFO.hours,
    phone:byId('clinicPhoneInput').value.trim()||DEFAULT_CLINIC_INFO.phone
  };
  saveStore(STORAGE_KEYS.clinic,clinicInfo);
  renderClinicInfo();
  byId('clinicForm').classList.add('hidden');
  alert('Da luu thong tin phong kham.');
}

function renderIcdSuggest(){
  const kw=normalizeText(byId('icdInput').value.trim());
  const box=byId('icdSuggestBox');
  const matched=icdList.filter(item=>!kw||normalizeText(`${item.code} ${item.name}`).includes(kw)).slice(0,30);
  box.innerHTML=matched.length?matched.map(item=>`<div class="suggest-item" data-code="${item.code}" data-name="${item.name}">${item.code} - ${item.name}</div>`).join(''):'<div class="suggest-item">Không thấy mã phù hợp. Nhập trực tiếp rồi bấm Thêm.</div>';
  box.classList.remove('hidden');
  box.onclick=e=>{
    const row=e.target.closest('.suggest-item[data-code]');
    if(!row) return;
    byId('icdInput').value=`${row.dataset.code} - ${row.dataset.name}`;
    box.classList.add('hidden');
  };
}

function renderCodeData(){
  byId('codeDataBox').innerHTML=icdList.map((item,idx)=>`<div class="code-row" style="display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center"><div>${item.code} - ${item.name}</div><button class="btn small code-edit" data-index="${idx}" type="button">Sửa</button><button class="btn small danger code-del" data-index="${idx}" type="button">Xóa</button></div>`).join('');
  byId('codeDataBox').querySelectorAll('.code-edit').forEach(btn=>btn.onclick=()=>{
    const item=icdList[Number(btn.dataset.index)];
    const next=prompt('Sửa mã và tên, ngăn cách bằng dấu |',`${item.code}|${item.name}`);
    if(!next) return;
    const parts=next.split('|').map(v=>v.trim());
    if(parts.length<2||!parts[0]||!parts[1]) return;
    icdList[Number(btn.dataset.index)]={code:parts[0],name:parts[1]};
    saveStore(STORAGE_KEYS.icd,icdList);
    renderCodeData();
    renderIcdSuggest();
  });
  byId('codeDataBox').querySelectorAll('.code-del').forEach(btn=>btn.onclick=()=>{
    icdList.splice(Number(btn.dataset.index),1);
    saveStore(STORAGE_KEYS.icd,icdList);
    renderCodeData();
    renderIcdSuggest();
  });
}

function addNewCode(){
  const raw=byId('icdInput').value.trim();
  if(!raw) return alert('Nhập mã hoặc tên chẩn đoán trước.');
  const exact=icdList.some(x=>`${x.code} - ${x.name}`===raw||x.code===raw);
  if(exact) return alert('Mã này đã có trong danh sách.');
  let code='',name='';
  if(raw.includes(' - ')){
    [code,name]=raw.split(' - ').map(v=>v.trim());
  }else{
    code=prompt('Nhập mã mới cho chẩn đoán này','F99.1')||'';
    name=raw;
  }
  if(!code||!name) return;
  icdList.unshift({code,name});
  saveStore(STORAGE_KEYS.icd,icdList);
  byId('icdInput').value=`${code} - ${name}`;
  renderCodeData();
  renderIcdSuggest();
  byId('codeDataBox').classList.remove('hidden');
}

function createDrugRow(data={}){
  const row=document.createElement('div');
  row.className='drug-row';
  row.innerHTML=`<div class="row-index"></div><div><select class="mini drug-active"></select></div><div><input class="mini drug-brand"></div><div><select class="mini compact drug-unit"><option>Viên</option><option>Gói</option><option>Ống</option><option>Chai</option></select></div><div><input class="mini qty drug-qty" inputmode="numeric"></div><div><div class="dose-grid"><div class="dose-box"><div class="dose-label">Sáng</div><input class="mini compact dose-morning" list="doseOptions" placeholder="0,5"></div><div class="dose-box"><div class="dose-label">Tối</div><input class="mini compact dose-night" list="doseOptions" placeholder="1"></div></div></div><div><button class="btn small danger del-drug" type="button">🗑</button></div>`;
  const footer=document.createElement('div');
  footer.className='drug-footer';
  footer.innerHTML=`<div></div><div></div><div></div><div></div><div></div><div></div><div><label class="label">Giá bán</label><input class="mini drug-price" inputmode="numeric"></div><div><label class="label">Thành tiền</label><input class="mini drug-amount" readonly></div><div></div>`;
  row.appendChild(footer);
  const activeSel=row.querySelector('.drug-active');
  activeSel.innerHTML=stock.map(item=>`<option value="${item.active}">${item.active}</option>`).join('');
  activeSel.value=data.active||stock[0]?.active||'';
  fillDrugRowByActive(row,activeSel.value,data);
  row.querySelector('.drug-unit').value=data.unit||row.querySelector('.drug-unit').value;
  row.querySelector('.drug-qty').value=String(data.qty??30);
  row.querySelector('.dose-morning').value=String(data.morning??'0');
  row.querySelector('.dose-night').value=String(data.night??'1');
  row.querySelector('.drug-price').value=formatMoney(data.price||toNumber(row.querySelector('.drug-price').value));
  row.addEventListener('change',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.addEventListener('input',()=>{ updateTotals(); updateWarning(); });
  row.querySelector('.del-drug').addEventListener('click',()=>{ row.remove(); refreshDrugIndexes(); updateTotals(); updateWarning(); });
  return row;
}

function fillDrugRowByActive(row,active,preset=null){
  const found=stock.find(x=>x.active===active);
  row.querySelector('.drug-brand').value=preset?.brand??found?.brand??'';
  row.querySelector('.drug-unit').value=preset?.unit??found?.unit??'Viên';
  row.querySelector('.drug-price').value=formatMoney(preset?.price??found?.price??0);
  updateRowAmount(row);
}
function addDrugRow(data={}){ byId('drugRows').appendChild(createDrugRow(data)); refreshDrugIndexes(); updateTotals(); updateWarning(); }
function refreshDrugIndexes(){ [...byId('drugRows').children].forEach((row,idx)=>row.querySelector('.row-index').textContent=idx+1); }
function updateRowAmount(row){ const qty=toNumber(row.querySelector('.drug-qty').value); const price=toNumber(row.querySelector('.drug-price').value); row.querySelector('.drug-amount').value=formatMoney(qty*price); }
function getDrugRowsData(){ return [...byId('drugRows').children].map(row=>{ updateRowAmount(row); return {active:row.querySelector('.drug-active').value,brand:row.querySelector('.drug-brand').value.trim(),unit:row.querySelector('.drug-unit').value,qty:toNumber(row.querySelector('.drug-qty').value),morning:row.querySelector('.dose-morning').value.trim(),noon:'',night:row.querySelector('.dose-night').value.trim(),price:toNumber(row.querySelector('.drug-price').value)}; }); }
function updateTotals(){ let drugTotal=0; [...byId('drugRows').children].forEach(row=>{ updateRowAmount(row); drugTotal+=toNumber(row.querySelector('.drug-amount').value); }); const service=toNumber(byId('serviceFee').value); byId('drugMoney').textContent=formatMoney(drugTotal); byId('serviceMoney').textContent=formatMoney(service); byId('totalMoney').textContent=formatMoney(drugTotal+service); }
function updateWarning(){ const actives=getDrugRowsData().map(d=>normalizeText(d.active)); const warnings=[]; if(actives.some(x=>x.includes('olanzapine'))&&actives.some(x=>x.includes('quetiapine'))) warnings.push('Olanzapine + Quetiapine có thể làm tăng an thần.'); if(actives.some(x=>x.includes('diazepam'))&&actives.some(x=>x.includes('quetiapine'))) warnings.push('Diazepam + Quetiapine có thể làm tăng buồn ngủ.'); byId('warningBox').textContent=warnings.length?'⚠️ '+warnings.join(' '):'Chưa có cảnh báo thuốc.'; }

function renderStockSheet(){
  const rows=stock.map((item,idx)=>`<div class="stock-row" data-index="${idx}"><input class="mini stock-active" value="${item.active}"><input class="mini stock-brand" value="${item.brand}"><input class="mini stock-unit" value="${item.unit}"><input class="mini stock-usage" value="${item.usage||''}"><input class="mini stock-price" value="${formatMoney(item.price)}"><input class="mini stock-qty" value="${item.qty}"><button class="btn small danger stock-del" type="button">X</button></div>`).join('')+`<div class="stock-row"><input class="mini" id="newStockActive" placeholder="Hoạt chất"><input class="mini" id="newStockBrand" placeholder="Tên thương mại"><input class="mini" id="newStockUnit" placeholder="Đơn vị" value="Viên"><input class="mini" id="newStockUsage" placeholder="Công dụng"><input class="mini" id="newStockPrice" placeholder="Giá"><input class="mini" id="newStockQty" placeholder="Tồn"><button class="btn small primary" id="addStockItemBtn" type="button">+</button></div>`;
  byId('stockRows').innerHTML=rows;
  byId('stockRows').querySelectorAll('.stock-row[data-index]').forEach(row=>{
    const idx=Number(row.dataset.index);
    row.addEventListener('input',()=>{
      stock[idx]={active:row.querySelector('.stock-active').value.trim(),brand:row.querySelector('.stock-brand').value.trim(),unit:row.querySelector('.stock-unit').value.trim(),usage:row.querySelector('.stock-usage').value.trim(),price:toNumber(row.querySelector('.stock-price').value),qty:toNumber(row.querySelector('.stock-qty').value)};
      saveStore(STORAGE_KEYS.stock,stock);
      refreshDrugActiveOptions();
    });
    row.querySelector('.stock-del').addEventListener('click',()=>{
      stock.splice(idx,1);
      saveStore(STORAGE_KEYS.stock,stock);
      renderStockSheet();
      refreshDrugActiveOptions();
    });
  });
  const addBtn=byId('addStockItemBtn');
  if(addBtn) addBtn.onclick=()=>{
    const active=byId('newStockActive').value.trim(),brand=byId('newStockBrand').value.trim();
    if(!active||!brand) return alert('Nhập hoạt chất và tên thương mại trước.');
    stock.push({active,brand,unit:byId('newStockUnit').value.trim()||'Viên',usage:byId('newStockUsage').value.trim(),price:toNumber(byId('newStockPrice').value),qty:toNumber(byId('newStockQty').value)});
    saveStore(STORAGE_KEYS.stock,stock);
    renderStockSheet();
    refreshDrugActiveOptions();
  };
}
function refreshDrugActiveOptions(){ const selected=getDrugRowsData(); byId('drugRows').innerHTML=''; selected.forEach(d=>addDrugRow(d)); }
function calcAge(){ const year=toNumber(byId('birthYear').value); byId('age').value=year?new Date().getFullYear()-year:''; }

function createNewPatient(){
  currentVisitId=null;
  currentPatientKey='';
  byId('visitDate').value=nowDateTimeLocal();
  byId('patientName').value='';
  byId('birthYear').value='';
  byId('age').value='';
  byId('gender').value='Nam';
  byId('addressWard').value='';
  byId('province').value='Đồng Nai';
  byId('phone').value='';
  byId('symptom').value='';
  byId('icdInput').value='';
  byId('followDate').value='';
  byId('serviceFee').value='';
  byId('drugRows').innerHTML='';
  addDrugRow();
  updateTotals();
  updateWarning();
  renderHistory();
}
function getNextVisitNo(patientKey){ const list=visits.filter(v=>v.patientKey===patientKey); return list.length?Math.max(...list.map(v=>v.visitNo||1))+1:1; }
function createNewPrescription(){ const name=byId('patientName').value.trim(),phone=byId('phone').value.trim(),birthYear=byId('birthYear').value.trim(); if(!name||!phone) return alert('Mở hoặc nhập bệnh nhân trước khi tạo toa mới.'); currentPatientKey=patientKeyOf({name,phone,birthYear}); currentVisitId=null; byId('visitDate').value=nowDateTimeLocal(); byId('icdInput').value=''; byId('followDate').value=''; byId('serviceFee').value=''; byId('drugRows').innerHTML=''; addDrugRow(); updateTotals(); updateWarning(); alert(`Đã tạo toa tái khám mới lần ${getNextVisitNo(currentPatientKey)}. Khi lưu sẽ tách thành lần khám riêng.`); }

function getFormData(){
  const gender=byId('gender')?.value||'';
  const patientKey=currentPatientKey||patientKeyOf({name:byId('patientName').value.trim(),phone:byId('phone').value.trim(),birthYear:byId('birthYear').value.trim()});
  const visitNo=currentVisitId?(visits.find(v=>v.id===currentVisitId)?.visitNo||1):getNextVisitNo(patientKey);
  return {id:currentVisitId||cryptoRandom(),patientKey,visitNo,visitDate:byId('visitDate').value,name:byId('patientName').value.trim(),birthYear:byId('birthYear').value.trim(),age:toNumber(byId('age').value),gender,addressWard:byId('addressWard').value.trim(),province:byId('province').value.trim(),phone:byId('phone').value.trim(),symptom:byId('symptom').value.trim(),icdCode:byId('icdInput').value.split(' - ')[0]?.trim()||'',icdText:byId('icdInput').value.trim(),drugs:getDrugRowsData(),followDate:byId('followDate').value,serviceFee:toNumber(byId('serviceFee').value),totalDrug:toNumber(byId('drugMoney').textContent),totalMoney:toNumber(byId('totalMoney').textContent),createdAt:currentVisitId?(visits.find(v=>v.id===currentVisitId)?.createdAt||new Date().toISOString()):new Date().toISOString()};
}

function saveVisit(){
  const data=getFormData();
  if(!data.name) return alert('Nhập họ tên bệnh nhân.');
  if(!data.phone) return alert('Nhập số điện thoại.');
  if(currentVisitId){
    const idx=visits.findIndex(x=>x.id===currentVisitId);
    if(idx>=0) visits[idx]=data;
  }else{
    visits.unshift(data);
    currentVisitId=data.id;
    currentPatientKey=data.patientKey;
  }
  saveStore(STORAGE_KEYS.patients,visits);
  renderPatientList();
  renderHistory();
  renderStats();
  alert(`Đã lưu lần khám số ${data.visitNo}. Lịch sử khám đã được cập nhật.`);
}

function renderPatientList(){
  const kw=normalizeText(byId('searchInput').value);
  const filtered=visits.filter(v=>normalizeText(`${v.name} ${v.phone} ${v.addressWard} ${v.province} ${v.birthYear}`).includes(kw)).sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate));
  const grouped=new Map();
  filtered.forEach(v=>{ const key=v.patientKey||patientKeyOf(v); if(!grouped.has(key)) grouped.set(key,[]); grouped.get(key).push(v); });
  groupedPatients=[...grouped.values()].map(list=>list.sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate)));
  byId('patientListBody').innerHTML=groupedPatients.map(list=>{
    const latest=list[0];
    const visitLabel=list.map(v=>`L${v.visitNo}`).join(', ');
    return `<div class="patient-row ${list.some(v=>v.id===currentVisitId)?'active':''}" data-id="${latest.id}"><div>${formatVisitDate(latest.visitDate)}</div><div><b>${safeText(latest.name)} - ${visitLabel}</b><br><span class="muted">${safeText(latest.phone)} • ${safeText(latest.addressWard)}, ${safeText(latest.province)}</span></div><div>${safeText(String(latest.age||''))}</div><div>${formatMoney(latest.totalMoney)}</div><div>${safeText(latest.icdCode||'')}</div><div><button class="btn small danger del-patient" data-id="${latest.id}" type="button">Xóa</button></div></div>`;
  }).join('')||'<div class="patient-row"><div></div><div>Không có bệnh nhân phù hợp.</div><div></div><div></div><div></div><div></div></div>';
}

function openVisit(id){
  const v=visits.find(x=>x.id===id);
  if(!v) return;
  currentVisitId=v.id;
  currentPatientKey=v.patientKey;
  byId('visitDate').value=v.visitDate||nowDateTimeLocal();
  byId('patientName').value=v.name||'';
  byId('birthYear').value=v.birthYear||'';
  calcAge();
  byId('gender').value=v.gender||'Nam';
  byId('addressWard').value=v.addressWard||'';
  byId('province').value=v.province||'';
  byId('phone').value=v.phone||'';
  byId('symptom').value=v.symptom||'';
  byId('icdInput').value=v.icdText||'';
  byId('followDate').value=v.followDate||'';
  byId('serviceFee').value=formatMoney(v.serviceFee||0);
  byId('drugRows').innerHTML='';
  (v.drugs||[]).forEach(d=>addDrugRow(d));
  if(!(v.drugs||[]).length) addDrugRow();
  updateTotals();
  updateWarning();
  renderPatientList();
  renderHistory();
}

function deleteVisit(id){ if(!confirm('Xóa lần khám này?')) return; visits=visits.filter(x=>x.id!==id); saveStore(STORAGE_KEYS.patients,visits); if(currentVisitId===id) createNewPatient(); renderPatientList(); renderHistory(); renderStats(); }

function renderHistory(){
  const phone=byId('phone').value.trim();
  const rows=phone?visits.filter(v=>v.phone===phone).sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate)):visits.slice(0,10);
  byId('historyRows').innerHTML=rows.map(v=>`<div class="history-row" data-id="${v.id}"><div>${formatVisitDate(v.visitDate)}</div><div>K${String(v.visitNo).padStart(3,'0')}</div><div>${safeText(v.icdText||'')}</div><div>${formatMoney(v.totalMoney)}</div><div><button class="btn small history-open" data-id="${v.id}" type="button">Mở</button></div></div>`).join('')||'<div class="history-row"><div></div><div></div><div>Chưa có lịch sử khám.</div><div></div><div></div></div>';
}

function daysAgo(day){ const d=new Date(); d.setDate(d.getDate()-day); return d; }
function startOfMonth(d){ return new Date(d.getFullYear(),d.getMonth(),1); }
function endOfMonth(d){ return new Date(d.getFullYear(),d.getMonth()+1,1); }
function startOfPrevMonth(d){ return new Date(d.getFullYear(),d.getMonth()-1,1); }
function endOfPrevMonth(d){ return new Date(d.getFullYear(),d.getMonth(),1); }
function rangeCount(list,from,to){ return list.filter(v=>{ const d=new Date(v.createdAt||v.visitDate||Date.now()); return d>=from&&d<to; }).length; }
function profitSum(list,from,to){ return list.filter(v=>{ const d=new Date(v.createdAt||v.visitDate||Date.now()); return d>=from&&d<to; }).reduce((sum,v)=>sum+((v.totalMoney||0)-(v.totalDrug||0)),0); }
function setTrend(el,current,previous,label){ const pct=previous===0?(current>0?100:0):Math.round(((current-previous)/previous)*100); const up=pct>=0; el.className='trend '+(up?'up':'down'); el.textContent=`${up?'▲':'▼'} ${Math.abs(pct)}% so với ${label}`; }
function getRevisitStats(){
  const byPatient=new Map();
  visits.forEach(v=>{
    const key=v.patientKey||patientKeyOf(v);
    if(!byPatient.has(key)) byPatient.set(key,[]);
    byPatient.get(key).push(v);
  });
  let scheduled=0;
  let returned=0;
  let onTime=0;
  let late=0;
  let missed=0;
  byPatient.forEach(list=>{
    const ordered=list.slice().sort((a,b)=>new Date(a.visitDate)-new Date(b.visitDate));
    ordered.forEach((visit,index)=>{
      if(!visit.followDate) return;
      scheduled+=1;
      const followDate=new Date(visit.followDate);
      const later=ordered.slice(index+1).find(next=>new Date(next.visitDate)>=followDate);
      if(later){
        returned+=1;
        const revisitDate=new Date(later.visitDate);
        const diffDays=Math.round((startOfDay(revisitDate)-startOfDay(followDate))/86400000);
        if(diffDays<=0) onTime+=1;
        else late+=1;
      }else{
        missed+=1;
      }
    });
  });
  const rate=scheduled?Math.round((returned/scheduled)*100):0;
  return {scheduled,returned,rate,onTime,late,missed};
}
function renderStats(){
  const now=new Date(),thisWeek=rangeCount(visits,daysAgo(7),now),lastWeek=rangeCount(visits,daysAgo(14),daysAgo(7)),thisMonth=rangeCount(visits,startOfMonth(now),endOfMonth(now)),lastMonth=rangeCount(visits,startOfPrevMonth(now),endOfPrevMonth(now)),thisMonthProfit=profitSum(visits,startOfMonth(now),endOfMonth(now)),lastMonthProfit=profitSum(visits,startOfPrevMonth(now),endOfPrevMonth(now));
  const revisit=getRevisitStats();
  byId('statWeekCount').textContent=thisWeek;
  byId('statMonthCount').textContent=thisMonth;
  byId('statProfit').textContent=formatMoney(thisMonthProfit);
  if(byId('statRevisitRate')) byId('statRevisitRate').textContent=`${revisit.rate}%`;
  if(byId('statRevisitTrend')){
    byId('statRevisitTrend').className='trend '+(revisit.rate>=50?'up':'down');
    byId('statRevisitTrend').textContent=`${revisit.returned}/${revisit.scheduled} ca quay lại`;
  }
  if(byId('statOnTimeCount')) byId('statOnTimeCount').textContent=String(revisit.onTime);
  if(byId('statOnTimeTrend')){
    byId('statOnTimeTrend').className='trend '+(revisit.onTime>0?'up':'down');
    byId('statOnTimeTrend').textContent=`${revisit.onTime} ca đúng hẹn`;
  }
  if(byId('statLateMissedCount')) byId('statLateMissedCount').textContent=String(revisit.late+revisit.missed);
  if(byId('statLateMissedTrend')){
    byId('statLateMissedTrend').className='trend down';
    byId('statLateMissedTrend').textContent=`${revisit.late} trễ, ${revisit.missed} không quay lại`;
  }
  setTrend(byId('statWeekTrend'),thisWeek,lastWeek,'tuần trước');
  setTrend(byId('statMonthTrend'),thisMonth,lastMonth,'tháng trước');
  setTrend(byId('statProfitTrend'),thisMonthProfit,lastMonthProfit,'tháng trước');
}

function buildPrescriptionHtml(){
  const p=getFormData();
  const ageText=p.age?`${safeText(p.age)} tuổi`:'';
  const genderText=safeText(p.gender||'');
  const drugLines=p.drugs.slice(0,4).map((d,i)=>`<div class="rx-rxitem"><div class="top"><div class="rx-label">${i+1}/</div><div class="rx-dots">${safeText(d.brand||d.active||'')}</div><div class="rx-label">${d.qty||''}</div><div class="rx-label">${safeText(d.unit||'viên')}</div></div><div class="sub"><div class="rx-label">sáng ${safeText(d.morning||'')} viên</div><div class="rx-label">tối ${safeText(d.night||'')} viên</div></div></div>`).join('');
  const today=new Date();
  return `<!DOCTYPE html><html><head><title>Toa thuốc tâm thần</title><style>body{font-family:Arial;padding:18px 22px;font-size:14px;color:#1f4f8b}.rx-paper{font-family:Arial,sans-serif;color:#1f4f8b}.rx-header{display:grid;grid-template-columns:1fr 1fr;gap:18px;font-size:14px;font-weight:700}.rx-header div{line-height:1.5}.rx-center-title{text-align:center;font-size:30px;font-weight:700;letter-spacing:.5px;margin:24px 0 18px}.rx-line{display:flex;align-items:flex-end;gap:8px;margin:14px 0;font-size:15px}.rx-label{white-space:nowrap;font-weight:700}.rx-dots{flex:1;border-bottom:2px dotted #8aa2c7;height:18px}.rx-short{width:100px;border-bottom:2px dotted #8aa2c7;height:18px}.rx-rxitem{margin:16px 0 10px;font-size:15px}.rx-rxitem .top,.rx-rxitem .sub{display:flex;align-items:flex-end;gap:8px;margin-top:8px}.rx-sign{margin-top:26px;text-align:right;font-size:15px}.rx-bottom-note{margin-top:36px;text-align:center;font-size:16px;font-style:italic;font-weight:700}.rx-revisit{margin-top:26px;font-size:15px}@page{size:A5 portrait;margin:10mm}</style></head><body><div class="rx-paper"><div class="rx-header"><div><div>BSCKI TRẦN NGUYỄN THANH MINH</div><div>Khám chuyên khoa tâm thần</div><div>Tổ 8 Khu phố Tân Phú, P. Tân Triều, Đồng Nai</div></div><div style="text-align:right"><div>Khám bệnh ngoại trú</div><div>Người bệnh mang theo đơn khi tái khám</div></div></div><div class="rx-center-title">TOA THUỐC</div><div class="rx-line"><div class="rx-label">Họ tên:</div><div class="rx-dots">${safeText(p.name)}</div><div class="rx-label">Tuổi:</div><div class="rx-short">${ageText}</div><div class="rx-label">${genderText}</div></div><div class="rx-line"><div class="rx-label">Địa chỉ:</div><div class="rx-dots">${safeText(p.addressWard)}, ${safeText(p.province)}</div></div><div class="rx-line"><div class="rx-label">Chẩn đoán:</div><div class="rx-dots">${safeText(p.icdText)}</div></div>${drugLines}<div class="rx-sign"><div>Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}</div><div style="font-weight:700;margin-top:8px">Bác sĩ điều trị</div><div style="margin-top:46px;font-weight:700">BSCKI Trần Nguyễn Thanh Minh</div></div><div class="rx-revisit">Tái khám: ${safeText(p.followDate||'')} ngày</div><div class="rx-bottom-note">Khi đi khám lại xin mang theo đơn này</div></div></body></html>`;
}

function showPrescriptionPreview(){
  const html=buildPrescriptionHtml();
  const body=byId('rxBody');
  const doc=new DOMParser().parseFromString(html,'text/html');
  body.innerHTML=doc.body.innerHTML;
  byId('rxModal').classList.remove('hidden');
}

function printPrescription(){
  const html=buildPrescriptionHtml();
  const frame=byId('printFrame');
  const doc=frame.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
  setTimeout(()=>{ try{ frame.contentWindow.focus(); frame.contentWindow.print(); }catch(e){ alert('Không thể mở lệnh in trong môi trường hiện tại.'); console.error(e); } },200);
}

function exportData(){
  const blob=new Blob([JSON.stringify({visits,icdList,stock,clinicInfo},null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='pms-data.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function createDrugRow(data={}){
  const row=document.createElement('div');
  row.className='drug-row';
  row.innerHTML=`<div class="row-index"></div><div><select class="mini drug-active"></select></div><div><input class="mini drug-brand"></div><div><textarea class="mini drug-usage" rows="2" placeholder="Cong dung"></textarea></div><div><select class="mini compact drug-unit"><option>Viên</option><option>Gói</option><option>Ống</option><option>Chai</option></select></div><div><input class="mini qty drug-qty" inputmode="numeric"></div><div><div class="dose-grid"><div class="dose-box"><div class="dose-label">Sáng</div><input class="mini compact dose-morning" list="doseOptions" placeholder="0,5"></div><div class="dose-box"><div class="dose-label">Tối</div><input class="mini compact dose-night" list="doseOptions" placeholder="1"></div></div></div><div><button class="btn small danger del-drug" type="button">X</button></div>`;
  const footer=document.createElement('div');
  footer.className='drug-footer';
  footer.innerHTML=`<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div><label class="label">Giá bán</label><input class="mini drug-price" inputmode="numeric"></div><div><label class="label">Thành tiền</label><input class="mini drug-amount" readonly></div><div></div>`;
  row.appendChild(footer);
  const activeSel=row.querySelector('.drug-active');
  activeSel.innerHTML=stock.map(item=>`<option value="${item.active}">${item.active}</option>`).join('');
  activeSel.value=data.active||stock[0]?.active||'';
  fillDrugRowByActive(row,activeSel.value,data);
  row.querySelector('.drug-unit').value=data.unit||row.querySelector('.drug-unit').value;
  row.querySelector('.drug-qty').value=String(data.qty??30);
  row.querySelector('.dose-morning').value=String(data.morning??'0');
  row.querySelector('.dose-night').value=String(data.night??'1');
  row.querySelector('.drug-price').value=formatMoney(data.price||toNumber(row.querySelector('.drug-price').value));
  row.addEventListener('change',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.addEventListener('input',()=>{ updateTotals(); updateWarning(); });
  row.querySelector('.del-drug').addEventListener('click',()=>{ row.remove(); refreshDrugIndexes(); updateTotals(); updateWarning(); });
  return row;
}

function fillDrugRowByActive(row,active,preset=null){
  const found=stock.find(x=>x.active===active);
  row.querySelector('.drug-brand').value=preset?.brand??found?.brand??'';
  row.querySelector('.drug-usage').value=preset?.usage??found?.usage??'';
  row.querySelector('.drug-unit').value=preset?.unit??found?.unit??'Viên';
  row.querySelector('.drug-price').value=formatMoney(preset?.price??found?.price??0);
  updateRowAmount(row);
}

function getDrugRowsData(){ return [...byId('drugRows').children].map(row=>{ updateRowAmount(row); return {active:row.querySelector('.drug-active').value,brand:row.querySelector('.drug-brand').value.trim(),usage:row.querySelector('.drug-usage').value.trim(),unit:row.querySelector('.drug-unit').value,qty:toNumber(row.querySelector('.drug-qty').value),morning:row.querySelector('.dose-morning').value.trim(),noon:'',night:row.querySelector('.dose-night').value.trim(),price:toNumber(row.querySelector('.drug-price').value)}; }); }

function buildPrescriptionHtml(){
  const p=getFormData();
  const ageText=p.age?`${safeText(p.age)} tuá»•i`:'';
  const genderText=safeText(p.gender||'');
  const drugLines=p.drugs.slice(0,4).map((d,i)=>`<div class="rx-rxitem"><div class="top"><div class="rx-label">${i+1}/</div><div class="rx-dots">${safeText(d.brand||d.active||'')}</div><div class="rx-label">${d.qty||''}</div><div class="rx-label">${safeText(d.unit||'viÃªn')}</div></div><div class="sub"><div class="rx-label">sÃ¡ng ${safeText(d.morning||'')} viÃªn</div><div class="rx-label">tá»‘i ${safeText(d.night||'')} viÃªn</div></div></div>`).join('');
  const today=new Date();
  return `<!DOCTYPE html><html><head><title>Toa thuá»‘c tÃ¢m tháº§n</title><style>body{font-family:Arial;padding:18px 22px;font-size:14px;color:#1f4f8b}.rx-paper{font-family:Arial,sans-serif;color:#1f4f8b}.rx-header{display:grid;grid-template-columns:1fr 1fr;gap:18px;font-size:14px;font-weight:700}.rx-header div{line-height:1.5}.rx-center-title{text-align:center;font-size:30px;font-weight:700;letter-spacing:.5px;margin:24px 0 18px}.rx-line{display:flex;align-items:flex-end;gap:8px;margin:14px 0;font-size:15px}.rx-label{white-space:nowrap;font-weight:700}.rx-dots{flex:1;border-bottom:2px dotted #8aa2c7;height:18px}.rx-short{width:100px;border-bottom:2px dotted #8aa2c7;height:18px}.rx-rxitem{margin:16px 0 10px;font-size:15px}.rx-rxitem .top,.rx-rxitem .sub{display:flex;align-items:flex-end;gap:8px;margin-top:8px}.rx-sign{margin-top:26px;text-align:right;font-size:15px}.rx-bottom-note{margin-top:36px;text-align:center;font-size:16px;font-style:italic;font-weight:700}.rx-revisit{margin-top:26px;font-size:15px}@page{size:A5 portrait;margin:10mm}</style></head><body><div class="rx-paper"><div class="rx-header"><div><div>${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div><div>${safeText(clinicInfo.name||DEFAULT_CLINIC_INFO.name)}</div><div>${safeText(clinicInfo.address||DEFAULT_CLINIC_INFO.address)}</div><div>${safeText(clinicInfo.phone||DEFAULT_CLINIC_INFO.phone)}</div><div>${safeText(clinicInfo.hours||DEFAULT_CLINIC_INFO.hours)}</div></div><div style="text-align:right"><div>KhÃ¡m bá»‡nh ngoáº¡i trÃº</div><div>NgÆ°á»i bá»‡nh mang theo Ä‘Æ¡n khi tÃ¡i khÃ¡m</div></div></div><div class="rx-center-title">TOA THUá»C</div><div class="rx-line"><div class="rx-label">Há» tÃªn:</div><div class="rx-dots">${safeText(p.name)}</div><div class="rx-label">Tuá»•i:</div><div class="rx-short">${ageText}</div><div class="rx-label">${genderText}</div></div><div class="rx-line"><div class="rx-label">Äá»‹a chá»‰:</div><div class="rx-dots">${safeText(p.addressWard)}, ${safeText(p.province)}</div></div><div class="rx-line"><div class="rx-label">Cháº©n Ä‘oÃ¡n:</div><div class="rx-dots">${safeText(p.icdText)}</div></div>${drugLines}<div class="rx-sign"><div>NgÃ y ${today.getDate()} thÃ¡ng ${today.getMonth()+1} nÄƒm ${today.getFullYear()}</div><div style="font-weight:700;margin-top:8px">BÃ¡c sÄ© Ä‘iá»u trá»‹</div><div style="margin-top:46px;font-weight:700">${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div></div><div class="rx-revisit">TÃ¡i khÃ¡m: ${safeText(p.followDate||'')} ngÃ y</div><div class="rx-bottom-note">Khi Ä‘i khÃ¡m láº¡i xin mang theo Ä‘Æ¡n nÃ y</div></div></body></html>`;
}

function createDrugRow(data={}){
  const row=document.createElement('div');
  row.className='drug-row';
  row.innerHTML=`<div class="row-index"></div><div><label class="label">Hoat chat</label><select class="mini drug-active"></select></div><div><label class="label">Ten thuong mai</label><input class="mini drug-brand"></div><div><label class="label">Sang</label><select class="mini compact dose-morning"><option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div><div><label class="label">Toi</label><select class="mini compact dose-night"><option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div><div><label class="label">So luong</label><input class="mini qty drug-qty" inputmode="numeric"></div><div class="drug-usage-wrap"><label class="label">Cong dung</label><textarea class="mini drug-usage" rows="2" placeholder="Cong dung"></textarea></div><div class="drug-unit-wrap"><label class="label">Don vi</label><select class="mini compact drug-unit"><option>Viên</option><option>Gói</option><option>Ống</option><option>Chai</option></select></div><div class="drug-price-wrap"><label class="label">Gia</label><input class="mini drug-price" inputmode="numeric"></div><div class="drug-amount-wrap"><label class="label">Thanh tien</label><input class="mini drug-amount" readonly></div><div class="drug-delete-wrap" style="padding-top:18px"><button class="btn small danger del-drug" type="button">X</button></div>`;
  const activeSel=row.querySelector('.drug-active');
  activeSel.innerHTML=stock.map(item=>`<option value="${item.active}">${item.active}</option>`).join('');
  activeSel.value=data.active||stock[0]?.active||'';
  fillDrugRowByActive(row,activeSel.value,data);
  row.querySelector('.drug-unit').value=data.unit||row.querySelector('.drug-unit').value;
  row.querySelector('.drug-qty').value=String(data.qty??30);
  row.querySelector('.dose-morning').value=String(data.morning??'0');
  row.querySelector('.dose-night').value=String(data.night??'0');
  row.querySelector('.drug-price').value=formatMoney(data.price||toNumber(row.querySelector('.drug-price').value));
  row.addEventListener('change',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.addEventListener('input',()=>{ updateTotals(); updateWarning(); });
  row.querySelector('.del-drug').addEventListener('click',()=>{ row.remove(); refreshDrugIndexes(); updateTotals(); updateWarning(); });
  return row;
}

function fillDrugRowByActive(row,active,preset=null){
  const found=stock.find(x=>x.active===active);
  row.querySelector('.drug-brand').value=preset?.brand??found?.brand??'';
  row.querySelector('.drug-usage').value=preset?.usage??found?.usage??'';
  row.querySelector('.drug-unit').value=preset?.unit??found?.unit??'Viên';
  row.querySelector('.drug-price').value=formatMoney(preset?.price??found?.price??0);
  updateRowAmount(row);
}

function getDrugRowsData(){ return [...byId('drugRows').children].map(row=>{ updateRowAmount(row); return {active:row.querySelector('.drug-active').value,brand:row.querySelector('.drug-brand').value.trim(),usage:row.querySelector('.drug-usage').value.trim(),unit:row.querySelector('.drug-unit').value,qty:toNumber(row.querySelector('.drug-qty').value),morning:row.querySelector('.dose-morning').value.trim(),noon:'',night:row.querySelector('.dose-night').value.trim(),price:toNumber(row.querySelector('.drug-price').value)}; }); }

function renderPatientList(){
  const kw=normalizeText(byId('searchInput').value);
  const filtered=visits.filter(v=>normalizeText(`${v.name} ${v.phone} ${v.addressWard} ${v.province} ${v.birthYear}`).includes(kw)).sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate));
  const grouped=new Map();
  filtered.forEach(v=>{ const key=v.patientKey||patientKeyOf(v); if(!grouped.has(key)) grouped.set(key,[]); grouped.get(key).push(v); });
  const allGrouped=[...grouped.values()].map(list=>list.sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate)));
  groupedPatients=(!kw&&!showAllPatients)?allGrouped.slice(0,5):allGrouped;
  updateShowAllPatientsButton();
  byId('patientListBody').innerHTML=groupedPatients.map(list=>{
    const latest=list[0];
    const visitLabel=list.map(v=>`L${v.visitNo}`).join(', ');
    const follow=getFollowStatus(latest.followDate);
    return `<div class="patient-row ${list.some(v=>v.id===currentVisitId)?'active':''}" data-id="${latest.id}"><div>${formatVisitDate(latest.visitDate)}</div><div><b>${safeText(latest.name)} - ${visitLabel}</b><br><span class="muted">${safeText(latest.phone)} - ${safeText(latest.addressWard)}, ${safeText(latest.province)}</span></div><div>${safeText(String(latest.age||''))}</div><div>${formatMoney(latest.totalMoney)}</div><div>${safeText(latest.icdCode||'')}</div><div><span class="follow-badge ${follow.cls}">${safeText(follow.label)}</span></div><div><button class="btn small danger del-patient" data-id="${latest.id}" type="button">Xoa</button></div></div>`;
  }).join('')||'<div class="patient-row"><div></div><div>Khong co benh nhan phu hop.</div><div></div><div></div><div></div><div></div><div></div></div>';
}

function buildPrescriptionHtml(){
  const p=getFormData();
  const today=new Date();
  const visitDateText=p.visitDate?new Date(p.visitDate).toLocaleDateString('vi-VN'):'';
  const followText=p.followDate?new Date(p.followDate).toLocaleDateString('vi-VN'):'Chưa hẹn';
  const ageGender=[p.age?`${safeText(p.age)} tuổi`:'',safeText(p.gender||'')].filter(Boolean).join(' - ');
  const rows=(p.drugs||[]).map((d,i)=>`
    <tr>
      <td>${i+1}</td>
      <td><div class="drug-name">${safeText((String(d.brand||'').trim()) || d.active || '')}</div></td>
      <td>${safeText(d.unit||'Vien')}</td>
      <td>${safeText(String(d.qty||''))}</td>
      <td class="dose-cell">
        <span>Sáng: ${safeText(d.morning||'0')}</span>
        <span>Tối: ${safeText(d.night||'0')}</span>
      </td>
    </tr>`).join('');
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Toa thuốc</title>
    <style>
      @page{size:A5 portrait;margin:7mm}
      *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      html,body{width:148mm;height:210mm}
      body{font-family:"Times New Roman",Georgia,serif;background:#fff;margin:0;padding:0;color:#111}
      .sheet{width:134mm;min-height:196mm;margin:0 auto;background:#fff;border:1px solid #111;overflow:hidden}
      .hero{padding:10px 12px;background:#fff;color:#111;border-bottom:1px solid #111}
      .hero-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
      .clinic-name{font-size:18px;font-weight:700;line-height:1.15;margin:0;color:#111}
      .doctor{margin-top:3px;font-size:12px;font-weight:700;color:#111}
      .meta{margin-top:4px;font-size:10.5px;line-height:1.35;color:#111}
      .rx-badge{padding:6px 10px;border:1px solid #111;background:#fff;color:#111;font-weight:800;letter-spacing:.12em;font-family:Arial,sans-serif;font-size:10px}
      .section{padding:8px 10px 6px}
      .patient-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 6px}
      .info{padding:5px 7px;border:1px solid #777;background:#fff}
      .label{font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:#111;font-weight:700}
      .value{margin-top:2px;font-size:11px;font-weight:700;color:#111;line-height:1.15}
      .table-wrap{padding:0 10px 8px}
      table{width:100%;border-collapse:collapse;border:1px solid #111}
      thead th{background:#fff;color:#111;font-size:9.5px;text-align:left;padding:6px 5px;border-bottom:1px solid #111}
      tbody td{padding:5px;border-top:1px solid #999;font-size:10.5px;vertical-align:top;line-height:1.15;color:#111}
      .drug-name{font-weight:700;color:#111;font-size:10.5px;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .dose-cell span{display:block;margin-bottom:1px}
      .footer{display:flex;justify-content:space-between;gap:10px;padding:8px 10px 10px;border-top:1px solid #111;background:#fff}
      .note{flex:1;font-size:10px;line-height:1.35;color:#111}
      .sign{min-width:210px;text-align:center}
      .sign .date{font-size:10px;color:#111}
      .sign .title{margin-top:5px;font-weight:700;font-size:10px;color:#111}
      .sign .name{margin-top:24px;font-weight:700;color:#111;font-size:11px}
      .ornament{height:2px;background:#111}
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="hero">
        <div class="hero-top">
          <div>
            <h1 class="clinic-name">${safeText(clinicInfo.name||DEFAULT_CLINIC_INFO.name)}</h1>
            <div class="doctor">${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div>
            <div class="meta">
              <div>${safeText(clinicInfo.address||DEFAULT_CLINIC_INFO.address)}</div>
              <div>${safeText(clinicInfo.phone||DEFAULT_CLINIC_INFO.phone)}</div>
              <div>${safeText(clinicInfo.hours||DEFAULT_CLINIC_INFO.hours)}</div>
            </div>
          </div>
          <div class="rx-badge">TOA THUỐC</div>
        </div>
      </div>
      <div class="ornament"></div>
      <div class="section">
        <div class="patient-grid">
          <div class="info"><div class="label">Bệnh nhân</div><div class="value">${safeText(p.name||'')}</div></div>
          <div class="info"><div class="label">Ngày khám</div><div class="value">${safeText(visitDateText)}</div></div>
          <div class="info"><div class="label">Tuổi / Giới</div><div class="value">${safeText(ageGender)}</div></div>
          <div class="info"><div class="label">Tái khám</div><div class="value">${safeText(followText)}</div></div>
          <div class="info" style="grid-column:1 / -1"><div class="label">Địa chỉ</div><div class="value">${safeText(`${p.addressWard||''}${p.addressWard&&p.province?', ':''}${p.province||''}${p.phone?' - '+p.phone:''}`)}</div></div>
          <div class="info" style="grid-column:1 / -1"><div class="label">Chẩn đoán</div><div class="value">${safeText(p.icdText||'')}</div></div>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:48px">#</th>
              <th>Thuốc</th>
              <th style="width:78px">Đơn vị</th>
              <th style="width:78px">SL</th>
              <th style="width:150px">Cách dùng</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="5">Chưa có thuốc trong toa.</td></tr>'}</tbody>
        </table>
      </div>
      <div class="footer">
          <div class="note">
          <div><strong>Lưu ý:</strong> Uống thuốc đúng giờ, đúng liều và tái khám theo hẹn.</div>
          <div>Mang theo toa này trong lần tái khám tiếp theo.</div>
        </div>
        <div class="sign">
          <div class="date">Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}</div>
          <div class="title">Bác sĩ điều trị</div>
          <div class="name">CKI: ${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

function buildPrescriptionHtml(){
  const p=getFormData();
  const today=new Date();
  const visitDateText=p.visitDate?new Date(p.visitDate).toLocaleDateString('vi-VN'):'';
  const followText=p.followDate?new Date(p.followDate).toLocaleDateString('vi-VN'):'Chưa hẹn';
  const ageGender=[p.age?`${safeText(p.age)} tuổi`:'',safeText(p.gender||'')].filter(Boolean).join(' - ');
  const rows=(p.drugs||[]).map((d,i)=>`
    <tr>
      <td>${i+1}</td>
      <td><div class="drug-name">${safeText((String(d.brand||'').trim())||d.active||'')}</div></td>
      <td>${safeText(d.unit||'Viên')}</td>
      <td>${safeText(String(d.qty||''))}</td>
      <td class="dose-cell">
        <span>Sáng: ${safeText(d.morning||'0')}</span>
        <span>Tối: ${safeText(d.night||'0')}</span>
      </td>
    </tr>`).join('');
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Toa thuốc</title>
    <style>
      @page{size:A5 portrait;margin:7mm}
      *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      html,body{width:148mm;height:210mm}
      body{font-family:"Times New Roman",Georgia,serif;background:#fff;margin:0;padding:0;color:#111}
      .sheet{width:134mm;min-height:196mm;margin:0 auto;background:#fff;border:1px solid #111;overflow:hidden}
      .hero{padding:10px 12px;background:#fff;color:#111;border-bottom:1px solid #111}
      .hero-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
      .clinic-name{font-size:18px;font-weight:700;line-height:1.15;margin:0;color:#111}
      .doctor{margin-top:3px;font-size:12px;font-weight:700;color:#111}
      .meta{margin-top:4px;font-size:10.5px;line-height:1.35;color:#111}
      .rx-badge{padding:6px 10px;border:1px solid #111;background:#fff;color:#111;font-weight:800;letter-spacing:.12em;font-family:Arial,sans-serif;font-size:10px}
      .section{padding:8px 10px 6px}
      .patient-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 6px}
      .info{padding:5px 7px;border:1px solid #777;background:#fff}
      .label{font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:#111;font-weight:700}
      .value{margin-top:2px;font-size:11px;font-weight:700;color:#111;line-height:1.15}
      .table-wrap{padding:0 10px 8px}
      table{width:100%;border-collapse:collapse;border:1px solid #111}
      thead th{background:#fff;color:#111;font-size:9.5px;text-align:left;padding:6px 5px;border-bottom:1px solid #111}
      tbody td{padding:5px;border-top:1px solid #999;font-size:10.5px;vertical-align:top;line-height:1.15;color:#111}
      .drug-name{font-weight:700;color:#111;font-size:10.5px;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .dose-cell span{display:block;margin-bottom:1px}
      .footer{display:flex;justify-content:space-between;gap:10px;padding:8px 10px 10px;border-top:1px solid #111;background:#fff}
      .note{flex:1;font-size:10px;line-height:1.35;color:#111}
      .sign{min-width:210px;text-align:center}
      .sign .date{font-size:10px;color:#111}
      .sign .title{margin-top:5px;font-weight:700;font-size:10px;color:#111}
      .sign .name{margin-top:24px;font-weight:700;color:#111;font-size:11px}
      .ornament{height:2px;background:#111}
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="hero">
        <div class="hero-top">
          <div>
            <h1 class="clinic-name">${safeText(clinicInfo.name||DEFAULT_CLINIC_INFO.name)}</h1>
            <div class="doctor">${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div>
            <div class="meta">
              <div>${safeText(clinicInfo.address||DEFAULT_CLINIC_INFO.address)}</div>
              <div>${safeText(clinicInfo.phone||DEFAULT_CLINIC_INFO.phone)}</div>
              <div>${safeText(clinicInfo.hours||DEFAULT_CLINIC_INFO.hours)}</div>
            </div>
          </div>
          <div class="rx-badge">TOA THUỐC</div>
        </div>
      </div>
      <div class="ornament"></div>
      <div class="section">
        <div class="patient-grid">
          <div class="info"><div class="label">Bệnh nhân</div><div class="value">${safeText(p.name||'')}</div></div>
          <div class="info"><div class="label">Tuổi / Giới</div><div class="value">${safeText(ageGender)}</div></div>
          <div class="info"><div class="label">Số điện thoại</div><div class="value">${safeText(p.phone||'')}</div></div>
          <div class="info"><div class="label">Tái khám</div><div class="value">${safeText(followText)}</div></div>
          <div class="info" style="grid-column:1 / -1"><div class="label">Địa chỉ</div><div class="value">${safeText(`${p.addressWard||''}${p.addressWard&&p.province?', ':''}${p.province||''}`)}</div></div>
          <div class="info" style="grid-column:1 / -1"><div class="label">Chẩn đoán</div><div class="value">${safeText(p.icdText||'')}</div></div>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:48px">#</th>
              <th>Thuốc</th>
              <th style="width:78px">Đơn vị</th>
              <th style="width:78px">SL</th>
              <th style="width:150px">Cách dùng</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="5">Chưa có thuốc trong toa.</td></tr>'}</tbody>
        </table>
      </div>
      <div class="footer">
        <div class="note">
          <div><strong>Lưu ý:</strong> Uống thuốc đúng giờ, đúng liều và tái khám theo hẹn.</div>
          <div>Mang theo toa này trong lần tái khám tiếp theo.</div>
        </div>
        <div class="sign">
          <div class="date">Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}</div>
          <div class="title">Bác sĩ điều trị</div>
          <div class="name">CKI: ${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

const PSYCH_DRUG_RULES=[
  {key:'clozapine',aliases:['clozapin','clozapine','clomedin'],maxMgPerDay:900,effect:'Clozapine: cảnh báo giảm bạch cầu hạt, co giật, viêm cơ tim, táo bón nặng; cần theo dõi công thức máu và dấu hiệu nhiễm trùng.'},
  {key:'olanzapine',aliases:['olanzapin','olanzapine','nykob','olanxol'],maxMgPerDay:20,effect:'Olanzapine: dễ tăng cân, tăng đường huyết, hội chứng chuyển hóa và buồn ngủ.'},
  {key:'quetiapine',aliases:['quetiapin','quetiapine','seroquel','daquetin'],maxMgPerDay:800,effect:'Quetiapine: cảnh báo an thần, hạ huyết áp tư thế, kéo dài QT và hội chứng chuyển hóa.'},
  {key:'risperidone',aliases:['risperidone','risperidon','agirisdon','risperdal'],maxMgPerDay:16,effect:'Risperidone: lưu ý ngoại tháp, tăng prolactin, cứng cơ và kéo dài QT.'},
  {key:'haloperidol',aliases:['haloperidol','halofar'],maxMgPerDay:20,effect:'Haloperidol: nguy cơ cao ngoại tháp, loạn trương lực, QT kéo dài và hội chứng an thần kinh ác tính.'},
  {key:'levomepromazine',aliases:['levomepromazin','levomepromazine'],maxMgPerDay:300,effect:'Levomepromazine: an thần mạnh, tụt huyết áp tư thế, kháng cholinergic và kéo dài QT.'},
  {key:'chlorpromazine',aliases:['chlorpromazin','chlorpromazine'],maxMgPerDay:800,effect:'Chlorpromazine: an thần mạnh, tụt huyết áp, kéo dài QT và tác dụng kháng cholinergic.'},
  {key:'aripiprazole',aliases:['aripiprazole','abilify'],maxMgPerDay:30,effect:'Aripiprazole: có thể gây bồn chồn, mất ngủ, akathisia; thận trọng khi phối hợp nhiều thuốc chống loạn thần.'},
  {key:'diazepam',aliases:['diazepam','seduxen','valium'],maxMgPerDay:40,effect:'Diazepam: gây buồn ngủ, giảm tập trung, té ngã và ức chế hô hấp khi phối hợp thuốc an thần khác.'},
  {key:'zopiclone',aliases:['zopiclon','zopiclone','phamzopic'],maxMgPerDay:7.5,effect:'Zopiclone: hỗ trợ ngủ, dễ gây lơ mơ sáng hôm sau, té ngã và lệ thuộc nếu dùng kéo dài.'},
  {key:'sulpiride',aliases:['sulpirid','sulpiride','dogtapine'],maxMgPerDay:800,effect:'Sulpiride: có thể gây tăng prolactin, ngoại tháp, buồn ngủ và kéo dài QT.'},
  {key:'clonazepam',aliases:['clonazepam','rivotril'],maxMgPerDay:20,effect:'Clonazepam: buồn ngủ, giảm trí nhớ, té ngã và lệ thuộc thuốc khi dùng kéo dài.'},
  {key:'alprazolam',aliases:['alprazolam','xanax'],maxMgPerDay:4,effect:'Alprazolam: buồn ngủ, lệ thuộc thuốc và nguy cơ cai thuốc nếu ngưng đột ngột.'},
  {key:'lorazepam',aliases:['lorazepam'],maxMgPerDay:10,effect:'Lorazepam: buồn ngủ, suy giảm trí nhớ và tăng nguy cơ té ngã ở người lớn tuổi.'},
  {key:'valproate',aliases:['valproat','valproate','acid valproic','divalproex','depakine'],maxMgPerDay:3000,effect:'Valproate: cảnh báo độc gan, giảm tiểu cầu, run tay và tăng amoniac máu.'},
  {key:'lithium',aliases:['lithium','carbonate lithium'],maxMgPerDay:1800,effect:'Lithium: theo dõi run tay, độc thận, suy giáp, mất nước và dấu hiệu ngộ độc lithium.'},
  {key:'carbamazepine',aliases:['carbamazepin','carbamazepine','tegretol'],maxMgPerDay:1600,effect:'Carbamazepine: nguy cơ hạ natri máu, giảm bạch cầu, chóng mặt và phát ban nặng.'},
  {key:'lamotrigine',aliases:['lamotrigine','lamictal'],maxMgPerDay:400,effect:'Lamotrigine: cảnh báo phát ban nặng/SJS, cần tăng liều từ từ.'},
  {key:'sertraline',aliases:['sertraline','zoloft'],maxMgPerDay:200,effect:'Sertraline: buồn nôn, run, mất ngủ; cảnh giác hội chứng serotonin khi phối hợp thuốc tăng serotonin.'},
  {key:'fluoxetine',aliases:['fluoxetine','prozac'],maxMgPerDay:80,effect:'Fluoxetine: mất ngủ, bồn chồn, hội chứng serotonin và nguy cơ chuyển hưng cảm ở bệnh nhân lưỡng cực.'},
  {key:'paroxetine',aliases:['paroxetine'],maxMgPerDay:60,effect:'Paroxetine: kháng cholinergic hơn các SSRI khác, tăng cân và hội chứng ngưng thuốc.'},
  {key:'escitalopram',aliases:['escitalopram'],maxMgPerDay:20,effect:'Escitalopram: lưu ý kéo dài QT và hội chứng serotonin khi phối hợp thuốc cùng cơ chế.'},
  {key:'venlafaxine',aliases:['venlafaxine'],maxMgPerDay:225,effect:'Venlafaxine: tăng huyết áp, bồn chồn và hội chứng serotonin khi phối hợp thuốc tăng serotonin.'},
  {key:'duloxetine',aliases:['duloxetine'],maxMgPerDay:120,effect:'Duloxetine: buồn nôn, tăng huyết áp nhẹ, độc gan và hội chứng serotonin.'},
  {key:'amitriptyline',aliases:['amitriptylin','amitriptyline'],maxMgPerDay:300,effect:'Amitriptyline: kháng cholinergic mạnh, hạ huyết áp, kéo dài QT và nguy cơ quá liều nguy hiểm.'},
  {key:'clomipramine',aliases:['clomipramine'],maxMgPerDay:250,effect:'Clomipramine: kéo dài QT, co giật và hội chứng serotonin khi phối hợp SSRI/SNRI.'},
  {key:'trihexyphenidyl',aliases:['trihexyphenidyl','artane'],maxMgPerDay:15,effect:'Trihexyphenidyl: khô miệng, bí tiểu, lú lẫn và táo bón; thận trọng ở người lớn tuổi.'}
];

const PSYCH_INTERACTION_RULES=[
  {keys:['clozapine','carbamazepine'],severity:'Nghiêm trọng',message:'Clozapine + Carbamazepine: tăng mạnh nguy cơ suy tủy/giảm bạch cầu, nên tránh phối hợp.'},
  {keys:['clozapine','haloperidol'],severity:'Cao',message:'Clozapine + Haloperidol: tăng nguy cơ ngoại tháp, hội chứng an thần kinh ác tính và độc tính thần kinh.'},
  {keys:['clozapine','diazepam'],severity:'Cao',message:'Clozapine + Benzodiazepine: có thể gây an thần sâu, tụt huyết áp và ức chế hô hấp.'},
  {keys:['clozapine','clonazepam'],severity:'Cao',message:'Clozapine + Benzodiazepine: có thể gây an thần sâu, tụt huyết áp và ức chế hô hấp.'},
  {keys:['clozapine','alprazolam'],severity:'Cao',message:'Clozapine + Benzodiazepine: có thể gây an thần sâu, tụt huyết áp và ức chế hô hấp.'},
  {keys:['clozapine','lorazepam'],severity:'Cao',message:'Clozapine + Benzodiazepine: có thể gây an thần sâu, tụt huyết áp và ức chế hô hấp.'},
  {keys:['olanzapine','diazepam'],severity:'Cao',message:'Olanzapine + Benzodiazepine: tăng buồn ngủ, té ngã và ức chế hô hấp; đặc biệt thận trọng ở người già.'},
  {keys:['olanzapine','clonazepam'],severity:'Cao',message:'Olanzapine + Benzodiazepine: tăng buồn ngủ, té ngã và ức chế hô hấp; đặc biệt thận trọng ở người già.'},
  {keys:['quetiapine','diazepam'],severity:'Cao',message:'Quetiapine + Benzodiazepine: tăng an thần, lú lẫn, chóng mặt và té ngã.'},
  {keys:['quetiapine','clonazepam'],severity:'Cao',message:'Quetiapine + Benzodiazepine: tăng an thần, lú lẫn, chóng mặt và té ngã.'},
  {keys:['levomepromazine','diazepam'],severity:'Cao',message:'Levomepromazine + Benzodiazepine: an thần cộng hợp rất mạnh, tụt huyết áp và té ngã.'},
  {keys:['haloperidol','quetiapine'],severity:'Cao',message:'Haloperidol + Quetiapine: phối hợp hai thuốc chống loạn thần làm tăng QT, ngoại tháp và an thần.'},
  {keys:['haloperidol','olanzapine'],severity:'Cao',message:'Haloperidol + Olanzapine: tăng ngoại tháp, an thần và nguy cơ kéo dài QT.'},
  {keys:['haloperidol','risperidone'],severity:'Cao',message:'Haloperidol + Risperidone: tăng nguy cơ ngoại tháp, cứng cơ và tăng prolactin.'},
  {keys:['risperidone','olanzapine'],severity:'Cao',message:'Risperidone + Olanzapine: đa trị liệu chống loạn thần làm tăng an thần, hội chứng chuyển hóa và ngoại tháp.'},
  {keys:['risperidone','quetiapine'],severity:'Cao',message:'Risperidone + Quetiapine: tăng an thần, hạ huyết áp và gánh nặng đa thuốc chống loạn thần.'},
  {keys:['olanzapine','quetiapine'],severity:'Cao',message:'Olanzapine + Quetiapine: tăng buồn ngủ, tăng cân và hội chứng chuyển hóa.'},
  {keys:['lithium','haloperidol'],severity:'Nghiêm trọng',message:'Lithium + Haloperidol: cảnh giác độc tính thần kinh, lú lẫn, run, cứng cơ và hội chứng an thần kinh ác tính.'},
  {keys:['lithium','risperidone'],severity:'Cao',message:'Lithium + Risperidone: tăng nguy cơ độc tính thần kinh và hội chứng ngoại tháp.'},
  {keys:['lithium','olanzapine'],severity:'Cao',message:'Lithium + Olanzapine: theo dõi run, lú lẫn, mất nước và độc tính thần kinh.'},
  {keys:['lithium','quetiapine'],severity:'Trung bình',message:'Lithium + Quetiapine: tăng buồn ngủ và nguy cơ độc tính thần kinh khi mất nước hoặc dùng liều cao.'},
  {keys:['valproate','clozapine'],severity:'Cao',message:'Valproate + Clozapine: có thể tăng an thần và tăng nguy cơ giảm bạch cầu; cần theo dõi huyết học.'},
  {keys:['valproate','lamotrigine'],severity:'Nghiêm trọng',message:'Valproate + Lamotrigine: làm tăng nồng độ lamotrigine, tăng nguy cơ phát ban nặng/SJS.'},
  {keys:['sertraline','fluoxetine'],severity:'Nghiêm trọng',message:'Phối hợp hai thuốc tăng serotonin: nguy cơ hội chứng serotonin, run, sốt, kích động.'},
  {keys:['sertraline','paroxetine'],severity:'Nghiêm trọng',message:'Phối hợp hai thuốc tăng serotonin: nguy cơ hội chứng serotonin, run, sốt, kích động.'},
  {keys:['sertraline','escitalopram'],severity:'Nghiêm trọng',message:'Phối hợp hai thuốc tăng serotonin: nguy cơ hội chứng serotonin, run, sốt, kích động.'},
  {keys:['sertraline','venlafaxine'],severity:'Nghiêm trọng',message:'SSRI + SNRI: tăng mạnh nguy cơ hội chứng serotonin.'},
  {keys:['sertraline','duloxetine'],severity:'Nghiêm trọng',message:'SSRI + SNRI: tăng mạnh nguy cơ hội chứng serotonin.'},
  {keys:['fluoxetine','escitalopram'],severity:'Nghiêm trọng',message:'Phối hợp hai thuốc tăng serotonin: nguy cơ hội chứng serotonin và kéo dài QT.'},
  {keys:['fluoxetine','venlafaxine'],severity:'Nghiêm trọng',message:'SSRI + SNRI: tăng mạnh nguy cơ hội chứng serotonin.'},
  {keys:['fluoxetine','duloxetine'],severity:'Nghiêm trọng',message:'SSRI + SNRI: tăng mạnh nguy cơ hội chứng serotonin.'},
  {keys:['escitalopram','venlafaxine'],severity:'Nghiêm trọng',message:'Escitalopram + Venlafaxine: tăng nguy cơ hội chứng serotonin và QT kéo dài.'},
  {keys:['escitalopram','amitriptyline'],severity:'Cao',message:'Escitalopram + Amitriptyline: tăng QT và nguy cơ hội chứng serotonin.'},
  {keys:['clomipramine','sertraline'],severity:'Cao',message:'Clomipramine + SSRI: tăng nồng độ clomipramine, co giật, QT kéo dài và hội chứng serotonin.'},
  {keys:['clomipramine','fluoxetine'],severity:'Cao',message:'Clomipramine + SSRI: tăng nồng độ clomipramine, co giật, QT kéo dài và hội chứng serotonin.'},
  {keys:['trihexyphenidyl','clozapine'],severity:'Cao',message:'Trihexyphenidyl + Clozapine: tăng kháng cholinergic, bí tiểu, táo bón và lú lẫn.'},
  {keys:['trihexyphenidyl','olanzapine'],severity:'Trung bình',message:'Trihexyphenidyl + Olanzapine: tăng khô miệng, táo bón, bí tiểu và lú lẫn.'},
  {keys:['trihexyphenidyl','quetiapine'],severity:'Trung bình',message:'Trihexyphenidyl + Quetiapine: tăng tác dụng kháng cholinergic và lú lẫn.'}
];

function getDrugRuleByText(text=''){
  const normalized=normalizeText(text);
  return PSYCH_DRUG_RULES.find(rule=>rule.aliases.some(alias=>normalized.includes(alias)));
}

function extractStrengthMg(active=''){
  const normalized=String(active||'').replace(/,/g,'.');
  const mgMatch=normalized.match(/(\d+(?:\.\d+)?)\s*mg/i);
  if(mgMatch) return Number(mgMatch[1])||0;
  const mcgMatch=normalized.match(/(\d+(?:\.\d+)?)\s*mcg/i);
  if(mcgMatch) return (Number(mcgMatch[1])||0)/1000;
  const gMatch=normalized.match(/(\d+(?:\.\d+)?)\s*g/i);
  if(gMatch) return (Number(gMatch[1])||0)*1000;
  return 0;
}

function getUnitsPerDay(drug){
  return toNumber(drug.morning)+toNumber(drug.noon)+toNumber(drug.night);
}

function summarizeDrugForWarning(drug){
  const rule=getDrugRuleByText(`${drug.active} ${drug.brand}`);
  return {
    ...drug,
    rule,
    ruleKey:rule?.key||'',
    displayName:(String(drug.brand||'').trim())||drug.active||'Thuoc khong ro',
    strengthMg:extractStrengthMg(drug.active),
    unitsPerDay:getUnitsPerDay(drug)
  };
}

function updateWarning(){
  const drugs=getDrugRowsData().map(summarizeDrugForWarning).filter(d=>d.active||d.brand);
  const warnings=[];
  const effects=[];

  const activeRuleKeys=[...new Set(drugs.map(d=>d.ruleKey).filter(Boolean))];
  const antipsychoticKeys=['clozapine','olanzapine','quetiapine','risperidone','haloperidol','levomepromazine','chlorpromazine','aripiprazole'];
  const antipsychoticCount=activeRuleKeys.filter(key=>antipsychoticKeys.includes(key)).length;
  if(antipsychoticCount>=2){
    warnings.push('Đa trị liệu thuốc chống loạn thần: tăng ngoại tháp, kéo dài QT, an thần và hội chứng chuyển hóa; chỉ nên phối hợp khi có chỉ định rõ.');
  }

  PSYCH_INTERACTION_RULES.forEach(rule=>{
    if(rule.keys.every(key=>activeRuleKeys.includes(key))){
      warnings.push(`${rule.severity}: ${rule.message}`);
    }
  });

  const seenEffects=new Set();
  drugs.forEach(drug=>{
    if(drug.rule?.effect && !seenEffects.has(drug.rule.key)){
      effects.push(drug.rule.effect);
      seenEffects.add(drug.rule.key);
    }
    if(drug.rule?.maxMgPerDay && drug.strengthMg>0 && drug.unitsPerDay>0){
      const dailyMg=drug.strengthMg*drug.unitsPerDay;
      if(dailyMg>drug.rule.maxMgPerDay){
        warnings.push(`Vượt liều tối đa: ${drug.displayName} đang ở khoảng ${dailyMg} mg/ngày, cao hơn mức khuyến cáo ${drug.rule.maxMgPerDay} mg/ngày.`);
      }
    }
  });

  const box=byId('warningBox');
  if(!box) return;
  if(!warnings.length && !effects.length){
    box.textContent='Chưa có cảnh báo thuốc.';
    return;
  }
  const segments=[];
  if(warnings.length){
    segments.push(`<div><strong>Cảnh báo phối hợp / liều:</strong></div><div>${warnings.map(s=>`- ${safeText(s)}`).join('<br>')}</div>`);
  }
  if(effects.length){
    segments.push(`<div style="margin-top:8px"><strong>Cảnh báo biến chứng cần theo dõi:</strong></div><div>${effects.map(s=>`- ${safeText(s)}`).join('<br>')}</div>`);
  }
  box.innerHTML=segments.join('');
}

const SYMPTOM_DRUG_PROTOCOLS=[
  {keywords:['kich dong','hung han','la het','cau gat','vat va','kich thich'],suggestions:[
    {match:['haloperidol','halofar'],days:7,morning:'0',night:'1',preferred:'Tối'},
    {match:['diazepam','seduxen'],days:5,morning:'0',night:'1',preferred:'Tối'}
  ]},
  {keywords:['hoang tuong','ao thanh','ao giac','nghi ngo','tam than phan liet','loan than'],suggestions:[
    {match:['risperidone','agirisdon','risperdal'],days:14,morning:'1',night:'1',preferred:'Sáng/Tối'},
    {match:['olanzapine','olanzapin','olanxol','nykob'],days:14,morning:'0',night:'1',preferred:'Tối'}
  ]},
  {keywords:['mat ngu','ngu kem','kho ngu','thuc dem'],suggestions:[
    {match:['zopiclon','phamzopic'],days:7,morning:'0',night:'1',preferred:'Tối'},
    {match:['quetiapine','seroquel','daquetin'],days:7,morning:'0',night:'1',preferred:'Tối'}
  ]},
  {keywords:['lo au','hoang so','cang thang','bon chon'],suggestions:[
    {match:['diazepam','seduxen'],days:7,morning:'0.5',night:'0.5',preferred:'Sáng/Tối'},
    {match:['sertraline','sertralin','asentra','zoloman'],days:30,morning:'1',night:'0',preferred:'Sáng'}
  ]},
  {keywords:['tram cam','chan nan','giam khi sac','met moi tinh than'],suggestions:[
    {match:['sertraline','sertralin','asentra','zoloman'],days:30,morning:'1',night:'0',preferred:'Sáng'},
    {match:['quetiapine xr','seroquel xr','quetiapine','seroquel'],days:30,morning:'0',night:'1',preferred:'Tối'}
  ]},
  {keywords:['hung cam','tang dong','noi nhieu','giam ngu','khoe bat thuong'],suggestions:[
    {match:['olanzapine','olanzapin','olanxol','nykob'],days:14,morning:'0',night:'1',preferred:'Tối'},
    {match:['valproat','valproate','depakine','delekine','dalekine'],days:14,morning:'1',night:'1',preferred:'Sáng/Tối'}
  ]},
  {keywords:['ngoai thap','run tay','cung co','van dong cham'],suggestions:[
    {match:['trihexyphenidyl','trihex','artane','danapha-trihex'],days:10,morning:'1',night:'1',preferred:'Sáng/Tối'}
  ]}
];

function isPlaceholderDrugRow(drug){
  if(!drug) return true;
  const firstStock=stock[0]||{};
  const active=(drug.active||'').trim();
  const brand=(drug.brand||'').trim();
  const qty=toNumber(drug.qty);
  const morning=String(drug.morning??'').trim();
  const night=String(drug.night??'').trim();
  return active===String(firstStock.active||'').trim() && brand===String(firstStock.brand||'').trim() && qty===30 && (morning===''||morning==='0') && (night===''||night==='0');
}

function findStockSuggestion(matchers=[]){
  const norms=matchers.map(x=>normalizeText(x));
  return stock.find(item=>{
    const hay=normalizeText(`${item.active||''} ${item.brand||''}`);
    return norms.some(token=>hay.includes(token));
  })||null;
}

function queueSymptomDrugSuggestions(){
  clearTimeout(symptomSuggestTimer);
  symptomSuggestTimer=setTimeout(applySymptomDrugSuggestions,350);
}

function computeSuggestedQty(suggestion){
  if(toNumber(suggestion.qty)>0) return toNumber(suggestion.qty);
  const unitsPerDay=toNumber(suggestion.morning)+toNumber(suggestion.noon)+toNumber(suggestion.night);
  const days=toNumber(suggestion.days)||30;
  const qty=Math.ceil((unitsPerDay||1)*days);
  return qty>0?qty:30;
}

function applySymptomDrugSuggestions(){
  const symptomText=normalizeText(byId('symptom')?.value||'');
  if(!symptomText) return;
  const protocols=SYMPTOM_DRUG_PROTOCOLS.filter(group=>group.keywords.some(keyword=>symptomText.includes(normalizeText(keyword))));
  if(!protocols.length) return;

  const currentDrugs=getDrugRowsData();
  const canReplace=!currentDrugs.length || (currentDrugs.length===1 && isPlaceholderDrugRow(currentDrugs[0]));
  const existingKeys=new Set(currentDrugs.map(d=>normalizeText(`${d.active||''}|${d.brand||''}`)));
  const additions=[];

  protocols.forEach(protocol=>{
    protocol.suggestions.forEach(suggestion=>{
      const found=findStockSuggestion(suggestion.match);
      if(!found) return;
      const key=normalizeText(`${found.active||''}|${found.brand||''}`);
      if(existingKeys.has(key)) return;
      existingKeys.add(key);
      additions.push({
        active:found.active,
        brand:found.brand,
        usage:found.usage||'',
        unit:found.unit||'Viên',
        qty:computeSuggestedQty(suggestion),
        morning:String(suggestion.morning??'0'),
        noon:String(suggestion.noon??'0'),
        night:String(suggestion.night??'0'),
        price:found.price||0
      });
    });
  });

  if(!additions.length) return;
  if(canReplace){
    byId('drugRows').innerHTML='';
  }
  additions.forEach(drug=>addDrugRow(drug));
  updateTotals();
  updateWarning();
}

function ensureDrugActiveDatalist(){
  let list=byId('drugActiveOptions');
  if(!list){
    list=document.createElement('datalist');
    list.id='drugActiveOptions';
    document.body.appendChild(list);
  }
  list.innerHTML=stock.map(item=>`<option value="${safeText(item.active)}"></option>`).join('');
}

function createDrugRow(data={}){
  ensureDrugActiveDatalist();
  const row=document.createElement('div');
  row.className='drug-row';
  row.innerHTML=`<div class="row-index"></div><div><label class="label">Hoat chat</label><input class="mini drug-active" list="drugActiveOptions" placeholder="Chon hoac nhap tay"></div><div><label class="label">Ten thuong mai</label><input class="mini drug-brand"></div><div><label class="label">Sang</label><select class="mini compact dose-morning"><option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div><div><label class="label">Toi</label><select class="mini compact dose-night"><option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div><div><label class="label">So luong</label><input class="mini qty drug-qty" inputmode="numeric"></div><div class="drug-usage-wrap"><label class="label">Cong dung</label><textarea class="mini drug-usage" rows="2" placeholder="Cong dung"></textarea></div><div class="drug-unit-wrap"><label class="label">Don vi</label><select class="mini compact drug-unit"><option>Viên</option><option>Gói</option><option>Ống</option><option>Chai</option></select></div><div class="drug-price-wrap"><label class="label">Gia</label><input class="mini drug-price" inputmode="numeric"></div><div class="drug-amount-wrap"><label class="label">Thanh tien</label><input class="mini drug-amount" readonly></div><div class="drug-delete-wrap" style="padding-top:18px"><button class="btn small danger del-drug" type="button">X</button></div>`;
  const activeInput=row.querySelector('.drug-active');
  activeInput.value=data.active||stock[0]?.active||'';
  fillDrugRowByActive(row,activeInput.value,data);
  row.querySelector('.drug-unit').value=data.unit||row.querySelector('.drug-unit').value;
  row.querySelector('.drug-qty').value=String(data.qty??30);
  row.querySelector('.dose-morning').value=String(data.morning??'0');
  row.querySelector('.dose-night').value=String(data.night??'0');
  row.querySelector('.drug-price').value=formatMoney(data.price||toNumber(row.querySelector('.drug-price').value));
  row.addEventListener('change',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.addEventListener('input',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.querySelector('.del-drug').addEventListener('click',()=>{ row.remove(); refreshDrugIndexes(); updateTotals(); updateWarning(); });
  return row;
}

function fillDrugRowByActive(row,active,preset=null){
  const found=stock.find(x=>normalizeText(x.active)===normalizeText(active));
  const brandInput=row.querySelector('.drug-brand');
  const usageInput=row.querySelector('.drug-usage');
  const unitInput=row.querySelector('.drug-unit');
  const priceInput=row.querySelector('.drug-price');
  if(preset){
    brandInput.value=preset.brand??found?.brand??'';
    usageInput.value=preset.usage??found?.usage??'';
    unitInput.value=preset.unit??found?.unit??'Viên';
    priceInput.value=formatMoney(preset.price??found?.price??0);
  }else if(found){
    if(!brandInput.value.trim()) brandInput.value=found.brand??'';
    if(!usageInput.value.trim()) usageInput.value=found.usage??'';
    unitInput.value=found.unit??'Viên';
    priceInput.value=formatMoney(found.price??0);
  }else{
    if(!usageInput.value.trim()) usageInput.value='';
    if(!brandInput.value.trim()) brandInput.value='';
    if(!unitInput.value) unitInput.value='Viên';
    if(!priceInput.value.trim()) priceInput.value='0';
  }
  updateRowAmount(row);
}

console.assert(typeof addDrugRow==='function','addDrugRow missing');
console.assert(typeof printPrescription==='function','printPrescription missing');
console.assert(createDrugRow({}).querySelectorAll('.dose-night').length===1,'duplicate dose-night input');
updateWarning();
init();tTimer=null;

const byId=id=>document.getElementById(id);
const saveStore=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const loadStore=(k,f)=>{try{const raw=localStorage.getItem(k);return raw?JSON.parse(raw):f}catch{return f}};
const normalizeText=(str='')=>str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'d');
const toNumber=str=>typeof str==='number'?str:Number(String(str||'').replace(/\./g,'').replace(/,/g,'.').replace(/[^0-9.]/g,''))||0;
const formatMoney=num=>(Number(num)||0).toLocaleString('vi-VN');
const cryptoRandom=()=> 'id_'+Math.random().toString(36).slice(2,10)+Date.now().toString(36);
function safeText(str=''){return String(str).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))}
function nowDateTimeLocal(){const d=new Date(),pad=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`}
function formatVisitDate(v){if(!v)return'';const d=new Date(v);return Number.isNaN(d.getTime())?v:d.toLocaleDateString('vi-VN')}
function patientKeyOf(data){return normalizeText(`${data.name||''}|${data.phone||''}|${data.birthYear||''}`)}
function startOfDay(d){const x=new Date(d);x.setHours(0,0,0,0);return x}
function getFollowStatus(followDate){
  if(!followDate) return {label:'Chua hen',cls:'neutral'};
  const today=startOfDay(new Date());
  const target=startOfDay(new Date(followDate));
  if(Number.isNaN(target.getTime())) return {label:'Khong hop le',cls:'neutral'};
  const diff=Math.round((target-today)/86400000);
  if(diff>0) return {label:`Con ${diff} ngay`,cls:'up'};
  if(diff===0) return {label:'Tai kham hom nay',cls:'down'};
  return {label:`Qua ${Math.abs(diff)} ngay`,cls:'down'};
}
function ensurePatientFollowHeader(){
  const head=document.querySelector('.patient-head');
  if(!head||head.children.length>=7) return;
  const col=document.createElement('div');
  col.textContent='Tai kham';
  head.insertBefore(col,head.children[5]||null);
}
function ensureShowAllPatientsButton(){
  const clearBtn=byId('clearSearchBtn');
  if(!clearBtn||byId('showAllPatientsBtn')) return;
  const btn=document.createElement('button');
  btn.className='btn small soft';
  btn.id='showAllPatientsBtn';
  btn.type='button';
  btn.textContent='Xem tat ca';
  clearBtn.insertAdjacentElement('afterend',btn);
}
function moveStatsToClinicTop(){
  const clinicCard=document.querySelector('.clinic-card');
  const statsCard=byId('statWeekCount')?.closest('.card');
  if(!clinicCard||!statsCard) return;
  const clinicTitle=clinicCard.querySelector('.card-title');
  const clinicActions=clinicTitle?.querySelector('.row-actions');
  if(clinicTitle&&statsCard.parentNode!==clinicTitle){
    statsCard.classList.add('stats-card-top');
    clinicTitle.insertBefore(statsCard,clinicActions||null);
  }
  const parentGrid=document.querySelector('.main-layout');
  if(parentGrid){
    const emptyColumns=parentGrid.querySelectorAll('.form-grid');
    emptyColumns.forEach(grid=>{
      const cards=[...grid.children].filter(el=>el.classList.contains('card'));
      if(cards.length===1&&cards[0].querySelector('#historyRows')) grid.style.gridTemplateColumns='1fr';
    });
  }
}
function updateShowAllPatientsButton(){
  const btn=byId('showAllPatientsBtn');
  if(!btn) return;
  btn.textContent=showAllPatients?'Thu gon':'Xem tat ca';
}

function init(){
  visits=loadStore(STORAGE_KEYS.patients,[]);
  icdList=loadStore(STORAGE_KEYS.icd,DEFAULT_ICD);
  stock=loadStore(STORAGE_KEYS.stock,DEFAULT_STOCK);
  clinicInfo={...DEFAULT_CLINIC_INFO,...loadStore(STORAGE_KEYS.clinic,{})};
  moveStatsToClinicTop();
  ensurePatientFollowHeader();
  ensureShowAllPatientsButton();
  ensureDrugUsageHeader();
  renderProvinceList();
  renderFeeList();
  renderCodeData();
  renderStockSheet();
  renderClinicInfo();
  bindEvents();
  renderPatientList();
  renderHistory();
  renderStats();
  createNewPatient();
}

function bindEvents(){
  byId('patientListBody').addEventListener('click',e=>{
    const delBtn=e.target.closest('.del-patient');
    const row=e.target.closest('.patient-row');
    if(delBtn){ deleteVisit(delBtn.dataset.id); return; }
    if(row&&row.dataset.id){ openVisit(row.dataset.id); }
  });
  byId('historyRows').addEventListener('click',e=>{
    const openBtn=e.target.closest('.history-open');
    const row=e.target.closest('.history-row');
    if(openBtn){ openVisit(openBtn.dataset.id); return; }
    if(row&&row.dataset.id){ openVisit(row.dataset.id); }
  });
  byId('birthYear').addEventListener('input',calcAge);
  byId('searchInput').addEventListener('input',()=>{showAllPatients=false;renderPatientList();});
  byId('searchBtn').addEventListener('click',()=>{showAllPatients=false;renderPatientList();});
  byId('clearSearchBtn').addEventListener('click',()=>{showAllPatients=false;byId('searchInput').value='';renderPatientList();});
  byId('showAllPatientsBtn')?.addEventListener('click',()=>{showAllPatients=!showAllPatients;byId('searchInput').value='';renderPatientList();});
  byId('icdInput').addEventListener('input',renderIcdSuggest);
  byId('icdInput').addEventListener('focus',renderIcdSuggest);
  byId('toggleCodeDataBtn').addEventListener('click',()=>{renderCodeData();byId('codeDataBox').classList.toggle('hidden');});
  byId('addCodeBtn').addEventListener('click',addNewCode);
  byId('addDrugBtn').addEventListener('click',()=>addDrugRow());
  byId('toggleStockBtn').addEventListener('click',()=>{renderStockSheet();byId('stockSheet').classList.toggle('hidden');});
  byId('serviceFee').addEventListener('input',updateTotals);
  byId('symptom')?.addEventListener('input',queueSymptomDrugSuggestions);
  byId('symptom')?.addEventListener('change',applySymptomDrugSuggestions);
  byId('symptom')?.addEventListener('blur',applySymptomDrugSuggestions);
  byId('saveBtn').addEventListener('click',saveVisit);
  byId('newBtn').addEventListener('click',createNewPatient);
  byId('newPrescriptionBtn').addEventListener('click',createNewPrescription);
  byId('refreshBtn').addEventListener('click',()=>location.reload());
  byId('reloadHistoryBtn').addEventListener('click',renderHistory);
  byId('previewPrintBtn').addEventListener('click',showPrescriptionPreview);
  byId('toggleClinicBtn')?.addEventListener('click',()=>byId('clinicForm').classList.toggle('hidden'));
  byId('saveClinicBtn')?.addEventListener('click',saveClinicInfo);
  byId('rxCloseBtn').addEventListener('click',()=>byId('rxModal').classList.add('hidden'));
  byId('rxPrintBtn').addEventListener('click',printPrescription);
  byId('exportBtn').addEventListener('click',exportData);
  document.addEventListener('click',e=>{
    if(!e.target.closest('#icdInput')&&!e.target.closest('#icdSuggestBox')) byId('icdSuggestBox').classList.add('hidden');
  });
}

function renderProvinceList(){ byId('provinceList').innerHTML=PROVINCES.map(p=>`<option value="${p}"></option>`).join(''); }
function renderFeeList(){ byId('feeOptions').innerHTML=DEFAULT_FEES.map(v=>`<option value="${formatMoney(v)}"></option>`).join(''); }
function ensureDrugUsageHeader(){ const head=document.querySelector('.drug-head'); if(!head||head.children.length>=8) return; const cell=document.createElement('div'); cell.textContent='Cong dung'; head.insertBefore(cell,head.children[3]||null); }
function renderClinicInfo(){
  byId('clinicDisplayName').textContent=clinicInfo.name||DEFAULT_CLINIC_INFO.name;
  byId('clinicDisplayDoctor').textContent=clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor;
  byId('clinicDisplayAddress').textContent=clinicInfo.address||DEFAULT_CLINIC_INFO.address;
  byId('clinicDisplayHours').textContent=clinicInfo.hours||DEFAULT_CLINIC_INFO.hours;
  byId('clinicDisplayPhone').textContent=clinicInfo.phone||DEFAULT_CLINIC_INFO.phone;
  byId('clinicNameInput').value=clinicInfo.name||'';
  byId('clinicDoctorInput').value=clinicInfo.doctor||'';
  byId('clinicAddressInput').value=clinicInfo.address||'';
  byId('clinicHoursInput').value=clinicInfo.hours||'';
  byId('clinicPhoneInput').value=clinicInfo.phone||'';
}
function saveClinicInfo(){
  clinicInfo={
    name:byId('clinicNameInput').value.trim()||DEFAULT_CLINIC_INFO.name,
    doctor:byId('clinicDoctorInput').value.trim()||DEFAULT_CLINIC_INFO.doctor,
    address:byId('clinicAddressInput').value.trim()||DEFAULT_CLINIC_INFO.address,
    hours:byId('clinicHoursInput').value.trim()||DEFAULT_CLINIC_INFO.hours,
    phone:byId('clinicPhoneInput').value.trim()||DEFAULT_CLINIC_INFO.phone
  };
  saveStore(STORAGE_KEYS.clinic,clinicInfo);
  renderClinicInfo();
  byId('clinicForm').classList.add('hidden');
  alert('Da luu thong tin phong kham.');
}

function renderIcdSuggest(){
  const kw=normalizeText(byId('icdInput').value.trim());
  const box=byId('icdSuggestBox');
  const matched=icdList.filter(item=>!kw||normalizeText(`${item.code} ${item.name}`).includes(kw)).slice(0,30);
  box.innerHTML=matched.length?matched.map(item=>`<div class="suggest-item" data-code="${item.code}" data-name="${item.name}">${item.code} - ${item.name}</div>`).join(''):'<div class="suggest-item">Không thấy mã phù hợp. Nhập trực tiếp rồi bấm Thêm.</div>';
  box.classList.remove('hidden');
  box.onclick=e=>{
    const row=e.target.closest('.suggest-item[data-code]');
    if(!row) return;
    byId('icdInput').value=`${row.dataset.code} - ${row.dataset.name}`;
    box.classList.add('hidden');
  };
}

function renderCodeData(){
  byId('codeDataBox').innerHTML=icdList.map((item,idx)=>`<div class="code-row" style="display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center"><div>${item.code} - ${item.name}</div><button class="btn small code-edit" data-index="${idx}" type="button">Sửa</button><button class="btn small danger code-del" data-index="${idx}" type="button">Xóa</button></div>`).join('');
  byId('codeDataBox').querySelectorAll('.code-edit').forEach(btn=>btn.onclick=()=>{
    const item=icdList[Number(btn.dataset.index)];
    const next=prompt('Sửa mã và tên, ngăn cách bằng dấu |',`${item.code}|${item.name}`);
    if(!next) return;
    const parts=next.split('|').map(v=>v.trim());
    if(parts.length<2||!parts[0]||!parts[1]) return;
    icdList[Number(btn.dataset.index)]={code:parts[0],name:parts[1]};
    saveStore(STORAGE_KEYS.icd,icdList);
    renderCodeData();
    renderIcdSuggest();
  });
  byId('codeDataBox').querySelectorAll('.code-del').forEach(btn=>btn.onclick=()=>{
    icdList.splice(Number(btn.dataset.index),1);
    saveStore(STORAGE_KEYS.icd,icdList);
    renderCodeData();
    renderIcdSuggest();
  });
}

function addNewCode(){
  const raw=byId('icdInput').value.trim();
  if(!raw) return alert('Nhập mã hoặc tên chẩn đoán trước.');
  const exact=icdList.some(x=>`${x.code} - ${x.name}`===raw||x.code===raw);
  if(exact) return alert('Mã này đã có trong danh sách.');
  let code='',name='';
  if(raw.includes(' - ')){
    [code,name]=raw.split(' - ').map(v=>v.trim());
  }else{
    code=prompt('Nhập mã mới cho chẩn đoán này','F99.1')||'';
    name=raw;
  }
  if(!code||!name) return;
  icdList.unshift({code,name});
  saveStore(STORAGE_KEYS.icd,icdList);
  byId('icdInput').value=`${code} - ${name}`;
  renderCodeData();
  renderIcdSuggest();
  byId('codeDataBox').classList.remove('hidden');
}

function createDrugRow(data={}){
  const row=document.createElement('div');
  row.className='drug-row';
  row.innerHTML=`<div class="row-index"></div><div><select class="mini drug-active"></select></div><div><input class="mini drug-brand"></div><div><select class="mini compact drug-unit"><option>Viên</option><option>Gói</option><option>Ống</option><option>Chai</option></select></div><div><input class="mini qty drug-qty" inputmode="numeric"></div><div><div class="dose-grid"><div class="dose-box"><div class="dose-label">Sáng</div><input class="mini compact dose-morning" list="doseOptions" placeholder="0,5"></div><div class="dose-box"><div class="dose-label">Tối</div><input class="mini compact dose-night" list="doseOptions" placeholder="1"></div></div></div><div><button class="btn small danger del-drug" type="button">🗑</button></div>`;
  const footer=document.createElement('div');
  footer.className='drug-footer';
  footer.innerHTML=`<div></div><div></div><div></div><div></div><div></div><div></div><div><label class="label">Giá bán</label><input class="mini drug-price" inputmode="numeric"></div><div><label class="label">Thành tiền</label><input class="mini drug-amount" readonly></div><div></div>`;
  row.appendChild(footer);
  const activeSel=row.querySelector('.drug-active');
  activeSel.innerHTML=stock.map(item=>`<option value="${item.active}">${item.active}</option>`).join('');
  activeSel.value=data.active||stock[0]?.active||'';
  fillDrugRowByActive(row,activeSel.value,data);
  row.querySelector('.drug-unit').value=data.unit||row.querySelector('.drug-unit').value;
  row.querySelector('.drug-qty').value=String(data.qty??30);
  row.querySelector('.dose-morning').value=String(data.morning??'0');
  row.querySelector('.dose-night').value=String(data.night??'1');
  row.querySelector('.drug-price').value=formatMoney(data.price||toNumber(row.querySelector('.drug-price').value));
  row.addEventListener('change',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.addEventListener('input',()=>{ updateTotals(); updateWarning(); });
  row.querySelector('.del-drug').addEventListener('click',()=>{ row.remove(); refreshDrugIndexes(); updateTotals(); updateWarning(); });
  return row;
}

function fillDrugRowByActive(row,active,preset=null){
  const found=stock.find(x=>x.active===active);
  row.querySelector('.drug-brand').value=preset?.brand??found?.brand??'';
  row.querySelector('.drug-unit').value=preset?.unit??found?.unit??'Viên';
  row.querySelector('.drug-price').value=formatMoney(preset?.price??found?.price??0);
  updateRowAmount(row);
}
function addDrugRow(data={}){ byId('drugRows').appendChild(createDrugRow(data)); refreshDrugIndexes(); updateTotals(); updateWarning(); }
function refreshDrugIndexes(){ [...byId('drugRows').children].forEach((row,idx)=>row.querySelector('.row-index').textContent=idx+1); }
function updateRowAmount(row){ const qty=toNumber(row.querySelector('.drug-qty').value); const price=toNumber(row.querySelector('.drug-price').value); row.querySelector('.drug-amount').value=formatMoney(qty*price); }
function getDrugRowsData(){ return [...byId('drugRows').children].map(row=>{ updateRowAmount(row); return {active:row.querySelector('.drug-active').value,brand:row.querySelector('.drug-brand').value.trim(),unit:row.querySelector('.drug-unit').value,qty:toNumber(row.querySelector('.drug-qty').value),morning:row.querySelector('.dose-morning').value.trim(),noon:'',night:row.querySelector('.dose-night').value.trim(),price:toNumber(row.querySelector('.drug-price').value)}; }); }
function updateTotals(){ let drugTotal=0; [...byId('drugRows').children].forEach(row=>{ updateRowAmount(row); drugTotal+=toNumber(row.querySelector('.drug-amount').value); }); const service=toNumber(byId('serviceFee').value); byId('drugMoney').textContent=formatMoney(drugTotal); byId('serviceMoney').textContent=formatMoney(service); byId('totalMoney').textContent=formatMoney(drugTotal+service); }
function updateWarning(){ const actives=getDrugRowsData().map(d=>normalizeText(d.active)); const warnings=[]; if(actives.some(x=>x.includes('olanzapine'))&&actives.some(x=>x.includes('quetiapine'))) warnings.push('Olanzapine + Quetiapine có thể làm tăng an thần.'); if(actives.some(x=>x.includes('diazepam'))&&actives.some(x=>x.includes('quetiapine'))) warnings.push('Diazepam + Quetiapine có thể làm tăng buồn ngủ.'); byId('warningBox').textContent=warnings.length?'⚠️ '+warnings.join(' '):'Chưa có cảnh báo thuốc.'; }

function renderStockSheet(){
  const rows=stock.map((item,idx)=>`<div class="stock-row" data-index="${idx}"><input class="mini stock-active" value="${item.active}"><input class="mini stock-brand" value="${item.brand}"><input class="mini stock-unit" value="${item.unit}"><input class="mini stock-usage" value="${item.usage||''}"><input class="mini stock-price" value="${formatMoney(item.price)}"><input class="mini stock-qty" value="${item.qty}"><button class="btn small danger stock-del" type="button">X</button></div>`).join('')+`<div class="stock-row"><input class="mini" id="newStockActive" placeholder="Hoạt chất"><input class="mini" id="newStockBrand" placeholder="Tên thương mại"><input class="mini" id="newStockUnit" placeholder="Đơn vị" value="Viên"><input class="mini" id="newStockUsage" placeholder="Công dụng"><input class="mini" id="newStockPrice" placeholder="Giá"><input class="mini" id="newStockQty" placeholder="Tồn"><button class="btn small primary" id="addStockItemBtn" type="button">+</button></div>`;
  byId('stockRows').innerHTML=rows;
  byId('stockRows').querySelectorAll('.stock-row[data-index]').forEach(row=>{
    const idx=Number(row.dataset.index);
    row.addEventListener('input',()=>{
      stock[idx]={active:row.querySelector('.stock-active').value.trim(),brand:row.querySelector('.stock-brand').value.trim(),unit:row.querySelector('.stock-unit').value.trim(),usage:row.querySelector('.stock-usage').value.trim(),price:toNumber(row.querySelector('.stock-price').value),qty:toNumber(row.querySelector('.stock-qty').value)};
      saveStore(STORAGE_KEYS.stock,stock);
      refreshDrugActiveOptions();
    });
    row.querySelector('.stock-del').addEventListener('click',()=>{
      stock.splice(idx,1);
      saveStore(STORAGE_KEYS.stock,stock);
      renderStockSheet();
      refreshDrugActiveOptions();
    });
  });
  const addBtn=byId('addStockItemBtn');
  if(addBtn) addBtn.onclick=()=>{
    const active=byId('newStockActive').value.trim(),brand=byId('newStockBrand').value.trim();
    if(!active||!brand) return alert('Nhập hoạt chất và tên thương mại trước.');
    stock.push({active,brand,unit:byId('newStockUnit').value.trim()||'Viên',usage:byId('newStockUsage').value.trim(),price:toNumber(byId('newStockPrice').value),qty:toNumber(byId('newStockQty').value)});
    saveStore(STORAGE_KEYS.stock,stock);
    renderStockSheet();
    refreshDrugActiveOptions();
  };
}
function refreshDrugActiveOptions(){ const selected=getDrugRowsData(); byId('drugRows').innerHTML=''; selected.forEach(d=>addDrugRow(d)); }
function calcAge(){ const year=toNumber(byId('birthYear').value); byId('age').value=year?new Date().getFullYear()-year:''; }

function createNewPatient(){
  currentVisitId=null;
  currentPatientKey='';
  byId('visitDate').value=nowDateTimeLocal();
  byId('patientName').value='';
  byId('birthYear').value='';
  byId('age').value='';
  byId('gender').value='Nam';
  byId('addressWard').value='';
  byId('province').value='Đồng Nai';
  byId('phone').value='';
  byId('symptom').value='';
  byId('icdInput').value='';
  byId('followDate').value='';
  byId('serviceFee').value='';
  byId('drugRows').innerHTML='';
  addDrugRow();
  updateTotals();
  updateWarning();
  renderHistory();
}
function getNextVisitNo(patientKey){ const list=visits.filter(v=>v.patientKey===patientKey); return list.length?Math.max(...list.map(v=>v.visitNo||1))+1:1; }
function createNewPrescription(){ const name=byId('patientName').value.trim(),phone=byId('phone').value.trim(),birthYear=byId('birthYear').value.trim(); if(!name||!phone) return alert('Mở hoặc nhập bệnh nhân trước khi tạo toa mới.'); currentPatientKey=patientKeyOf({name,phone,birthYear}); currentVisitId=null; byId('visitDate').value=nowDateTimeLocal(); byId('icdInput').value=''; byId('followDate').value=''; byId('serviceFee').value=''; byId('drugRows').innerHTML=''; addDrugRow(); updateTotals(); updateWarning(); alert(`Đã tạo toa tái khám mới lần ${getNextVisitNo(currentPatientKey)}. Khi lưu sẽ tách thành lần khám riêng.`); }

function getFormData(){
  const gender=byId('gender')?.value||'';
  const patientKey=currentPatientKey||patientKeyOf({name:byId('patientName').value.trim(),phone:byId('phone').value.trim(),birthYear:byId('birthYear').value.trim()});
  const visitNo=currentVisitId?(visits.find(v=>v.id===currentVisitId)?.visitNo||1):getNextVisitNo(patientKey);
  return {id:currentVisitId||cryptoRandom(),patientKey,visitNo,visitDate:byId('visitDate').value,name:byId('patientName').value.trim(),birthYear:byId('birthYear').value.trim(),age:toNumber(byId('age').value),gender,addressWard:byId('addressWard').value.trim(),province:byId('province').value.trim(),phone:byId('phone').value.trim(),symptom:byId('symptom').value.trim(),icdCode:byId('icdInput').value.split(' - ')[0]?.trim()||'',icdText:byId('icdInput').value.trim(),drugs:getDrugRowsData(),followDate:byId('followDate').value,serviceFee:toNumber(byId('serviceFee').value),totalDrug:toNumber(byId('drugMoney').textContent),totalMoney:toNumber(byId('totalMoney').textContent),createdAt:currentVisitId?(visits.find(v=>v.id===currentVisitId)?.createdAt||new Date().toISOString()):new Date().toISOString()};
}

function saveVisit(saveToSupabase({
  name: document.getElementById("name").value,
  birth_year: document.getElementById("birth").value,
  phone: document.getElementById("phone").value,
  address: document.getElementById("address").value,
  diagnosis: document.getElementById("diagnosis").value,
  medicine: document.getElementById("medicine").value,
  note: document.getElementById("note").value
});){
  const data=getFormData();
  if(!data.name) return alert('Nhập họ tên bệnh nhân.');
  if(!data.phone) return alert('Nhập số điện thoại.');
  if(currentVisitId){
    const idx=visits.findIndex(x=>x.id===currentVisitId);
    if(idx>=0) visits[idx]=data;
  }else{
    visits.unshift(data);
    currentVisitId=data.id;
    currentPatientKey=data.patientKey;
  }
  saveStore(STORAGE_KEYS.patients,visits);
  renderPatientList();
  renderHistory();
  renderStats();
  alert(`Đã lưu lần khám số ${data.visitNo}. Lịch sử khám đã được cập nhật.`);
}

function renderPatientList(){
  const kw=normalizeText(byId('searchInput').value);
  const filtered=visits.filter(v=>normalizeText(`${v.name} ${v.phone} ${v.addressWard} ${v.province} ${v.birthYear}`).includes(kw)).sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate));
  const grouped=new Map();
  filtered.forEach(v=>{ const key=v.patientKey||patientKeyOf(v); if(!grouped.has(key)) grouped.set(key,[]); grouped.get(key).push(v); });
  groupedPatients=[...grouped.values()].map(list=>list.sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate)));
  byId('patientListBody').innerHTML=groupedPatients.map(list=>{
    const latest=list[0];
    const visitLabel=list.map(v=>`L${v.visitNo}`).join(', ');
    return `<div class="patient-row ${list.some(v=>v.id===currentVisitId)?'active':''}" data-id="${latest.id}"><div>${formatVisitDate(latest.visitDate)}</div><div><b>${safeText(latest.name)} - ${visitLabel}</b><br><span class="muted">${safeText(latest.phone)} • ${safeText(latest.addressWard)}, ${safeText(latest.province)}</span></div><div>${safeText(String(latest.age||''))}</div><div>${formatMoney(latest.totalMoney)}</div><div>${safeText(latest.icdCode||'')}</div><div><button class="btn small danger del-patient" data-id="${latest.id}" type="button">Xóa</button></div></div>`;
  }).join('')||'<div class="patient-row"><div></div><div>Không có bệnh nhân phù hợp.</div><div></div><div></div><div></div><div></div></div>';
}

function openVisit(id){
  const v=visits.find(x=>x.id===id);
  if(!v) return;
  currentVisitId=v.id;
  currentPatientKey=v.patientKey;
  byId('visitDate').value=v.visitDate||nowDateTimeLocal();
  byId('patientName').value=v.name||'';
  byId('birthYear').value=v.birthYear||'';
  calcAge();
  byId('gender').value=v.gender||'Nam';
  byId('addressWard').value=v.addressWard||'';
  byId('province').value=v.province||'';
  byId('phone').value=v.phone||'';
  byId('symptom').value=v.symptom||'';
  byId('icdInput').value=v.icdText||'';
  byId('followDate').value=v.followDate||'';
  byId('serviceFee').value=formatMoney(v.serviceFee||0);
  byId('drugRows').innerHTML='';
  (v.drugs||[]).forEach(d=>addDrugRow(d));
  if(!(v.drugs||[]).length) addDrugRow();
  updateTotals();
  updateWarning();
  renderPatientList();
  renderHistory();
}

function deleteVisit(id){ if(!confirm('Xóa lần khám này?')) return; visits=visits.filter(x=>x.id!==id); saveStore(STORAGE_KEYS.patients,visits); if(currentVisitId===id) createNewPatient(); renderPatientList(); renderHistory(); renderStats(); }

function renderHistory(){
  const phone=byId('phone').value.trim();
  const rows=phone?visits.filter(v=>v.phone===phone).sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate)):visits.slice(0,10);
  byId('historyRows').innerHTML=rows.map(v=>`<div class="history-row" data-id="${v.id}"><div>${formatVisitDate(v.visitDate)}</div><div>K${String(v.visitNo).padStart(3,'0')}</div><div>${safeText(v.icdText||'')}</div><div>${formatMoney(v.totalMoney)}</div><div><button class="btn small history-open" data-id="${v.id}" type="button">Mở</button></div></div>`).join('')||'<div class="history-row"><div></div><div></div><div>Chưa có lịch sử khám.</div><div></div><div></div></div>';
}

function daysAgo(day){ const d=new Date(); d.setDate(d.getDate()-day); return d; }
function startOfMonth(d){ return new Date(d.getFullYear(),d.getMonth(),1); }
function endOfMonth(d){ return new Date(d.getFullYear(),d.getMonth()+1,1); }
function startOfPrevMonth(d){ return new Date(d.getFullYear(),d.getMonth()-1,1); }
function endOfPrevMonth(d){ return new Date(d.getFullYear(),d.getMonth(),1); }
function rangeCount(list,from,to){ return list.filter(v=>{ const d=new Date(v.createdAt||v.visitDate||Date.now()); return d>=from&&d<to; }).length; }
function profitSum(list,from,to){ return list.filter(v=>{ const d=new Date(v.createdAt||v.visitDate||Date.now()); return d>=from&&d<to; }).reduce((sum,v)=>sum+((v.totalMoney||0)-(v.totalDrug||0)),0); }
function setTrend(el,current,previous,label){ const pct=previous===0?(current>0?100:0):Math.round(((current-previous)/previous)*100); const up=pct>=0; el.className='trend '+(up?'up':'down'); el.textContent=`${up?'▲':'▼'} ${Math.abs(pct)}% so với ${label}`; }
function getRevisitStats(){
  const byPatient=new Map();
  visits.forEach(v=>{
    const key=v.patientKey||patientKeyOf(v);
    if(!byPatient.has(key)) byPatient.set(key,[]);
    byPatient.get(key).push(v);
  });
  let scheduled=0;
  let returned=0;
  let onTime=0;
  let late=0;
  let missed=0;
  byPatient.forEach(list=>{
    const ordered=list.slice().sort((a,b)=>new Date(a.visitDate)-new Date(b.visitDate));
    ordered.forEach((visit,index)=>{
      if(!visit.followDate) return;
      scheduled+=1;
      const followDate=new Date(visit.followDate);
      const later=ordered.slice(index+1).find(next=>new Date(next.visitDate)>=followDate);
      if(later){
        returned+=1;
        const revisitDate=new Date(later.visitDate);
        const diffDays=Math.round((startOfDay(revisitDate)-startOfDay(followDate))/86400000);
        if(diffDays<=0) onTime+=1;
        else late+=1;
      }else{
        missed+=1;
      }
    });
  });
  const rate=scheduled?Math.round((returned/scheduled)*100):0;
  return {scheduled,returned,rate,onTime,late,missed};
}
function renderStats(){
  const now=new Date(),thisWeek=rangeCount(visits,daysAgo(7),now),lastWeek=rangeCount(visits,daysAgo(14),daysAgo(7)),thisMonth=rangeCount(visits,startOfMonth(now),endOfMonth(now)),lastMonth=rangeCount(visits,startOfPrevMonth(now),endOfPrevMonth(now)),thisMonthProfit=profitSum(visits,startOfMonth(now),endOfMonth(now)),lastMonthProfit=profitSum(visits,startOfPrevMonth(now),endOfPrevMonth(now));
  const revisit=getRevisitStats();
  byId('statWeekCount').textContent=thisWeek;
  byId('statMonthCount').textContent=thisMonth;
  byId('statProfit').textContent=formatMoney(thisMonthProfit);
  if(byId('statRevisitRate')) byId('statRevisitRate').textContent=`${revisit.rate}%`;
  if(byId('statRevisitTrend')){
    byId('statRevisitTrend').className='trend '+(revisit.rate>=50?'up':'down');
    byId('statRevisitTrend').textContent=`${revisit.returned}/${revisit.scheduled} ca quay lại`;
  }
  if(byId('statOnTimeCount')) byId('statOnTimeCount').textContent=String(revisit.onTime);
  if(byId('statOnTimeTrend')){
    byId('statOnTimeTrend').className='trend '+(revisit.onTime>0?'up':'down');
    byId('statOnTimeTrend').textContent=`${revisit.onTime} ca đúng hẹn`;
  }
  if(byId('statLateMissedCount')) byId('statLateMissedCount').textContent=String(revisit.late+revisit.missed);
  if(byId('statLateMissedTrend')){
    byId('statLateMissedTrend').className='trend down';
    byId('statLateMissedTrend').textContent=`${revisit.late} trễ, ${revisit.missed} không quay lại`;
  }
  setTrend(byId('statWeekTrend'),thisWeek,lastWeek,'tuần trước');
  setTrend(byId('statMonthTrend'),thisMonth,lastMonth,'tháng trước');
  setTrend(byId('statProfitTrend'),thisMonthProfit,lastMonthProfit,'tháng trước');
}

function buildPrescriptionHtml(){
  const p=getFormData();
  const ageText=p.age?`${safeText(p.age)} tuổi`:'';
  const genderText=safeText(p.gender||'');
  const drugLines=p.drugs.slice(0,4).map((d,i)=>`<div class="rx-rxitem"><div class="top"><div class="rx-label">${i+1}/</div><div class="rx-dots">${safeText(d.brand||d.active||'')}</div><div class="rx-label">${d.qty||''}</div><div class="rx-label">${safeText(d.unit||'viên')}</div></div><div class="sub"><div class="rx-label">sáng ${safeText(d.morning||'')} viên</div><div class="rx-label">tối ${safeText(d.night||'')} viên</div></div></div>`).join('');
  const today=new Date();
  return `<!DOCTYPE html><html><head><title>Toa thuốc tâm thần</title><style>body{font-family:Arial;padding:18px 22px;font-size:14px;color:#1f4f8b}.rx-paper{font-family:Arial,sans-serif;color:#1f4f8b}.rx-header{display:grid;grid-template-columns:1fr 1fr;gap:18px;font-size:14px;font-weight:700}.rx-header div{line-height:1.5}.rx-center-title{text-align:center;font-size:30px;font-weight:700;letter-spacing:.5px;margin:24px 0 18px}.rx-line{display:flex;align-items:flex-end;gap:8px;margin:14px 0;font-size:15px}.rx-label{white-space:nowrap;font-weight:700}.rx-dots{flex:1;border-bottom:2px dotted #8aa2c7;height:18px}.rx-short{width:100px;border-bottom:2px dotted #8aa2c7;height:18px}.rx-rxitem{margin:16px 0 10px;font-size:15px}.rx-rxitem .top,.rx-rxitem .sub{display:flex;align-items:flex-end;gap:8px;margin-top:8px}.rx-sign{margin-top:26px;text-align:right;font-size:15px}.rx-bottom-note{margin-top:36px;text-align:center;font-size:16px;font-style:italic;font-weight:700}.rx-revisit{margin-top:26px;font-size:15px}@page{size:A5 portrait;margin:10mm}</style></head><body><div class="rx-paper"><div class="rx-header"><div><div>BSCKI TRẦN NGUYỄN THANH MINH</div><div>Khám chuyên khoa tâm thần</div><div>Tổ 8 Khu phố Tân Phú, P. Tân Triều, Đồng Nai</div></div><div style="text-align:right"><div>Khám bệnh ngoại trú</div><div>Người bệnh mang theo đơn khi tái khám</div></div></div><div class="rx-center-title">TOA THUỐC</div><div class="rx-line"><div class="rx-label">Họ tên:</div><div class="rx-dots">${safeText(p.name)}</div><div class="rx-label">Tuổi:</div><div class="rx-short">${ageText}</div><div class="rx-label">${genderText}</div></div><div class="rx-line"><div class="rx-label">Địa chỉ:</div><div class="rx-dots">${safeText(p.addressWard)}, ${safeText(p.province)}</div></div><div class="rx-line"><div class="rx-label">Chẩn đoán:</div><div class="rx-dots">${safeText(p.icdText)}</div></div>${drugLines}<div class="rx-sign"><div>Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}</div><div style="font-weight:700;margin-top:8px">Bác sĩ điều trị</div><div style="margin-top:46px;font-weight:700">BSCKI Trần Nguyễn Thanh Minh</div></div><div class="rx-revisit">Tái khám: ${safeText(p.followDate||'')} ngày</div><div class="rx-bottom-note">Khi đi khám lại xin mang theo đơn này</div></div></body></html>`;
}

function showPrescriptionPreview(){
  const html=buildPrescriptionHtml();
  const body=byId('rxBody');
  const doc=new DOMParser().parseFromString(html,'text/html');
  body.innerHTML=doc.body.innerHTML;
  byId('rxModal').classList.remove('hidden');
}

function printPrescription(){
  const html=buildPrescriptionHtml();
  const frame=byId('printFrame');
  const doc=frame.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
  setTimeout(()=>{ try{ frame.contentWindow.focus(); frame.contentWindow.print(); }catch(e){ alert('Không thể mở lệnh in trong môi trường hiện tại.'); console.error(e); } },200);
}

function exportData(){
  const blob=new Blob([JSON.stringify({visits,icdList,stock,clinicInfo},null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='pms-data.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function createDrugRow(data={}){
  const row=document.createElement('div');
  row.className='drug-row';
  row.innerHTML=`<div class="row-index"></div><div><select class="mini drug-active"></select></div><div><input class="mini drug-brand"></div><div><textarea class="mini drug-usage" rows="2" placeholder="Cong dung"></textarea></div><div><select class="mini compact drug-unit"><option>Viên</option><option>Gói</option><option>Ống</option><option>Chai</option></select></div><div><input class="mini qty drug-qty" inputmode="numeric"></div><div><div class="dose-grid"><div class="dose-box"><div class="dose-label">Sáng</div><input class="mini compact dose-morning" list="doseOptions" placeholder="0,5"></div><div class="dose-box"><div class="dose-label">Tối</div><input class="mini compact dose-night" list="doseOptions" placeholder="1"></div></div></div><div><button class="btn small danger del-drug" type="button">X</button></div>`;
  const footer=document.createElement('div');
  footer.className='drug-footer';
  footer.innerHTML=`<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div><label class="label">Giá bán</label><input class="mini drug-price" inputmode="numeric"></div><div><label class="label">Thành tiền</label><input class="mini drug-amount" readonly></div><div></div>`;
  row.appendChild(footer);
  const activeSel=row.querySelector('.drug-active');
  activeSel.innerHTML=stock.map(item=>`<option value="${item.active}">${item.active}</option>`).join('');
  activeSel.value=data.active||stock[0]?.active||'';
  fillDrugRowByActive(row,activeSel.value,data);
  row.querySelector('.drug-unit').value=data.unit||row.querySelector('.drug-unit').value;
  row.querySelector('.drug-qty').value=String(data.qty??30);
  row.querySelector('.dose-morning').value=String(data.morning??'0');
  row.querySelector('.dose-night').value=String(data.night??'1');
  row.querySelector('.drug-price').value=formatMoney(data.price||toNumber(row.querySelector('.drug-price').value));
  row.addEventListener('change',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.addEventListener('input',()=>{ updateTotals(); updateWarning(); });
  row.querySelector('.del-drug').addEventListener('click',()=>{ row.remove(); refreshDrugIndexes(); updateTotals(); updateWarning(); });
  return row;
}

function fillDrugRowByActive(row,active,preset=null){
  const found=stock.find(x=>x.active===active);
  row.querySelector('.drug-brand').value=preset?.brand??found?.brand??'';
  row.querySelector('.drug-usage').value=preset?.usage??found?.usage??'';
  row.querySelector('.drug-unit').value=preset?.unit??found?.unit??'Viên';
  row.querySelector('.drug-price').value=formatMoney(preset?.price??found?.price??0);
  updateRowAmount(row);
}

function getDrugRowsData(){ return [...byId('drugRows').children].map(row=>{ updateRowAmount(row); return {active:row.querySelector('.drug-active').value,brand:row.querySelector('.drug-brand').value.trim(),usage:row.querySelector('.drug-usage').value.trim(),unit:row.querySelector('.drug-unit').value,qty:toNumber(row.querySelector('.drug-qty').value),morning:row.querySelector('.dose-morning').value.trim(),noon:'',night:row.querySelector('.dose-night').value.trim(),price:toNumber(row.querySelector('.drug-price').value)}; }); }

function buildPrescriptionHtml(){
  const p=getFormData();
  const ageText=p.age?`${safeText(p.age)} tuá»•i`:'';
  const genderText=safeText(p.gender||'');
  const drugLines=p.drugs.slice(0,4).map((d,i)=>`<div class="rx-rxitem"><div class="top"><div class="rx-label">${i+1}/</div><div class="rx-dots">${safeText(d.brand||d.active||'')}</div><div class="rx-label">${d.qty||''}</div><div class="rx-label">${safeText(d.unit||'viÃªn')}</div></div><div class="sub"><div class="rx-label">sÃ¡ng ${safeText(d.morning||'')} viÃªn</div><div class="rx-label">tá»‘i ${safeText(d.night||'')} viÃªn</div></div></div>`).join('');
  const today=new Date();
  return `<!DOCTYPE html><html><head><title>Toa thuá»‘c tÃ¢m tháº§n</title><style>body{font-family:Arial;padding:18px 22px;font-size:14px;color:#1f4f8b}.rx-paper{font-family:Arial,sans-serif;color:#1f4f8b}.rx-header{display:grid;grid-template-columns:1fr 1fr;gap:18px;font-size:14px;font-weight:700}.rx-header div{line-height:1.5}.rx-center-title{text-align:center;font-size:30px;font-weight:700;letter-spacing:.5px;margin:24px 0 18px}.rx-line{display:flex;align-items:flex-end;gap:8px;margin:14px 0;font-size:15px}.rx-label{white-space:nowrap;font-weight:700}.rx-dots{flex:1;border-bottom:2px dotted #8aa2c7;height:18px}.rx-short{width:100px;border-bottom:2px dotted #8aa2c7;height:18px}.rx-rxitem{margin:16px 0 10px;font-size:15px}.rx-rxitem .top,.rx-rxitem .sub{display:flex;align-items:flex-end;gap:8px;margin-top:8px}.rx-sign{margin-top:26px;text-align:right;font-size:15px}.rx-bottom-note{margin-top:36px;text-align:center;font-size:16px;font-style:italic;font-weight:700}.rx-revisit{margin-top:26px;font-size:15px}@page{size:A5 portrait;margin:10mm}</style></head><body><div class="rx-paper"><div class="rx-header"><div><div>${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div><div>${safeText(clinicInfo.name||DEFAULT_CLINIC_INFO.name)}</div><div>${safeText(clinicInfo.address||DEFAULT_CLINIC_INFO.address)}</div><div>${safeText(clinicInfo.phone||DEFAULT_CLINIC_INFO.phone)}</div><div>${safeText(clinicInfo.hours||DEFAULT_CLINIC_INFO.hours)}</div></div><div style="text-align:right"><div>KhÃ¡m bá»‡nh ngoáº¡i trÃº</div><div>NgÆ°á»i bá»‡nh mang theo Ä‘Æ¡n khi tÃ¡i khÃ¡m</div></div></div><div class="rx-center-title">TOA THUá»C</div><div class="rx-line"><div class="rx-label">Há» tÃªn:</div><div class="rx-dots">${safeText(p.name)}</div><div class="rx-label">Tuá»•i:</div><div class="rx-short">${ageText}</div><div class="rx-label">${genderText}</div></div><div class="rx-line"><div class="rx-label">Äá»‹a chá»‰:</div><div class="rx-dots">${safeText(p.addressWard)}, ${safeText(p.province)}</div></div><div class="rx-line"><div class="rx-label">Cháº©n Ä‘oÃ¡n:</div><div class="rx-dots">${safeText(p.icdText)}</div></div>${drugLines}<div class="rx-sign"><div>NgÃ y ${today.getDate()} thÃ¡ng ${today.getMonth()+1} nÄƒm ${today.getFullYear()}</div><div style="font-weight:700;margin-top:8px">BÃ¡c sÄ© Ä‘iá»u trá»‹</div><div style="margin-top:46px;font-weight:700">${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div></div><div class="rx-revisit">TÃ¡i khÃ¡m: ${safeText(p.followDate||'')} ngÃ y</div><div class="rx-bottom-note">Khi Ä‘i khÃ¡m láº¡i xin mang theo Ä‘Æ¡n nÃ y</div></div></body></html>`;
}

function createDrugRow(data={}){
  const row=document.createElement('div');
  row.className='drug-row';
  row.innerHTML=`<div class="row-index"></div><div><label class="label">Hoat chat</label><select class="mini drug-active"></select></div><div><label class="label">Ten thuong mai</label><input class="mini drug-brand"></div><div><label class="label">Sang</label><select class="mini compact dose-morning"><option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div><div><label class="label">Toi</label><select class="mini compact dose-night"><option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div><div><label class="label">So luong</label><input class="mini qty drug-qty" inputmode="numeric"></div><div class="drug-usage-wrap"><label class="label">Cong dung</label><textarea class="mini drug-usage" rows="2" placeholder="Cong dung"></textarea></div><div class="drug-unit-wrap"><label class="label">Don vi</label><select class="mini compact drug-unit"><option>Viên</option><option>Gói</option><option>Ống</option><option>Chai</option></select></div><div class="drug-price-wrap"><label class="label">Gia</label><input class="mini drug-price" inputmode="numeric"></div><div class="drug-amount-wrap"><label class="label">Thanh tien</label><input class="mini drug-amount" readonly></div><div class="drug-delete-wrap" style="padding-top:18px"><button class="btn small danger del-drug" type="button">X</button></div>`;
  const activeSel=row.querySelector('.drug-active');
  activeSel.innerHTML=stock.map(item=>`<option value="${item.active}">${item.active}</option>`).join('');
  activeSel.value=data.active||stock[0]?.active||'';
  fillDrugRowByActive(row,activeSel.value,data);
  row.querySelector('.drug-unit').value=data.unit||row.querySelector('.drug-unit').value;
  row.querySelector('.drug-qty').value=String(data.qty??30);
  row.querySelector('.dose-morning').value=String(data.morning??'0');
  row.querySelector('.dose-night').value=String(data.night??'0');
  row.querySelector('.drug-price').value=formatMoney(data.price||toNumber(row.querySelector('.drug-price').value));
  row.addEventListener('change',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.addEventListener('input',()=>{ updateTotals(); updateWarning(); });
  row.querySelector('.del-drug').addEventListener('click',()=>{ row.remove(); refreshDrugIndexes(); updateTotals(); updateWarning(); });
  return row;
}

function fillDrugRowByActive(row,active,preset=null){
  const found=stock.find(x=>x.active===active);
  row.querySelector('.drug-brand').value=preset?.brand??found?.brand??'';
  row.querySelector('.drug-usage').value=preset?.usage??found?.usage??'';
  row.querySelector('.drug-unit').value=preset?.unit??found?.unit??'Viên';
  row.querySelector('.drug-price').value=formatMoney(preset?.price??found?.price??0);
  updateRowAmount(row);
}

function getDrugRowsData(){ return [...byId('drugRows').children].map(row=>{ updateRowAmount(row); return {active:row.querySelector('.drug-active').value,brand:row.querySelector('.drug-brand').value.trim(),usage:row.querySelector('.drug-usage').value.trim(),unit:row.querySelector('.drug-unit').value,qty:toNumber(row.querySelector('.drug-qty').value),morning:row.querySelector('.dose-morning').value.trim(),noon:'',night:row.querySelector('.dose-night').value.trim(),price:toNumber(row.querySelector('.drug-price').value)}; }); }

function renderPatientList(){
  const kw=normalizeText(byId('searchInput').value);
  const filtered=visits.filter(v=>normalizeText(`${v.name} ${v.phone} ${v.addressWard} ${v.province} ${v.birthYear}`).includes(kw)).sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate));
  const grouped=new Map();
  filtered.forEach(v=>{ const key=v.patientKey||patientKeyOf(v); if(!grouped.has(key)) grouped.set(key,[]); grouped.get(key).push(v); });
  const allGrouped=[...grouped.values()].map(list=>list.sort((a,b)=>new Date(b.visitDate)-new Date(a.visitDate)));
  groupedPatients=(!kw&&!showAllPatients)?allGrouped.slice(0,5):allGrouped;
  updateShowAllPatientsButton();
  byId('patientListBody').innerHTML=groupedPatients.map(list=>{
    const latest=list[0];
    const visitLabel=list.map(v=>`L${v.visitNo}`).join(', ');
    const follow=getFollowStatus(latest.followDate);
    return `<div class="patient-row ${list.some(v=>v.id===currentVisitId)?'active':''}" data-id="${latest.id}"><div>${formatVisitDate(latest.visitDate)}</div><div><b>${safeText(latest.name)} - ${visitLabel}</b><br><span class="muted">${safeText(latest.phone)} - ${safeText(latest.addressWard)}, ${safeText(latest.province)}</span></div><div>${safeText(String(latest.age||''))}</div><div>${formatMoney(latest.totalMoney)}</div><div>${safeText(latest.icdCode||'')}</div><div><span class="follow-badge ${follow.cls}">${safeText(follow.label)}</span></div><div><button class="btn small danger del-patient" data-id="${latest.id}" type="button">Xoa</button></div></div>`;
  }).join('')||'<div class="patient-row"><div></div><div>Khong co benh nhan phu hop.</div><div></div><div></div><div></div><div></div><div></div></div>';
}

function buildPrescriptionHtml(){
  const p=getFormData();
  const today=new Date();
  const visitDateText=p.visitDate?new Date(p.visitDate).toLocaleDateString('vi-VN'):'';
  const followText=p.followDate?new Date(p.followDate).toLocaleDateString('vi-VN'):'Chưa hẹn';
  const ageGender=[p.age?`${safeText(p.age)} tuổi`:'',safeText(p.gender||'')].filter(Boolean).join(' - ');
  const rows=(p.drugs||[]).map((d,i)=>`
    <tr>
      <td>${i+1}</td>
      <td><div class="drug-name">${safeText((String(d.brand||'').trim()) || d.active || '')}</div></td>
      <td>${safeText(d.unit||'Vien')}</td>
      <td>${safeText(String(d.qty||''))}</td>
      <td class="dose-cell">
        <span>Sáng: ${safeText(d.morning||'0')}</span>
        <span>Tối: ${safeText(d.night||'0')}</span>
      </td>
    </tr>`).join('');
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Toa thuốc</title>
    <style>
      @page{size:A5 portrait;margin:7mm}
      *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      html,body{width:148mm;height:210mm}
      body{font-family:"Times New Roman",Georgia,serif;background:#fff;margin:0;padding:0;color:#111}
      .sheet{width:134mm;min-height:196mm;margin:0 auto;background:#fff;border:1px solid #111;overflow:hidden}
      .hero{padding:10px 12px;background:#fff;color:#111;border-bottom:1px solid #111}
      .hero-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
      .clinic-name{font-size:18px;font-weight:700;line-height:1.15;margin:0;color:#111}
      .doctor{margin-top:3px;font-size:12px;font-weight:700;color:#111}
      .meta{margin-top:4px;font-size:10.5px;line-height:1.35;color:#111}
      .rx-badge{padding:6px 10px;border:1px solid #111;background:#fff;color:#111;font-weight:800;letter-spacing:.12em;font-family:Arial,sans-serif;font-size:10px}
      .section{padding:8px 10px 6px}
      .patient-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 6px}
      .info{padding:5px 7px;border:1px solid #777;background:#fff}
      .label{font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:#111;font-weight:700}
      .value{margin-top:2px;font-size:11px;font-weight:700;color:#111;line-height:1.15}
      .table-wrap{padding:0 10px 8px}
      table{width:100%;border-collapse:collapse;border:1px solid #111}
      thead th{background:#fff;color:#111;font-size:9.5px;text-align:left;padding:6px 5px;border-bottom:1px solid #111}
      tbody td{padding:5px;border-top:1px solid #999;font-size:10.5px;vertical-align:top;line-height:1.15;color:#111}
      .drug-name{font-weight:700;color:#111;font-size:10.5px;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .dose-cell span{display:block;margin-bottom:1px}
      .footer{display:flex;justify-content:space-between;gap:10px;padding:8px 10px 10px;border-top:1px solid #111;background:#fff}
      .note{flex:1;font-size:10px;line-height:1.35;color:#111}
      .sign{min-width:210px;text-align:center}
      .sign .date{font-size:10px;color:#111}
      .sign .title{margin-top:5px;font-weight:700;font-size:10px;color:#111}
      .sign .name{margin-top:24px;font-weight:700;color:#111;font-size:11px}
      .ornament{height:2px;background:#111}
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="hero">
        <div class="hero-top">
          <div>
            <h1 class="clinic-name">${safeText(clinicInfo.name||DEFAULT_CLINIC_INFO.name)}</h1>
            <div class="doctor">${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div>
            <div class="meta">
              <div>${safeText(clinicInfo.address||DEFAULT_CLINIC_INFO.address)}</div>
              <div>${safeText(clinicInfo.phone||DEFAULT_CLINIC_INFO.phone)}</div>
              <div>${safeText(clinicInfo.hours||DEFAULT_CLINIC_INFO.hours)}</div>
            </div>
          </div>
          <div class="rx-badge">TOA THUỐC</div>
        </div>
      </div>
      <div class="ornament"></div>
      <div class="section">
        <div class="patient-grid">
          <div class="info"><div class="label">Bệnh nhân</div><div class="value">${safeText(p.name||'')}</div></div>
          <div class="info"><div class="label">Ngày khám</div><div class="value">${safeText(visitDateText)}</div></div>
          <div class="info"><div class="label">Tuổi / Giới</div><div class="value">${safeText(ageGender)}</div></div>
          <div class="info"><div class="label">Tái khám</div><div class="value">${safeText(followText)}</div></div>
          <div class="info" style="grid-column:1 / -1"><div class="label">Địa chỉ</div><div class="value">${safeText(`${p.addressWard||''}${p.addressWard&&p.province?', ':''}${p.province||''}${p.phone?' - '+p.phone:''}`)}</div></div>
          <div class="info" style="grid-column:1 / -1"><div class="label">Chẩn đoán</div><div class="value">${safeText(p.icdText||'')}</div></div>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:48px">#</th>
              <th>Thuốc</th>
              <th style="width:78px">Đơn vị</th>
              <th style="width:78px">SL</th>
              <th style="width:150px">Cách dùng</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="5">Chưa có thuốc trong toa.</td></tr>'}</tbody>
        </table>
      </div>
      <div class="footer">
          <div class="note">
          <div><strong>Lưu ý:</strong> Uống thuốc đúng giờ, đúng liều và tái khám theo hẹn.</div>
          <div>Mang theo toa này trong lần tái khám tiếp theo.</div>
        </div>
        <div class="sign">
          <div class="date">Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}</div>
          <div class="title">Bác sĩ điều trị</div>
          <div class="name">CKI: ${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

function buildPrescriptionHtml(){
  const p=getFormData();
  const today=new Date();
  const visitDateText=p.visitDate?new Date(p.visitDate).toLocaleDateString('vi-VN'):'';
  const followText=p.followDate?new Date(p.followDate).toLocaleDateString('vi-VN'):'Chưa hẹn';
  const ageGender=[p.age?`${safeText(p.age)} tuổi`:'',safeText(p.gender||'')].filter(Boolean).join(' - ');
  const rows=(p.drugs||[]).map((d,i)=>`
    <tr>
      <td>${i+1}</td>
      <td><div class="drug-name">${safeText((String(d.brand||'').trim())||d.active||'')}</div></td>
      <td>${safeText(d.unit||'Viên')}</td>
      <td>${safeText(String(d.qty||''))}</td>
      <td class="dose-cell">
        <span>Sáng: ${safeText(d.morning||'0')}</span>
        <span>Tối: ${safeText(d.night||'0')}</span>
      </td>
    </tr>`).join('');
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Toa thuốc</title>
    <style>
      @page{size:A5 portrait;margin:7mm}
      *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      html,body{width:148mm;height:210mm}
      body{font-family:"Times New Roman",Georgia,serif;background:#fff;margin:0;padding:0;color:#111}
      .sheet{width:134mm;min-height:196mm;margin:0 auto;background:#fff;border:1px solid #111;overflow:hidden}
      .hero{padding:10px 12px;background:#fff;color:#111;border-bottom:1px solid #111}
      .hero-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
      .clinic-name{font-size:18px;font-weight:700;line-height:1.15;margin:0;color:#111}
      .doctor{margin-top:3px;font-size:12px;font-weight:700;color:#111}
      .meta{margin-top:4px;font-size:10.5px;line-height:1.35;color:#111}
      .rx-badge{padding:6px 10px;border:1px solid #111;background:#fff;color:#111;font-weight:800;letter-spacing:.12em;font-family:Arial,sans-serif;font-size:10px}
      .section{padding:8px 10px 6px}
      .patient-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 6px}
      .info{padding:5px 7px;border:1px solid #777;background:#fff}
      .label{font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:#111;font-weight:700}
      .value{margin-top:2px;font-size:11px;font-weight:700;color:#111;line-height:1.15}
      .table-wrap{padding:0 10px 8px}
      table{width:100%;border-collapse:collapse;border:1px solid #111}
      thead th{background:#fff;color:#111;font-size:9.5px;text-align:left;padding:6px 5px;border-bottom:1px solid #111}
      tbody td{padding:5px;border-top:1px solid #999;font-size:10.5px;vertical-align:top;line-height:1.15;color:#111}
      .drug-name{font-weight:700;color:#111;font-size:10.5px;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .dose-cell span{display:block;margin-bottom:1px}
      .footer{display:flex;justify-content:space-between;gap:10px;padding:8px 10px 10px;border-top:1px solid #111;background:#fff}
      .note{flex:1;font-size:10px;line-height:1.35;color:#111}
      .sign{min-width:210px;text-align:center}
      .sign .date{font-size:10px;color:#111}
      .sign .title{margin-top:5px;font-weight:700;font-size:10px;color:#111}
      .sign .name{margin-top:24px;font-weight:700;color:#111;font-size:11px}
      .ornament{height:2px;background:#111}
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="hero">
        <div class="hero-top">
          <div>
            <h1 class="clinic-name">${safeText(clinicInfo.name||DEFAULT_CLINIC_INFO.name)}</h1>
            <div class="doctor">${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div>
            <div class="meta">
              <div>${safeText(clinicInfo.address||DEFAULT_CLINIC_INFO.address)}</div>
              <div>${safeText(clinicInfo.phone||DEFAULT_CLINIC_INFO.phone)}</div>
              <div>${safeText(clinicInfo.hours||DEFAULT_CLINIC_INFO.hours)}</div>
            </div>
          </div>
          <div class="rx-badge">TOA THUỐC</div>
        </div>
      </div>
      <div class="ornament"></div>
      <div class="section">
        <div class="patient-grid">
          <div class="info"><div class="label">Bệnh nhân</div><div class="value">${safeText(p.name||'')}</div></div>
          <div class="info"><div class="label">Tuổi / Giới</div><div class="value">${safeText(ageGender)}</div></div>
          <div class="info"><div class="label">Số điện thoại</div><div class="value">${safeText(p.phone||'')}</div></div>
          <div class="info"><div class="label">Tái khám</div><div class="value">${safeText(followText)}</div></div>
          <div class="info" style="grid-column:1 / -1"><div class="label">Địa chỉ</div><div class="value">${safeText(`${p.addressWard||''}${p.addressWard&&p.province?', ':''}${p.province||''}`)}</div></div>
          <div class="info" style="grid-column:1 / -1"><div class="label">Chẩn đoán</div><div class="value">${safeText(p.icdText||'')}</div></div>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:48px">#</th>
              <th>Thuốc</th>
              <th style="width:78px">Đơn vị</th>
              <th style="width:78px">SL</th>
              <th style="width:150px">Cách dùng</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="5">Chưa có thuốc trong toa.</td></tr>'}</tbody>
        </table>
      </div>
      <div class="footer">
        <div class="note">
          <div><strong>Lưu ý:</strong> Uống thuốc đúng giờ, đúng liều và tái khám theo hẹn.</div>
          <div>Mang theo toa này trong lần tái khám tiếp theo.</div>
        </div>
        <div class="sign">
          <div class="date">Ngày ${today.getDate()} tháng ${today.getMonth()+1} năm ${today.getFullYear()}</div>
          <div class="title">Bác sĩ điều trị</div>
          <div class="name">CKI: ${safeText(clinicInfo.doctor||DEFAULT_CLINIC_INFO.doctor)}</div>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

const PSYCH_DRUG_RULES=[
  {key:'clozapine',aliases:['clozapin','clozapine','clomedin'],maxMgPerDay:900,effect:'Clozapine: cảnh báo giảm bạch cầu hạt, co giật, viêm cơ tim, táo bón nặng; cần theo dõi công thức máu và dấu hiệu nhiễm trùng.'},
  {key:'olanzapine',aliases:['olanzapin','olanzapine','nykob','olanxol'],maxMgPerDay:20,effect:'Olanzapine: dễ tăng cân, tăng đường huyết, hội chứng chuyển hóa và buồn ngủ.'},
  {key:'quetiapine',aliases:['quetiapin','quetiapine','seroquel','daquetin'],maxMgPerDay:800,effect:'Quetiapine: cảnh báo an thần, hạ huyết áp tư thế, kéo dài QT và hội chứng chuyển hóa.'},
  {key:'risperidone',aliases:['risperidone','risperidon','agirisdon','risperdal'],maxMgPerDay:16,effect:'Risperidone: lưu ý ngoại tháp, tăng prolactin, cứng cơ và kéo dài QT.'},
  {key:'haloperidol',aliases:['haloperidol','halofar'],maxMgPerDay:20,effect:'Haloperidol: nguy cơ cao ngoại tháp, loạn trương lực, QT kéo dài và hội chứng an thần kinh ác tính.'},
  {key:'levomepromazine',aliases:['levomepromazin','levomepromazine'],maxMgPerDay:300,effect:'Levomepromazine: an thần mạnh, tụt huyết áp tư thế, kháng cholinergic và kéo dài QT.'},
  {key:'chlorpromazine',aliases:['chlorpromazin','chlorpromazine'],maxMgPerDay:800,effect:'Chlorpromazine: an thần mạnh, tụt huyết áp, kéo dài QT và tác dụng kháng cholinergic.'},
  {key:'aripiprazole',aliases:['aripiprazole','abilify'],maxMgPerDay:30,effect:'Aripiprazole: có thể gây bồn chồn, mất ngủ, akathisia; thận trọng khi phối hợp nhiều thuốc chống loạn thần.'},
  {key:'diazepam',aliases:['diazepam','seduxen','valium'],maxMgPerDay:40,effect:'Diazepam: gây buồn ngủ, giảm tập trung, té ngã và ức chế hô hấp khi phối hợp thuốc an thần khác.'},
  {key:'zopiclone',aliases:['zopiclon','zopiclone','phamzopic'],maxMgPerDay:7.5,effect:'Zopiclone: hỗ trợ ngủ, dễ gây lơ mơ sáng hôm sau, té ngã và lệ thuộc nếu dùng kéo dài.'},
  {key:'sulpiride',aliases:['sulpirid','sulpiride','dogtapine'],maxMgPerDay:800,effect:'Sulpiride: có thể gây tăng prolactin, ngoại tháp, buồn ngủ và kéo dài QT.'},
  {key:'clonazepam',aliases:['clonazepam','rivotril'],maxMgPerDay:20,effect:'Clonazepam: buồn ngủ, giảm trí nhớ, té ngã và lệ thuộc thuốc khi dùng kéo dài.'},
  {key:'alprazolam',aliases:['alprazolam','xanax'],maxMgPerDay:4,effect:'Alprazolam: buồn ngủ, lệ thuộc thuốc và nguy cơ cai thuốc nếu ngưng đột ngột.'},
  {key:'lorazepam',aliases:['lorazepam'],maxMgPerDay:10,effect:'Lorazepam: buồn ngủ, suy giảm trí nhớ và tăng nguy cơ té ngã ở người lớn tuổi.'},
  {key:'valproate',aliases:['valproat','valproate','acid valproic','divalproex','depakine'],maxMgPerDay:3000,effect:'Valproate: cảnh báo độc gan, giảm tiểu cầu, run tay và tăng amoniac máu.'},
  {key:'lithium',aliases:['lithium','carbonate lithium'],maxMgPerDay:1800,effect:'Lithium: theo dõi run tay, độc thận, suy giáp, mất nước và dấu hiệu ngộ độc lithium.'},
  {key:'carbamazepine',aliases:['carbamazepin','carbamazepine','tegretol'],maxMgPerDay:1600,effect:'Carbamazepine: nguy cơ hạ natri máu, giảm bạch cầu, chóng mặt và phát ban nặng.'},
  {key:'lamotrigine',aliases:['lamotrigine','lamictal'],maxMgPerDay:400,effect:'Lamotrigine: cảnh báo phát ban nặng/SJS, cần tăng liều từ từ.'},
  {key:'sertraline',aliases:['sertraline','zoloft'],maxMgPerDay:200,effect:'Sertraline: buồn nôn, run, mất ngủ; cảnh giác hội chứng serotonin khi phối hợp thuốc tăng serotonin.'},
  {key:'fluoxetine',aliases:['fluoxetine','prozac'],maxMgPerDay:80,effect:'Fluoxetine: mất ngủ, bồn chồn, hội chứng serotonin và nguy cơ chuyển hưng cảm ở bệnh nhân lưỡng cực.'},
  {key:'paroxetine',aliases:['paroxetine'],maxMgPerDay:60,effect:'Paroxetine: kháng cholinergic hơn các SSRI khác, tăng cân và hội chứng ngưng thuốc.'},
  {key:'escitalopram',aliases:['escitalopram'],maxMgPerDay:20,effect:'Escitalopram: lưu ý kéo dài QT và hội chứng serotonin khi phối hợp thuốc cùng cơ chế.'},
  {key:'venlafaxine',aliases:['venlafaxine'],maxMgPerDay:225,effect:'Venlafaxine: tăng huyết áp, bồn chồn và hội chứng serotonin khi phối hợp thuốc tăng serotonin.'},
  {key:'duloxetine',aliases:['duloxetine'],maxMgPerDay:120,effect:'Duloxetine: buồn nôn, tăng huyết áp nhẹ, độc gan và hội chứng serotonin.'},
  {key:'amitriptyline',aliases:['amitriptylin','amitriptyline'],maxMgPerDay:300,effect:'Amitriptyline: kháng cholinergic mạnh, hạ huyết áp, kéo dài QT và nguy cơ quá liều nguy hiểm.'},
  {key:'clomipramine',aliases:['clomipramine'],maxMgPerDay:250,effect:'Clomipramine: kéo dài QT, co giật và hội chứng serotonin khi phối hợp SSRI/SNRI.'},
  {key:'trihexyphenidyl',aliases:['trihexyphenidyl','artane'],maxMgPerDay:15,effect:'Trihexyphenidyl: khô miệng, bí tiểu, lú lẫn và táo bón; thận trọng ở người lớn tuổi.'}
];

const PSYCH_INTERACTION_RULES=[
  {keys:['clozapine','carbamazepine'],severity:'Nghiêm trọng',message:'Clozapine + Carbamazepine: tăng mạnh nguy cơ suy tủy/giảm bạch cầu, nên tránh phối hợp.'},
  {keys:['clozapine','haloperidol'],severity:'Cao',message:'Clozapine + Haloperidol: tăng nguy cơ ngoại tháp, hội chứng an thần kinh ác tính và độc tính thần kinh.'},
  {keys:['clozapine','diazepam'],severity:'Cao',message:'Clozapine + Benzodiazepine: có thể gây an thần sâu, tụt huyết áp và ức chế hô hấp.'},
  {keys:['clozapine','clonazepam'],severity:'Cao',message:'Clozapine + Benzodiazepine: có thể gây an thần sâu, tụt huyết áp và ức chế hô hấp.'},
  {keys:['clozapine','alprazolam'],severity:'Cao',message:'Clozapine + Benzodiazepine: có thể gây an thần sâu, tụt huyết áp và ức chế hô hấp.'},
  {keys:['clozapine','lorazepam'],severity:'Cao',message:'Clozapine + Benzodiazepine: có thể gây an thần sâu, tụt huyết áp và ức chế hô hấp.'},
  {keys:['olanzapine','diazepam'],severity:'Cao',message:'Olanzapine + Benzodiazepine: tăng buồn ngủ, té ngã và ức chế hô hấp; đặc biệt thận trọng ở người già.'},
  {keys:['olanzapine','clonazepam'],severity:'Cao',message:'Olanzapine + Benzodiazepine: tăng buồn ngủ, té ngã và ức chế hô hấp; đặc biệt thận trọng ở người già.'},
  {keys:['quetiapine','diazepam'],severity:'Cao',message:'Quetiapine + Benzodiazepine: tăng an thần, lú lẫn, chóng mặt và té ngã.'},
  {keys:['quetiapine','clonazepam'],severity:'Cao',message:'Quetiapine + Benzodiazepine: tăng an thần, lú lẫn, chóng mặt và té ngã.'},
  {keys:['levomepromazine','diazepam'],severity:'Cao',message:'Levomepromazine + Benzodiazepine: an thần cộng hợp rất mạnh, tụt huyết áp và té ngã.'},
  {keys:['haloperidol','quetiapine'],severity:'Cao',message:'Haloperidol + Quetiapine: phối hợp hai thuốc chống loạn thần làm tăng QT, ngoại tháp và an thần.'},
  {keys:['haloperidol','olanzapine'],severity:'Cao',message:'Haloperidol + Olanzapine: tăng ngoại tháp, an thần và nguy cơ kéo dài QT.'},
  {keys:['haloperidol','risperidone'],severity:'Cao',message:'Haloperidol + Risperidone: tăng nguy cơ ngoại tháp, cứng cơ và tăng prolactin.'},
  {keys:['risperidone','olanzapine'],severity:'Cao',message:'Risperidone + Olanzapine: đa trị liệu chống loạn thần làm tăng an thần, hội chứng chuyển hóa và ngoại tháp.'},
  {keys:['risperidone','quetiapine'],severity:'Cao',message:'Risperidone + Quetiapine: tăng an thần, hạ huyết áp và gánh nặng đa thuốc chống loạn thần.'},
  {keys:['olanzapine','quetiapine'],severity:'Cao',message:'Olanzapine + Quetiapine: tăng buồn ngủ, tăng cân và hội chứng chuyển hóa.'},
  {keys:['lithium','haloperidol'],severity:'Nghiêm trọng',message:'Lithium + Haloperidol: cảnh giác độc tính thần kinh, lú lẫn, run, cứng cơ và hội chứng an thần kinh ác tính.'},
  {keys:['lithium','risperidone'],severity:'Cao',message:'Lithium + Risperidone: tăng nguy cơ độc tính thần kinh và hội chứng ngoại tháp.'},
  {keys:['lithium','olanzapine'],severity:'Cao',message:'Lithium + Olanzapine: theo dõi run, lú lẫn, mất nước và độc tính thần kinh.'},
  {keys:['lithium','quetiapine'],severity:'Trung bình',message:'Lithium + Quetiapine: tăng buồn ngủ và nguy cơ độc tính thần kinh khi mất nước hoặc dùng liều cao.'},
  {keys:['valproate','clozapine'],severity:'Cao',message:'Valproate + Clozapine: có thể tăng an thần và tăng nguy cơ giảm bạch cầu; cần theo dõi huyết học.'},
  {keys:['valproate','lamotrigine'],severity:'Nghiêm trọng',message:'Valproate + Lamotrigine: làm tăng nồng độ lamotrigine, tăng nguy cơ phát ban nặng/SJS.'},
  {keys:['sertraline','fluoxetine'],severity:'Nghiêm trọng',message:'Phối hợp hai thuốc tăng serotonin: nguy cơ hội chứng serotonin, run, sốt, kích động.'},
  {keys:['sertraline','paroxetine'],severity:'Nghiêm trọng',message:'Phối hợp hai thuốc tăng serotonin: nguy cơ hội chứng serotonin, run, sốt, kích động.'},
  {keys:['sertraline','escitalopram'],severity:'Nghiêm trọng',message:'Phối hợp hai thuốc tăng serotonin: nguy cơ hội chứng serotonin, run, sốt, kích động.'},
  {keys:['sertraline','venlafaxine'],severity:'Nghiêm trọng',message:'SSRI + SNRI: tăng mạnh nguy cơ hội chứng serotonin.'},
  {keys:['sertraline','duloxetine'],severity:'Nghiêm trọng',message:'SSRI + SNRI: tăng mạnh nguy cơ hội chứng serotonin.'},
  {keys:['fluoxetine','escitalopram'],severity:'Nghiêm trọng',message:'Phối hợp hai thuốc tăng serotonin: nguy cơ hội chứng serotonin và kéo dài QT.'},
  {keys:['fluoxetine','venlafaxine'],severity:'Nghiêm trọng',message:'SSRI + SNRI: tăng mạnh nguy cơ hội chứng serotonin.'},
  {keys:['fluoxetine','duloxetine'],severity:'Nghiêm trọng',message:'SSRI + SNRI: tăng mạnh nguy cơ hội chứng serotonin.'},
  {keys:['escitalopram','venlafaxine'],severity:'Nghiêm trọng',message:'Escitalopram + Venlafaxine: tăng nguy cơ hội chứng serotonin và QT kéo dài.'},
  {keys:['escitalopram','amitriptyline'],severity:'Cao',message:'Escitalopram + Amitriptyline: tăng QT và nguy cơ hội chứng serotonin.'},
  {keys:['clomipramine','sertraline'],severity:'Cao',message:'Clomipramine + SSRI: tăng nồng độ clomipramine, co giật, QT kéo dài và hội chứng serotonin.'},
  {keys:['clomipramine','fluoxetine'],severity:'Cao',message:'Clomipramine + SSRI: tăng nồng độ clomipramine, co giật, QT kéo dài và hội chứng serotonin.'},
  {keys:['trihexyphenidyl','clozapine'],severity:'Cao',message:'Trihexyphenidyl + Clozapine: tăng kháng cholinergic, bí tiểu, táo bón và lú lẫn.'},
  {keys:['trihexyphenidyl','olanzapine'],severity:'Trung bình',message:'Trihexyphenidyl + Olanzapine: tăng khô miệng, táo bón, bí tiểu và lú lẫn.'},
  {keys:['trihexyphenidyl','quetiapine'],severity:'Trung bình',message:'Trihexyphenidyl + Quetiapine: tăng tác dụng kháng cholinergic và lú lẫn.'}
];

function getDrugRuleByText(text=''){
  const normalized=normalizeText(text);
  return PSYCH_DRUG_RULES.find(rule=>rule.aliases.some(alias=>normalized.includes(alias)));
}

function extractStrengthMg(active=''){
  const normalized=String(active||'').replace(/,/g,'.');
  const mgMatch=normalized.match(/(\d+(?:\.\d+)?)\s*mg/i);
  if(mgMatch) return Number(mgMatch[1])||0;
  const mcgMatch=normalized.match(/(\d+(?:\.\d+)?)\s*mcg/i);
  if(mcgMatch) return (Number(mcgMatch[1])||0)/1000;
  const gMatch=normalized.match(/(\d+(?:\.\d+)?)\s*g/i);
  if(gMatch) return (Number(gMatch[1])||0)*1000;
  return 0;
}

function getUnitsPerDay(drug){
  return toNumber(drug.morning)+toNumber(drug.noon)+toNumber(drug.night);
}

function summarizeDrugForWarning(drug){
  const rule=getDrugRuleByText(`${drug.active} ${drug.brand}`);
  return {
    ...drug,
    rule,
    ruleKey:rule?.key||'',
    displayName:(String(drug.brand||'').trim())||drug.active||'Thuoc khong ro',
    strengthMg:extractStrengthMg(drug.active),
    unitsPerDay:getUnitsPerDay(drug)
  };
}

function updateWarning(){
  const drugs=getDrugRowsData().map(summarizeDrugForWarning).filter(d=>d.active||d.brand);
  const warnings=[];
  const effects=[];

  const activeRuleKeys=[...new Set(drugs.map(d=>d.ruleKey).filter(Boolean))];
  const antipsychoticKeys=['clozapine','olanzapine','quetiapine','risperidone','haloperidol','levomepromazine','chlorpromazine','aripiprazole'];
  const antipsychoticCount=activeRuleKeys.filter(key=>antipsychoticKeys.includes(key)).length;
  if(antipsychoticCount>=2){
    warnings.push('Đa trị liệu thuốc chống loạn thần: tăng ngoại tháp, kéo dài QT, an thần và hội chứng chuyển hóa; chỉ nên phối hợp khi có chỉ định rõ.');
  }

  PSYCH_INTERACTION_RULES.forEach(rule=>{
    if(rule.keys.every(key=>activeRuleKeys.includes(key))){
      warnings.push(`${rule.severity}: ${rule.message}`);
    }
  });

  const seenEffects=new Set();
  drugs.forEach(drug=>{
    if(drug.rule?.effect && !seenEffects.has(drug.rule.key)){
      effects.push(drug.rule.effect);
      seenEffects.add(drug.rule.key);
    }
    if(drug.rule?.maxMgPerDay && drug.strengthMg>0 && drug.unitsPerDay>0){
      const dailyMg=drug.strengthMg*drug.unitsPerDay;
      if(dailyMg>drug.rule.maxMgPerDay){
        warnings.push(`Vượt liều tối đa: ${drug.displayName} đang ở khoảng ${dailyMg} mg/ngày, cao hơn mức khuyến cáo ${drug.rule.maxMgPerDay} mg/ngày.`);
      }
    }
  });

  const box=byId('warningBox');
  if(!box) return;
  if(!warnings.length && !effects.length){
    box.textContent='Chưa có cảnh báo thuốc.';
    return;
  }
  const segments=[];
  if(warnings.length){
    segments.push(`<div><strong>Cảnh báo phối hợp / liều:</strong></div><div>${warnings.map(s=>`- ${safeText(s)}`).join('<br>')}</div>`);
  }
  if(effects.length){
    segments.push(`<div style="margin-top:8px"><strong>Cảnh báo biến chứng cần theo dõi:</strong></div><div>${effects.map(s=>`- ${safeText(s)}`).join('<br>')}</div>`);
  }
  box.innerHTML=segments.join('');
}

const SYMPTOM_DRUG_PROTOCOLS=[
  {keywords:['kich dong','hung han','la het','cau gat','vat va','kich thich'],suggestions:[
    {match:['haloperidol','halofar'],days:7,morning:'0',night:'1',preferred:'Tối'},
    {match:['diazepam','seduxen'],days:5,morning:'0',night:'1',preferred:'Tối'}
  ]},
  {keywords:['hoang tuong','ao thanh','ao giac','nghi ngo','tam than phan liet','loan than'],suggestions:[
    {match:['risperidone','agirisdon','risperdal'],days:14,morning:'1',night:'1',preferred:'Sáng/Tối'},
    {match:['olanzapine','olanzapin','olanxol','nykob'],days:14,morning:'0',night:'1',preferred:'Tối'}
  ]},
  {keywords:['mat ngu','ngu kem','kho ngu','thuc dem'],suggestions:[
    {match:['zopiclon','phamzopic'],days:7,morning:'0',night:'1',preferred:'Tối'},
    {match:['quetiapine','seroquel','daquetin'],days:7,morning:'0',night:'1',preferred:'Tối'}
  ]},
  {keywords:['lo au','hoang so','cang thang','bon chon'],suggestions:[
    {match:['diazepam','seduxen'],days:7,morning:'0.5',night:'0.5',preferred:'Sáng/Tối'},
    {match:['sertraline','sertralin','asentra','zoloman'],days:30,morning:'1',night:'0',preferred:'Sáng'}
  ]},
  {keywords:['tram cam','chan nan','giam khi sac','met moi tinh than'],suggestions:[
    {match:['sertraline','sertralin','asentra','zoloman'],days:30,morning:'1',night:'0',preferred:'Sáng'},
    {match:['quetiapine xr','seroquel xr','quetiapine','seroquel'],days:30,morning:'0',night:'1',preferred:'Tối'}
  ]},
  {keywords:['hung cam','tang dong','noi nhieu','giam ngu','khoe bat thuong'],suggestions:[
    {match:['olanzapine','olanzapin','olanxol','nykob'],days:14,morning:'0',night:'1',preferred:'Tối'},
    {match:['valproat','valproate','depakine','delekine','dalekine'],days:14,morning:'1',night:'1',preferred:'Sáng/Tối'}
  ]},
  {keywords:['ngoai thap','run tay','cung co','van dong cham'],suggestions:[
    {match:['trihexyphenidyl','trihex','artane','danapha-trihex'],days:10,morning:'1',night:'1',preferred:'Sáng/Tối'}
  ]}
];

function isPlaceholderDrugRow(drug){
  if(!drug) return true;
  const firstStock=stock[0]||{};
  const active=(drug.active||'').trim();
  const brand=(drug.brand||'').trim();
  const qty=toNumber(drug.qty);
  const morning=String(drug.morning??'').trim();
  const night=String(drug.night??'').trim();
  return active===String(firstStock.active||'').trim() && brand===String(firstStock.brand||'').trim() && qty===30 && (morning===''||morning==='0') && (night===''||night==='0');
}

function findStockSuggestion(matchers=[]){
  const norms=matchers.map(x=>normalizeText(x));
  return stock.find(item=>{
    const hay=normalizeText(`${item.active||''} ${item.brand||''}`);
    return norms.some(token=>hay.includes(token));
  })||null;
}

function queueSymptomDrugSuggestions(){
  clearTimeout(symptomSuggestTimer);
  symptomSuggestTimer=setTimeout(applySymptomDrugSuggestions,350);
}

function computeSuggestedQty(suggestion){
  if(toNumber(suggestion.qty)>0) return toNumber(suggestion.qty);
  const unitsPerDay=toNumber(suggestion.morning)+toNumber(suggestion.noon)+toNumber(suggestion.night);
  const days=toNumber(suggestion.days)||30;
  const qty=Math.ceil((unitsPerDay||1)*days);
  return qty>0?qty:30;
}

function applySymptomDrugSuggestions(){
  const symptomText=normalizeText(byId('symptom')?.value||'');
  if(!symptomText) return;
  const protocols=SYMPTOM_DRUG_PROTOCOLS.filter(group=>group.keywords.some(keyword=>symptomText.includes(normalizeText(keyword))));
  if(!protocols.length) return;

  const currentDrugs=getDrugRowsData();
  const canReplace=!currentDrugs.length || (currentDrugs.length===1 && isPlaceholderDrugRow(currentDrugs[0]));
  const existingKeys=new Set(currentDrugs.map(d=>normalizeText(`${d.active||''}|${d.brand||''}`)));
  const additions=[];

  protocols.forEach(protocol=>{
    protocol.suggestions.forEach(suggestion=>{
      const found=findStockSuggestion(suggestion.match);
      if(!found) return;
      const key=normalizeText(`${found.active||''}|${found.brand||''}`);
      if(existingKeys.has(key)) return;
      existingKeys.add(key);
      additions.push({
        active:found.active,
        brand:found.brand,
        usage:found.usage||'',
        unit:found.unit||'Viên',
        qty:computeSuggestedQty(suggestion),
        morning:String(suggestion.morning??'0'),
        noon:String(suggestion.noon??'0'),
        night:String(suggestion.night??'0'),
        price:found.price||0
      });
    });
  });

  if(!additions.length) return;
  if(canReplace){
    byId('drugRows').innerHTML='';
  }
  additions.forEach(drug=>addDrugRow(drug));
  updateTotals();
  updateWarning();
}

function ensureDrugActiveDatalist(){
  let list=byId('drugActiveOptions');
  if(!list){
    list=document.createElement('datalist');
    list.id='drugActiveOptions';
    document.body.appendChild(list);
  }
  list.innerHTML=stock.map(item=>`<option value="${safeText(item.active)}"></option>`).join('');
}

function createDrugRow(data={}){
  ensureDrugActiveDatalist();
  const row=document.createElement('div');
  row.className='drug-row';
  row.innerHTML=`<div class="row-index"></div><div><label class="label">Hoat chat</label><input class="mini drug-active" list="drugActiveOptions" placeholder="Chon hoac nhap tay"></div><div><label class="label">Ten thuong mai</label><input class="mini drug-brand"></div><div><label class="label">Sang</label><select class="mini compact dose-morning"><option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div><div><label class="label">Toi</label><select class="mini compact dose-night"><option value="0">0</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select></div><div><label class="label">So luong</label><input class="mini qty drug-qty" inputmode="numeric"></div><div class="drug-usage-wrap"><label class="label">Cong dung</label><textarea class="mini drug-usage" rows="2" placeholder="Cong dung"></textarea></div><div class="drug-unit-wrap"><label class="label">Don vi</label><select class="mini compact drug-unit"><option>Viên</option><option>Gói</option><option>Ống</option><option>Chai</option></select></div><div class="drug-price-wrap"><label class="label">Gia</label><input class="mini drug-price" inputmode="numeric"></div><div class="drug-amount-wrap"><label class="label">Thanh tien</label><input class="mini drug-amount" readonly></div><div class="drug-delete-wrap" style="padding-top:18px"><button class="btn small danger del-drug" type="button">X</button></div>`;
  const activeInput=row.querySelector('.drug-active');
  activeInput.value=data.active||stock[0]?.active||'';
  fillDrugRowByActive(row,activeInput.value,data);
  row.querySelector('.drug-unit').value=data.unit||row.querySelector('.drug-unit').value;
  row.querySelector('.drug-qty').value=String(data.qty??30);
  row.querySelector('.dose-morning').value=String(data.morning??'0');
  row.querySelector('.dose-night').value=String(data.night??'0');
  row.querySelector('.drug-price').value=formatMoney(data.price||toNumber(row.querySelector('.drug-price').value));
  row.addEventListener('change',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.addEventListener('input',e=>{ if(e.target.classList.contains('drug-active')) fillDrugRowByActive(row,e.target.value); updateTotals(); updateWarning(); });
  row.querySelector('.del-drug').addEventListener('click',()=>{ row.remove(); refreshDrugIndexes(); updateTotals(); updateWarning(); });
  return row;
}

function fillDrugRowByActive(row,active,preset=null){
  const found=stock.find(x=>normalizeText(x.active)===normalizeText(active));
  const brandInput=row.querySelector('.drug-brand');
  const usageInput=row.querySelector('.drug-usage');
  const unitInput=row.querySelector('.drug-unit');
  const priceInput=row.querySelector('.drug-price');
  if(preset){
    brandInput.value=preset.brand??found?.brand??'';
    usageInput.value=preset.usage??found?.usage??'';
    unitInput.value=preset.unit??found?.unit??'Viên';
    priceInput.value=formatMoney(preset.price??found?.price??0);
  }else if(found){
    if(!brandInput.value.trim()) brandInput.value=found.brand??'';
    if(!usageInput.value.trim()) usageInput.value=found.usage??'';
    unitInput.value=found.unit??'Viên';
    priceInput.value=formatMoney(found.price??0);
  }else{
    if(!usageInput.value.trim()) usageInput.value='';
    if(!brandInput.value.trim()) brandInput.value='';
    if(!unitInput.value) unitInput.value='Viên';
    if(!priceInput.value.trim()) priceInput.value='0';
  }
  updateRowAmount(row);
}

console.assert(typeof addDrugRow==='function','addDrugRow missing');
console.assert(typeof printPrescription==='function','printPrescription missing');
console.assert(createDrugRow({}).querySelectorAll('.dose-night').length===1,'duplicate dose-night input');
updateWarning();
init();
const GOOGLE_SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbxRzqvkbrFXaoSlg1S8BwXLglEhA4fHPNKpuXfHDEpF9XIpKOIRvqlGc4-1f3T5KTZK2g/exec";

async function saveToGoogleSheets(data) {
  try {
    await fetch(GOOGLE_SHEETS_API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("Lỗi gửi dữ liệu:", err);
  }
}
// ===== SUPABASE CONFIG =====
const SUPABASE_URL = "https://aimbdbvnwkerfrczdafy.supabase.co";
const SUPABASE_KEY = "DAN_PUBLISHABLE_KEY_VAO_DAY";

const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
script.onload = () => {
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  window.saveToSupabase = async function(data) {
    const { error } = await supabase
      .from("visits")
      .insert([data]);

    if (error) {
      console.error("Lỗi lưu:", error);
      alert("Lưu thất bại!");
    } else {
      console.log("Lưu thành công!");
    }
  };
};
document.head.appendChild(script);
