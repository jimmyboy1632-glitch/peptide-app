import { useState, useEffect } from "react";
import { CHUNK1 } from "./peptideData_p1";
import { CHUNK2 } from "./peptideData_p2";
import { CHUNK3 } from "./peptideData_p3";

const ALL = [...CHUNK1, ...CHUNK2, ...CHUNK3];
const uniq = arr => [...new Set(arr)];
const CATS = ["All", ...uniq(ALL.map(p => p.category))];

const PAL = {
  "Healing & Recovery":   { bg:"#071a0e", a:"#22c55e", ch:"#14532d" },
  "GH Secretagogue":      { bg:"#071020", a:"#38bdf8", ch:"#0c2a4a" },
  "Anti-Aging & Skin":    { bg:"#150e22", a:"#c084fc", ch:"#3b0764" },
  "Anti-Aging":           { bg:"#150e22", a:"#c084fc", ch:"#3b0764" },
  "Nootropic & Mood":     { bg:"#181500", a:"#facc15", ch:"#422006" },
  "Nootropic":            { bg:"#181500", a:"#facc15", ch:"#422006" },
  "Metabolic":            { bg:"#1c0e00", a:"#fb923c", ch:"#431407" },
  "Fat Loss":             { bg:"#001818", a:"#2dd4bf", ch:"#042f2e" },
  "Sexual Health":        { bg:"#1c0505", a:"#f87171", ch:"#450a0a" },
  "Sleep & Recovery":     { bg:"#060820", a:"#818cf8", ch:"#1e1b4b" },
  "Muscle & Performance": { bg:"#1a0a00", a:"#f97316", ch:"#431407" },
  "Hormonal":             { bg:"#12091a", a:"#a78bfa", ch:"#2e1065" },
  "Gut Health":           { bg:"#041208", a:"#4ade80", ch:"#052e16" },
  "SARMs":                { bg:"#1a0505", a:"#ef4444", ch:"#450a0a" },
  "Performance":          { bg:"#001a20", a:"#06b6d4", ch:"#083344" },
  "Vitamins & Basics":    { bg:"#090d1f", a:"#6366f1", ch:"#1e1b4b" },
};
const pc = cat => PAL[cat] || { bg:"#0d0d0d", a:"#6366f1", ch:"#1e1b4b" };

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ p, onOpen }) {
  const c = pc(p.category);
  return (
    <div onClick={() => onOpen(p)}
      style={{ background:`linear-gradient(145deg,${c.bg} 0%,#0d0d0d 100%)`,
               border:`1px solid ${c.a}20`, borderRadius:14, padding:"16px 14px",
               cursor:"pointer", transition:"all .18s" }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=c.a+"60";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 28px ${c.a}18`;}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=c.a+"20";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
    >
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
        <span style={{fontSize:22}}>{p.emoji}</span>
        <div>
          <div style={{color:"#f9fafb",fontWeight:700,fontSize:13.5}}>{p.name}</div>
          <div style={{color:c.a,fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em"}}>{p.category}</div>
        </div>
      </div>
      <p style={{color:"#d1d5db",fontSize:11.5,lineHeight:1.55,margin:"0 0 10px",fontStyle:"italic"}}>{p.summary}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {p.tags.slice(0,3).map(t=>(
          <span key={t} style={{background:c.ch,color:c.a,borderRadius:20,padding:"2px 8px",fontSize:9.5,fontWeight:600}}>{t}</span>
        ))}
        {p.research?.length>0&&(
          <span style={{background:"#0c1f33",color:"#60a5fa",borderRadius:20,padding:"2px 8px",fontSize:9.5,fontWeight:600}}>📚 {p.research.length}</span>
        )}
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ p, onClose }) {
  const c = pc(p.category);
  const [tab, setTab] = useState("overview");
  useEffect(()=>{ const h=e=>e.key==="Escape"&&onClose(); window.addEventListener("keydown",h); return()=>window.removeEventListener("keydown",h); },[onClose]);

  const IBox = ({col,bg,lbl,children}) => (
    <div style={{background:bg||c.bg,border:`1px solid ${col||c.a}25`,borderRadius:10,padding:"11px 13px",marginBottom:10}}>
      <div style={{color:col||c.a,fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:5}}>{lbl}</div>
      <p style={{color:"#d1d5db",fontSize:12.5,margin:0,lineHeight:1.65}}>{children}</p>
    </div>
  );
  const ITile = ({lbl,children}) => (
    <div style={{background:"#141414",borderRadius:10,padding:"11px 12px"}}>
      <div style={{color:c.a,fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",marginBottom:4}}>{lbl}</div>
      <div style={{color:"#e5e7eb",fontSize:12,lineHeight:1.55}}>{children}</div>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:12,backdropFilter:"blur(6px)"}} onClick={onClose}>
      <div style={{background:"#0a0a0a",border:`1px solid ${c.a}30`,borderRadius:18,maxWidth:580,width:"100%",maxHeight:"90vh",overflow:"auto",boxShadow:`0 20px 70px ${c.a}18`}} onClick={e=>e.stopPropagation()}>
        {/* header */}
        <div style={{padding:"18px 20px 0",position:"sticky",top:0,background:"#0a0a0a",zIndex:10,borderBottom:`1px solid ${c.a}18`,paddingBottom:14}}>
          <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:"#1c1c1c",border:"none",color:"#9ca3af",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          <div style={{display:"flex",alignItems:"flex-start",gap:11,marginBottom:12}}>
            <span style={{fontSize:32,flexShrink:0,marginTop:2}}>{p.emoji}</span>
            <div>
              <h2 style={{color:"#fff",margin:0,fontSize:18,fontWeight:800}}>{p.name}</h2>
              <div style={{color:c.a,fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",margin:"3px 0"}}>{p.category}</div>
              <div style={{color:"#9ca3af",fontSize:11.5,fontStyle:"italic",lineHeight:1.4}}>{p.summary}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:4}}>
            {["overview","details","research"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?c.a:"transparent",border:`1px solid ${tab===t?c.a:"#2a2a2a"}`,color:tab===t?"#000":"#6b7280",borderRadius:7,padding:"5px 13px",fontSize:11,cursor:"pointer",fontWeight:600,textTransform:"capitalize"}}>{t}</button>
            ))}
          </div>
        </div>
        {/* body */}
        <div style={{padding:"18px 20px 24px"}}>
          {tab==="overview"&&(
            <>
              <div style={{color:c.a,fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:9}}>What It Is & How It Works</div>
              <div style={{color:"#d1d5db",fontSize:12.5,lineHeight:1.85,whiteSpace:"pre-wrap",marginBottom:20}}>{p.description}</div>
              <div style={{color:c.a,fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:9}}>Key Benefits</div>
              <ul style={{margin:"0 0 20px",paddingLeft:18}}>{p.benefits.map(b=><li key={b} style={{color:"#d1d5db",fontSize:12.5,marginBottom:5,lineHeight:1.5}}>{b}</li>)}</ul>
              {p.mechanism&&<IBox lbl="⚗️ Mechanism of Action">{p.mechanism}</IBox>}
            </>
          )}
          {tab==="details"&&(
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14}}>
                {[["💉 Dosing",p.dosing],["⏱ Half-Life",p.halfLife],["🔄 Cycle",p.cycle],["🧊 Storage",p.storage]].map(([l,v])=>(
                  <ITile key={l} lbl={l}>{v}</ITile>
                ))}
              </div>
              {p.sideEffects&&<IBox col="#f87171" bg="#1a0505" lbl="⚠️ Side Effects">{p.sideEffects}</IBox>}
              {p.stacksWith&&<IBox col="#38bdf8" bg="#071020" lbl="🔗 Stacks Well With">{p.stacksWith}</IBox>}
              {p.notes&&<IBox lbl="💡 Notes">{p.notes}</IBox>}
            </>
          )}
          {tab==="research"&&(
            p.research?.length
              ? <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {p.research.map((r,i)=>(
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                      style={{background:"#0b1a2b",border:"1px solid #1a3a5a",borderRadius:10,padding:"11px 13px",color:"#60a5fa",fontSize:12.5,textDecoration:"none",display:"flex",gap:9,alignItems:"flex-start",transition:"background .15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#112236"}
                      onMouseLeave={e=>e.currentTarget.style.background="#0b1a2b"}
                    >
                      <span style={{flexShrink:0,marginTop:1}}>🔗</span>
                      <div><div style={{fontWeight:600,lineHeight:1.35}}>{r.title}</div><div style={{color:"#3b6f9e",fontSize:10.5,marginTop:2}}>{r.url.replace("https://","")}</div></div>
                    </a>
                  ))}
                </div>
              : <div style={{color:"#4b5563",textAlign:"center",padding:"40px 0"}}>No research links for this compound.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Library ──────────────────────────────────────────────────────────────────
function Library() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState(null);

  const shown = ALL.filter(p => {
    const mc = cat==="All" || p.category===cat;
    const lq = q.toLowerCase();
    const mq = !lq || [p.name,p.category,p.summary,p.description,...p.tags].some(s=>s.toLowerCase().includes(lq));
    return mc && mq;
  });

  return (
    <div>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, effect, category, tag…"
        style={{width:"100%",background:"#141414",border:"1px solid #242424",borderRadius:10,padding:"10px 14px",color:"#fff",fontSize:13.5,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setCat(c)}
            style={{background:cat===c?"#6366f1":"#141414",border:`1px solid ${cat===c?"#6366f1":"#242424"}`,
                    color:cat===c?"#fff":"#6b7280",borderRadius:20,padding:"4px 11px",fontSize:10,cursor:"pointer",fontWeight:600}}>
            {c}
          </button>
        ))}
      </div>
      <div style={{color:"#2d2d2d",fontSize:10.5,textAlign:"right",marginBottom:10}}>{shown.length} / {ALL.length}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:9}}>
        {shown.map(p=><Card key={p.name} p={p} onOpen={setSel}/>)}
      </div>
      {sel&&<Modal p={sel} onClose={()=>setSel(null)}/>}
    </div>
  );
}

// ─── Calculator ───────────────────────────────────────────────────────────────
function Calc() {
  const [vm,setVm]=useState(5); const [bw,setBw]=useState(2);
  const [d,setD]=useState(500); const [u,setU]=useState("mcg");
  const conc=bw>0?(vm*1000)/bw:0;
  const dmcg=u==="mcg"?d:d*1000;
  const ml=conc>0?dmcg/conc:0;
  const rows=[0.25,0.5,1,2].map(m=>({l:`${m}× — ${m*d} ${u}`,ml:(conc>0?m*dmcg/conc:0).toFixed(3),u:((conc>0?m*dmcg/conc:0)*100).toFixed(1)}));
  const IS={width:"100%",background:"#141414",border:"1px solid #242424",borderRadius:8,padding:"9px 12px",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"};
  const LS={color:"#9ca3af",fontSize:11.5,display:"block",marginBottom:5,fontWeight:500};
  return (
    <div style={{maxWidth:520}}>
      <h3 style={{color:"#fff",margin:"0 0 4px",fontSize:17}}>Reconstitution Calculator</h3>
      <p style={{color:"#4b5563",fontSize:12,marginBottom:18}}>Enter vial size and bacteriostatic water volume to calculate draw amounts.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:16}}>
        <div><label style={LS}>Vial Size (mg)</label><input type="number" value={vm} step={0.5} onChange={e=>setVm(+e.target.value)} style={IS}/></div>
        <div><label style={LS}>Bac Water Added (mL)</label><input type="number" value={bw} step={0.5} onChange={e=>setBw(+e.target.value)} style={IS}/></div>
        <div style={{gridColumn:"1/-1"}}>
          <label style={LS}>Desired Dose per Injection</label>
          <div style={{display:"flex",gap:7}}>
            <input type="number" value={d} onChange={e=>setD(+e.target.value)} style={{...IS,flex:1}}/>
            <select value={u} onChange={e=>setU(e.target.value)} style={{background:"#141414",border:"1px solid #242424",borderRadius:8,color:"#fff",padding:"0 10px",fontSize:13,outline:"none"}}>
              {["mcg","mg"].map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div style={{background:"linear-gradient(135deg,#071020,#0d0d0d)",border:"1px solid #38bdf840",borderRadius:13,padding:15,marginBottom:18}}>
        <div style={{color:"#38bdf8",fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:12}}>Results</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["Concentration",conc.toFixed(1),"mcg/mL"],["Draw Volume",ml.toFixed(3),"mL"],["Syringe Mark",(ml*100).toFixed(1),"U-100"]].map(([l,v,u])=>(
            <div key={l} style={{background:"#0a0a0a",borderRadius:9,padding:10,textAlign:"center"}}>
              <div style={{color:"#4b5563",fontSize:9,textTransform:"uppercase",marginBottom:2}}>{l}</div>
              <div style={{color:"#38bdf8",fontSize:19,fontWeight:800,fontFamily:"monospace"}}>{v}</div>
              <div style={{color:"#374151",fontSize:9.5}}>{u}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:11,overflow:"hidden",marginBottom:18}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",background:"#141414",padding:"7px 13px"}}>
          {["Dose","Volume (mL)","Syringe"].map(h=><div key={h} style={{color:"#4b5563",fontSize:9.5,fontWeight:700,textTransform:"uppercase"}}>{h}</div>)}
        </div>
        {rows.map((r,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",padding:"8px 13px",borderTop:"1px solid #1a1a1a"}}>
            <div style={{color:"#e5e7eb",fontSize:12}}>{r.l}</div>
            <div style={{color:"#38bdf8",fontSize:12,fontWeight:600}}>{r.ml}</div>
            <div style={{color:"#a78bfa",fontSize:12,fontWeight:600}}>{r.u}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:11,padding:13}}>
        <div style={{color:"#facc15",fontSize:9.5,fontWeight:700,textTransform:"uppercase",marginBottom:7}}>💡 How to Read This</div>
        <p style={{color:"#6b7280",fontSize:12,margin:0,lineHeight:1.65}}>
          <b style={{color:"#e5e7eb"}}>Concentration</b> — mcg in each mL of reconstituted solution.<br/>
          <b style={{color:"#e5e7eb"}}>Draw Volume</b> — mL to pull into the syringe.<br/>
          <b style={{color:"#e5e7eb"}}>Syringe Mark</b> — the number on a U-100 insulin syringe to fill to.
        </p>
      </div>
    </div>
  );
}

// ─── My Stack ─────────────────────────────────────────────────────────────────
const DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const TIMES=["Morning","Pre-Workout","Afternoon","Evening","Night","As Needed"];
const UNITS=["mcg","mg","IU","mL","capsule","spray"];
const FREQS=["Daily","Twice daily","3× daily","Every other day","Weekly","Twice weekly","3× weekly","As needed"];

function Stack() {
  const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||"null")||d;}catch{return d;}};
  const [items,setItems]=useState(()=>load("pp_stack",[]));
  const [chk,setChk]=useState(()=>load("pp_chk",{}));
  const [open,setOpen]=useState(false);
  const [f,setF]=useState({name:"",dose:"",unit:"mcg",freq:"Daily",time:"Morning",days:[...DAYS],notes:""});
  useEffect(()=>{localStorage.setItem("pp_stack",JSON.stringify(items));},[items]);
  useEffect(()=>{localStorage.setItem("pp_chk",JSON.stringify(chk));},[chk]);
  const today=()=>new Date().toDateString();
  const isChk=id=>!!chk[`${id}_${today()}`];
  const tog=id=>setChk(p=>({...p,[`${id}_${today()}`]:!p[`${id}_${today()}`]}));
  const rm=id=>setItems(p=>p.filter(x=>x.id!==id));
  const add=()=>{if(!f.name.trim())return;setItems(p=>[...p,{...f,id:Date.now()}]);setF({name:"",dose:"",unit:"mcg",freq:"Daily",time:"Morning",days:[...DAYS],notes:""});setOpen(false);};
  const done=items.filter(x=>isChk(x.id)).length;
  const byT=TIMES.reduce((a,t)=>({...a,[t]:items.filter(x=>x.time===t)}),{});
  const IS2={width:"100%",background:"#141414",border:"1px solid #242424",borderRadius:8,padding:"9px 12px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"};
  const LS2={color:"#9ca3af",fontSize:11,display:"block",marginBottom:4,fontWeight:500};
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><h3 style={{color:"#fff",margin:0,fontSize:17}}>My Stack</h3>
          {items.length>0&&<div style={{color:"#4b5563",fontSize:11,marginTop:2}}>{done}/{items.length} taken today</div>}</div>
        <button onClick={()=>setOpen(!open)} style={{background:open?"#374151":"#6366f1",border:"none",color:"#fff",borderRadius:9,padding:"7px 15px",fontSize:13,fontWeight:700,cursor:"pointer"}}>{open?"Cancel":"+ Add"}</button>
      </div>
      {items.length>0&&(
        <div style={{background:"#141414",border:"1px solid #1a1a1a",borderRadius:10,padding:"9px 13px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:"#6b7280",fontSize:11.5}}>Today's progress</span>
            <span style={{color:"#6366f1",fontSize:11.5,fontWeight:700}}>{items.length?Math.round(done/items.length*100):0}%</span>
          </div>
          <div style={{background:"#1a1a1a",borderRadius:5,height:5,overflow:"hidden"}}>
            <div style={{background:"linear-gradient(90deg,#6366f1,#38bdf8)",height:"100%",borderRadius:5,width:`${items.length?done/items.length*100:0}%`,transition:"width .4s"}}/>
          </div>
        </div>
      )}
      {open&&(
        <div style={{background:"#0d0d0d",border:"1px solid #242424",borderRadius:13,padding:15,marginBottom:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:9}}>
            <div style={{gridColumn:"1/-1"}}><label style={LS2}>Compound Name</label><input value={f.name} onChange={e=>setF(x=>({...x,name:e.target.value}))} placeholder="e.g. BPC-157" style={IS2}/></div>
            <div><label style={LS2}>Dose</label><input value={f.dose} onChange={e=>setF(x=>({...x,dose:e.target.value}))} placeholder="e.g. 500" style={IS2}/></div>
            <div><label style={LS2}>Unit</label><select value={f.unit} onChange={e=>setF(x=>({...x,unit:e.target.value}))} style={{...IS2,appearance:"none"}}>{UNITS.map(u=><option key={u}>{u}</option>)}</select></div>
            <div><label style={LS2}>Frequency</label><select value={f.freq} onChange={e=>setF(x=>({...x,freq:e.target.value}))} style={{...IS2,appearance:"none"}}>{FREQS.map(r=><option key={r}>{r}</option>)}</select></div>
            <div><label style={LS2}>Time of Day</label><select value={f.time} onChange={e=>setF(x=>({...x,time:e.target.value}))} style={{...IS2,appearance:"none"}}>{TIMES.map(t=><option key={t}>{t}</option>)}</select></div>
          </div>
          <div style={{marginBottom:9}}><label style={LS2}>Days of Week</label>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {DAYS.map(d=>(
                <button key={d} onClick={()=>setF(x=>({...x,days:x.days.includes(d)?x.days.filter(y=>y!==d):[...x.days,d]}))}
                  style={{background:f.days.includes(d)?"#6366f1":"#141414",border:`1px solid ${f.days.includes(d)?"#6366f1":"#242424"}`,color:f.days.includes(d)?"#fff":"#4b5563",borderRadius:7,padding:"3px 9px",fontSize:11,cursor:"pointer",fontWeight:600}}>{d}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:11}}><label style={LS2}>Notes (optional)</label><input value={f.notes} onChange={e=>setF(x=>({...x,notes:e.target.value}))} placeholder="take fasted, before bed, with food…" style={IS2}/></div>
          <button onClick={add} style={{background:"#6366f1",border:"none",color:"#fff",borderRadius:9,padding:"9px 20px",fontWeight:700,cursor:"pointer",fontSize:14}}>Add to Stack</button>
        </div>
      )}
      {items.length===0&&!open&&(
        <div style={{textAlign:"center",padding:"55px 20px"}}>
          <div style={{fontSize:40,marginBottom:10}}>💊</div>
          <div style={{color:"#4b5563",fontSize:15}}>Your stack is empty</div>
          <div style={{color:"#374151",fontSize:12,marginTop:4}}>Add compounds to track your daily protocol</div>
        </div>
      )}
      {TIMES.map(time=>{
        const grp=byT[time]||[];
        if(!grp.length) return null;
        return (
          <div key={time} style={{marginBottom:18}}>
            <div style={{color:"#6366f1",fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:7}}>{time}</div>
            {grp.map(item=>{
              const d=isChk(item.id);
              return (
                <div key={item.id} style={{background:d?"#071a0e":"#0d0d0d",border:`1px solid ${d?"#22c55e30":"#1a1a1a"}`,borderRadius:11,padding:"11px 13px",display:"flex",alignItems:"center",gap:10,marginBottom:6,transition:"all .2s"}}>
                  <button onClick={()=>tog(item.id)} style={{width:25,height:25,borderRadius:6,flexShrink:0,background:d?"#22c55e":"#1a1a1a",border:`2px solid ${d?"#22c55e":"#374151"}`,color:"#fff",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{d?"✓":""}</button>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:"#f9fafb",fontWeight:600,fontSize:13.5}}>{item.name}</div>
                    <div style={{color:"#4b5563",fontSize:10.5,marginTop:1}}>{item.dose&&`${item.dose} ${item.unit} · `}{item.freq} · {item.days.join(", ")}</div>
                    {item.notes&&<div style={{color:"#374151",fontSize:10.5,marginTop:2}}>💡 {item.notes}</div>}
                  </div>
                  <button onClick={()=>rm(item.id)} style={{background:"none",border:"none",color:"#2d2d2d",cursor:"pointer",fontSize:18,padding:3,transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color="#ef4444"} onMouseLeave={e=>e.currentTarget.style.color="#2d2d2d"}>×</button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
const TABS=[{id:"library",l:"Library",i:"🔬"},{id:"calc",l:"Calculator",i:"⚗️"},{id:"stack",l:"My Stack",i:"💊"}];

export default function App() {
  const [tab,setTab]=useState("library");
  return (
    <div style={{minHeight:"100vh",background:"#080808",fontFamily:"'DM Sans',sans-serif",color:"#fff"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#222;border-radius:3px}input::placeholder{color:#374151}a{color:inherit}`}</style>
      <div style={{background:"#0a0a0a",borderBottom:"1px solid #141414",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:34,height:34,background:"linear-gradient(135deg,#6366f1,#38bdf8)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🧬</div>
        <div>
          <div style={{fontWeight:800,fontSize:15,letterSpacing:"-.01em"}}>PeptidePro</div>
          <div style={{color:"#374151",fontSize:9.5,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em"}}>{ALL.length} Compounds · Deep Reference Guide</div>
        </div>
      </div>
      <div style={{display:"flex",borderBottom:"1px solid #141414",background:"#0a0a0a",position:"sticky",top:0,zIndex:100}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:"none",border:"none",borderBottom:`2px solid ${tab===t.id?"#6366f1":"transparent"}`,color:tab===t.id?"#fff":"#4b5563",padding:"11px 6px",cursor:"pointer",fontSize:12.5,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:5,transition:"color .15s"}}>
            <span>{t.i}</span>{t.l}
          </button>
        ))}
      </div>
      <div style={{padding:"14px 12px",maxWidth:980,margin:"0 auto"}}>
        {tab==="library"&&<Library/>}
        {tab==="calc"&&<Calc/>}
        {tab==="stack"&&<Stack/>}
      </div>
      <div style={{textAlign:"center",padding:"12px 16px 32px",color:"#1f2937",fontSize:10}}>⚠️ For educational & research purposes only. Not medical advice. Consult a physician before use.</div>
    </div>
  );
}
