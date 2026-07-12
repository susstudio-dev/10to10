import { siteConfig } from "./utils";

const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
  "YOUR_WEB3FORMS_KEY_HERE"; // owner replaces post-deploy

export type LeadSource =
  | "Home"
  | "Booking Modal"
  | "Contact Page"
  | "Play School Admission"
  | "Play School Visit"
  | "Party Planner"
  | "Summer Camp"
  | "Membership"
  | "Franchise";

export type LeadFields = Record<string, string | number | undefined>;

export type SubmitLeadResult = {
  ok: boolean;
  whatsapp: boolean;
  email: boolean;
  /** Prefilled wa.me link — show as manual fallback if the popup was blocked */
  whatsappUrl: string;
  error?: string;
};

export function buildWhatsappText(source: LeadSource, fields: LeadFields) {
  return (
    `Hi 10to10! I'd like to inquire about: ${source}\n\n` +
    Object.entries(fields)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `• ${humanize(k)}: ${v}`)
      .join("\n")
  );
}

/**
 * Submit a lead to BOTH Web3Forms (email + Sheets backend) AND WhatsApp.
 *
 * IMPORTANT ordering: window.open() must run synchronously inside the
 * user's click/submit gesture — any `await` before it lets popup blockers
 * silently swallow the WhatsApp tab (our primary lead channel). So we open
 * WhatsApp first, then fire the email backup with `keepalive` so it
 * survives even if the user navigates away.
 */
export async function submitLead(
  source: LeadSource,
  fields: LeadFields,
  options: { whatsappBody?: string; openWhatsapp?: boolean } = {}
): Promise<SubmitLeadResult> {
  const { whatsappBody, openWhatsapp = true } = options;

  const text = whatsappBody ?? buildWhatsappText(source, fields);
  const whatsappUrl = `${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;

  // 1. WhatsApp — synchronously, before any await
  let whatsappOk = false;
  if (openWhatsapp && typeof window !== "undefined") {
    const win = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    whatsappOk = win !== null;
  }

  // 2. Email backup via Web3Forms — non-blocking, tolerant of failure
  const payload: Record<string, string | number> = {
    access_key: WEB3FORMS_KEY,
    subject: `[10to10] ${source} inquiry — ${fields.name ?? fields.parent_name ?? "anonymous"}`,
    from_name: "10to10 Adventures Website",
    source,
    submitted_at: new Date().toISOString(),
    page_url: typeof window !== "undefined" ? window.location.href : "",
    ...Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined && v !== "")
    ),
  };

  let emailOk = false;
  if (WEB3FORMS_KEY && WEB3FORMS_KEY !== "YOUR_WEB3FORMS_KEY_HERE") {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      emailOk = res.ok;
    } catch {
      emailOk = false;
    }
  }

  return {
    ok: emailOk || whatsappOk,
    email: emailOk,
    whatsapp: whatsappOk,
    whatsappUrl,
  };
}

function humanize(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
