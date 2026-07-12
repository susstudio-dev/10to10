import Link from "next/link";
import { Float, SmileDoodle, StarDoodle } from "@/components/playful";

/** Scattered ball-pit balls — brand colors, staggered bounce/float delays. */
const balls = [
  "top-[16%] left-[8%] h-12 w-12 bg-brand-turquoise/80 animate-float",
  "top-[30%] left-[18%] h-7 w-7 bg-brand-yellow animate-bounce2 [animation-delay:0.2s]",
  "top-[12%] right-[14%] h-9 w-9 bg-brand-orange/90 animate-float-slow [animation-delay:0.5s]",
  "top-[38%] right-[8%] h-14 w-14 bg-brand-grape/70 animate-float [animation-delay:0.8s]",
  "bottom-[30%] left-[12%] h-10 w-10 bg-brand-sky animate-bounce2 [animation-delay:0.4s] hidden md:block",
  "bottom-[26%] right-[16%] h-8 w-8 bg-brand-mint animate-bounce2 [animation-delay:0.7s]",
  "top-[55%] left-[27%] h-6 w-6 bg-brand-orange/70 animate-float-slow [animation-delay:1.1s] hidden md:block",
];

/** Ball-pit rim peeking up from the bottom edge. */
const rimBalls = [
  "bg-brand-turquoise",
  "bg-brand-yellow translate-y-4",
  "bg-brand-orange",
  "bg-brand-grape translate-y-5",
  "bg-brand-sky translate-y-1",
  "bg-brand-mint translate-y-4",
  "bg-brand-turquoise translate-y-2",
];

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* floating ball-pit balls */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {balls.map((cls, i) => (
          <span
            key={i}
            className={`absolute rounded-full shadow-[inset_-5px_-5px_0_rgba(26,16,51,0.08)] ${cls}`}
          />
        ))}
      </div>

      {/* ball-pit rim along the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 inset-x-0 flex justify-center -space-x-5"
      >
        {rimBalls.map((cls, i) => (
          <span
            key={i}
            className={`h-24 w-24 shrink-0 rounded-full shadow-[inset_-7px_-7px_0_rgba(26,16,51,0.1)] ${cls}`}
          />
        ))}
      </div>

      <div className="relative text-center px-6 pb-16">
        <p className="sr-only">Error 404 — page not found</p>

        {/* tilted 404 digits in brand colors */}
        <div aria-hidden className="relative inline-flex items-end justify-center gap-1 select-none">
          <Float className="-top-8 -right-8 w-12 text-brand-grape opacity-80" speed="wiggle">
            <SmileDoodle className="w-full" />
          </Float>
          <Float className="-top-4 -left-10 w-8 text-brand-yellow opacity-80 hidden sm:block" speed="spin">
            <StarDoodle className="w-full" />
          </Float>
          <span className="font-display font-bold leading-none text-[7rem] md:text-[9rem] text-brand-primary inline-block rotate-[-8deg] animate-float">
            4
          </span>
          <span className="font-display font-bold leading-none text-[7rem] md:text-[9rem] text-brand-orange inline-block rotate-[6deg] animate-float [animation-delay:0.3s]">
            0
          </span>
          <span className="font-display font-bold leading-none text-[7rem] md:text-[9rem] text-brand-turquoise inline-block rotate-[-4deg] animate-float [animation-delay:0.6s]">
            4
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-ink mt-4">
          Lost in the ball pit?
        </h1>
        <p className="mt-3 text-xl text-brand-ink/70">
          Looks like this zone is still under construction.
        </p>

        <Link href="/" className="btn-primary mt-8 inline-flex">
          Back to the playground
        </Link>

        {/* sticker caption for the back-home button */}
        <div className="mt-5">
          <span className="sticker rotate-[2deg]"><span aria-hidden="true">🛝</span> the slide home is this way</span>
        </div>
      </div>
    </section>
  );
}
