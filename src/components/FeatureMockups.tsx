import { motion } from "framer-motion";
import { Mail, BellOff, Laptop } from "lucide-react";
import lidPhoto from "@/assets/feature-lid-photo.jpg";
import HeroMockup from "@/components/HeroMockup";

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
    {/* SVG side-profile MacBook with SMIL lid animation */}
    <svg
      viewBox="0 0 400 260"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="lidScreen2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="55%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="lidBack2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#27272a" />
        </linearGradient>
      </defs>

      {/* desk shadow */}
      <ellipse cx="200" cy="218" rx="170" ry="7" fill="rgba(0,0,0,0.6)" />

      {/* base — true side profile (long thin slab) */}
      <rect x="60" y="208" width="280" height="8" rx="2" fill="#3f3f46" />
      <rect x="60" y="208" width="280" height="3" rx="1.5" fill="#71717a" />
      <rect x="335" y="206" width="6" height="10" rx="1.5" fill="#27272a" />

      {/* hinge dot */}
      <circle cx="338" cy="208" r="2" fill="#18181b" />

      {/* lid — pivots at hinge (right side, x=338 y=208).
          Rotation axis goes from 0deg (closed, lying on base) to -110deg (open, standing up).
          We draw it in the CLOSED position (extending LEFT from hinge along the base) and animate. */}
      <g
        style={{
          transformOrigin: "338px 208px",
          transformBox: "view-box" as any,
          animation: "hidy-lid-close 4.5s ease-in-out infinite",
        }}
      >
        {/* lid body */}
        <rect x="60" y="200" width="278" height="8" rx="2" fill="url(#lidBack2)" />
        {/* screen face (visible underside when open) */}
        <rect x="64" y="201" width="270" height="6" rx="1.5" fill="url(#lidScreen2)" />
      </g>

      <style>{`
        @keyframes hidy-lid-close {
          0%, 18% { transform: rotate(-110deg); }
          55%, 82% { transform: rotate(-2deg); }
          100% { transform: rotate(-110deg); }
        }
      `}</style>
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
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
    <HeroMockup />
  </div>
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