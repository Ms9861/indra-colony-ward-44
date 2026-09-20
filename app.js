const API_URL = 'https://script.google.com/macros/s/AKfycbwOBIZ5LoTCMbiO09_HPM5W74H-9fQ_QtrBNlhWKXdksRxgNkG3NHeXhvcJvXCpHFr7EQ/exec';
const WARD_WHATSAPP = '917240610313'; // Replace with the Ward Parishad WhatsApp number.
let imageFiles = [], videoFile = null;

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const fmt = t => t ? new Date(t).toLocaleString('en-IN', {dateStyle:'medium', timeStyle:'short'}) : '—';

async function apiPost(body){
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const r = await fetch(API_URL, {
      method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'},
      body:JSON.stringify(body), signal:controller.signal
    });
    const text = await r.text();
    let data; try { data = JSON.parse(text); } catch { throw new Error('Google Sheets backend returned an invalid response.'); }
    if (!data.ok) throw new Error(data.message || 'Request failed.');
    return data;
  } finally { clearTimeout(timer); }
}

async function apiGet(params){
  const u = new URL(API_URL);
  Object.entries(params).forEach(([k,v]) => u.searchParams.set(k,v));
  const r = await fetch(u.toString(), {cache:'no-store'});
  const text = await r.text();
  let data; try { data = JSON.parse(text); } catch { throw new Error('Google Sheets backend returned an invalid response.'); }
  if (!data.ok) throw new Error(data.message || 'Request failed.');
  return data;
}

function showFiles(){
  $('imageName').textContent = imageFiles.length ? `${imageFiles.length} file(s) selected` : 'No files chosen';
  $('videoName').textContent = videoFile ? videoFile.name : 'No file chosen';
  const box = $('mediaPreview'); box.innerHTML = '';
  imageFiles.forEach(f => { const u=URL.createObjectURL(f); box.innerHTML += `<img src="${u}" alt="Issue image preview">`; });
  if(videoFile){ const u=URL.createObjectURL(videoFile); box.innerHTML += `<video src="${u}" controls></video>`; }
}

$('imageInput')?.addEventListener('change', e => { imageFiles=[...e.target.files]; showFiles(); });
$('videoInput')?.addEventListener('change', e => { videoFile=e.target.files[0]||null; showFiles(); });

function captureGPS(){
  const s = $('gpsStatus');
  const btn = $('getGps');
  if(!navigator.geolocation){ s.textContent='GPS is not supported on this device/browser.'; return; }
  btn.disabled = true; btn.textContent='Capturing…'; s.textContent='Requesting your location…';
  navigator.geolocation.getCurrentPosition(p=>{
    const lat=p.coords.latitude, lng=p.coords.longitude, acc=Math.round(p.coords.accuracy);
    $('latitude').value=lat.toFixed(6); $('longitude').value=lng.toFixed(6); $('gpsAccuracy').value=acc;
    s.textContent=`GPS captured • accuracy ±${acc} m`;
    const link=$('gpsMapLink');
    link.href=`https://www.google.com/maps?q=${encodeURIComponent(lat+','+lng)}`;
    link.classList.remove('hidden');
    btn.disabled=false; btn.textContent='Update My Location';
  },err=>{
    const msg = err.code===1 ? 'Location permission denied. Allow location access and try again.' : err.code===2 ? 'Location unavailable. Please move to an open area and try again.' : 'Location request timed out. Try again.';
    s.textContent=msg; btn.disabled=false; btn.textContent='Try GPS Again';
  },{enableHighAccuracy:true,timeout:15000,maximumAge:0});
}
$('getGps')?.addEventListener('click', captureGPS);

$('complaintForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.submitter || $('submitBtn');
  const oldText = btn.textContent;
  btn.disabled = true; btn.textContent = 'Registering…';
  const fd = new FormData(e.target);
  const payload = {
    action:'create', name:fd.get('name'), mobile:fd.get('mobile'), location:fd.get('location'),
    category:fd.get('category'), priority:'Normal', description:fd.get('description'),
    latitude:fd.get('latitude') || '', longitude:fd.get('longitude') || '', gpsAccuracy:fd.get('gpsAccuracy') || ''
  };
  try {
    const result = await apiPost(payload);
    $('newId').textContent = result.complaintId;
    $('successBox').classList.remove('hidden');
    e.target.classList.add('hidden');
    renderRecent();
    window.scrollTo({top:$('register').offsetTop-20, behavior:'smooth'});
    if(!WARD_WHATSAPP.includes('X')){
      const text = ['JAN SEVA YOJANA - WARD NO. 44','New Citizen Issue','Complaint ID: '+result.complaintId,'Parishad: Moinuddin Shaikh','Resident: '+payload.name,'Mobile: '+payload.mobile,'Location: '+payload.location,'Category: '+payload.category,'Problem: '+payload.description,'GPS: '+(payload.latitude&&payload.longitude?payload.latitude+', '+payload.longitude:'Not captured'),'Status: Registered','Your Problem will solve Within 3 to 7 Days.'].join('\n');
      window.open(`https://wa.me/${WARD_WHATSAPP}?text=${encodeURIComponent(text)}`,'_blank');
    }
  } catch(err) {
    console.error(err);
    alert(err.name === 'AbortError' ? 'The server took too long to respond. Please try again.' : (err.message || 'Complaint could not be registered. Please try again.'));
  } finally { btn.disabled=false; btn.textContent=oldText; }
});

$('newComplaint')?.addEventListener('click',()=>{
  $('successBox').classList.add('hidden'); $('complaintForm').classList.remove('hidden'); $('complaintForm').reset();
  imageFiles=[]; videoFile=null; showFiles();
  if($('gpsStatus')) $('gpsStatus').textContent='Location not captured';
  if($('gpsMapLink')) $('gpsMapLink').classList.add('hidden');
  window.scrollTo({top:$('register').offsetTop-20,behavior:'smooth'});
});

$('waChat')?.addEventListener('click',e=>{
  e.preventDefault();
  if(WARD_WHATSAPP.includes('X')) { alert('Please set the Ward WhatsApp number in app.js first.'); return; }
  window.open(`https://wa.me/${WARD_WHATSAPP}?text=${encodeURIComponent('Hello Moinuddin Shaikh, I want to register an issue for Ward No. 44, Indra Colony, Pali.')}`,'_blank');
});

$('trackBtn')?.addEventListener('click', async()=>{
  const id=$('trackId').value.trim().toUpperCase(), box=$('trackResult');
  if(!id){box.innerHTML='<div class="result">Please enter a Complaint ID.</div>';return;}
  box.innerHTML='<div class="result">Checking status…</div>';
  try{
    const j=await apiGet({action:'track',id});
    const c=j.complaint;
    box.innerHTML=`<div class="result"><b>${esc(c.complaintId)}</b> · ${esc(c.category)}<br>${esc(c.location)}<br>Status: <strong>${esc(c.status)}</strong><br>Registered: ${fmt(c.registeredAt)}${c.latitude&&c.longitude?`<br><a class="map" target="_blank" href="https://www.google.com/maps?q=${encodeURIComponent(c.latitude+','+c.longitude)}">Open GPS location ↗</a>`:''}<br><br>Your Problem will solve Within 3 to 7 Days.</div>`;
  }catch(err){ console.error(err); box.innerHTML='<div class="result">Unable to check status right now. Please try again.</div>'; }
});

async function renderRecent(){
  const box=$('recentList');
  if(!box) return;
  box.innerHTML='<div class="recent-item"><small>Loading recent complaints…</small></div>';
  try{
    const j=await apiGet({action:'recent',limit:'5'});
    const list=j.complaints||[];
    if(!list.length){ box.innerHTML='<div class="recent-item"><small>No complaints registered yet.</small></div>'; return; }
    box.innerHTML=list.map(c=>{
      const cls=c.status==='Solved'?'solved':c.status==='In Progress'?'progress':'registered';
      return `<div class="recent-item"><div><b>${esc(c.complaintId)}</b><small>${esc(c.category)} · ${esc(c.location)}</small><small>${fmt(c.registeredAt)}</small></div><span class="badge ${cls}">${esc(c.status)}</span></div>`;
    }).join('');
  }catch(err){ console.error(err); box.innerHTML='<div class="recent-item"><small>Recent complaints are temporarily unavailable.</small></div>'; }
}
$('viewAll')?.addEventListener('click',renderRecent);
renderRecent();
