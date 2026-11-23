/** Builds table-based, inline-styled HTML so the email renders in common mail clients. */

export interface EmailContent {
  eventName: string;
  eventDate: string;
  eventCity: string;
  heading: string;
  message: string;
  ctaLabel: string;
  ctaUrl: string;
}

export const emailTemplates = [
  { id: "announcement", label: "Announcement", subject: "Registration is open", heading: "Registration is open", message: "We are excited to announce our event. Reserve your spot today, seats are limited.", ctaLabel: "Register now" },
  { id: "update", label: "Event update", subject: "An update about the event", heading: "A quick update", message: "Here is the latest news about the event. We will keep you posted as plans are finalised.", ctaLabel: "View event page" },
  { id: "reminder", label: "Reminder", subject: "See you soon", heading: "One week to go", message: "Just a reminder that the event is coming up. Keep your ticket handy, you will need it at check-in.", ctaLabel: "View your event" },
  { id: "thanks", label: "Thank you", subject: "Thank you for joining us", heading: "Thank you for coming", message: "It was great to have you with us. We hope you enjoyed it and we would love to hear your feedback.", ctaLabel: "Share feedback" },
] as const;

export function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function safeUrl(u: string) {
  return /^https?:\/\//i.test(u.trim()) ? u.trim() : "#";
}

export function renderEmailHtml(c: EmailContent) {
  const paragraphs = c.message
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#475467;">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
  const button = c.ctaLabel.trim()
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;"><tr><td style="background:#262a32;border-radius:8px;"><a href="${escapeHtml(safeUrl(c.ctaUrl))}" style="display:inline-block;padding:12px 24px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">${escapeHtml(c.ctaLabel)}</a></td></tr></table>`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(c.heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f2f4f7;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
<tr><td style="background:#262a32;padding:24px 32px;color:#ffffff;font-size:20px;"><span style="font-weight:300;">eigen</span><span style="font-weight:700;">event</span></td></tr>
<tr><td style="padding:32px;">
<p style="margin:0 0 8px;font-size:14px;color:#667085;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(c.eventName)}</p>
<h1 style="margin:0 0 16px;font-size:28px;line-height:34px;color:#101828;">${escapeHtml(c.heading)}</h1>
${paragraphs}
<p style="margin:0;font-size:14px;color:#667085;">${escapeHtml(c.eventDate)} &middot; ${escapeHtml(c.eventCity)}</p>
${button}
</td></tr>
<tr><td style="padding:20px 32px;background:#f9fafb;font-size:12px;line-height:18px;color:#98a2b3;">You are receiving this because you registered for ${escapeHtml(c.eventName)}. Sent with Eigen Event.</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
