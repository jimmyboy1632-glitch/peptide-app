import { useState, useEffect } from "react";

const PEPTIDES = [
  {
    name: "BPC-157",
    category: "Healing & Recovery",
    emoji: "🩹",
    description: "Body Protection Compound-157. A pentadecapeptide derived from a protein found in gastric juice. One of the most researched healing peptides.",
    benefits: ["Accelerates wound and tissue healing", "Reduces inflammation", "Protects gut lining (IBS, leaky gut)", "Tendon and ligament repair", "May improve mood and reduce anxiety", "Neuroprotective properties"],
    dosing: "250–500 mcg per day, injected subcutaneously or IM near injury site",
    halfLife: "~4 hours",
    cycle: "4–12 weeks on, 2–4 weeks off",
    storage: "Lyophilized: room temp. Reconstituted: refrigerate, use within 30 days",
    notes: "One of the safest and most studied peptides. Often stacked with TB-500 for synergistic healing.",
    tags: ["healing", "gut", "anti-inflammatory"]
  },
  {
    name: "TB-500",
    category: "Healing & Recovery",
    emoji: "💪",
    description: "Thymosin Beta-4 synthetic fragment. Promotes actin upregulation, enabling cell migration and proliferation for systemic healing.",
    benefits: ["Full-body systemic healing", "Reduces inflammation and scar tissue", "Accelerates muscle repair", "Improves flexibility", "Promotes angiogenesis (new blood vessel growth)", "May aid hair regrowth"],
    dosing: "2–2.5 mg twice weekly (loading phase 4–6 weeks), then 1–2 mg weekly (maintenance)",
    halfLife: "Unknown, effects are long-lasting",
    cycle: "6–8 weeks loading, 4–6 weeks maintenance",
    storage: "Lyophilized: room temp. Reconstituted: refrigerate, use within 30 days",
    notes: "Often stacked with BPC-157. Systemic vs BPC-157's localized effect.",
    tags: ["healing", "systemic", "anti-inflammatory"]
  },
  {
    name: "Tesamorelin",
    category: "GH Secretagogue",
    emoji: "🔬",
    description: "A GHRH analogue that stimulates the pituitary to release growth hormone. FDA-approved for HIV-associated lipodystrophy.",
    benefits: ["Reduces visceral adipose tissue (belly fat)", "Increases IGF-1 levels", "Improves body composition", "Cognitive benefits (memory, processing)", "Cardiovascular improvements", "Better sleep quality"],
    dosing: "1–2 mg subcutaneous injection daily, preferably fasted before bed",
    halfLife: "~26 minutes (pulse stimulation lasts hours)",
    cycle: "3–6 months, then assess with labs",
    storage: "Refrigerate at all times. Do not freeze reconstituted.",
    notes: "Best taken fasted. Avoid carbs/fats 1–2 hours before dose. Stack with GHRP for amplified GH pulse.",
    tags: ["fat loss", "GH", "body composition", "cognitive"]
  },
  {
    name: "GHK-Cu",
    category: "Anti-Aging & Skin",
    emoji: "✨",
    description: "Copper peptide naturally occurring in human plasma. Declines with age. Powerful regenerative and anti-aging effects systemically and topically.",
    benefits: ["Stimulates collagen and elastin production", "Promotes wound healing", "Antioxidant and anti-inflammatory", "Hair follicle regeneration", "Nerve regeneration", "Improves skin density and elasticity", "May remodel scar tissue"],
    dosing: "Topical: 1–2x daily. Injectable: 1–2 mg subcutaneous daily",
    halfLife: "~15–30 minutes (topical effects longer-lasting)",
    cycle: "Continuous use acceptable. Rotate injection sites.",
    storage: "Topical: cool, dry place. Injectable: refrigerate reconstituted.",
    notes: "Synergizes well with Tesamorelin for anti-aging protocol. Very well-tolerated.",
    tags: ["anti-aging", "skin", "collagen", "hair"]
  },
  {
    name: "Ipamorelin",
    category: "GH Secretagogue",
    emoji: "🌙",
    description: "A selective GHRP (growth hormone releasing peptide) that mimics ghrelin. Cleanest GH pulse with minimal side effects.",
    benefits: ["Increases GH and IGF-1", "Lean muscle gain", "Fat loss", "Improved sleep quality", "Anti-aging effects", "Minimal cortisol or prolactin increase"],
    dosing: "200–300 mcg, 1–3x daily (ideally before bed, fasted)",
    halfLife: "~2 hours",
    cycle: "8–12 weeks on, 4 weeks off",
    storage: "Lyophilized: room temp. Reconstituted: refrigerate.",
    notes: "Often stacked with CJC-1295 for a synergistic GH pulse. Considered the mildest GHRP.",
    tags: ["GH", "sleep", "lean muscle", "fat loss"]
  },
  {
    name: "CJC-1295",
    category: "GH Secretagogue",
    emoji: "📈",
    description: "Modified GHRH analogue with DAC (Drug Affinity Complex) for extended half-life. Provides a sustained GH bleed rather than a pulse.",
    benefits: ["Sustained elevation of GH and IGF-1", "Muscle growth and recovery", "Fat metabolism", "Improved sleep", "Anti-aging", "Stronger effects when stacked with GHRP"],
    dosing: "With DAC: 1–2 mg once or twice weekly. Without DAC: 100 mcg 3x daily",
    halfLife: "With DAC: 6–8 days. Without DAC: ~30 min",
    cycle: "8–12 weeks on, 4 weeks off",
    storage: "Refrigerate reconstituted. Stable for 2–4 weeks.",
    notes: "CJC-1295 w/ DAC stacked with Ipamorelin is one of the most popular GH stacks.",
    tags: ["GH", "lean muscle", "fat loss", "recovery"]
  },
  {
    name: "Semaglutide",
    category: "Metabolic",
    emoji: "⚖️",
    description: "GLP-1 receptor agonist. FDA-approved for type 2 diabetes and obesity. Acts on brain receptors to reduce appetite and slow gastric emptying.",
    benefits: ["Significant weight loss", "Reduces appetite and cravings", "Improves insulin sensitivity", "Cardiovascular protection", "May reduce inflammation", "Blood sugar regulation"],
    dosing: "0.25 mg weekly (starting), titrate up to 0.5–2.4 mg weekly over months",
    halfLife: "~7 days",
    cycle: "Long-term use; supervised titration required",
    storage: "Refrigerate. Do not freeze. Stable at room temp for 28 days after first use.",
    notes: "Taper slowly. Side effects: nausea, GI distress (usually subside). Use with high-protein diet to preserve muscle.",
    tags: ["weight loss", "metabolic", "appetite", "insulin"]
  },
  {
    name: "Selank",
    category: "Nootropic & Mood",
    emoji: "🧠",
    description: "Synthetic analogue of the immunomodulatory peptide tuftsin. Developed in Russia. Anxiolytic and nootropic properties.",
    benefits: ["Reduces anxiety without sedation", "Improves memory and learning", "Mood stabilization", "Immune modulation", "May improve BDNF levels", "No addiction potential"],
    dosing: "250–3000 mcg intranasally or subcutaneously, 1–2x daily",
    halfLife: "~2–3 minutes (intranasal effects last hours)",
    cycle: "2–4 weeks on, 1–2 weeks off",
    storage: "Refrigerate. Stable 3–4 weeks reconstituted.",
    notes: "Very well-tolerated. No withdrawal reported. Pairs well with Semax for cognitive enhancement.",
    tags: ["anxiety", "cognitive", "mood", "nootropic"]
  },
  {
    name: "Semax",
    category: "Nootropic & Mood",
    emoji: "⚡",
    description: "Synthetic ACTH analogue. Developed in Russia for stroke recovery. Powerful nootropic and neuroprotective effects.",
    benefits: ["Increases BDNF (brain-derived neurotrophic factor)", "Enhances focus and mental clarity", "Neuroprotection", "Reduces stress and anxiety", "Improves memory consolidation", "May aid ADHD symptoms"],
    dosing: "200–900 mcg intranasally, 1–2x daily in the morning",
    halfLife: "~2–5 minutes (effects last hours via BDNF)",
    cycle: "2–4 weeks on, 2 weeks off",
    storage: "Refrigerate. Use within 2–4 weeks reconstituted.",
    notes: "Stack with Selank for balanced cognitive + anxiolytic effects. Avoid late-day dosing due to stimulating effects.",
    tags: ["BDNF", "cognitive", "focus", "neuroprotection"]
  },
  {
    name: "Epithalon",
    category: "Anti-Aging",
    emoji: "⏳",
    description: "Tetrapeptide derived from the pineal gland. Activates telomerase, the enzyme that lengthens telomeres. One of the most promising anti-aging peptides.",
    benefits: ["Telomere lengthening", "May extend cellular lifespan", "Normalizes melatonin production", "Antioxidant properties", "Improves sleep quality", "May reduce cancer risk (preclinical)"],
    dosing: "5–10 mg daily for 10–20 days, 1–2 cycles per year",
    halfLife: "~30–60 minutes",
    cycle: "10–20 day intensive cycles, 1–2x per year",
    storage: "Lyophilized: room temp. Reconstituted: refrigerate.",
    notes: "Protocol-based peptide — not used continuously. Often done as a once or twice yearly anti-aging 'reset.'",
    tags: ["anti-aging", "telomere", "sleep", "longevity"]
  },
  {
    name: "PT-141 (Bremelanotide)",
    category: "Sexual Health",
    emoji: "🔥",
    description: "Melanocortin receptor agonist. Acts centrally on the brain (not vascular like Viagra) to increase sexual desire in both men and women.",
    benefits: ["Increases libido in men and women", "Promotes sexual arousal", "May aid erectile dysfunction", "Works within 1–2 hours", "Not dependent on cardiovascular stimulation"],
    dosing: "0.5–2 mg subcutaneous 1–2 hours before sexual activity as needed",
    halfLife: "~2–3 hours",
    cycle: "As needed. Not for daily use.",
    storage: "Refrigerate reconstituted.",
    notes: "Side effects: nausea, flushing (dose-dependent). Start at 0.5 mg to assess tolerance. FDA-approved version (Vyleesi) exists.",
    tags: ["libido", "sexual", "as-needed"]
  },
  {
    name: "AOD-9604",
    category: "Fat Loss",
    emoji: "🏃",
    description: "Modified fragment (176–191) of HGH. Mimics the fat-burning properties of GH without the growth-promoting effects or insulin resistance.",
    benefits: ["Stimulates lipolysis (fat breakdown)", "Inhibits lipogenesis", "No effect on blood glucose or IGF-1", "May aid cartilage repair", "No risk of acromegaly"],
    dosing: "250–300 mcg subcutaneous daily, fasted in the morning",
    halfLife: "~30 minutes",
    cycle: "8–12 weeks",
    storage: "Refrigerate reconstituted. Room temp lyophilized.",
    notes: "Best taken fasted with no food 30 min before/after. Excellent addition to fat loss stacks.",
    tags: ["fat loss", "lipolysis", "body composition"]
  }
];

const UNITS = ["mcg", "mg", "IU", "ml"];
const FREQUENCIES = ["Once daily", "Twice daily", "3x daily", "Every other day", "Weekly", "Twice weekly", "As needed"];

const categoryColors = {
  "Healing & Recovery": { bg: "#0f2a1a", accent: "#22c55e", light: "#bbf7d0" },
  "GH Secretagogue": { bg: "#0f1f2e", accent: "#38bdf8", light: "#bae6fd" },
  "Anti-Aging & Skin": { bg: "#1e1228", accent: "#c084fc", light: "#e9d5ff" },
  "Anti-Aging": { bg: "#1e1228", accent: "#c084fc", light: "#e9d5ff" },
  "Nootropic & Mood": { bg: "#1a1a0f", accent: "#facc15", light: "#fef08a" },
  "Metabolic": { bg: "#1f1209", accent: "#fb923c", light: "#fed7aa" },
  "Sexual Health": { bg: "#1f0f0f", accent: "#f87171", light: "#fecaca" },
  "Fat Loss": { bg: "#0f1f1f", accent: "#2dd4bf", light: "#99f6e4" },
};

const defaultColor = { bg: "#111827", accent: "#6366f1", light: "#c7d2fe" };

function getColor(category) {
  return categoryColors[category] || defaultColor;
}

// ─── PEPTIDE LIBRARY ────────────────────────────────────────────────────────

function PeptideCard({ peptide, onClick }) {
  const c = getColor(peptide.category);
  return (
    <div
      onClick={() => onClick(peptide)}
      style={{
        background: `linear-gradient(135deg, ${c.bg} 0%, #0d0d0d 100%)`,
        border: `1px solid ${c.accent}22`,
        borderRadius: 16,
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = c.accent + "88";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 32px ${c.accent}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = c.accent + "22";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <span style={{ fontSize: 28 }}>{peptide.emoji}</span>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>{peptide.name}</div>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
            color: c.accent, textTransform: "uppercase", marginTop: 2
          }}>{peptide.category}</div>
        </div>
      </div>
      <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
        {peptide.description.slice(0, 100)}...
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
        {peptide.tags.slice(0, 3).map(t => (
          <span key={t} style={{
            background: c.accent + "18", color: c.light,
            borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function PeptideModal({ peptide, onClose }) {
  const c = getColor(peptide.category);
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, backdropFilter: "blur(6px)"
    }} onClick={onClose}>
      <div style={{
        background: "#0d0d0d", border: `1px solid ${c.accent}44`,
        borderRadius: 20, maxWidth: 560, width: "100%", maxHeight: "85vh",
        overflow: "auto", padding: 28, position: "relative",
        boxShadow: `0 24px 80px ${c.accent}22`
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "#1f1f1f", border: "none", color: "#9ca3af",
          borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 18
        }}>×</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <span style={{ fontSize: 40 }}>{peptide.emoji}</span>
          <div>
            <h2 style={{ color: "#fff", margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 24 }}>{peptide.name}</h2>
            <span style={{ color: c.accent, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{peptide.category}</span>
          </div>
        </div>
        <p style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{peptide.description}</p>

        <Section title="Benefits" color={c.accent}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {peptide.benefits.map(b => (
              <li key={b} style={{ color: "#d1d5db", fontSize: 13, marginBottom: 5 }}>{b}</li>
            ))}
          </ul>
        </Section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
          <InfoBox label="Dosing Protocol" value={peptide.dosing} color={c.accent} />
          <InfoBox label="Half-Life" value={peptide.halfLife} color={c.accent} />
          <InfoBox label="Cycle Length" value={peptide.cycle} color={c.accent} />
          <InfoBox label="Storage" value={peptide.storage} color={c.accent} />
        </div>

        {peptide.notes && (
          <div style={{
            marginTop: 16, background: c.accent + "12", border: `1px solid ${c.accent}33`,
            borderRadius: 10, padding: "12px 14px"
          }}>
            <div style={{ color: c.accent, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>💡 Notes</div>
            <p style={{ color: "#d1d5db", fontSize: 13, margin: 0 }}>{peptide.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function InfoBox({ label, value, color }) {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: 10, padding: "12px" }}>
      <div style={{ color, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
      <div style={{ color: "#e5e7eb", fontSize: 12 }}>{value}</div>
    </div>
  );
}

function LibraryTab() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = ["All", ...Array.from(new Set(PEPTIDES.map(p => p.category)))];
  const filtered = PEPTIDES.filter(p => {
    const matchCat = filter === "All" || p.category === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search peptides..."
          style={{
            width: "100%", background: "#1a1a1a", border: "1px solid #2d2d2d",
            borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14,
            outline: "none", boxSizing: "border-box"
          }}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            background: filter === cat ? "#6366f1" : "#1a1a1a",
            border: `1px solid ${filter === cat ? "#6366f1" : "#2d2d2d"}`,
            color: filter === cat ? "#fff" : "#9ca3af",
            borderRadius: 20, padding: "5px 14px", fontSize: 12,
            cursor: "pointer", fontWeight: 600, transition: "all 0.15s"
          }}>{cat}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {filtered.map(p => <PeptideCard key={p.name} peptide={p} onClick={setSelected} />)}
      </div>
      {selected && <PeptideModal peptide={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── CALCULATOR ─────────────────────────────────────────────────────────────

function CalculatorTab() {
  const [vialMg, setVialMg] = useState(5);
  const [bacWater, setBacWater] = useState(2);
  const [desiredDose, setDesiredDose] = useState(500);
  const [unit, setUnit] = useState("mcg");

  const concentration = bacWater > 0 ? (vialMg * 1000) / bacWater : 0; // mcg/ml
  const drawMl = unit === "mcg"
    ? (concentration > 0 ? desiredDose / concentration : 0)
    : (concentration > 0 ? (desiredDose * 1000) / concentration : 0);
  const drawUnits = drawMl * 100; // insulin syringe units

  const rows = [0.25, 0.5, 1, 2].map(d => {
    const dose_mcg = unit === "mcg" ? d * desiredDose : d * desiredDose * 1000;
    const ml = concentration > 0 ? dose_mcg / concentration : 0;
    return { label: `${d}x (${d * desiredDose} ${unit})`, ml: ml.toFixed(3), units: (ml * 100).toFixed(1) };
  });

  return (
    <div style={{ maxWidth: 500 }}>
      <h3 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", marginBottom: 20, fontSize: 18 }}>
        Reconstitution Calculator
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        <CalcInput label="Vial Size (mg)" value={vialMg} onChange={setVialMg} min={0.1} step={0.5} />
        <CalcInput label="Bac Water Added (ml)" value={bacWater} onChange={setBacWater} min={0.1} step={0.5} />
        <div>
          <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 6 }}>Desired Dose</label>
          <div style={{ display: "flex", gap: 6 }}>
            <input
              type="number" value={desiredDose}
              onChange={e => setDesiredDose(+e.target.value)}
              style={{
                flex: 1, background: "#1a1a1a", border: "1px solid #2d2d2d",
                borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 14, outline: "none"
              }}
            />
            <select value={unit} onChange={e => setUnit(e.target.value)} style={{
              background: "#1a1a1a", border: "1px solid #2d2d2d", borderRadius: 8,
              color: "#fff", padding: "0 10px", fontSize: 13, outline: "none"
            }}>
              {UNITS.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{
        background: "linear-gradient(135deg, #0f1f2e 0%, #0d0d0d 100%)",
        border: "1px solid #38bdf844", borderRadius: 16, padding: 20, marginBottom: 24
      }}>
        <div style={{ color: "#38bdf8", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
          Reconstitution Results
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <ResultBox label="Concentration" value={concentration.toFixed(1)} unit="mcg/ml" />
          <ResultBox label="Draw Volume" value={drawMl.toFixed(3)} unit="ml" />
          <ResultBox label="Syringe Units" value={drawUnits.toFixed(1)} unit="units (U100)" />
        </div>
      </div>

      <h3 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", marginBottom: 14, fontSize: 16 }}>
        Dose Reference Table
      </h3>
      <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 12, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
          background: "#1a1a1a", padding: "10px 14px"
        }}>
          {["Dose", "Volume (ml)", "Syringe Units"].map(h => (
            <div key={h} style={{ color: "#6b7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
            padding: "10px 14px", borderTop: "1px solid #1f1f1f"
          }}>
            <div style={{ color: "#e5e7eb", fontSize: 13 }}>{r.label}</div>
            <div style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600 }}>{r.ml}</div>
            <div style={{ color: "#a78bfa", fontSize: 13, fontWeight: 600 }}>{r.units}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalcInput({ label, value, onChange, min, step }) {
  return (
    <div>
      <label style={{ color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 6 }}>{label}</label>
      <input
        type="number" value={value} min={min} step={step}
        onChange={e => onChange(+e.target.value)}
        style={{
          width: "100%", background: "#1a1a1a", border: "1px solid #2d2d2d",
          borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 14,
          outline: "none", boxSizing: "border-box"
        }}
      />
    </div>
  );
}

function ResultBox({ label, value, unit }) {
  return (
    <div style={{ background: "#0d0d0d", borderRadius: 10, padding: 12, textAlign: "center" }}>
      <div style={{ color: "#6b7280", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{label}</div>
      <div style={{ color: "#38bdf8", fontSize: 22, fontWeight: 800, fontFamily: "monospace" }}>{value}</div>
      <div style={{ color: "#4b5563", fontSize: 11 }}>{unit}</div>
    </div>
  );
}

// ─── SUPPLEMENT TRACKER ─────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["Morning", "Afternoon", "Evening", "Night", "As Needed"];

function SupplementTab() {
  const [supplements, setSupplements] = useState(() => {
    try { return JSON.parse(localStorage.getItem("peptide_supps") || "[]"); } catch { return []; }
  });
  const [form, setForm] = useState({ name: "", dose: "", unit: "mcg", frequency: "Once daily", time: "Morning", days: [...DAYS], notes: "" });
  const [adding, setAdding] = useState(false);
  const [checkedToday, setCheckedToday] = useState(() => {
    try { return JSON.parse(localStorage.getItem("peptide_checked") || "{}"); } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("peptide_supps", JSON.stringify(supplements));
  }, [supplements]);

  useEffect(() => {
    localStorage.setItem("peptide_checked", JSON.stringify(checkedToday));
  }, [checkedToday]);

  const addSupplement = () => {
    if (!form.name.trim()) return;
    setSupplements(prev => [...prev, { ...form, id: Date.now() }]);
    setForm({ name: "", dose: "", unit: "mcg", frequency: "Once daily", time: "Morning", days: [...DAYS], notes: "" });
    setAdding(false);
  };

  const remove = (id) => setSupplements(prev => prev.filter(s => s.id !== id));

  const toggleCheck = (id) => {
    const key = `${id}_${new Date().toDateString()}`;
    setCheckedToday(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isChecked = (id) => !!checkedToday[`${id}_${new Date().toDateString()}`];

  const byTime = TIMES.reduce((acc, t) => {
    acc[t] = supplements.filter(s => s.time === t);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", margin: 0, fontSize: 18 }}>My Stack</h3>
        <button onClick={() => setAdding(!adding)} style={{
          background: "#6366f1", border: "none", color: "#fff",
          borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700,
          cursor: "pointer"
        }}>{adding ? "Cancel" : "+ Add"}</button>
      </div>

      {adding && (
        <div style={{
          background: "#111", border: "1px solid #2d2d2d", borderRadius: 14,
          padding: 20, marginBottom: 24
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. BPC-157, Creatine..." style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Dose Amount</label>
              <input value={form.dose} onChange={e => setForm(f => ({ ...f, dose: e.target.value }))}
                placeholder="e.g. 500" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Unit</label>
              <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} style={selectStyle}>
                {UNITS.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Frequency</label>
              <select value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))} style={selectStyle}>
                {FREQUENCIES.map(fr => <option key={fr}>{fr}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Time of Day</label>
              <select value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} style={selectStyle}>
                {TIMES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Days</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {DAYS.map(d => (
                <button key={d} onClick={() => setForm(f => ({
                  ...f, days: f.days.includes(d) ? f.days.filter(x => x !== d) : [...f.days, d]
                }))} style={{
                  background: form.days.includes(d) ? "#6366f1" : "#1a1a1a",
                  border: `1px solid ${form.days.includes(d) ? "#6366f1" : "#2d2d2d"}`,
                  color: form.days.includes(d) ? "#fff" : "#6b7280",
                  borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", fontWeight: 600
                }}>{d}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Notes (optional)</label>
            <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="e.g. take fasted, refrigerate..." style={inputStyle} />
          </div>
          <button onClick={addSupplement} style={{
            background: "#6366f1", border: "none", color: "#fff",
            borderRadius: 10, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>Save to Stack</button>
        </div>
      )}

      {supplements.length === 0 && !adding && (
        <div style={{
          textAlign: "center", padding: "60px 20px", color: "#4b5563"
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💊</div>
          <div style={{ fontSize: 16, color: "#6b7280" }}>Your stack is empty</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Add your peptides and supplements above</div>
        </div>
      )}

      {TIMES.map(time => {
        const items = byTime[time];
        if (!items.length) return null;
        return (
          <div key={time} style={{ marginBottom: 24 }}>
            <div style={{
              color: "#6366f1", fontSize: 11, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10
            }}>{time}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map(s => {
                const checked = isChecked(s.id);
                return (
                  <div key={s.id} style={{
                    background: checked ? "#0f1a0f" : "#111",
                    border: `1px solid ${checked ? "#22c55e44" : "#1f1f1f"}`,
                    borderRadius: 12, padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 14,
                    transition: "all 0.2s"
                  }}>
                    <button onClick={() => toggleCheck(s.id)} style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: checked ? "#22c55e" : "#1a1a1a",
                      border: `2px solid ${checked ? "#22c55e" : "#374151"}`,
                      color: "#fff", fontSize: 14, cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center"
                    }}>{checked ? "✓" : ""}</button>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                      <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>
                        {s.dose && `${s.dose} ${s.unit} · `}{s.frequency} · {s.days.join(", ")}
                      </div>
                      {s.notes && <div style={{ color: "#4b5563", fontSize: 11, marginTop: 3 }}>💡 {s.notes}</div>}
                    </div>
                    <button onClick={() => remove(s.id)} style={{
                      background: "none", border: "none", color: "#374151",
                      cursor: "pointer", fontSize: 18, padding: 4,
                      transition: "color 0.15s"
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                      onMouseLeave={e => e.currentTarget.style.color = "#374151"}
                    >×</button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const labelStyle = { color: "#9ca3af", fontSize: 12, display: "block", marginBottom: 5, fontWeight: 500 };
const inputStyle = {
  width: "100%", background: "#1a1a1a", border: "1px solid #2d2d2d",
  borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 14,
  outline: "none", boxSizing: "border-box"
};
const selectStyle = {
  width: "100%", background: "#1a1a1a", border: "1px solid #2d2d2d",
  borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 14,
  outline: "none", appearance: "none"
};

// ─── APP SHELL ───────────────────────────────────────────────────────────────

const TABS = [
  { id: "library", label: "Library", icon: "🔬" },
  { id: "calculator", label: "Calculator", icon: "⚗️" },
  { id: "stack", label: "My Stack", icon: "💊" },
];

export default function App() {
  const [tab, setTab] = useState("library");

  return (
    <div style={{
      minHeight: "100vh", background: "#080808", fontFamily: "'DM Sans', sans-serif",
      color: "#fff"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        input::placeholder { color: #4b5563; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #0d0d0d 0%, #111 100%)",
        borderBottom: "1px solid #1a1a1a", padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 12
      }}>
        <div style={{
          width: 38, height: 38, background: "linear-gradient(135deg, #6366f1, #38bdf8)",
          borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
        }}>🧬</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.01em" }}>PeptidePro</div>
          <div style={{ color: "#4b5563", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Research & Dosing Companion</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", borderBottom: "1px solid #1a1a1a",
        background: "#0d0d0d", position: "sticky", top: 0, zIndex: 100
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, background: "none", border: "none",
            borderBottom: tab === t.id ? "2px solid #6366f1" : "2px solid transparent",
            color: tab === t.id ? "#fff" : "#6b7280",
            padding: "12px 8px", cursor: "pointer", fontSize: 13, fontWeight: 600,
            transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 16px", maxWidth: 900, margin: "0 auto" }}>
        {tab === "library" && <LibraryTab />}
        {tab === "calculator" && <CalculatorTab />}
        {tab === "stack" && <SupplementTab />}
      </div>

      {/* Footer disclaimer */}
      <div style={{
        textAlign: "center", padding: "20px 16px 32px", color: "#374151", fontSize: 11
      }}>
        ⚠️ For educational and research purposes only. Consult a physician before use.
      </div>
    </div>
  );
}
