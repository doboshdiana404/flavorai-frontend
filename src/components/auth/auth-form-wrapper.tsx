import type { ReactNode } from "react";
import Link from "next/link";

type AuthFormWrapperProps = {
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  children: ReactNode;
};

export function AuthFormWrapper({
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}: AuthFormWrapperProps) {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>

        {children}

        <div className="mt-6 text-sm text-gray-600">
          {footerText}{" "}
          <Link href={footerLinkHref} className="font-medium text-black">
            {footerLinkText}
          </Link>
        </div>
      </div>
    </main>
  );
}
