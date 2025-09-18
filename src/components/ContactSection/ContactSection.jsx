// src/components/ContactSection.jsx
import React, { useState } from "react";

/**
 * ContactSection.jsx — updated
 *
 * Changes in this version:
 * - Form "card" is a completed rectangle (no rounded corners)
 * - Big 3-line heading at top-left, small email at bottom-left
 * - Wider form, dotted glowing background and dotted ring remain
 * - Inputs are underline-only; submit button text is white
 *
 * Make sure Playfair Display is included in public/index.html:
 * <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&display=swap" rel="stylesheet" />
 */

export default function ContactSection({
  accentColor = "#0097b2",
  contactEmail = "hello@quantiaxionix.com",
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Investment",
    message: "",
    hp: "",
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  function update(field) {
    return (e) => setForm((s) => ({ ...s, [field]: e.target.value }));
  }

  function validate() {
    if (form.hp && form.hp.trim() !== "") return { ok: false, msg: "Spam detected" };
    if (!form.name.trim()) return { ok: false, msg: "Please enter your name." };
    if (!form.phone.trim()) return { ok: false, msg: "Please enter a phone number." };
    if (!form.email.trim()) return { ok: false, msg: "Please enter your email." };
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return { ok: false, msg: "Please enter a valid email." };
    return { ok: true };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    const v = validate();
    if (!v.ok) {
      setStatus({ loading: false, success: null, error: v.msg });
      return;
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      subject: form.subject,
      message: form.message.trim(),
    };

    try {
      // If you have a backend, POST here. Otherwise fallback to mailto:
      throw new Error("No backend - using mailto fallback");
    } catch (err) {
      const subject = encodeURIComponent(`[${payload.subject}] ${payload.name}`);
      const bodyLines = [
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        "",
        payload.message || "-",
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setStatus({ loading: false, success: "Opening your email client...", error: null });
    }
  }

  return (
    <section
      id="contact"
      className="w-full bg-black text-white py-20 px-6 relative overflow-hidden"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* thin full-width top line */}
      <div className="absolute top-0 left-0 w-full" style={{ height: 2, background: "#374151" }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Big headline (top) + description (under heading) + email (bottom) */}
          <div className="flex flex-col justify-between" style={{ minHeight: 560 }}>
            <div>
              {/* Big 3-line heading at top-left */}
              <h2
                className="leading-tight mb-6"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  lineHeight: 0.88,
                  fontWeight: 900,
                }}
              >
                <span className="block">Got a</span>
                <span className="block">question?</span>
                <span className="block" style={{ color: accentColor, marginTop: "0.25rem" }}>
                  Let’s Connect
                </span>
              </h2>

              <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-lg">
                Whether you’re a brand, partner, investor, or just curious, we’d love to hear from you. Fill out the form
                or reach out directly — we’ll get back to you as soon as possible.
              </p>
            </div>

            {/* Bottom-left: small note + email */}
            <div>
              <p className="text-sm text-white/70 mb-3">Or just wanna say hi?</p>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-block text-sm md:text-base font-medium bg-white text-black px-4 py-2"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          {/* RIGHT: Wider form rectangle with dotted glowing pattern behind and dotted ring */}
          <div className="relative flex justify-center md:justify-start items-start">
            {/* LARGE dotted glowing pattern behind the whole form */}
            <svg
              aria-hidden="true"
              className="absolute -z-10"
              width="760"
              height="760"
              viewBox="0 0 760 760"
              style={{ left: "-40px", top: "-60px", opacity: 0.9, filter: "blur(28px)" }}
            >
              <defs>
                <pattern id="dotsPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.2" fill={accentColor} fillOpacity="0.14" />
                </pattern>
                <radialGradient id="glowGrad" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor={accentColor} stopOpacity="0.22" />
                  <stop offset="60%" stopColor={accentColor} stopOpacity="0.08" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width="760" height="760" fill="url(#dotsPattern)" />
              <circle cx="380" cy="220" r="220" fill="url(#glowGrad)" />
            </svg>

            {/* dotted ring around the form rectangle */}
            <svg
              aria-hidden="true"
              className="absolute -z-10"
              width="520"
              height="520"
              viewBox="0 0 520 520"
              style={{ right: "-28px", top: "-16px", opacity: 0.75, filter: "blur(8px)" }}
            >
              <defs>
                <pattern id="smallDots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.9" fill={accentColor} fillOpacity="0.12" />
                </pattern>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="0" y="0" width="520" height="520" fill="url(#smallDots)" opacity="0.06" />
              <g transform="translate(260,260)">
                <circle r="210" fill="none" stroke={accentColor} strokeWidth="1.5" strokeDasharray="4 8" strokeOpacity="0.14" filter="url(#softGlow)" />
                <circle r="172" fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="2 6" strokeOpacity="0.08" />
              </g>
            </svg>

            {/* Form rectangle (sharp corners) */}
            <div
              className="relative z-10 p-10"
              style={{
                width: "min(720px, 94vw)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.75)",
                borderRadius: 0, // sharp corners
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* honeypot */}
                <div style={{ display: "none" }}>
                  <label>
                    Keep this empty
                    <input name="hp" value={form.hp} onChange={update("hp")} />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-white/70">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your name"
                      className="mt-2 w-full bg-transparent text-white placeholder:text-white/40 py-3 px-0 border-0 border-b border-white/10 focus:border-b-[#0097b2] focus:outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70">Phone number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="0301 2345678"
                      className="mt-2 w-full bg-transparent text-white placeholder:text-white/40 py-3 px-0 border-0 border-b border-white/10 focus:border-b-[#0097b2] focus:outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    className="mt-2 w-full bg-transparent text-white placeholder:text-white/40 py-3 px-0 border-0 border-b border-white/10 focus:border-b-[#0097b2] focus:outline-none transition"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-white/70">Subject</label>
                    <select
                      value={form.subject}
                      onChange={update("subject")}
                      className="mt-2 w-full bg-transparent text-white py-3 px-0 border-0 border-b border-white/10 focus:border-b-[#0097b2] focus:outline-none transition"
                    >
                      <option value="Investment">Investment</option>
                      <option value="Career">Career</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div />
                </div>

                <div>
                  <label className="block text-xs text-white/70">Message (Optional)</label>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    placeholder="Tell us a bit about your inquiry (optional)"
                    className="mt-2 w-full bg-transparent text-white placeholder:text-white/40 py-3 px-0 border-0 border-b border-white/10 focus:border-b-[#0097b2] focus:outline-none transition resize-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="inline-flex items-center justify-center px-6 py-3 font-medium border border-[#0097b2] text-white bg-transparent hover:bg-[#0097b2] hover:text-black transition disabled:opacity-60"
                    style={{ borderRadius: 0 }}
                  >
                    {status.loading ? "Sending…" : "Send message"}
                  </button>
                </div>

                {status.error && <p className="text-sm text-red-400 mt-2">{status.error}</p>}
                {status.success && <p className="text-sm text-green-400 mt-2">{status.success}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
