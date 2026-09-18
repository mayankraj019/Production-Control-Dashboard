import { Job } from "@/types/job";

/**
 * Realistic Mock Dataset for Factory Production Operations.
 * Reference Date Context: 2026-09-18 (Current production day)
 */
export const MOCK_JOBS: Job[] = [
  // --- IN PROGRESS JOBS ---
  {
    id: "JOB-2026-0101",
    productName: "High-Pressure Hydraulic Manifold",
    customer: "Vanguard Aerospace",
    quantity: 120,
    dueDate: "2026-09-18", // Due Today
    status: "In Progress",
    assignedMachine: "5-Axis CNC Mill #02 (Makino D500)",
    notes: null,
  },
  {
    id: "JOB-2026-0102",
    productName: "Brake Caliper Mounting Bracket",
    customer: "Apex Automotive OEM",
    quantity: 850,
    dueDate: "2026-09-18", // Due Today
    status: "In Progress",
    assignedMachine: "Automated Vertical Mill #04 (Haas VF-4SS)",
    notes: null,
  },
  {
    id: "JOB-2026-0103",
    productName: "Titanium Spinal Fixation Rods",
    customer: "Nordic MedTech Systems",
    quantity: 45,
    dueDate: "2026-09-19", // Due Tomorrow
    status: "In Progress",
    assignedMachine: "Swiss Lathe Cell #01 (Citizen Cincom)",
    notes: "Batch 1 passed optical micrometer inspection (tolerance within ±0.003mm).",
  },
  {
    id: "JOB-2026-0104",
    productName: "Industrial Gearbox Sun Gear",
    customer: "Krupp Heavy Machinery",
    quantity: 340,
    dueDate: "2026-09-22", // Due Later
    status: "In Progress",
    assignedMachine: "Gear Hobbing Machine #01 (Gleason)",
    notes: null,
  },
  {
    id: "JOB-2026-0105",
    productName: "Inverter Power Module Enclosure",
    customer: "Stellar EV Dynamics",
    quantity: 1200,
    dueDate: "2026-09-24", // Due Later
    status: "In Progress",
    assignedMachine: "Die Casting Cell #03 (Bühler 400T)",
    notes: null,
  },

  // --- DELAYED JOBS (With realistic operational issues) ---
  {
    id: "JOB-2026-0106",
    productName: "Turbine Exhaust Flange 316L",
    customer: "Precision Energy Turbines",
    quantity: 60,
    dueDate: "2026-09-18", // Due Today - Delayed!
    status: "Delayed",
    assignedMachine: "Horizontal Machining Center #01 (Mazak)",
    notes: "Spindle vibration exceeded threshold (0.42 mm/s). Machine halted; maintenance team replacing ceramic main bearings.",
  },
  {
    id: "JOB-2026-0107",
    productName: "Robotic Articulation Joint Arm",
    customer: "AeroDynamics Corp",
    quantity: 250,
    dueDate: "2026-09-19", // Due Tomorrow - Delayed!
    status: "Delayed",
    assignedMachine: "Robotic Welding Bay #02 (KUKA)",
    notes: "Shielding gas mixture sensor triggered flow alert. Awaiting Argon cylinder manifold replenishment.",
  },
  {
    id: "JOB-2026-0108",
    productName: "Precision Linear Guide Rails",
    customer: "Sumitomo Motion Systems",
    quantity: 400,
    dueDate: "2026-09-21", // Due Later - Delayed!
    status: "Delayed",
    assignedMachine: "Surface Grinding Station #03 (Okamoto)",
    notes: "Material hardness non-conformance detected on incoming heat-treated 52100 bearing steel lot #B492. Hold placed by QC.",
  },
  {
    id: "JOB-2026-0109",
    productName: "Hermetic Connector Backshell",
    customer: "Defense Avionics Lab",
    quantity: 180,
    dueDate: "2026-09-20", // Due Later - Delayed!
    status: "Delayed",
    assignedMachine: "Multi-Axis CNC Lathe #02 (Doosan Puma)",
    notes: "Carbide threading tool chipped at piece #78. Replacement tooling requested from tool crib; delivery delayed by 4 hours.",
  },

  // --- PENDING JOBS (Scheduled in queue) ---
  {
    id: "JOB-2026-0110",
    productName: "Dual-Stage Fuel Injector Body",
    customer: "Continental Diesel Systems",
    quantity: 1500,
    dueDate: "2026-09-19", // Due Tomorrow
    status: "Pending",
    assignedMachine: "Automated Vertical Mill #04 (Haas VF-4SS)",
    notes: "Scheduled to load immediately after JOB-2026-0102 completes changeover.",
  },
  {
    id: "JOB-2026-0111",
    productName: "Semiconductor Wafer Chuck Plate",
    customer: "Kyoto Microelectronics",
    quantity: 25,
    dueDate: "2026-09-20", // Due Later
    status: "Pending",
    assignedMachine: "Ultra-Precision Lapping Cell #01",
    notes: "Silicon carbide fixtures prepped and cleaned in Class 1000 cleanroom.",
  },
  {
    id: "JOB-2026-0112",
    productName: "Heavy Duty Suspension Kingpin",
    customer: "Apex Automotive OEM",
    quantity: 600,
    dueDate: "2026-09-23", // Due Later
    status: "Pending",
    assignedMachine: "Induction Hardening Unit #02",
    notes: null,
  },
  {
    id: "JOB-2026-0113",
    productName: "Composite Drone Airframe Ribs",
    customer: "Vanguard Aerospace",
    quantity: 90,
    dueDate: "2026-09-25", // Due Later
    status: "Pending",
    assignedMachine: "5-Axis CNC Router #01 (CR Onsrud)",
    notes: null,
  },
  {
    id: "JOB-2026-0114",
    productName: "Cryogenic Ball Valve Stems",
    customer: "Precision Energy Turbines",
    quantity: 320,
    dueDate: "2026-09-28", // Due Later
    status: "Pending",
    assignedMachine: "Horizontal Machining Center #01 (Mazak)",
    notes: "Raw Monel 400 bar stock staged at staging rack B-12.",
  },

  // --- COMPLETED JOBS (Successfully finished & inspected) ---
  {
    id: "JOB-2026-0115",
    productName: "Steering Column Spline Shaft",
    customer: "Bavaria Auto Systems",
    quantity: 2200,
    dueDate: "2026-09-18", // Due Today - Completed on schedule
    status: "Completed",
    assignedMachine: "Rotary Cold Spline Former #01",
    notes: "100% automated eddy-current inspection passed with zero defect reports. Transferred to packing.",
  },
  {
    id: "JOB-2026-0116",
    productName: "Endoscopic Camera Housing",
    customer: "Nordic MedTech Systems",
    quantity: 350,
    dueDate: "2026-09-17", // Completed yesterday
    status: "Completed",
    assignedMachine: "Swiss Lathe Cell #01 (Citizen Cincom)",
    notes: "Passivated per ASTM A967 and sealed for sterile logistics delivery.",
  },
  {
    id: "JOB-2026-0117",
    productName: "High-Temperature Heat Exchanger Core",
    customer: "Precision Energy Turbines",
    quantity: 40,
    dueDate: "2026-09-17", // Completed yesterday
    status: "Completed",
    assignedMachine: "Vacuum Brazing Furnace #01",
    notes: "Helium leak rate tested: < 1.0 x 10^-9 mbar·l/s. Quality Certificate QC-8821 attached.",
  },
  {
    id: "JOB-2026-0118",
    productName: "Optical Sensor Gimbal Ring",
    customer: "Defense Avionics Lab",
    quantity: 75,
    dueDate: "2026-09-18", // Due Today - Completed
    status: "Completed",
    assignedMachine: "5-Axis CNC Mill #02 (Makino D500)",
    notes: "Black anodized finish uniform; CMM dimensional check verified 100% conformance.",
  },
];
