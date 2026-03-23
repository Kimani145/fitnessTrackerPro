import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, HeartPulse, Mountain, ShieldCheck } from 'lucide-react';

const tracks = [
  {
    title: 'Chest Programs',
    subtitle: 'Strength progression from movement basics to power sets.',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    accent: 'from-rose-500/20 to-orange-500/20',
  },
  {
    title: 'Abs Programs',
    subtitle: 'Core endurance, anti-rotation, and advanced trunk control.',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    accent: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Legs Programs',
    subtitle: 'Balanced lower-body strength, unilateral control, and power.',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    accent: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'Kegels Programs',
    subtitle: 'Pelvic-floor training for stability, control, and endurance.',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    accent: 'from-violet-500/20 to-fuchsia-500/20',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(14,165,233,0.25),transparent_35%),radial-gradient(circle_at_90%_5%,rgba(244,63,94,0.18),transparent_30%),radial-gradient(circle_at_50%_95%,rgba(34,197,94,0.2),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/80 px-4 py-1 text-xs font-medium tracking-wide text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
            <ShieldCheck className="h-4 w-4" />
            Structured Training. Real Progress.
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Welcome to FitTrack Pro
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-600 md:text-lg dark:text-slate-300">
            Build your routine with guided workout tracks across Chest, Abs, Legs, and Kegels.
            Every track includes Beginner, Intermediate, and Advanced levels so progression is clear and measurable.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:translate-y-[-1px] hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              I Already Have an Account
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 text-sm md:max-w-lg">
            <div className="rounded-xl border border-slate-300/70 bg-white/80 p-3 dark:border-slate-700 dark:bg-slate-900/70">
              <p className="font-semibold">12 Seeded Programs</p>
              <p className="text-slate-600 dark:text-slate-300">4 focus areas x 3 levels</p>
            </div>
            <div className="rounded-xl border border-slate-300/70 bg-white/80 p-3 dark:border-slate-700 dark:bg-slate-900/70">
              <p className="font-semibold">Production Ready</p>
              <p className="text-slate-600 dark:text-slate-300">Protected Firestore rules</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Dumbbell className="h-4 w-4" />
          Exercise Tracks
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {tracks.map((track) => (
            <article
              key={track.title}
              className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${track.accent} p-6 shadow-sm backdrop-blur dark:border-slate-800`}
            >
              <h2 className="text-xl font-semibold">{track.title}</h2>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{track.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {track.levels.map((level) => (
                  <span
                    key={`${track.title}-${level}`}
                    className="rounded-full border border-slate-300 bg-white/85 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <HeartPulse className="mt-0.5 h-5 w-5 text-rose-500" />
            <div>
              <p className="font-semibold">Progressive Workouts</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Each level increases complexity and load safely.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mountain className="mt-0.5 h-5 w-5 text-emerald-500" />
            <div>
              <p className="font-semibold">Goal-Driven Structure</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Follow a path instead of random routines.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-sky-500" />
            <div>
              <p className="font-semibold">Secure by Default</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Firestore access is restricted to authenticated users.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}