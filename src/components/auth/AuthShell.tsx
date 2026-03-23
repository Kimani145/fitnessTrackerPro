import React from 'react';
import { Dumbbell } from 'lucide-react';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="min-h-screen auth-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="auth-card rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
              <Dumbbell className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">FitTrack</p>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            </div>
          </div>
          <p className="text-sm text-slate-600 text-center mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
