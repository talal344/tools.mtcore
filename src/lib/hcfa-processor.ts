import * as XLSX from 'xlsx';
import { PDFDocument, rgb, StandardFonts, PDFTextField, PDFCheckBox, PDFRadioGroup, PDFFont, PDFPage } from 'pdf-lib';
import JSZip from 'jszip';

export interface ClaimLine {
  ClaimID: string;
  PatientName: string;
  DOB: string;
  InsuredID: string;
  PatientAddress: string;
  DOS: string;
  POS: string;
  CPT: string;
  DXPointer: string;
  Charge: string;
  Units: string;
  TotalCharge?: string;
  BillingNPI?: string;
  [key: string]: string | number | boolean | null | undefined; // Allow typing indexing
}
const CLAIM_TEXT_FIELDS: Record<string, string> = {
  insurance_name: "insurance_name",
  insurance_address: "insurance_address",
  insurance_address2: "insurance_address2",
  insurance_city_state_zip: "insurance_city_state_zip",
  insurance_id: "insurance_id",
  pt_name: "pt_name",
  birth_mm: "birth_mm",
  birth_dd: "birth_dd",
  birth_yy: "birth_yy",
  pt_street: "pt_street",
  pt_city: "pt_city",
  pt_state: "pt_state",
  pt_zip: "pt_zip",
  pt_AreaCode: "pt_AreaCode",
  pt_phone: "pt_phone",
  ins_name: "ins_name",
  ins_street: "ins_street",
  ins_city: "ins_city",
  ins_state: "ins_state",
  ins_zip: "ins_zip",
  "ins_phone area": "ins_phone area",
  ins_phone: "ins_phone",
  ins_policy: "ins_policy",
  ins_dob_mm: "ins_dob_mm",
  ins_dob_dd: "ins_dob_dd",
  ins_dob_yy: "ins_dob_yy",
  other_ins_name: "other_ins_name",
  other_ins_policy: "other_ins_policy",
  other_ins_plan_name: "other_ins_plan_name",
  ins_benefit_plan: "ins_benefit_plan",
  ins_plan_name: "ins_plan_name",
  pt_signature: "pt_signature",
  pt_date: "pt_date",
  ins_signature: "ins_signature",
  cur_ill_mm: "cur_ill_mm",
  cur_ill_dd: "cur_ill_dd",
  cur_ill_yy: "cur_ill_yy",
  sim_ill_mm: "sim_ill_mm",
  sim_ill_dd: "sim_ill_dd",
  sim_ill_yy: "sim_ill_yy",
  work_mm_from: "work_mm_from",
  work_dd_from: "work_dd_from",
  work_yy_from: "work_yy_from",
  work_mm_end: "work_mm_end",
  work_dd_end: "work_dd_end",
  work_yy_end: "work_yy_end",
  hosp_mm_from: "hosp_mm_from",
  hosp_dd_from: "hosp_dd_from",
  hosp_yy_from: "hosp_yy_from",
  hosp_mm_end: "hosp_mm_end",
  hosp_dd_end: "hosp_dd_end",
  hosp_yy_end: "hosp_yy_end",
  charge: "charge",
  medicaid_resub: "medicaid_resub",
  original_ref: "original_ref",
  prior_auth: "prior_auth",
  ref_physician: "ref_physician",
  id_physician: "id_physician",
  diagnosis1: "diagnosis1",
  diagnosis2: "diagnosis2",
  diagnosis3: "diagnosis3",
  diagnosis4: "diagnosis4",
  diagnosis5: "diagnosis5",
  diagnosis6: "diagnosis6",
  diagnosis7: "diagnosis7",
  diagnosis8: "diagnosis8",
  diagnosis9: "diagnosis9",
  diagnosis10: "diagnosis10",
  diagnosis11: "diagnosis11",
  diagnosis12: "diagnosis12",
  tax_id: "tax_id",
  pt_account: "pt_account",
  amt_paid: "amt_paid",
  physician_signature: "physician_signature",
  physician_date: "physician_date",
  fac_name: "fac_name",
  fac_street: "fac_street",
  fac_location: "fac_location",
  doc_name: "doc_name",
  doc_street: "doc_street",
  doc_location: "doc_location",
  "doc_phone area": "doc_phone area",
  doc_phone: "doc_phone",
  pin: "pin",
  grp: "grp",
};

const BUTTON_FIELDS: Record<string, string> = {
  insurance_type: "insurance_type",
  sex: "sex",
  rel_to_ins: "rel_to_ins",
  employment: "employment",
  pt_auto_accident: "pt_auto_accident",
  other_accident: "other_accident",
  lab: "lab",
  ssn: "ssn",
  assignment: "assignment",
};

const SERVICE_SLOT_FIELDS = [
  {
    from_mm: "sv1_mm_from", from_dd: "sv1_dd_from", from_yy: "sv1_yy_from",
    to_mm: "sv1_mm_end", to_dd: "sv1_dd_end", to_yy: "sv1_yy_end",
    place: "place1", emg: "emg1", cpt: "cpt1",
    modifier1: "mod1", modifier2: "mod1a", modifier3: "mod1b", modifier4: "mod1c",
    diag: "diag1", charge: "ch1", units: "day1", local: "local1",
  },
  {
    from_mm: "sv2_mm_from", from_dd: "sv2_dd_from", from_yy: "sv2_yy_from",
    to_mm: "sv2_mm_end", to_dd: "sv2_dd_end", to_yy: "sv2_yy_end",
    place: "place2", emg: "emg2", cpt: "cpt2",
    modifier1: "mod2", modifier2: "mod2a", modifier3: "mod2b", modifier4: "mod2c",
    diag: "diag2", charge: "ch2", units: "day2", local: "local2",
  },
  {
    from_mm: "sv3_mm_from", from_dd: "sv3_dd_from", from_yy: "sv3_yy_from",
    to_mm: "sv3_mm_end", to_dd: "sv3_dd_end", to_yy: "sv3_yy_end",
    place: "place3", emg: "emg3", cpt: "cpt3",
    modifier1: "mod3", modifier2: "mod3a", modifier3: "mod3b", modifier4: "mod3c",
    diag: "diag3", charge: "ch3", units: "day3", local: "local3",
  },
  {
    from_mm: "sv4_mm_from", from_dd: "sv4_dd_from", from_yy: "sv4_yy_from",
    to_mm: "sv4_mm_end", to_dd: "sv4_dd_end", to_yy: "sv4_yy_end",
    place: "place4", emg: "emg4", cpt: "cpt4",
    modifier1: "mod4", modifier2: "mod4a", modifier3: "mod4b", modifier4: "mod4c",
    diag: "diag4", charge: "ch4", units: "day4", local: "local4",
  },
  {
    from_mm: "sv5_mm_from", from_dd: "sv5_dd_from", from_yy: "sv5_yy_from",
    to_mm: "sv5_mm_end", to_dd: "sv5_dd_end", to_yy: "sv5_yy_end",
    place: "place5", emg: "emg5", cpt: "cpt5",
    modifier1: "mod5", modifier2: "mod5a", modifier3: "mod5b", modifier4: "mod5c",
    diag: "diag5", charge: "ch5", units: "day5", local: "local5",
  },
  {
    from_mm: "sv6_mm_from", from_dd: "sv6_dd_from", from_yy: "sv6_yy_from",
    to_mm: "sv6_mm_end", to_dd: "sv6_dd_end", to_yy: "sv6_yy_end",
    place: "place6", emg: "emg6", cpt: "cpt6",
    modifier1: "mod6", modifier2: "mod6a", modifier3: "mod6b", modifier4: "mod6c",
    diag: "diag6", charge: "ch6", units: "day6", local: "local6",
  },
];

const LINE_COLUMN_MAP: Record<string, string> = {
  from_mm: "sv_from_mm",
  from_dd: "sv_from_dd",
  from_yy: "sv_from_yy",
  to_mm: "sv_to_mm",
  to_dd: "sv_to_dd",
  to_yy: "sv_to_yy",
  place: "place",
  emg: "emg",
  cpt: "cpt",
  modifier1: "mod1",
  modifier2: "mod2",
  modifier3: "mod3",
  modifier4: "mod4",
  diag: "diag_pointer",
  charge: "line_charge",
  units: "units",
  local: "local_npi",
};

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ButtonRect extends Rect {
  state: string;
}

const DEFAULT_FONT_SIZE = 8.0;

function clean(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") {
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(2).replace(/\.?0+$/, "");
  }
  return String(value).trim();
}

function currency(value: unknown): string {
  const text = clean(value);
  if (!text) return "";
  const num = parseFloat(text);
  return isNaN(num) ? text : num.toFixed(2);
}

function fitFontSize(text: string, width: number, height: number, font: PDFFont, maxFontSize: number = DEFAULT_FONT_SIZE): number {
  if (!text) return maxFontSize;
  let size = Math.min(maxFontSize, height * 0.72);
  while (size > 5.0 && font.widthOfTextAtSize(text, size) > (width - 2.5)) {
    size -= 0.25;
  }
  return Math.max(size, 5.0);
}

function drawTextInRect(page: PDFPage, font: PDFFont, text: unknown, rect: Rect) {
  const cleanedText = clean(text);
  if (!cleanedText) return;
  const size = fitFontSize(cleanedText, rect.width, rect.height, font);
  const baseline = rect.y + Math.max(1.2, (rect.height - size) / 2);
  page.drawText(cleanedText, {
    x: rect.x + 1.2,
    y: baseline,
    size,
    font,
    color: rgb(0, 0, 0),
  });
}

function drawXInRect(page: PDFPage, font: PDFFont, rect: Rect) {
  const size = 9;
  const x = rect.x + (rect.width / 2) - 2.5;
  const y = rect.y + (rect.height / 2) - 3.0;
  page.drawText("X", {
    x,
    y,
    size,
    font,
    color: rgb(0, 0, 0),
  });
}

async function extractMap(mapBuffer: Buffer) {
  const pdfDoc = await PDFDocument.load(mapBuffer);
  const form = pdfDoc.getForm();
  const fields = form.getFields();

  const textRects: Record<string, Rect> = {};
  const buttonRects: Record<string, Record<string, ButtonRect>> = {};

  fields.forEach((field) => {
    const name = field.getName();
    const widgets = field.acroField.getWidgets();
    if (widgets.length === 0) return;

    const rect = widgets[0].getRectangle();
    const normalizedRect = {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };

    // Note: This is an approximation of the Python logic.
    // In pdf-lib, we might need more specific handling for checkboxes/radio buttons.
    // Use instanceof for reliable type checking
    if (field instanceof PDFTextField) {
      textRects[name] = normalizedRect;
    } else if (field instanceof PDFCheckBox || field instanceof PDFRadioGroup) {
      if (!buttonRects[name]) buttonRects[name] = {};
      
      buttonRects[name]["DEFAULT"] = { ...normalizedRect, state: "DEFAULT" };
      
      if (field instanceof PDFRadioGroup) {
        field.getOptions().forEach((option: string) => {
          buttonRects[name][option.toUpperCase()] = { ...normalizedRect, state: option.toUpperCase() };
        });
      }
    }
  });

  return { textRects, buttonRects };
}

export async function processHcfaClaims(
  excelBuffer: Buffer,
  templateBuffer: Buffer
): Promise<Buffer> {
  const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const data = XLSX.utils.sheet_to_json<ClaimLine>(worksheet);

  if (data.length === 0) {
    throw new Error('No data found in the uploaded file.');
  }

  // Treat template as map for now if no separate map is provided
  const { textRects, buttonRects } = await extractMap(templateBuffer);
  
  const claimsMap = new Map<string, ClaimLine[]>();
  data.forEach((row) => {
    // More flexible ID detection
    const id = clean(row.ClaimID || row['Claim ID'] || row['CLAIMID'] || row['Claim_ID'] || 'unknown');
    if (!claimsMap.has(id)) claimsMap.set(id, []);
    claimsMap.get(id)!.push(row);
  });

  const zip = new JSZip();
  const generatedFiles: { name: string; content: Uint8Array }[] = [];

  for (const [claimId, claimRows] of claimsMap.entries()) {
    const pageCount = Math.max(1, Math.ceil(claimRows.length / 6));
    
    for (let pageNo = 0; pageNo < pageCount; pageNo++) {
      const pageRows = claimRows.slice(pageNo * 6, (pageNo + 1) * 6);
      const pdfDoc = await PDFDocument.load(templateBuffer);
      const firstPage = pdfDoc.getPages()[0];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const first = claimRows[0];

      // Claim-level text fields
      for (const [excelCol, pdfField] of Object.entries(CLAIM_TEXT_FIELDS)) {
        const rect = textRects[pdfField];
        if (rect) {
          // Try to find value with both exact key and common variants
          const value = first[excelCol] || first[excelCol.replace(/_/g, ' ')] || first[excelCol.toUpperCase()];
          drawTextInRect(firstPage, font, value, rect);
        }
      }

      // Total charge calculation
      let total = 0;
      claimRows.forEach(row => {
        const val = parseFloat(clean(row.line_charge || row['Charge']));
        if (!isNaN(val)) total += val;
      });
      if (textRects["t_charge"]) drawTextInRect(firstPage, font, total.toFixed(2), textRects["t_charge"]);

      // Button fields
      for (const [excelCol, pdfField] of Object.entries(BUTTON_FIELDS)) {
        const value = clean(first[excelCol]).toUpperCase();
        if (value && buttonRects[pdfField]) {
          const btnRect = buttonRects[pdfField][value] || buttonRects[pdfField]["DEFAULT"];
          if (btnRect) drawXInRect(firstPage, font, btnRect);
        }
      }

      // Service lines
      SERVICE_SLOT_FIELDS.forEach((slot, idx) => {
        const row = pageRows[idx];
        if (!row) return;
        for (const [logicalName, pdfField] of Object.entries(slot)) {
          const rect = textRects[pdfField];
          if (!rect) continue;
          let value = row[LINE_COLUMN_MAP[logicalName] || logicalName] || "";
          if (logicalName === "charge") value = currency(value);
          else value = clean(value);
          drawTextInRect(firstPage, font, value, rect);
        }
      });

      const pdfBytes = await pdfDoc.save();
      const name = pageCount === 1 ? `${claimId}.pdf` : `${claimId}_p${pageNo + 1}.pdf`;
      generatedFiles.push({ name, content: pdfBytes });
    }
  }

  if (generatedFiles.length > 1) {
    generatedFiles.forEach(file => zip.file(file.name, file.content));
    return await zip.generateAsync({ type: 'nodebuffer' });
  } else if (generatedFiles.length === 1) {
    return Buffer.from(generatedFiles[0].content);
  } else {
    throw new Error('No HCFA documents were generated.');
  }
}
