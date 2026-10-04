"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { Send } from "./icons";
import styles from "./Contact.module.css";

/**
 * The form opens the visitor's mail app with the message pre-filled (mailto),
 * so it works with no backend. Swap `handleSubmit` for a call to an API route
 * or a form service when you want messages delivered directly.
 */
export default function Contact() {
  const { contact, firstName } = profile;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Transmission from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="transmit" className={`container ${styles.section}`}>
      <div className={styles.panel}>
        <span className={styles.ring} aria-hidden />

        <div className={styles.left}>
          <div className={styles.headline}>
            <span className={styles.eyebrow}>05 — Transmit</span>
            <h2 className={styles.title}>
              Open a <span className="serif">channel.</span>
            </h2>
            <p className={styles.intro}>{contact.intro}</p>
          </div>

          <div className={styles.links}>
            <a href={`mailto:${contact.email}`} className={styles.link}>
              <span>Email</span>
              <span className={styles.handle}>{contact.email} ↗</span>
            </a>
            {contact.links.map((l) => (
              <a key={l.label} href={l.href} className={styles.link} target="_blank" rel="noreferrer">
                <span>{l.label}</span>
                <span className={styles.handle}>{l.handle} ↗</span>
              </a>
            ))}
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <span className={styles.prompt}>&gt; transmit --to {firstName.toLowerCase()}</span>

          <label htmlFor="tx-name" className={styles.label}>
            Your name
          </label>
          <input id="tx-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada" className={styles.input} />

          <label htmlFor="tx-email" className={styles.label}>
            Your email
          </label>
          <input
            id="tx-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@domain.earth"
            className={styles.input}
          />

          <label htmlFor="tx-msg" className={styles.label}>
            Message
          </label>
          <textarea
            id="tx-msg"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about the future you're building…"
            className={`${styles.input} ${styles.textarea}`}
          />

          <button type="submit" className={styles.submit}>
            {sent ? "Transmission ready in your mail app" : "Send transmission"} <Send />
          </button>
        </form>
      </div>
    </section>
  );
}
