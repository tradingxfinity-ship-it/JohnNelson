"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  INQUIRY_TYPE_LABELS,
  INQUIRY_TYPES,
  SERVICE_FIELDS,
  SUBMIT_LABELS,
  todayInSanAntonio,
  validateInquiry,
  type InquiryErrors,
  type InquiryType,
  type InquiryValues,
} from "@/lib/inquiry";
import { site } from "@/content/site";
import { buttonStyles } from "./ui";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "block w-full min-h-12 rounded-md border bg-white px-3.5 py-2.5 text-base text-blue placeholder:text-slate/60 transition-colors focus:border-blue focus:outline-2 focus:outline-offset-0 focus:outline-blue/15 aria-[invalid=true]:border-error";

export function InquiryForm({ defaultType }: { defaultType?: InquiryType }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [values, setValues] = useState<InquiryValues>({ inquiryType: defaultType ?? "" });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [minDate, setMinDate] = useState<string>();
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMinDate(todayInSanAntonio()), []);

  // The homepage search sends visitors here with ?area=…; start the form with that area filled in
  useEffect(() => {
    const area = new URLSearchParams(window.location.search).get("area")?.trim().slice(0, 120);
    if (area && (defaultType === "buy" || defaultType === "rent")) {
      setValues((v) => (v.preferredAreas ? v : { ...v, preferredAreas: area }));
    }
  }, [defaultType]);

  const type = values.inquiryType as InquiryType | "";
  const fields = type ? SERVICE_FIELDS[type] : [];

  function update(name: string, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Once the visitor has tried to submit, keep errors in sync as they fix them
    if (submitted) setErrors(validateInquiry(next));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setSubmitted(true);

    const found = validateInquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      const el =
        first === "inquiryType"
          ? formRef.current?.querySelector<HTMLInputElement>('input[name="inquiryType"]')
          : formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: InquiryErrors; message?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(data.message ?? "");
      setStatus("error");
    } catch {
      setServerMessage("");
      setStatus("error");
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function reset() {
    setValues({ inquiryType: type });
    setErrors({});
    setSubmitted(false);
    setStatus("idle");
    startedAt.current = Date.now();
  }

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-md border border-line bg-white p-8 outline-none sm:p-10"
      >
        <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full border border-red text-red">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 10.5l4 4 8-9" />
          </svg>
        </span>
        <h3 className="mt-6 text-2xl font-medium">Thanks for reaching out. Irma and John will be in touch.</h3>
        <p className="mt-3 leading-relaxed">
          Need to talk sooner? Call{" "}
          <a href={site.contact.phoneHref} className="font-medium text-blue underline underline-offset-4">
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className={`${buttonStyles.secondary} mt-8`}>
          Send another inquiry
        </button>
      </div>
    );
  }

  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className="mt-2 flex gap-1.5 text-sm text-error">
        <span aria-hidden>!</span>
        {errors[name]}
      </p>
    ) : null;

  const describedBy = (name: string, hint?: boolean) =>
    [hint ? id(`${name}-hint`) : "", errors[name] ? id(`${name}-error`) : ""].filter(Boolean).join(" ") || undefined;

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="relative rounded-md border border-line bg-white p-6 sm:p-8"
    >
      {status === "error" && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-md border border-error/30 bg-error/5 p-4 text-sm leading-relaxed text-blue outline-none"
        >
          <p className="font-medium">We couldn’t send your inquiry.</p>
          <p className="mt-1 text-slate">
            {serverMessage || "Something went wrong on our end."} Your details are still here. Try again, or call{" "}
            <a href={site.contact.phoneHref} className="font-medium text-blue underline underline-offset-4">
              {site.contact.phoneDisplay}
            </a>
            .
          </p>
        </div>
      )}

      <fieldset aria-describedby={errors.inquiryType ? id("inquiryType-error") : undefined}>
        <legend className="text-lg font-medium text-blue">How can we help?</legend>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {INQUIRY_TYPES.map((t) => (
            <label key={t} className="relative cursor-pointer">
              <input
                type="radio"
                name="inquiryType"
                value={t}
                checked={type === t}
                onChange={() => update("inquiryType", t)}
                className="peer sr-only"
              />
              <span className="flex min-h-12 items-center justify-center rounded-md border border-line text-[15px] font-medium text-blue transition-colors hover:border-blue peer-checked:border-blue peer-checked:bg-blue peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red">
                {INQUIRY_TYPE_LABELS[t]}
              </span>
            </label>
          ))}
        </div>
        {fieldError("inquiryType")}
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor={id("fullName")} required className="sm:col-span-2">
          <input
            id={id("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName ?? ""}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={describedBy("fullName")}
            className={`${inputClass} border-line`}
          />
          {fieldError("fullName")}
        </Field>
        <Field label="Email" htmlFor={id("email")} required>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={`${inputClass} border-line`}
          />
          {fieldError("email")}
        </Field>
        <Field label="Phone" htmlFor={id("phone")}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={`${inputClass} border-line`}
          />
          {fieldError("phone")}
        </Field>
      </div>

      {type && (
        <fieldset className="mt-8 border-t border-line pt-8">
          <legend className="sr-only">{INQUIRY_TYPE_LABELS[type]} details</legend>
          <p aria-hidden className="mb-5 text-sm font-medium text-blue">
            {type === "buy" ? "About the home you want" : type === "sell" ? "About your property" : "About the rental you need"}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <Field
                key={`${type}-${field.name}`}
                label={field.label}
                htmlFor={id(field.name)}
                required={field.required}
                className={field.kind === "text" ? "sm:col-span-2" : ""}
              >
                {field.kind === "select" ? (
                  <select
                    id={id(field.name)}
                    name={field.name}
                    value={values[field.name] && field.options?.includes(values[field.name]) ? values[field.name] : ""}
                    onChange={(e) => update(field.name, e.target.value)}
                    aria-invalid={errors[field.name] ? true : undefined}
                    aria-describedby={describedBy(field.name)}
                    className={`${inputClass} select-chevron border-line pr-10`}
                  >
                    <option value="">Select</option>
                    {field.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={id(field.name)}
                    name={field.name}
                    type={field.kind === "date" ? "date" : "text"}
                    min={field.kind === "date" ? minDate : undefined}
                    autoComplete={field.autoComplete ?? "off"}
                    placeholder={field.placeholder}
                    value={values[field.name] ?? ""}
                    onChange={(e) => update(field.name, e.target.value)}
                    aria-invalid={errors[field.name] ? true : undefined}
                    aria-describedby={describedBy(field.name, !!field.hint)}
                    className={`${inputClass} border-line`}
                  />
                )}
                {field.hint && (
                  <p id={id(`${field.name}-hint`)} className="mt-2 text-sm text-slate">
                    {field.hint}
                  </p>
                )}
                {fieldError(field.name)}
              </Field>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-5">
        <Field label="Additional notes" htmlFor={id("notes")}>
          <textarea
            id={id("notes")}
            name="notes"
            rows={4}
            value={values.notes ?? ""}
            onChange={(e) => update("notes", e.target.value)}
            aria-invalid={errors.notes ? true : undefined}
            aria-describedby={describedBy("notes")}
            className={`${inputClass} border-line`}
          />
          {fieldError("notes")}
        </Field>
      </div>

      {/* Honeypot: hidden from people, often filled in by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={submitting} className={`${buttonStyles.primary} w-full gap-2.5 disabled:cursor-wait disabled:opacity-80 sm:w-auto`}>
          {submitting && (
            <svg className="h-4 w-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {submitting ? "Sending…" : status === "error" ? "Try again" : type ? SUBMIT_LABELS[type] : "Send my inquiry"}
        </button>
        <p className="text-sm text-slate">
          <span aria-hidden className="text-red">*</span> Required
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your inquiry" : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-blue">
        {label}
        {required ? (
          <>
            <span aria-hidden className="ml-0.5 text-red">*</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="ml-1.5 font-normal text-slate">Optional</span>
        )}
      </label>
      {children}
    </div>
  );
}
