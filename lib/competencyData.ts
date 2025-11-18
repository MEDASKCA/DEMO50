// Comprehensive Theatre Competency Structures

// Competency Rating Scale
export const COMPETENCY_LEVELS = [
  { value: 0, label: 'No knowledge', description: 'Never heard of this', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  { value: 1, label: 'Awareness', description: 'Know it exists but no hands-on experience', color: 'bg-red-100 text-red-700 border-red-300' },
  { value: 2, label: 'Novice', description: 'Learning with significant support needed', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { value: 3, label: 'Competent', description: 'Can perform with supervision/assistance', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 4, label: 'Proficient', description: 'Independent practice, confident and safe', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 5, label: 'Expert', description: 'Can teach, supervise and mentor others', color: 'bg-blue-100 text-blue-700 border-blue-300' }
];

// =============================================================================
// SCRUB NURSE/PRACTITIONER COMPETENCIES
// =============================================================================

export const SCRUB_COMPETENCIES = {
  'General Theatre Skills': {
    icon: '🔧',
    description: 'Core scrub skills applicable across all specialties',
    competencies: [
      { id: 'sterile-field', name: 'Maintaining Sterile Field', critical: true },
      { id: 'surgical-count', name: 'Surgical Count Procedures (Swabs/Instruments/Sharps)', critical: true },
      { id: 'instrument-handling', name: 'Instrument Handling & Passing', critical: true },
      { id: 'gowning-gloving', name: 'Surgical Gowning & Gloving (Self & Others)', critical: true },
      { id: 'draping', name: 'Patient Draping', critical: true },
      { id: 'specimen-handling', name: 'Specimen Handling & Labelling', critical: true },
      { id: 'suture-selection', name: 'Suture Material Selection & Preparation', critical: false },
      { id: 'swab-prep', name: 'Swab Preparation & Management', critical: true },
      { id: 'sharps-safety', name: 'Sharps Safety & Management', critical: true },
      { id: 'instrument-tray-setup', name: 'Instrument Tray Set-up', critical: false },
      { id: 'equipment-troubleshooting', name: 'Equipment Troubleshooting', critical: false }
    ]
  },

  'Orthopaedics': {
    icon: '🦴',
    description: 'Orthopaedic surgery competencies',
    subspecialties: {
      'Trauma': {
        procedures: [
          {
            name: 'Hip Fracture Fixation (DHS/Hemiarthroplasty)',
            systems: ['Stryker Gamma3', 'DePuy Synthes Trauma', 'Zimmer Natural Nail'],
            implants: ['DHS (Dynamic Hip Screw)', 'Cephalomedullary Nails', 'Hemiarthroplasty Stems'],
            instrumentation: ['DHS Insertion Set', 'Reaming System', 'Guide Wire Set', 'Femoral Head Extractor'],
            equipment: ['C-arm Image Intensifier', 'Traction Table', 'Pneumatic Tourniquet', 'Power Drill System'],
            commonComplications: ['Fracture displacement', 'Screw penetration', 'Blood loss'],
            specificSkills: [
              'C-arm positioning and interpretation',
              'Traction table setup and positioning',
              'Guide wire insertion assistance',
              'Reamer assembly and passing',
              'Cement mixing (if cemented)',
              'Lag screw insertion'
            ]
          },
          {
            name: 'Femoral IM Nailing',
            systems: ['Stryker T2 Femoral Nail', 'Synthes Expert Femoral Nail', 'Smith & Nephew Trigen'],
            implants: ['Long Femoral Nails', 'Short Femoral Nails', 'Reconstruction Nails'],
            instrumentation: ['Entry Point Instruments', 'Guide Wire Set', 'Reaming System', 'Proximal/Distal Locking'],
            equipment: ['C-arm', 'Traction Table', 'Power Reamer', 'Radiolucent Triangle'],
            specificSkills: [
              'Antegrade vs retrograde approach knowledge',
              'Reaming sequence understanding',
              'Proximal and distal locking',
              'Length measurement techniques'
            ]
          },
          {
            name: 'Tibial IM Nailing',
            systems: ['Stryker T2 Tibial Nail', 'Synthes Expert Tibial Nail', 'Smith & Nephew Trigen'],
            implants: ['Tibial Nails (Various Lengths)', 'Locking Screws'],
            instrumentation: ['Tibial Nail Set', 'Targeting Device', 'Reaming System'],
            equipment: ['C-arm', 'Leg Holder', 'Power Reamer'],
            specificSkills: [
              'Suprapatellar vs infrapatellar approach',
              'Targeting device assembly',
              'Blocking screw knowledge'
            ]
          },
          {
            name: 'Ankle Fracture ORIF',
            systems: ['Synthes Small Fragment System', 'Stryker VariAx', 'Acumed Acu-Loc'],
            implants: ['1/3 Tubular Plates', 'Locking Plates', 'Lag Screws', 'K-wires'],
            instrumentation: ['Small Fragment Set', 'Drill Bits', 'Tap Set', 'Wire Driver'],
            equipment: ['Mini C-arm', 'Pneumatic Tourniquet'],
            specificSkills: [
              'Malleolar fixation techniques',
              'Syndesmotic screw insertion',
              'Small fragment plating'
            ]
          },
          {
            name: 'Wrist Fracture ORIF',
            systems: ['Synthes Volar Locking Plate', 'Stryker VariAx', 'Acumed Acu-Loc'],
            implants: ['Volar Plates', 'Dorsal Plates', 'K-wires', 'External Fixator'],
            instrumentation: ['Small Fragment Set', 'K-wire Driver', 'Pin Cutter'],
            equipment: ['Mini C-arm', 'Hand Table', 'Tourniquet'],
            specificSkills: [
              'Distal radius plating',
              'K-wire insertion and tensioning',
              'External fixator application'
            ]
          }
        ]
      },
      'Hip & Knee Arthroplasty': {
        procedures: [
          {
            name: 'Total Hip Replacement (Cemented)',
            systems: ['Stryker Exeter/Trident', 'DePuy Corail/Pinnacle', 'Zimmer CPT/Trabecular Metal'],
            implants: ['Femoral Stems', 'Acetabular Cups', 'Femoral Heads', 'Liners (Ceramic/Polyethylene)'],
            instrumentation: ['Hip Trial Set', 'Acetabular Reamers', 'Femoral Rasps', 'Impactors', 'Cement Gun'],
            equipment: ['Laminar Flow', 'Pulse Lavage', 'Cement Mixing System', 'Diathermy'],
            specificSkills: [
              'Cemented vs uncemented technique',
              'Cup reaming and positioning (45° abduction, 20° anteversion)',
              'Femoral preparation and broaching',
              'Trial reduction and stability testing',
              'Cement mixing, pressurization and insertion',
              'Head and liner selection',
              'Leg length and offset assessment'
            ]
          },
          {
            name: 'Total Hip Replacement (Uncemented)',
            systems: ['Stryker Accolade/Trident', 'DePuy Corail/Pinnacle', 'Zimmer Taperloc/Trabecular Metal'],
            implants: ['Cementless Stems', 'Press-fit Cups', 'Heads', 'Liners'],
            instrumentation: ['Hip Trial Set', 'Acetabular Reamers', 'Broaches', 'Impactors'],
            equipment: ['Laminar Flow', 'Pulse Lavage', 'Power Reamer'],
            specificSkills: [
              'Press-fit technique',
              'Bone quality assessment',
              'Under-reaming concept',
              'Scratch-fit stems'
            ]
          },
          {
            name: 'Total Knee Replacement',
            systems: ['Stryker Triathlon', 'DePuy Attune', 'Zimmer Persona', 'Smith & Nephew Legion'],
            implants: ['Femoral Component', 'Tibial Baseplate', 'Tibial Insert', 'Patellar Button'],
            instrumentation: ['Cutting Blocks', 'Alignment Rods', 'Trial Components', 'Cement System'],
            equipment: ['Tourniquet', 'Pulse Lavage', 'Cement Gun', 'Oscillating Saw'],
            specificSkills: [
              'Mechanical alignment vs kinematic alignment',
              'Distal femoral resection (5-7° valgus)',
              'Tibial cut (0° or 3° posterior slope)',
              'Gap balancing vs measured resection',
              'Soft tissue releases',
              'Patellar resurfacing',
              'Cement technique in TKR'
            ]
          },
          {
            name: 'Unicompartmental Knee Replacement',
            systems: ['Zimmer UniSpacer', 'Oxford Partial Knee', 'Persona Partial'],
            implants: ['Femoral Component', 'Tibial Component', 'Mobile Bearing'],
            instrumentation: ['UKR Instrument Set', 'Spacer Blocks'],
            equipment: ['Tourniquet', 'Oscillating Saw'],
            specificSkills: [
              'Medial vs lateral UKR',
              'Fixed vs mobile bearing',
              'Minimal bone resection technique'
            ]
          },
          {
            name: 'Revision Hip Replacement',
            systems: ['Revision Stem Systems', 'Trabecular Metal Augments', 'Bone Graft'],
            implants: ['Revision Stems', 'Jumbo Cups', 'Augments', 'Cages'],
            instrumentation: ['Explant Set', 'Revision Reamers', 'Bone Graft Instruments'],
            equipment: ['Extended Instrument Sets', 'Gigli Saw'],
            specificSkills: [
              'Component removal techniques',
              'Bone loss management (Paprosky classification)',
              'Augment selection and placement',
              'Cement removal'
            ]
          }
        ]
      },
      'Shoulder': {
        procedures: [
          {
            name: 'Shoulder Replacement',
            systems: ['Zimmer Comprehensive Shoulder', 'DePuy Global Advantage', 'Tornier Aequalis'],
            implants: ['Humeral Stems', 'Glenoid Components', 'Humeral Heads', 'Reverse Components'],
            instrumentation: ['Shoulder Trial Set', 'Humeral Reamers', 'Glenoid Preparation'],
            equipment: ['Beach Chair Positioning', 'Arm Holder'],
            specificSkills: [
              'Anatomic vs reverse shoulder replacement',
              'Glenoid version and inclination',
              'Subscapularis management'
            ]
          },
          {
            name: 'Shoulder Arthroscopy',
            systems: ['Stryker Arthroscopy', 'Smith & Nephew Dyonics', 'Arthrex'],
            implants: ['Suture Anchors', 'Knotless Anchors', 'PEEK Anchors'],
            instrumentation: ['Arthroscope 30°/70°', 'Shavers', 'Burrs', 'Graspers', 'Suture Passers'],
            equipment: ['Arthroscopy Tower', 'Pump System', 'Radiofrequency Device', 'Beach Chair/Lateral Position'],
            specificSkills: [
              'Portal placement (posterior, anterior, lateral)',
              'Rotator cuff repair (single row, double row, transosseous)',
              'Labral repair (Bankart)',
              'Subacromial decompression',
              'AC joint excision',
              'Biceps tenodesis/tenotomy'
            ]
          }
        ]
      },
      'Spinal': {
        procedures: [
          {
            name: 'Lumbar Decompression (Laminectomy)',
            systems: ['Medtronic', 'DePuy Synthes', 'Stryker'],
            implants: ['None or Fusion Hardware'],
            instrumentation: ['Kerrison Rongeurs', 'Pituitary Rongeurs', 'Curettes', 'Nerve Root Retractors'],
            equipment: ['Operating Microscope', 'Loupe Magnification', 'Diathermy', 'Nerve Monitor'],
            specificSkills: [
              'Laminectomy vs laminotomy',
              'Nerve root identification',
              'Dural tear management',
              'Hemostasis in epidural space'
            ]
          },
          {
            name: 'Lumbar Fusion (PLIF/TLIF)',
            systems: ['Medtronic Solera', 'DePuy Expedium', 'Stryker Spine', 'NuVasive'],
            implants: ['Pedicle Screws', 'Rods', 'Interbody Cages', 'Bone Graft'],
            instrumentation: ['Pedicle Screw Set', 'Rod Benders', 'Impactors', 'Trials'],
            equipment: ['C-arm/O-arm', 'Neuromonitoring', 'Operating Microscope', 'Jackson Table'],
            specificSkills: [
              'Pedicle screw insertion (freehand vs navigated)',
              'Cage sizing and insertion',
              'Rod contouring and insertion',
              'PLIF (Posterior Lumbar Interbody Fusion) technique',
              'TLIF (Transforaminal Lumbar Interbody Fusion) technique',
              'Use of navigation systems'
            ]
          },
          {
            name: 'Cervical Fusion (ACDF)',
            systems: ['Medtronic Infuse', 'DePuy Synthes Zero-P', 'Globus Medical'],
            implants: ['Cervical Plates', 'Screws', 'Cages', 'Bone Graft'],
            instrumentation: ['Cervical Retractor System', 'Distraction Posts', 'Cervical Instrument Set'],
            equipment: ['C-arm', 'Operating Microscope', 'Neuromonitoring', 'Mayfield Head Holder'],
            specificSkills: [
              'Anterior approach to cervical spine',
              'Discectomy technique',
              'Cage insertion and positioning',
              'Plate application',
              'Screw trajectory safety'
            ]
          }
        ]
      },
      'Hand & Wrist': {
        procedures: [
          {
            name: 'Carpal Tunnel Release',
            systems: ['Open or Endoscopic'],
            implants: ['None'],
            instrumentation: ['Carpal Tunnel Knife', 'Retractors', 'Scissors'],
            equipment: ['Hand Table', 'Tourniquet', 'Loupe Magnification'],
            specificSkills: [
              'Median nerve identification',
              'Complete transverse carpal ligament division',
              'Hemostasis',
              'Wound closure techniques'
            ]
          },
          {
            name: "Dupuytren's Contracture Release",
            systems: ['Open Fasciectomy', 'Needle Aponeurotomy'],
            implants: ['None'],
            instrumentation: ['Fine Dissection Set', 'Skin Hooks'],
            equipment: ['Hand Table', 'Tourniquet', 'Loupe/Microscope'],
            specificSkills: [
              'Fascia identification and excision',
              'Neurovascular bundle protection',
              'Skin coverage techniques'
            ]
          },
          {
            name: 'Trigger Finger Release',
            systems: ['Open or Percutaneous'],
            implants: ['None'],
            instrumentation: ['Fine Blade', 'Scissors'],
            equipment: ['Hand Table', 'Tourniquet'],
            specificSkills: [
              'A1 pulley identification',
              'Complete pulley division',
              'Flexor tendon protection'
            ]
          }
        ]
      },
      'Foot & Ankle': {
        procedures: [
          {
            name: 'Bunion Correction (Scarf/Chevron Osteotomy)',
            systems: ['Synthes Small Fragment', 'Stryker Foot & Ankle'],
            implants: ['Screws', 'Plates', 'K-wires'],
            instrumentation: ['Osteotomy Saw', 'Small Fragment Set'],
            equipment: ['Mini C-arm', 'Tourniquet'],
            specificSkills: [
              'Osteotomy techniques',
              'Fixation methods',
              'Soft tissue balancing'
            ]
          },
          {
            name: 'Achilles Tendon Repair',
            systems: ['Open vs Percutaneous'],
            implants: ['Suture Material (Fibrewire/Ethibond)'],
            instrumentation: ['Tendon Repair Set'],
            equipment: ['None specific'],
            specificSkills: [
              'Tendon end preparation',
              'Whip stitch technique',
              'Kessler stitch',
              'Wound closure over tendon'
            ]
          }
        ]
      },
      'Paediatric Orthopaedics': {
        procedures: [
          {
            name: 'Supracondylar Fracture Fixation',
            systems: ['K-wire Fixation'],
            implants: ['Kirschner Wires'],
            instrumentation: ['Wire Driver', 'Wire Cutter', 'Pin Bender'],
            equipment: ['C-arm', 'Paediatric-sized instruments'],
            specificSkills: [
              'Paediatric anatomy knowledge',
              'Wire configuration (crossed vs lateral)',
              'Elbow positioning'
            ]
          }
        ]
      }
    },
    generalEquipment: [
      { name: 'C-arm Image Intensifier', manufacturers: ['Siemens', 'GE OEC', 'Ziehm'] },
      { name: 'Pneumatic Tourniquet', manufacturers: ['Zimmer ATS', 'Stryker'] },
      { name: 'Power Drill System', manufacturers: ['Stryker System 8', 'Synthes Power'] },
      { name: 'Oscillating Saw', manufacturers: ['Stryker', 'Synthes', 'DePuy'] },
      { name: 'Reciprocating Saw', manufacturers: ['Stryker', 'Synthes'] },
      { name: 'Pulse Lavage', manufacturers: ['Stryker SurgiLav', 'Zimmer Pulsavac'] },
      { name: 'Cement Mixing System', manufacturers: ['Stryker', 'DePuy SmartMix'] },
      { name: 'Diathermy (Monopolar/Bipolar)', manufacturers: ['Valleylab', 'Erbe'] },
      { name: 'Laminar Flow Theatre', manufacturers: ['Various'] }
    ]
  },

  'General Surgery': {
    icon: '🔪',
    description: 'General surgical procedures',
    subspecialties: {
      'Upper GI': {
        procedures: [
          {
            name: 'Laparoscopic Cholecystectomy',
            approach: 'Laparoscopic',
            instrumentation: ['5mm/10mm Trocars', 'Graspers', 'Dissector', 'Clip Applier', 'Laparoscope 30°'],
            equipment: ['Laparoscopy Stack', 'CO2 Insufflator', 'Camera System', 'Light Source', 'Energy Device (Harmonic/LigaSure)'],
            implants: ['Surgical Clips (Medium/Large)', 'Endobag'],
            specificSkills: [
              'Critical view of safety',
              'Calot\'s triangle dissection',
              'Clip application technique',
              'Specimen extraction',
              'Port site closure',
              'Recognition of anatomy variations'
            ]
          },
          {
            name: 'Open Cholecystectomy',
            approach: 'Open',
            instrumentation: ['General Laparotomy Set', 'Deaver Retractors', 'Langenbeck Retractors'],
            equipment: ['Diathermy', 'Suction'],
            implants: ['Sutures', 'Surgical Clips'],
            specificSkills: [
              'Kocher incision',
              'Calot\'s triangle exposure',
              'Clip vs suture ligation',
              'Drain insertion (if needed)'
            ]
          },
          {
            name: 'Laparoscopic Fundoplication (Nissen/Toupet)',
            approach: 'Laparoscopic',
            instrumentation: ['Trocars', 'Liver Retractor', 'Needle Holders', 'Graspers'],
            equipment: ['Laparoscopy Stack', 'Nathanson Retractor', 'Penrose Drain for traction'],
            implants: ['Sutures (Non-absorbable)', 'Mesh (if hiatus repair)'],
            specificSkills: [
              'Hiatus dissection',
              'Short gastric vessel division',
              'Fundal wrap creation (360° Nissen vs 270° Toupet)',
              'Crural repair',
              'Intracorporeal suturing'
            ]
          }
        ]
      },
      'Colorectal': {
        procedures: [
          {
            name: 'Right Hemicolectomy (Laparoscopic)',
            approach: 'Laparoscopic',
            instrumentation: ['Multiple Trocars', 'Graspers', 'Energy Device', 'Stapler'],
            equipment: ['Laparoscopy Stack', 'Linear Cutter Stapler (60/45mm)', 'Circular Stapler (if intracorporeal)'],
            implants: ['Staples', 'Sutures'],
            specificSkills: [
              'Medial to lateral mobilization',
              'Ileocolic vessel ligation',
              'Terminal ileum and transverse colon mobilization',
              'Extracorporeal vs intracorporeal anastomosis',
              'Stapled vs hand-sewn anastomosis',
              'CME (Complete Mesocolic Excision) technique'
            ]
          },
          {
            name: 'Anterior Resection',
            approach: 'Laparoscopic or Open',
            instrumentation: ['Laparoscopic/Open Set', 'Linear Cutter', 'Circular Stapler'],
            equipment: ['Laparoscopy Stack (if lap)', 'Circular Stapler (28/29/31mm)', 'Pelvic retractors'],
            implants: ['Staples', 'Sutures', 'Defunctioning ileostomy (if needed)'],
            specificSkills: [
              'TME (Total Mesorectal Excision) technique',
              'Rectal mobilization in holy plane',
              'IMA (Inferior Mesenteric Artery) ligation (high vs low tie)',
              'Circular stapled anastomosis',
              'Pelvic washout',
              'Leak test',
              'Defunctioning loop ileostomy formation'
            ]
          },
          {
            name: 'Laparoscopic Appendicectomy',
            approach: 'Laparoscopic',
            instrumentation: ['3x Trocars (5/10mm)', 'Graspers', 'Dissector', 'Clip Applier or Stapler'],
            equipment: ['Laparoscopy Stack', 'Endobag'],
            implants: ['Surgical Clips or Endoloop', 'Endo-GIA (if stapled)'],
            specificSkills: [
              'Appendix identification',
              'Mesoappendix division',
              'Base ligation (clips vs stapler vs loop)',
              'Specimen extraction in bag',
              'Peritoneal washout'
            ]
          },
          {
            name: 'Laparotomy (Emergency)',
            approach: 'Open',
            instrumentation: ['Major Laparotomy Set', 'Large Retractors', 'Bowel Clamps'],
            equipment: ['Rapid Infuser', 'Cell Saver', 'Diathermy', 'Suction'],
            implants: ['Mass Closure Suture (PDS Loop)', 'Staples for skin'],
            specificSkills: [
              'Midline laparotomy',
              'Four-quadrant exploration',
              'Damage control surgery principles',
              'Bowel anastomosis (hand-sewn vs stapled)',
              'Stoma formation (end vs loop)',
              'Mass closure technique',
              'Abdominal packing (if required)'
            ]
          },
          {
            name: 'Stoma Formation (Ileostomy/Colostomy)',
            approach: 'Open',
            instrumentation: ['Laparotomy Set', 'Bowel Instruments'],
            equipment: ['Diathermy'],
            implants: ['Sutures'],
            specificSkills: [
              'Stoma site marking',
              'Loop vs end stoma',
              'Trephine creation',
              'Bowel maturation',
              'Securing stoma to fascia'
            ]
          }
        ]
      },
      'Hernias': {
        procedures: [
          {
            name: 'Laparoscopic Inguinal Hernia Repair (TEP/TAPP)',
            approach: 'Laparoscopic',
            instrumentation: ['Trocars', 'Dissection Balloon (TEP)', 'Graspers', 'Tacker or Fibrin Glue'],
            equipment: ['Laparoscopy Stack'],
            implants: ['Mesh (10x15cm or 12x15cm)', 'Tacks/Glue for fixation'],
            specificSkills: [
              'TEP (Totally Extraperitoneal) vs TAPP (Transabdominal Preperitoneal)',
              'Dissection of preperitoneal space',
              'Identification of anatomical landmarks (pubic tubercle, iliac vessels, vas, testicular vessels)',
              'Mesh placement and fixation',
              'Avoiding "triangle of pain" and "triangle of doom"',
              'Peritoneal closure (TAPP)'
            ]
          },
          {
            name: 'Open Inguinal Hernia Repair (Lichtenstein)',
            approach: 'Open',
            instrumentation: ['Minor Set', 'Self-retaining retractor'],
            equipment: ['Diathermy'],
            implants: ['Mesh', 'Sutures (Prolene)'],
            specificSkills: [
              'Inguinal canal anatomy',
              'Mesh placement and fixation',
              'Cord structure protection',
              'Recognition of direct vs indirect hernia'
            ]
          },
          {
            name: 'Incisional Hernia Repair',
            approach: 'Open or Laparoscopic',
            instrumentation: ['Laparotomy Set or Laparoscopic Set', 'Large Retractors'],
            equipment: ['Laparoscopy Stack (if lap)'],
            implants: ['Large Mesh', 'Tacks or Sutures'],
            specificSkills: [
              'Adhesiolysis',
              'Mesh selection (size and type)',
              'Mesh positioning (underlay, onlay, inlay)',
              'Component separation technique (if required)'
            ]
          }
        ]
      },
      'Breast': {
        procedures: [
          {
            name: 'Wide Local Excision + Sentinel Node Biopsy',
            approach: 'Open',
            instrumentation: ['Minor Set', 'Langenbeck Retractors'],
            equipment: ['Gamma Probe', 'Blue Dye'],
            implants: ['Sutures', 'Clips for cavity marking'],
            specificSkills: [
              'Sentinel node identification with isotope and blue dye',
              'Wide local excision with margins',
              'Specimen orientation and marking',
              'Cavity clips insertion',
              'Oncoplastic techniques'
            ]
          },
          {
            name: 'Mastectomy (Simple/Skin-sparing/Nipple-sparing)',
            approach: 'Open',
            instrumentation: ['Major Set', 'Large Retractors'],
            equipment: ['Diathermy'],
            implants: ['Drains', 'Sutures', 'Implant (if immediate reconstruction)'],
            specificSkills: [
              'Skin flap creation',
              'Pectoralis major preservation',
              'Axillary dissection (if needed)',
              'Drain placement',
              'Immediate vs delayed reconstruction knowledge'
            ]
          }
        ]
      }
    },
    generalEquipment: [
      { name: 'Laparoscopy Tower', manufacturers: ['Stryker', 'Olympus', 'Storz'] },
      { name: 'Laparoscope (0°/30°/45°)', manufacturers: ['Stryker', 'Olympus', 'Storz'] },
      { name: 'Energy Devices (Harmonic/LigaSure/Thunderbeat)', manufacturers: ['Ethicon Harmonic', 'Medtronic LigaSure', 'Olympus Thunderbeat'] },
      { name: 'Linear Cutter Stapler', manufacturers: ['Ethicon Echelon', 'Medtronic Endo GIA', 'Covidien'] },
      { name: 'Circular Stapler', manufacturers: ['Ethicon CDH', 'Medtronic EEA'] },
      { name: 'Clip Applier', manufacturers: ['Ethicon', 'Medtronic Hem-o-lok'] },
      { name: 'Diathermy (Monopolar/Bipolar)', manufacturers: ['Valleylab', 'Erbe'] },
      { name: 'Suction/Irrigation', manufacturers: ['Various'] }
    ]
  },

  // Continue in next section...
};

// =============================================================================
// ANAESTHETIC NURSE/PRACTITIONER COMPETENCIES
// =============================================================================

export const ANAESTHETIC_COMPETENCIES = {
  'General Anaesthetic Skills': {
    icon: '💉',
    description: 'Core anaesthetic skills',
    competencies: [
      { id: 'machine-check', name: 'Anaesthetic Machine Check', critical: true },
      { id: 'drug-prep', name: 'Anaesthetic Drug Preparation', critical: true },
      { id: 'monitoring', name: 'Patient Monitoring Setup (ECG/NIBP/SpO2/EtCO2)', critical: true },
      { id: 'airway-equipment', name: 'Airway Equipment Preparation', critical: true },
      { id: 'difficult-airway-trolley', name: 'Difficult Airway Trolley Management', critical: true },
      { id: 'induction-assistance', name: 'Induction Assistance', critical: true },
      { id: 'intubation-assistance', name: 'Intubation Assistance', critical: false },
      { id: 'lma-insertion', name: 'LMA Insertion Assistance', critical: false },
      { id: 'iv-access', name: 'IV Access & Cannulation', critical: true },
      { id: 'arterial-line', name: 'Arterial Line Setup & Assistance', critical: false },
      { id: 'cvp-line', name: 'Central Line Setup & Assistance', critical: false },
      { id: 'patient-positioning', name: 'Positioning for Anaesthesia', critical: true },
      { id: 'temperature-management', name: 'Temperature Management (Warming Devices)', critical: false },
      { id: 'fluid-management', name: 'Fluid Management & Administration', critical: true },
      { id: 'blood-products', name: 'Blood Product Administration', critical: true },
      { id: 'emergency-drugs', name: 'Emergency Drug Knowledge & Preparation', critical: true },
      { id: 'anaphylaxis', name: 'Anaphylaxis Management', critical: true },
      { id: 'malignant-hyperthermia', name: 'Malignant Hyperthermia Protocol', critical: true },
      { id: 'failed-intubation', name: 'Failed Intubation Drill', critical: true },
      { id: 'recovery-handover', name: 'Recovery Handover', critical: true }
    ]
  },

  'Airway Management': {
    icon: '🫁',
    description: 'Airway devices and techniques',
    equipment: [
      {
        name: 'Laryngoscopes',
        types: ['Macintosh Blades (Size 2, 3, 4)', 'Miller Blades (Size 1, 2, 3)', 'McCoy Blade', 'Paediatric Blades'],
        manufacturers: ['Welch Allyn', 'Heine', 'Penlon'],
        skills: ['Blade selection', 'Light check', 'Intubation assistance', 'BURP manoeuvre']
      },
      {
        name: 'Video Laryngoscopes',
        types: ['McGrath', 'GlideScope', 'C-MAC', 'Airtraq'],
        manufacturers: ['Medtronic', 'Verathon', 'Storz', 'Prodol'],
        skills: ['Setup and calibration', 'Screen positioning', 'Stylet preparation', 'Difficult airway use']
      },
      {
        name: 'Endotracheal Tubes',
        types: ['Standard ETT (Size 6.0-9.0)', 'Cuffed vs Uncuffed', 'Reinforced Tubes', 'Microlaryngeal Tubes', 'RAE Tubes (North/South)', 'Double Lumen Tubes'],
        manufacturers: ['Portex', 'Mallinckrodt', 'Covidien'],
        skills: ['Size selection', 'Cuff checking', 'Tube securing', 'Cuff pressure monitoring']
      },
      {
        name: 'Supraglottic Airways (LMA)',
        types: ['LMA Classic', 'LMA Proseal', 'LMA Supreme', 'i-gel', 'Air-Q'],
        manufacturers: ['Teleflex', 'Intersurgical', 'Cookgas'],
        skills: ['Size selection', 'Insertion technique', 'Cuff inflation', 'Position checking']
      },
      {
        name: 'Bougie & Introducers',
        types: ['Gum Elastic Bougie', 'Frova Intubating Catheter', 'Aintree Catheter'],
        manufacturers: ['Various'],
        skills: ['Bougie insertion', 'Railroading ETT', 'Confirmation of tracheal placement']
      },
      {
        name: 'Oropharyngeal & Nasopharyngeal Airways',
        types: ['Guedel Airways (Size 1-5)', 'Nasopharyngeal Airways'],
        manufacturers: ['Various'],
        skills: ['Size selection', 'Insertion technique']
      },
      {
        name: 'Emergency Airway Equipment',
        types: ['Cricothyroidotomy Kit', 'Scalpel-Bougie-Tube Technique', 'Needle Cricothyroidotomy'],
        manufacturers: ['Cook', 'Portex'],
        skills: ['Can\'t intubate, can\'t oxygenate scenario', 'Emergency front of neck access']
      }
    ]
  },

  'Regional Anaesthesia': {
    icon: '💊',
    description: 'Regional blocks and techniques',
    blocks: [
      {
        name: 'Spinal Anaesthesia',
        equipment: ['Spinal Needles (22G, 25G, 27G Pencil Point)', 'Local Anaesthetic (Heavy vs Plain Bupivacaine)', 'Introducer'],
        manufacturers: ['B Braun', 'BD'],
        skills: [
          'Patient positioning (sitting vs lateral)',
          'Landmark identification (L3/L4 or L4/L5)',
          'Aseptic technique',
          'CSF confirmation',
          'Drug dose calculation',
          'Level monitoring',
          'Hypotension management'
        ]
      },
      {
        name: 'Epidural Anaesthesia',
        equipment: ['Epidural Kit (Tuohy Needle 16G/18G)', 'Loss of Resistance Syringe', 'Epidural Catheter', 'Filter', 'Pump'],
        manufacturers: ['B Braun Perifix', 'Smiths Portex'],
        skills: [
          'Loss of resistance technique (air vs saline)',
          'Catheter threading',
          'Test dose administration',
          'Securing catheter',
          'Top-up vs infusion'
        ]
      },
      {
        name: 'Peripheral Nerve Blocks',
        types: [
          'Interscalene Block (Shoulder surgery)',
          'Supraclavicular Block',
          'Axillary Block',
          'Femoral Nerve Block',
          'Sciatic Nerve Block',
          'Adductor Canal Block',
          'Popliteal Block',
          'TAP Block (Transversus Abdominis Plane)',
          'Rectus Sheath Block',
          'Pecs Block (Breast surgery)'
        ],
        equipment: ['Ultrasound Machine', 'Block Needles (50mm, 80mm, 100mm)', 'Local Anaesthetic', 'Nerve Stimulator'],
        manufacturers: ['SonoSite', 'GE Logiq', 'B Braun Stimuplex'],
        skills: [
          'Ultrasound probe handling',
          'Nerve identification',
          'Needle visualization',
          'Local anaesthetic spread assessment',
          'Catheter insertion (for continuous blocks)'
        ]
      }
    ]
  },

  'Monitoring Equipment': {
    icon: '📊',
    description: 'Monitoring devices and setup',
    equipment: [
      {
        name: 'Standard Monitoring',
        devices: [
          { name: 'ECG', skills: ['Lead placement (3 or 5 lead)', 'Rhythm recognition'] },
          { name: 'NIBP (Non-invasive Blood Pressure)', skills: ['Cuff size selection', 'Interval setting'] },
          { name: 'SpO2 (Pulse Oximetry)', skills: ['Probe placement', 'Waveform interpretation'] },
          { name: 'EtCO2 (Capnography)', skills: ['Capnography waveform interpretation', 'Sampling line connection'] },
          { name: 'Temperature Monitoring', skills: ['Core vs peripheral temperature'] }
        ]
      },
      {
        name: 'Invasive Monitoring',
        devices: [
          { name: 'Arterial Line', skills: ['Transducer setup', 'Zeroing', 'Waveform interpretation', 'Blood gas sampling'] },
          { name: 'Central Venous Pressure (CVP)', skills: ['CVP line setup', 'Transducer zeroing', 'CVP measurement'] },
          { name: 'Cardiac Output Monitoring (FloTrac/PiCCO)', skills: ['Setup and calibration', 'SVV/PPV monitoring'] }
        ]
      },
      {
        name: 'Advanced Monitoring',
        devices: [
          { name: 'TOF (Train of Four) - Neuromuscular Monitoring', skills: ['Electrode placement', 'TOF ratio interpretation'] },
          { name: 'BIS (Bispectral Index) - Depth of Anaesthesia', skills: ['Sensor placement', 'BIS value interpretation'] },
          { name: 'Transoesophageal Echocardiography (TOE)', skills: ['Probe insertion assistance', 'Basic image interpretation'] }
        ]
      }
    ]
  },

  'Anaesthetic Drugs': {
    icon: '💊',
    description: 'Drug preparation and administration',
    categories: [
      {
        name: 'Induction Agents',
        drugs: ['Propofol', 'Thiopentone', 'Etomidate', 'Ketamine'],
        skills: ['Dose calculation', 'Dilution if needed', 'Injection technique', 'Monitoring for apnoea']
      },
      {
        name: 'Muscle Relaxants',
        drugs: [
          'Suxamethonium (Depolarizing)',
          'Rocuronium (Non-depolarizing)',
          'Atracurium (Non-depolarizing)',
          'Vecuronium (Non-depolarizing)',
          'Mivacurium (Non-depolarizing)'
        ],
        reversal: ['Neostigmine + Glycopyrrolate', 'Sugammadex'],
        skills: ['Dose calculation', 'TOF monitoring', 'Reversal timing']
      },
      {
        name: 'Opioids',
        drugs: ['Fentanyl', 'Alfentanil', 'Remifentanil', 'Morphine'],
        skills: ['Dose calculation', 'Infusion preparation', 'Respiratory depression monitoring']
      },
      {
        name: 'Volatile Anaesthetics',
        agents: ['Sevoflurane', 'Isoflurane', 'Desflurane'],
        skills: ['Vaporizer filling', 'MAC (Minimum Alveolar Concentration) knowledge', 'Agent monitoring']
      },
      {
        name: 'Local Anaesthetics',
        drugs: ['Lidocaine', 'Bupivacaine (Levobupivacaine)', 'Ropivacaine', 'Prilocaine'],
        skills: ['Maximum dose calculation', 'Toxic dose recognition', 'Lipid emulsion therapy (if toxicity)']
      },
      {
        name: 'Emergency Drugs',
        drugs: [
          'Adrenaline',
          'Atropine',
          'Ephedrine',
          'Metaraminol',
          'Phenylephrine',
          'Amiodarone',
          'Sodium Bicarbonate',
          'Calcium Chloride',
          'Dantrolene (Malignant Hyperthermia)'
        ],
        skills: ['Emergency drug doses', 'Preparation for cardiac arrest', 'Anaphylaxis management']
      },
      {
        name: 'Antiemetics',
        drugs: ['Ondansetron', 'Cyclizine', 'Dexamethasone', 'Droperidol'],
        skills: ['PONV (Post-operative Nausea & Vomiting) prophylaxis']
      }
    ]
  },

  'Specialist Anaesthesia': {
    icon: '🏥',
    description: 'Specialist anaesthetic scenarios',
    scenarios: [
      {
        name: 'Cardiac Anaesthesia',
        skills: [
          'Cardiac monitoring setup',
          'TOE probe insertion',
          'Arterial line + CVP setup',
          'Cardiopulmonary bypass preparation',
          'Heparin/protamine administration',
          'Blood product management',
          'Inotrope/vasopressor infusions'
        ]
      },
      {
        name: 'Neurosurgery Anaesthesia',
        skills: [
          'Arterial line for tight BP control',
          'Head-up positioning',
          'Pin head-holder setup',
          'Mannitol/hypertonic saline preparation',
          'Neurological monitoring assistance',
          'Awake craniotomy assistance'
        ]
      },
      {
        name: 'Obstetric Anaesthesia',
        skills: [
          'Epidural top-ups for labour',
          'Spinal anaesthesia for C-section',
          'General anaesthesia for crash C-section',
          'Failed intubation drill in obstetrics',
          'Uterotonics (Oxytocin, Ergometrine, Carboprost)',
          'Postpartum haemorrhage management'
        ]
      },
      {
        name: 'Paediatric Anaesthesia',
        skills: [
          'Paediatric drug dose calculation',
          'Inhalational induction',
          'IV induction (if cooperative)',
          'Paediatric airway equipment selection',
          'Laryngospasm management',
          'Paediatric fluid resuscitation'
        ]
      },
      {
        name: 'Day Surgery Anaesthesia',
        skills: [
          'TIVA (Total Intravenous Anaesthesia) setup',
          'Short-acting agents',
          'LMA use',
          'Multimodal analgesia',
          'Fast-track recovery'
        ]
      }
    ]
  }
};

// =============================================================================
// HEALTHCARE ASSISTANT (HCA) COMPETENCIES
// =============================================================================

export const HCA_COMPETENCIES = {
  'Theatre Preparation': {
    icon: '🧹',
    description: 'Pre-operative theatre setup',
    competencies: [
      { id: 'theatre-cleaning', name: 'Theatre Cleaning & Decontamination', critical: true },
      { id: 'equipment-cleaning', name: 'Equipment Cleaning Protocols', critical: true },
      { id: 'stock-checking', name: 'Stock Checking & Replenishment', critical: false },
      { id: 'equipment-checks', name: 'Equipment Safety Checks', critical: true },
      { id: 'trolley-prep', name: 'Trolley Preparation', critical: false },
      { id: 'linen-management', name: 'Linen & Drape Management', critical: false }
    ]
  },

  'Operating Table Setup': {
    icon: '🛏️',
    description: 'Operating table and positioning equipment',
    equipment: [
      {
        name: 'Operating Table',
        types: ['Maquet Alphamaxx', 'Trumpf', 'Steris', 'Stryker'],
        skills: [
          'Table height adjustment',
          'Trendelenburg/Reverse Trendelenburg',
          'Lateral tilt',
          'Table top sections (head/back/leg/foot)',
          'Emergency table release',
          'Table positioning for different specialties'
        ]
      },
      {
        name: 'Table Attachments & Accessories',
        items: [
          { name: 'Arm Boards', skills: ['Attachment', 'Padding', 'Angle adjustment'] },
          { name: 'Leg Supports (Lithotomy)', skills: ['Allen stirrups', 'Lloyd-Davies stirrups', 'Safe positioning'] },
          { name: 'Head Ring/Horseshoe', skills: ['Padding and positioning'] },
          { name: 'Mayfield Head Holder (Neurosurgery)', skills: ['Pin positioning', 'Sterilization'] },
          { name: 'Shoulder Supports', skills: ['Attachment and padding'] },
          { name: 'Lateral Supports', skills: ['Positioning for lateral decubitus'] },
          { name: 'Body Straps', skills: ['Secure fastening', 'Pressure area avoidance'] }
        ]
      },
      {
        name: 'Positioning Aids',
        items: [
          { name: 'Gel Pads', skills: ['Pressure area protection', 'Heels, elbows, sacrum'] },
          { name: 'Pillows & Blankets', skills: ['Support and padding'] },
          { name: 'Vacuum Bean Bags', skills: ['Moulding to patient', 'Vacuum pump use'] },
          { name: 'Arm Slings', skills: ['Support during lateral positioning'] }
        ]
      }
    ]
  },

  'Patient Care': {
    icon: '👤',
    description: 'Direct patient care activities',
    competencies: [
      { id: 'patient-transfer', name: 'Patient Transfer (Bed to Table)', critical: true },
      { id: 'manual-handling', name: 'Safe Manual Handling', critical: true },
      { id: 'patient-dignity', name: 'Patient Dignity & Privacy', critical: true },
      { id: 'patient-warming', name: 'Patient Warming (Bair Hugger)', critical: false },
      { id: 'pressure-area-care', name: 'Pressure Area Care', critical: true },
      { id: 'positioning-assistance', name: 'Positioning Assistance', critical: true },
      { id: 'skin-preparation', name: 'Skin Preparation (Clipping)', critical: false }
    ]
  },

  'Equipment Management': {
    icon: '⚙️',
    description: 'Theatre equipment handling',
    equipment: [
      {
        name: 'Suction Equipment',
        types: ['Wall Suction', 'Portable Suction Units', 'Yankauer Suckers'],
        skills: ['Suction setup', 'Tubing connection', 'Bottle changing', 'Suction level adjustment']
      },
      {
        name: 'Diathermy',
        types: ['Monopolar Diathermy', 'Bipolar Diathermy'],
        skills: ['Patient plate placement', 'Cable connection', 'Smoke evacuation setup', 'Safety checks']
      },
      {
        name: 'Tourniquets',
        types: ['Pneumatic Tourniquet (Arm/Leg)', 'Zimmer ATS', 'Stryker'],
        skills: ['Cuff sizing', 'Cuff placement and padding', 'Pressure setting', 'Tourniquet time monitoring']
      },
      {
        name: 'Warming Devices',
        types: ['Bair Hugger', 'Hot Dog Warming System', 'Fluid Warmer'],
        skills: ['Blanket placement', 'Temperature monitoring', 'Fluid warmer priming']
      },
      {
        name: 'Patient Warming Blankets',
        types: ['Forced Air Warming', 'Heated Blankets'],
        skills: ['Safe positioning', 'Avoiding burns']
      },
      {
        name: 'Imaging Equipment',
        types: ['C-arm Image Intensifier', 'X-ray Machine'],
        skills: ['Positioning assistance', 'Lead apron use', 'Radiation safety']
      }
    ]
  },

  'Instrument Management': {
    icon: '🔧',
    description: 'Instrument handling and processing',
    competencies: [
      { id: 'instrument-counting', name: 'Instrument Counting (Pre-operative)', critical: true },
      { id: 'tray-checking', name: 'Tray Checking & Preparation', critical: false },
      { id: 'instrument-handling', name: 'Safe Instrument Handling', critical: true },
      { id: 'sharps-management', name: 'Sharps Management', critical: true },
      { id: 'instrument-decontamination', name: 'Instrument Decontamination', critical: true },
      { id: 'sterilization', name: 'Sterilization Processes (Autoclave)', critical: false },
      { id: 'instrument-tracking', name: 'Instrument Tracking Systems', critical: false }
    ]
  },

  'Waste Management': {
    icon: '🗑️',
    description: 'Clinical waste handling',
    competencies: [
      { id: 'clinical-waste', name: 'Clinical Waste Segregation', critical: true },
      { id: 'sharps-disposal', name: 'Sharps Disposal', critical: true },
      { id: 'cytotoxic-waste', name: 'Cytotoxic Waste Handling', critical: false },
      { id: 'linen-disposal', name: 'Contaminated Linen Disposal', critical: true }
    ]
  },

  'Infection Control': {
    icon: '🦠',
    description: 'Infection prevention and control',
    competencies: [
      { id: 'hand-hygiene', name: 'Hand Hygiene & WHO 5 Moments', critical: true },
      { id: 'ppe', name: 'PPE Use (Gloves/Aprons/Masks)', critical: true },
      { id: 'aseptic-technique', name: 'Aseptic Non-Touch Technique', critical: true },
      { id: 'spillage-management', name: 'Blood/Body Fluid Spillage Management', critical: true },
      { id: 'isolation-precautions', name: 'Isolation Precautions', critical: true }
    ]
  }
};

// =============================================================================
// SURGICAL CARE PRACTITIONER COMPETENCIES
// =============================================================================

export const SCP_COMPETENCIES = {
  'Surgical Assisting': {
    icon: '🩺',
    description: 'Advanced surgical assistance skills',
    competencies: [
      { id: 'first-assist', name: 'First Assisting at Surgery', critical: true },
      { id: 'tissue-handling', name: 'Tissue Handling & Retraction', critical: true },
      { id: 'haemostasis', name: 'Haemostasis Techniques', critical: true },
      { id: 'suturing', name: 'Suturing (Simple/Subcuticular/Layered)', critical: true },
      { id: 'wound-closure', name: 'Wound Closure Techniques', critical: true },
      { id: 'knot-tying', name: 'Surgical Knot Tying (One-handed/Two-handed)', critical: true },
      { id: 'dissection', name: 'Surgical Dissection Techniques', critical: true },
      { id: 'camera-holding', name: 'Camera Holding (Laparoscopy)', critical: false },
      { id: 'drain-insertion', name: 'Surgical Drain Insertion', critical: false }
    ]
  },

  'Minor Procedures': {
    icon: '🔪',
    description: 'Independent minor surgical procedures',
    procedures: [
      { name: 'Wound Debridement', skills: ['Sharp debridement', 'Wound bed preparation'] },
      { name: 'Abscess Incision & Drainage', skills: ['Incision', 'Drainage', 'Packing'] },
      { name: 'Skin Lesion Excision', skills: ['Elliptical excision', 'Primary closure'] },
      { name: 'Ingrown Toenail Surgery', skills: ['Wedge excision', 'Phenol application'] },
      { name: 'Joint Aspiration/Injection', skills: ['Aseptic technique', 'Aspiration', 'Steroid injection'] }
    ]
  },

  'Endoscopy Skills': {
    icon: '🔬',
    description: 'Endoscopic procedures (if trained)',
    competencies: [
      { id: 'flexible-endoscopy', name: 'Flexible Endoscopy Assistance', critical: false },
      { id: 'colonoscopy-assist', name: 'Colonoscopy Assistance', critical: false },
      { id: 'gastroscopy-assist', name: 'Gastroscopy Assistance', critical: false },
      { id: 'biopsy-taking', name: 'Endoscopic Biopsy Technique', critical: false }
    ]
  },

  'Clinical Assessment': {
    icon: '📋',
    description: 'Pre and post-operative assessment',
    competencies: [
      { id: 'pre-op-assessment', name: 'Pre-operative Assessment', critical: true },
      { id: 'consent', name: 'Informed Consent Process', critical: false },
      { id: 'history-taking', name: 'Surgical History Taking', critical: true },
      { id: 'examination', name: 'Physical Examination', critical: true },
      { id: 'post-op-review', name: 'Post-operative Review', critical: true },
      { id: 'complication-recognition', name: 'Complication Recognition', critical: true },
      { id: 'wound-assessment', name: 'Wound Assessment & Management', critical: true }
    ]
  }
};

// =============================================================================
// THEATRE NURSING ASSISTANT COMPETENCIES
// =============================================================================

export const TNA_COMPETENCIES = {
  'Support Duties': {
    icon: '🤝',
    description: 'Supporting theatre team',
    competencies: [
      { id: 'runner-role', name: 'Theatre Runner Role', critical: false },
      { id: 'supply-management', name: 'Supply Fetching & Management', critical: false },
      { id: 'communication', name: 'Team Communication', critical: true },
      { id: 'equipment-transfer', name: 'Equipment Transfer Between Theatres', critical: false },
      { id: 'porter-liaison', name: 'Porter & Logistics Liaison', critical: false }
    ]
  },

  'Basic Patient Care': {
    icon: '💙',
    description: 'Patient care support',
    competencies: [
      { id: 'patient-escort', name: 'Patient Escorting', critical: false },
      { id: 'patient-comfort', name: 'Patient Comfort & Reassurance', critical: true },
      { id: 'basic-observations', name: 'Basic Observations (with supervision)', critical: false }
    ]
  },

  'Theatre Support': {
    icon: '🏗️',
    description: 'General theatre support',
    competencies: [
      { id: 'cleaning-support', name: 'Theatre Cleaning Support', critical: false },
      { id: 'equipment-moving', name: 'Equipment Moving & Setup', critical: false },
      { id: 'stock-rotation', name: 'Stock Rotation & Checking', critical: false },
      { id: 'waste-disposal', name: 'General Waste Disposal', critical: true }
    ]
  }
};

// Export all competency structures
export const ALL_ROLE_COMPETENCIES = {
  'Scrub Nurse/Practitioner': SCRUB_COMPETENCIES,
  'Anaesthetic Nurse/Practitioner': ANAESTHETIC_COMPETENCIES,
  'Healthcare Assistant (HCA)': HCA_COMPETENCIES,
  'Surgical Care Practitioner': SCP_COMPETENCIES,
  'Theatre Nurse Assistant': TNA_COMPETENCIES
};
