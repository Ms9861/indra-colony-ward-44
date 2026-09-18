const API_URL='https://script.google.com/macros/s/AKfycbzlzY7ESVKgJ_yjm2yKHorUM8szJYJdcZt0vBZBEMM7h8P_0X63RkPOPWncqx2XtZyT/exec';
const ADMIN_PIN='2580'; // Must match ADMIN_PIN in your Apps Script.
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const fmt=t=>t?new Date(t).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}):'—';
let filter='All';

async function request(body){
  const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)});
  const text=await r.text(); let j; try{j=JSON.parse(text)}catch{throw new Error('Invalid response from Google Apps Script')}
  if(!j.ok) throw new Error(j.message||'Request failed'); return j;
}
function login(){
  if($('loginPin').value===ADMIN_PIN){sessionStorage.setItem('ward44_login','1');$('loginOverlay').classList.add('hidden');$('dashboardContent').classList.remove('hidden');load();}
  else $('loginError').textContent='Incorrect PIN. Please try again.';
}
$('loginBtn').onclick=login;$('loginPin').onkeydown=e=>{if(e.key==='Enter')login()};
$('logoutBtn').onclick=e=>{e.preventDefault();sessionStorage.removeItem('ward44_login');location.reload()};

document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;load()});
$('refreshBtn').onclick=load;

async function load(){
  const list=$('dashboardList'); list.innerHTML='<div class="loading-note">Loading complaints…</div>';
  let all=[];
  try{const j=await request({action:'list',pin:ADMIN_PIN});all=j.complaints||[];}
  catch(e){list.innerHTML='<div class="result">Unable to load complaints. Check that your Apps Script deployment is active and the Parishad PIN is correct.</div>';return}
  const shown=filter==='All'?all:all.filter(x=>x.status===filter);
  $('dashTotal').textContent=all.length;$('dashOpen').textContent=all.filter(x=>x.status!=='Solved').length;$('dashSolved').textContent=all.filter(x=>x.status==='Solved').length;
  list.innerHTML=shown.length?shown.map(c=>{
    const id=esc(c.complaintId||'');
    const statusClass=c.status==='Solved'?'solved':c.status==='In Progress'?'progress':'registered';
    const map=c.latitude&&c.longitude?`<a class="map" target="_blank" href="https://www.google.com/maps?q=${encodeURIComponent(c.latitude+','+c.longitude)}">Open GPS location ↗</a>`:'';
    return `<article class="dash-item"><div><div class="complaint-id">${id}</div><h4>${esc(c.category)}</h4><p><b>Resident:</b> ${esc(c.name)} · ${esc(c.mobile)}<br><b>Location:</b> ${esc(c.location)}<br><b>Registered:</b> ${fmt(c.registeredAt)}<br><b>Problem:</b> ${esc(c.description)}</p><div class="dash-meta">${map}${c.latitude&&c.longitude?' · GPS captured':''}</div></div><div class="status-control"><span class="badge ${statusClass}">${esc(c.status)}</span><select onchange="changeStatus('${id}',this.value)"><option ${c.status==='Registered'?'selected':''}>Registered</option><option ${c.status==='In Progress'?'selected':''}>In Progress</option><option ${c.status==='Solved'?'selected':''}>Solved</option></select></div></article>`;
  }).join(''):'<div class="result">No complaints found for this filter.</div>';
}

window.changeStatus=async(id,status)=>{
  try{const j=await request({action:'status',complaintId:id,status,pin:ADMIN_PIN});if(!j.ok)throw new Error(j.message||'Status update failed');await load();}
  catch(e){alert(e.message||'Status could not be updated.');await load();}
};

if(sessionStorage.getItem('ward44_login')==='1'){ $('loginOverlay').classList.add('hidden');$('dashboardContent').classList.remove('hidden');load(); }
