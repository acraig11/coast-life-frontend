import { useMemo, useState } from "react";

/**
 * PartnerRequestFormView.tsx
 * SwiftUI PartnerRequestFormView → React (web) equivalent
 *
 * Notes:
 * - Web cannot present an in-app mail composer like iOS MFMailComposeViewController.
 * - Instead we open the user's email client via mailto: with subject/body prefilled.
 * - If no mail client is configured, we show a friendly error message.
 */

export default function PartnerRequestFormView({
  onClose,
}: {
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [showMailError, setShowMailError] = useState(false);

  const canSubmit = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0;
  }, [name, email, message]);

  function submit() {
  setSubmitted(true);

  const to = "coastlifellc@gmail.com";
  const subject = "New Partner Request";
  const body = [
    `Name: ${name}`,
    `Organization: ${organization || "—"}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    "Message:",
    message,
  ].join("\n");

  const mailto =
    `mailto:${encodeURIComponent(to)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  try {
    window.location.href = mailto;
  } catch {
    setShowMailError(true);
  }

  console.log("📤 Submitted:", { name, organization, email, phone, message });
}


  return (
    <div>
      {/* Header (SwiftUI Navigation title + Close button) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>Partner Request</div>
        <button
          onClick={onClose}
          style={{
            border: "1px solid #ddd",
            background: "#fafafa",
            borderRadius: 10,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>

      {/* Form */}
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Contact Info section */}
        <Section title="Contact Info">
          <Field label="Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              style={inputStyle}
            />
          </Field>

          <Field label="Organization/Business">
            <input
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Organization/Business"
              style={inputStyle}
            />
          </Field>

          <Field label="Email">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              inputMode="email"
              autoComplete="email"
              style={inputStyle}
            />
          </Field>

          <Field label="Phone#">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone#"
              inputMode="tel"
              autoComplete="tel"
              style={inputStyle}
            />
          </Field>
        </Section>

        {/* Message section */}
        <Section title="Message">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message…"
            style={{ ...inputStyle, minHeight: 120, resize: "vertical" as const }}
          />
        </Section>

        {/* Submitted section */}
        {submitted && (
          <div
            style={{
              border: "1px solid #d6f5dd",
              background: "#f0fff4",
              color: "#1b7f3a",
              borderRadius: 12,
              padding: 12,
              fontWeight: 700,
            }}
          >
            ✅ Request submitted! Thank you.
          </div>
        )}

        {/* Submit button section */}
        <div>
          <button
            onClick={submit}
            disabled={!canSubmit}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "none",
              fontWeight: 800,
              color: "#fff",
              backgroundColor: canSubmit ? "#007AFF" : "#c7c7cc",
              cursor: canSubmit ? "pointer" : "not-allowed",
              opacity: canSubmit ? 1 : 0.75,
              transition: "background-color 0.2s ease, opacity 0.2s ease",
            }}
          >
            Submit Request
          </button>
        </div>

        {/* Mail error alert (SwiftUI .alert equivalent) */}
        {showMailError && (
          <div
            role="alert"
            style={{
              border: "1px solid #ffe1e1",
              background: "#fff5f5",
              borderRadius: 12,
              padding: 12,
              color: "#8a1f1f",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Unable to Send Email</div>
            <div style={{ color: "#8a1f1f" }}>
              Please set up an email account in your default email app to send this request.
            </div>
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => setShowMailError(false)}
                style={{
                  border: "1px solid #ddd",
                  background: "#fff",
                  borderRadius: 10,
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** ---------- Small UI helpers ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, background: "#fff" }}>
      <div style={{ fontWeight: 800, marginBottom: 10 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#444" }}>{label}</div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
  width: "100%",
};
