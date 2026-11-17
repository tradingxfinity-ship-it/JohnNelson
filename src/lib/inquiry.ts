/**
 * Inquiry form definition shared by the client form and the API route,
 * so both sides validate the same fields the same way.
 */

export const INQUIRY_TYPES = ["buy", "sell", "rent"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const INQUIRY_TYPE_LABELS: Record<InquiryType, string> = {
  buy: "Buy",
  sell: "Sell",
  rent: "Rent",
};

export const SUBMIT_LABELS: Record<InquiryType, string> = {
  buy: "Send my buying inquiry",
  sell: "Request a home valuation",
  rent: "Send my rental inquiry",
};

export const OPTIONS = {
  buyBudget: [
    "Under $250,000",
    "$250,000–$400,000",
    "$400,000–$600,000",
    "$600,000–$850,000",
    "$850,000+",
    "Not sure yet",
  ],
  buyPropertyType: ["Single-family home", "Townhome", "Condo", "Open to options"],
  buyTimeline: ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just exploring"],
  sellPropertyType: ["Single-family home", "Townhome", "Condo", "Other"],
  sellTimeline: ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just curious about value"],
  rentBudget: ["Under $1,200", "$1,200–$1,600", "$1,600–$2,000", "$2,000–$2,500", "$2,500+"],
  rentPropertyType: ["House", "Townhome", "Apartment", "Open to options"],
} as const;

type FieldDef = {
  name: string;
  label: string;
  kind: "text" | "select" | "date";
  required?: boolean;
  options?: readonly string[];
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
};

export const SERVICE_FIELDS: Record<InquiryType, FieldDef[]> = {
  buy: [
    {
      name: "preferredAreas",
      label: "Preferred areas",
      kind: "text",
      placeholder: "e.g. Stone Oak, Alamo Heights, near JBSA",
      hint: "Neighborhoods, ZIP codes, or places you want to be near.",
    },
    { name: "budgetRange", label: "Budget range", kind: "select", options: OPTIONS.buyBudget, required: true },
    { name: "propertyType", label: "Property type", kind: "select", options: OPTIONS.buyPropertyType, required: true },
    { name: "timeline", label: "Buying timeline", kind: "select", options: OPTIONS.buyTimeline, required: true },
  ],
  sell: [
    {
      name: "propertyAddress",
      label: "Property address",
      kind: "text",
      required: true,
      autoComplete: "street-address",
      placeholder: "Street address, city, ZIP",
    },
    { name: "propertyType", label: "Property type", kind: "select", options: OPTIONS.sellPropertyType, required: true },
    { name: "timeline", label: "Selling timeline", kind: "select", options: OPTIONS.sellTimeline, required: true },
  ],
  rent: [
    {
      name: "preferredAreas",
      label: "Preferred areas",
      kind: "text",
      placeholder: "e.g. Medical Center, Northwest Side",
      hint: "Neighborhoods, ZIP codes, or places you want to be near.",
    },
    { name: "monthlyBudget", label: "Monthly budget", kind: "select", options: OPTIONS.rentBudget, required: true },
    { name: "propertyType", label: "Property type", kind: "select", options: OPTIONS.rentPropertyType, required: true },
    { name: "moveInDate", label: "Move-in date", kind: "date", required: true },
  ],
};

export type InquiryValues = Record<string, string>;
export type InquiryErrors = Record<string, string>;

export const LIMITS = { short: 120, address: 200, notes: 2000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isInquiryType(value: unknown): value is InquiryType {
  return typeof value === "string" && (INQUIRY_TYPES as readonly string[]).includes(value);
}

/** Today in San Antonio as YYYY-MM-DD, used as the earliest allowed move-in date. */
export function todayInSanAntonio(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Validates an inquiry and returns field errors keyed by field name (empty when valid). */
export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  const v = (k: string) => (values[k] ?? "").trim();

  if (!isInquiryType(values.inquiryType)) {
    errors.inquiryType = "Choose whether you’re buying, selling, or renting.";
  }

  if (!v("fullName")) errors.fullName = "Enter your full name.";
  else if (v("fullName").length > LIMITS.short) errors.fullName = "Keep your name under 120 characters.";

  if (!v("email")) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(v("email")) || v("email").length > LIMITS.short)
    errors.email = "Enter a valid email address, like name@example.com.";

  if (v("phone")) {
    const digits = v("phone").replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15 || !/^[\d\s().+-]+$/.test(v("phone")))
      errors.phone = "Enter a valid phone number, or leave this blank.";
  }

  if (v("notes").length > LIMITS.notes) errors.notes = "Keep notes under 2,000 characters.";

  if (isInquiryType(values.inquiryType)) {
    for (const field of SERVICE_FIELDS[values.inquiryType]) {
      const value = v(field.name);
      if (!value) {
        if (field.required) {
          errors[field.name] =
            field.kind === "select" ? `Choose a ${field.label.toLowerCase()}.` : `Enter a ${field.label.toLowerCase()}.`;
        }
        continue;
      }
      if (field.options && !field.options.includes(value)) {
        errors[field.name] = `Choose a ${field.label.toLowerCase()} from the list.`;
      } else if (field.kind === "date") {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
          errors[field.name] = "Enter a valid date.";
        } else if (value < todayInSanAntonio()) {
          errors[field.name] = "Choose today or a future date.";
        }
      } else if (value.length > (field.name === "propertyAddress" ? LIMITS.address : LIMITS.short)) {
        errors[field.name] = `Keep this under ${field.name === "propertyAddress" ? LIMITS.address : LIMITS.short} characters.`;
      }
    }
  }

  return errors;
}

/** Field names that belong to the submitted inquiry, in display order. */
export function inquiryFieldNames(type: InquiryType): string[] {
  return ["fullName", "email", "phone", ...SERVICE_FIELDS[type].map((f) => f.name), "notes"];
}

export const FIELD_LABELS: Record<string, string> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone",
  notes: "Additional notes",
  preferredAreas: "Preferred areas",
  budgetRange: "Budget range",
  monthlyBudget: "Monthly budget",
  propertyType: "Property type",
  propertyAddress: "Property address",
  moveInDate: "Move-in date",
  timeline: "Timeline",
};
