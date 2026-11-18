const S={
Hair:[["Cut & style","Wash, cut and blow-dry","45 min",35],["Colour (full)","Single-process colour","2 h",75],["Balayage / highlights","Hand-painted lightness","3 h",130],["Keratin treatment","Smoothing, frizz-free","2.5 h",150],["Bridal & updo","Occasion styling","1.5 h",80]],
Skin:[["Signature facial","Cleanse, exfoliate, mask","60 min",60],["Hydra glow facial","Deep hydration boost","75 min",85],["Anti-ageing facial","Firming and renewal","75 min",95],["Back cleanse","Deep-clean treatment","45 min",50]],
Nails:[["Classic manicure","Shape, cuticle care, polish","40 min",25],["Gel manicure","Long-lasting shine","55 min",35],["Spa pedicure","Soak, scrub, massage","60 min",40],["Nail art","Per set, custom design","30 min",20]],
Lashes:[["Lash lift & tint","Natural curl, 6–8 weeks","50 min",45],["Classic lash extensions","Full set","2 h",90],["Brow shape & tint","Defined, natural arches","30 min",25]],
Body:[["Relaxing massage","Full body, 60 minutes","60 min",70],["Waxing – legs","Full leg","40 min",35],["Waxing – underarm","Quick and smooth","15 min",12],["Spray tan","Streak-free glow","30 min",30]]};
const G=[["#f3c9d2","#c76b86"],["#e9c9a8","#b9783f"],["#d6c3ee","#8461b8"],["#c4e0d6","#4f9a85"],["#f6d9a8","#d49a2e"],["#f2b8b0","#c45a4d"]];
const ICON={Hair:"✂️",Skin:"🌸",Nails:"💅",Lashes:"👁️",Body:"🌿"};
const TEAM=[["Sofia","Creative director · Hair","#c76b86"],["Daniel","Colour specialist","#8461b8"],["Amira","Skin therapist","#4f9a85"],["Lena","Nail artist","#d49a2e"],["Marta","Lash & brow expert","#c45a4d"]];
const TIMES=["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
const CONFIG={email:"enkeleanaramaja38@gmail.com",whatsapp:"",endpoint:"https://formspree.io/f/xyewjlar"}; // email: where requests go; whatsapp: digits only, e.g. 38344123456; endpoint: form-service URL (self-hosted only)
function links(subject,body){const e=`<a class="btn" href="mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}">✉️ Send by email</a>`;const w=CONFIG.whatsapp?` <a class="btn ghost" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(body)}">WhatsApp</a>`:"";return `<div class="cta" style="justify-content:center;margin:14px 0">${e}${w}</div>`}
async function post(data){if(!CONFIG.endpoint)return false;try{const r=await fetch(CONFIG.endpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)});return r.ok}catch(_){return false}}
const $=id=>document.getElementById(id);
const cats=Object.keys(S);let cat=cats[0];
function drawTabs(){$("tabs").innerHTML=cats.map(c=>`<button class="tab ${c===cat?"on":""}" data-c="${c}">${ICON[c]} ${c}</button>`).join("");
$("svcs").innerHTML=S[cat].map(s=>`<div class="svc"><div><h3>${s[0]}</h3><small>${s[1]} · ${s[2]}</small></div><div class="price">$${s[3]}<button data-s="${s[0]}">Book</button></div></div>`).join("")}
$("tabs").onclick=e=>{const c=e.target.closest("[data-c]");if(c){cat=c.dataset.c;drawTabs()}};
$("svcs").onclick=e=>{const b=e.target.closest("[data-s]");if(b){showForm("b");$("bs").value=b.dataset.s;sum();location.hash="book"}};
drawTabs();
const items=[];cats.forEach(c=>{for(let i=0;i<3;i++)items.push({c,t:S[c][i%S[c].length][0],g:G[items.length%G.length]})});
let gf="All";
function drawG(){$("gtabs").innerHTML=["All",...cats].map(c=>`<button class="tab ${c===gf?"on":""}" data-g="${c}">${c}</button>`).join("");
$("grid").innerHTML=items.map((it,i)=>[it,i]).filter(([it])=>gf==="All"||it.c===gf).map(([it,i])=>`<button class="tile" data-i="${i}" style="background:linear-gradient(145deg,${it.g[0]},${it.g[1]})" aria-label="${it.t}">${ICON[it.c]}<span>${it.t}</span></button>`).join("")}
$("gtabs").onclick=e=>{const b=e.target.closest("[data-g]");if(b){gf=b.dataset.g;drawG()}};
$("grid").onclick=e=>{const t=e.target.closest("[data-i]");if(!t)return;const it=items[t.dataset.i];
$("lbbig").style.background=`linear-gradient(145deg,${it.g[0]},${it.g[1]})`;$("lbbig").innerHTML=ICON[it.c]+`<p>${it.t}</p>`;$("lb").classList.add("on")};
$("lb").onclick=e=>{if(e.target.id!=="lbbig")$("lb").classList.remove("on")};
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("lb").classList.remove("on")});
drawG();
$("teamgrid").innerHTML=TEAM.map(t=>`<div class="card"><div class="av" style="background:${t[2]}">${t[0][0]}</div><h3>${t[0]}</h3><p>${t[1]}</p></div>`).join("");
$("bs").innerHTML='<option value="">Choose a service…</option>'+cats.map(c=>`<optgroup label="${c}">${S[c].map(s=>`<option>${s[0]}</option>`).join("")}</optgroup>`).join("");
$("bst").innerHTML='<option>Any available</option>'+TEAM.map(t=>`<option>${t[0]}</option>`).join("");
const today=new Date();const iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
$("bd").min=iso(today);
let time="";
function price(n){for(const c of cats)for(const s of S[c])if(s[0]===n)return s}
function sum(){const s=price($("bs").value);$("sumn").textContent=s?`${s[0]} · ${s[2]}`:"Select a service";$("sump").textContent=s?"$"+s[3]:""}
function drawSlots(){const v=$("bd").value;const off=!v;const d=v?new Date(v+"T12:00:00"):null;
if(d&&d.getDay()===0){$("slots").innerHTML='<span style="color:var(--mute);font-size:.9rem">We’re closed on Sundays. Please pick another day.</span>';time="";return}
const sat=d&&d.getDay()===6;
$("slots").innerHTML=TIMES.map((t,i)=>{let dis=off||(sat&&i>8);
if(d&&iso(d)===iso(today)&&parseInt(t)<=today.getHours())dis=true;
if(d&&(d.getDate()+i*3)%5===0)dis=true;
return `<button type="button" class="slot ${t===time?"on":""}" data-t="${t}" ${dis?"disabled":""}>${t}</button>`}).join("");
if(time&&!$("slots").querySelector(".on"))time=""}
$("bs").onchange=sum;$("bd").onchange=()=>{time="";drawSlots()};
$("slots").onclick=e=>{const b=e.target.closest("[data-t]");if(b&&!b.disabled){time=b.dataset.t;drawSlots()}};
drawSlots();
function showForm(w){$("bform").hidden=w!=="b";$("cform").hidden=w!=="c";$("done").hidden=true;$("tb1").classList.toggle("on",w==="b");$("tb2").classList.toggle("on",w==="c")}
$("tb1").onclick=()=>showForm("b");$("tb2").onclick=()=>showForm("c");
function chk(rules){let ok=true;rules.forEach(([id,test,msg])=>{const el=$("e_"+id);const bad=!test();el.textContent=bad?msg:"";if(bad)ok=false});return ok}
const em=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function esc(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
$("bform").onsubmit=e=>{e.preventDefault();
const d=$("bd").value;const sun=d&&new Date(d+"T12:00:00").getDay()===0;
if(!chk([["bs",()=>$("bs").value,"Please choose a service."],["bd",()=>d&&!sun,sun?"We’re closed on Sundays.":"Please pick a date."],["t",()=>time,"Please select a time."],["bn",()=>$("bn").value.trim().length>1,"Please enter your name."],["bp",()=>/^[+\d][\d\s()-]{6,}$/.test($("bp").value.trim()),"Enter a valid phone number."],["be",()=>em($("be").value.trim()),"Enter a valid email."]]))return;
const s=price($("bs").value);const dt=new Date(d+"T12:00:00").toLocaleDateString("en",{weekday:"long",day:"numeric",month:"long"});
const ref="MR-"+Math.random().toString(36).slice(2,7).toUpperCase();
const body=`Booking ${ref}\nService: ${s[0]} ($${s[3]})\nStylist: ${$("bst").value}\nDate: ${dt} at ${time}\nName: ${$("bn").value.trim()}\nPhone: ${$("bp").value.trim()}\nEmail: ${$("be").value.trim()}\nNotes: ${$("bnote").value.trim()||"-"}`;
post({type:"booking",ref,body});
$("bform").hidden=true;const o=$("done");o.hidden=false;
o.innerHTML=`<div class="tick">🌸</div><h3>You’re booked, ${esc($("bn").value.trim().split(" ")[0])}!</h3><p style="color:var(--mute)"><b style="color:var(--ink)">${esc(s[0])}</b> with ${esc($("bst").value)}<br>${dt} at ${time}<br>Estimated price: $${s[3]}<br>Reference: <b style="color:var(--rose)">${ref}</b></p><p style="color:var(--mute);font-size:.85rem">${CONFIG.endpoint?"We’ve received your request and will confirm shortly.":"Last step: send us your request so we can confirm your slot."}</p>${CONFIG.endpoint?"":links("Booking "+ref,body)}<button class="btn ghost" id="again" type="button">Make another booking</button>`;
$("again").onclick=()=>{$("bform").reset();time="";sum();drawSlots();showForm("b")}};
$("cform").onsubmit=e=>{e.preventDefault();
if(!chk([["cn",()=>$("cn").value.trim(),"Please enter your name."],["ce",()=>em($("ce").value.trim()),"Enter a valid email."],["cm",()=>$("cm").value.trim().length>4,"Please write a message."]]))return;
const body=`Name: ${$("cn").value.trim()}\nEmail: ${$("ce").value.trim()}\n\n${$("cm").value.trim()}`;post({type:"message",body});
$("cform").hidden=true;const o=$("done");o.hidden=false;
o.innerHTML=`<div class="tick">💌</div><h3>Message sent</h3><p style="color:var(--mute)">Thank you, ${esc($("cn").value.trim())}. We’ll get back to you within one working day.</p>${CONFIG.endpoint?"":links("Message from website",body)}<button class="btn ghost" id="again" type="button">Send another</button>`;
$("again").onclick=()=>{$("cform").reset();showForm("c")}};
$("menu").onclick=()=>$("links").classList.toggle("open");
$("links").onclick=e=>{if(e.target.tagName==="A")$("links").classList.remove("open")};
