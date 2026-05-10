import { motion } from "framer-motion";
import { Mail, BellOff, Laptop, Command } from "lucide-react";

const FrameShell = ({ children }: { children: React.ReactNode }) => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b0b14] ring-1 ring-white/5">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-violet)/0.18),transparent_70%)]" />
    {children}
  </div>
);

/* --------- NOTIFICATION (banner appears -> frosts) --------- */
export const NotificationMockup = () => (
  <FrameShell>
    {/* fake desktop background */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900" />
    {/* menu bar */}
    <div className="absolute inset-x-0 top-0 h-6 bg-black/40 backdrop-blur-sm flex items-center justify-end gap-3 px-3 text-[8px] text-white/70">
      <span>100%</span><span>Wed 13:12</span>
    </div>

    {/* banner */}
    <motion.div
      initial={{ opacity: 0, x: 40, y: -10 }}
      animate={{
        opacity: [0, 1, 1, 1, 1],
        x: [40, 0, 0, 0, 0],
      }}
      transition={{ duration: 4, times: [0, 0.2, 0.5, 0.8, 1], repeat: Infinity, repeatDelay: 0.5 }}
      className="absolute right-3 top-9 w-[58%] rounded-xl bg-white/95 p-2.5 shadow-xl"
    >
      <div className="flex items-start gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500">
          <Mail className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-semibold text-slate-900">Sarah Chen</p>
            <span className="text-[7px] text-slate-500">now</span>
          </div>
          <p className="text-[8px] font-medium text-slate-800 leading-tight">Re: Q4 financials attached</p>
          <p className="text-[7px] text-slate-500 leading-tight mt-0.5">Hey — sending the updated deck and the…</p>
        </div>
      </div>

      {/* frost overlay that animates in */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: [0, 0, 1, 1, 0], backdropFilter: ["blur(0px)", "blur(0px)", "blur(8px)", "blur(8px)", "blur(0px)"] as any }}
        transition={{ duration: 4, times: [0, 0.35, 0.5, 0.85, 1], repeat: Infinity, repeatDelay: 0.5 }}
        className="absolute inset-0 rounded-xl bg-white/40"
        style={{ backdropFilter: "blur(8px)" as any }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5">
            <BellOff className="h-3.5 w-3.5 text-brand-violet" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  </FrameShell>
);

/* --------- CLOSE TO BLUR (lid angle drops, blur grows) --------- */
export const LidMockup = () => (
  <FrameShell>
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black" />

    {/* MacBook — side / 3-quarter profile via SVG */}
    <svg
      viewBox="0 0 400 260"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="lidScreenGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="55%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="lidBaseGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="218" rx="160" ry="9" fill="rgba(0,0,0,0.55)" />
      <g>
        <path d="M 70,205 L 330,205 L 305,196 L 95,196 Z" fill="url(#lidBaseGrad)" />
        <path d="M 70,205 L 330,205 L 325,213 L 75,213 Z" fill="#3f3f46" />
        <rect x="125" y="198" width="150" height="3" rx="1" fill="rgba(0,0,0,0.35)" />
      </g>
      <motion.g
        initial={{ rotate: -100 }}
        animate={{ rotate: [-100, -100, -5, -5, -100] }}
        transition={{ duration: 4.5, times: [0, 0.2, 0.55, 0.85, 1], repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 196px", transformBox: "view-box" as any }}
      >
        <rect x="95" y="196" width="210" height="135" rx="8" fill="#27272a" />
        <rect x="103" y="201" width="194" height="122" rx="5" fill="#0a0a0a" />
        <rect x="106" y="204" width="188" height="116" rx="3" fill="url(#lidScreenGrad)" />
        <ellipse cx="160" cy="240" rx="60" ry="30" fill="rgba(255,255,255,0.32)" />
        <rect x="190" y="201" width="20" height="3" rx="1.5" fill="#0a0a0a" />
        <motion.rect
          x="106" y="204" width="188" height="116" rx="3"
          fill="rgba(255,255,255,0.55)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.85, 0.85, 0] }}
          transition={{ duration: 4.5, times: [0, 0.25, 0.55, 0.85, 1], repeat: Infinity, repeatDelay: 0.4 }}
          style={{ filter: "blur(2px)" }}
        />
      </motion.g>
    </svg>

    {/* status pill */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 8] }}
      transition={{ duration: 4.5, times: [0, 0.3, 0.5, 0.85, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[10px] text-white ring-1 ring-white/10 backdrop-blur"
    >
      <Laptop className="mr-1 inline h-3 w-3" /> Lid closing — frosting screen
    </motion.div>
  </FrameShell>
);

/* --------- COUGH TO HIDE (3/4 laptop + person silhouette + cough bubble) --------- */
export const CoughMockup = () => (
  <FrameShell>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />

    {/* desk plane glow */}
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--brand-violet)/0.18),transparent_70%)]" />

    {/* 3/4 laptop */}
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1100px" }}>
      <div
        className="relative w-[55%]"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(18deg) rotateY(-25deg)" }}
      >
        {/* base */}
        <div
          className="relative h-[28px] w-full rounded-[8px] bg-gradient-to-b from-zinc-400 via-zinc-500 to-zinc-700 shadow-[0_25px_50px_-10px_rgba(0,0,0,0.7)]"
          style={{ transform: "rotateX(78deg) translateZ(-2px)", transformOrigin: "top center" }}
        >
          <div className="absolute inset-x-[12%] top-1 bottom-2 rounded bg-zinc-800/60" />
        </div>

        {/* lid (open at angle) */}
        <div
          className="absolute -top-[155%] left-0 right-0 h-[160%] rounded-[10px] bg-zinc-800 p-[5px] shadow-[0_25px_50px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
          style={{ transformOrigin: "bottom center", transform: "rotateX(-3deg)" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[6px] bg-slate-900">
            {/* fake content lines */}
            <div className="space-y-1.5 p-2">
              <div className="h-1.5 w-2/3 rounded-full bg-white/40" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/25" />
              <div className="h-1.5 w-3/4 rounded-full bg-white/25" />
              <div className="h-1.5 w-1/3 rounded-full bg-white/20" />
              <div className="h-1.5 w-3/5 rounded-full bg-white/20" />
            </div>
            {/* notch */}
            <div className="absolute left-1/2 top-0 h-1.5 w-8 -translate-x-1/2 rounded-b bg-black/80" />

            {/* frost overlay triggered by cough */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 4.5, times: [0, 0.45, 0.6, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
              className="absolute inset-0 bg-white/30"
              style={{ backdropFilter: "blur(12px)" as any }}
            />
          </div>
        </div>
      </div>
    </div>

    {/* person silhouette (3/4 from right side, looking at screen) */}
    <svg
      viewBox="0 0 100 140"
      className="absolute -right-1 bottom-0 h-[85%] w-auto text-slate-950"
      preserveAspectRatio="xMaxYMax meet"
      aria-hidden
    >
      {/* shoulders/torso */}
      <path
        d="M -10,140 Q 10,90 35,82 Q 55,78 70,90 Q 90,108 100,140 Z"
        fill="hsl(220 40% 10%)"
        stroke="hsl(250 40% 30% / 0.5)"
        strokeWidth="0.6"
      />
      {/* head 3/4 profile */}
      <path
        d="M 35,72 Q 32,55 42,48 Q 55,42 64,52 Q 70,60 67,72 Q 66,78 60,80 Q 58,84 55,84 Q 50,86 46,84 Q 38,82 35,72 Z"
        fill="hsl(220 40% 12%)"
        stroke="hsl(250 40% 35% / 0.6)"
        strokeWidth="0.6"
      />
      {/* hand to mouth (covering cough) */}
      <motion.path
        animate={{ y: [0, 0, -2, 0, 0] }}
        transition={{ duration: 4.5, times: [0, 0.35, 0.5, 0.65, 1], repeat: Infinity, repeatDelay: 0.4 }}
        d="M 30,80 Q 28,72 35,70 Q 42,69 44,74 Q 45,80 40,82 Q 34,84 30,80 Z"
        fill="hsl(220 40% 14%)"
        stroke="hsl(250 40% 35% / 0.6)"
        strokeWidth="0.6"
      />
    </svg>

    {/* cough bubble */}
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 8 }}
      animate={{
        opacity: [0, 0, 1, 1, 0],
        scale: [0.7, 0.7, 1, 1, 0.7],
        y: [8, 8, 0, 0, 8],
      }}
      transition={{ duration: 4.5, times: [0, 0.3, 0.45, 0.7, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="absolute right-[18%] top-[28%]"
    >
      <div className="relative rounded-2xl bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-xl">
        “cough!”
        <span className="absolute -bottom-1 right-3 h-3 w-3 rotate-45 bg-white" />
      </div>
    </motion.div>

    {/* sound waves emitting toward laptop */}
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0, 0.6, 0, 0], scale: [0.6, 0.6, 1.4, 1.8, 0.6] }}
        transition={{ duration: 4.5, times: [0, 0.35, 0.5, 0.65, 1], repeat: Infinity, repeatDelay: 0.4, delay: i * 0.08 }}
        className="absolute right-[26%] top-[55%] h-6 w-6 rounded-full border border-brand-glow/60"
      />
    ))}

    {/* status pill */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{ duration: 4.5, times: [0, 0.45, 0.55, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] text-white ring-1 ring-white/10 backdrop-blur"
    >
      Cough detected — hiding screen
    </motion.div>
  </FrameShell>
);

/* --------- HOTKEY (cmd+ctrl+B pressed -> frost) --------- */
export const HotkeyMockup = () => (
  <FrameShell>
    <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-slate-900 to-black" />
    {/* fake doc */}
    <div className="absolute inset-x-6 top-6 bottom-20 rounded-xl bg-white/95 p-4 ring-1 ring-white/10">
      <div className="space-y-2">
        <div className="h-2 w-2/3 rounded-full bg-slate-300" />
        <div className="h-2 w-1/2 rounded-full bg-slate-200" />
        <div className="h-2 w-3/4 rounded-full bg-slate-200" />
        <div className="h-2 w-2/5 rounded-full bg-slate-200" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 3.5, times: [0, 0.35, 0.45, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
        className="absolute inset-0 rounded-xl bg-white/40"
        style={{ backdropFilter: "blur(10px)" as any }}
      />
    </div>

    {/* keyboard combo */}
    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
      {["⌘", "⌃", "B"].map((k, i) => (
        <motion.div
          key={k}
          animate={{
            y: [0, 0, 2, 0, 0],
            backgroundColor: ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.08)", "hsl(var(--brand-violet))", "rgba(255,255,255,0.08)", "rgba(255,255,255,0.08)"],
          }}
          transition={{ duration: 3.5, times: [0, 0.3, 0.42, 0.55, 1], repeat: Infinity, repeatDelay: 0.4, delay: i * 0.05 }}
          className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold text-white ring-1 ring-white/15"
        >
          {k}
        </motion.div>
      ))}
      <Command className="ml-2 h-4 w-4 text-brand-glow" />
    </div>
  </FrameShell>
);

/* --------- MARKING BLUR (drag rectangle then frost area) --------- */
export const MarkingMockup = () => (
  <FrameShell>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
    {/* fake browser */}
    <div className="absolute inset-3 rounded-xl bg-white/95 ring-1 ring-white/10 overflow-hidden">
      <div className="flex h-5 items-center gap-1 bg-slate-100 px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        <div className="col-span-2 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded bg-slate-300" />
          <div className="h-1.5 w-1/2 rounded bg-slate-200" />
          <div className="h-1.5 w-2/3 rounded bg-slate-200" />
          <div className="h-1.5 w-3/5 rounded bg-slate-200" />
          <div className="h-1.5 w-4/5 rounded bg-slate-200" />
        </div>
        {/* sidebar that gets marked */}
        <div className="relative h-24 rounded-md bg-slate-100 p-2">
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded bg-slate-300" />
            <div className="h-1.5 w-2/3 rounded bg-slate-200" />
            <div className="h-1.5 w-3/4 rounded bg-slate-200" />
            <div className="h-1.5 w-1/2 rounded bg-slate-200" />
          </div>

          {/* dashed marking rectangle: draws then locks + frosts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              scale: [0.6, 1, 1, 1, 0.6],
            }}
            transition={{ duration: 4, times: [0, 0.35, 0.5, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
            className="absolute inset-1 rounded-md border-2 border-dashed border-brand-glow"
            style={{ transformOrigin: "top left" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 4, times: [0, 0.45, 0.55, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
              className="absolute inset-0 rounded-md bg-white/40"
              style={{ backdropFilter: "blur(8px)" as any }}
            />
          </motion.div>

          {/* cursor */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0, 0],
              x: [0, 60, 60, 60, 0],
              y: [0, 60, 60, 60, 0],
            }}
            transition={{ duration: 4, times: [0, 0.35, 0.5, 0.7, 1], repeat: Infinity, repeatDelay: 0.4 }}
            className="absolute -left-1 -top-1 h-3 w-3"
          >
            <div className="h-0 w-0 border-l-[6px] border-l-transparent border-t-[10px] border-t-white border-r-[6px] border-r-transparent rotate-[-30deg]" />
          </motion.div>
        </div>
      </div>
    </div>
  </FrameShell>
);