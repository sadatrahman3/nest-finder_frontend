"use client";

import { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary">
            NestFinder
          </Link>
          <p className="text-muted mt-2">Find your perfect nest</p>
        </div>
        {children}
      </div>
    </div>
  );
}
