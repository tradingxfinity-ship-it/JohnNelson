import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1248px] px-5 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  className = "",
  children,
  ...rest
}: { className?: string; children: ReactNode } & ComponentProps<"section">) {
  return (
    <section className={`py-20 lg:py-26 ${className}`} {...rest}>
      {children}
    </section>
  );
}

/** Small label with a short red rule, used above section headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-sm font-medium text-slate">
      <span aria-hidden className="h-px w-8 bg-red" />
      {children}
    </p>
  );
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center rounded-md px-5 text-[15px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red";

export const buttonStyles = {
  primary: `${buttonBase} bg-blue text-white hover:bg-red`,
  secondary: `${buttonBase} border border-blue bg-white text-blue hover:bg-blue hover:text-white`,
  inverse: `${buttonBase} bg-white text-blue hover:bg-cloud`,
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return <Link className={`${buttonStyles[variant]} ${className}`} {...props} />;
}

/** Text link with an arrow; underline appears on hover and focus. */
export function ArrowLink({ className = "", children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group inline-flex items-center gap-2 font-medium text-blue underline-offset-4 hover:underline focus-visible:underline ${className}`}
      {...props}
    >
      {children}
      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
