import { motion } from "framer-motion";
import { Mail, BellOff, Laptop } from "lucide-react";
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
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0b0b14] to-black" />

    {/* glow */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/25 blur-3xl" />

    {/* laptop stage */}
    <div className="absolute inset-0 flex items-end justify-center pb-10">
      <div className="relative" style={{ perspective: "1200px" }}>
        {/* lid */}
        <div
          className="relative origin-bottom animate-[lidClose_5s_ease-in-out_infinite]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative h-28 w-48 overflow-hidden rounded-t-md bg-gradient-to-br from-slate-800 to-slate-900 ring-1 ring-white/10 shadow-2xl">
            {/* fake UI */}
            <div className="absolute inset-1.5 space-y-1">
              <div className="flex gap-1">
                <div className="h-1 w-6 rounded bg-white/20" />
                <div className="h-1 w-10 rounded bg-white/15" />
                <div className="h-1 w-4 rounded bg-white/15" />
              </div>
              <div className="h-1 w-4/5 rounded bg-white/15" />
              <div className="h-1 w-3/5 rounded bg-white/10" />
              <div className="h-1 w-2/3 rounded bg-white/10" />
              <div className="h-1 w-1/2 rounded bg-white/10" />
              <div className="h-1 w-3/4 rounded bg-white/10" />
            </div>

            {/* frost overlay */}
            <div className="absolute inset-0 bg-white/30 opacity-0 animate-[lidFrost_5s_ease-in-out_infinite]"
                 style={{ backdropFilter: "blur(10px)" as any }} />

            {/* shimmer */}
            <div className="absolute -inset-2 overflow-hidden">
              <div className="absolute top-0 h-full w-8 -translate-x-full rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[lidShimmer_5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* base */}
        <div className="relative -mt-px h-2 w-52 -translate-x-2 rounded-b-xl bg-gradient-to-b from-slate-600 to-slate-800 ring-1 ring-white/10 shadow-xl" />
        {/* shadow */}
        <div className="absolute -bottom-3 left-1/2 h-3 w-56 -translate-x-1/2 rounded-full bg-black/60 blur-md" />
      </div>
    </div>

    {/* angle labels */}
    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 text-[8px]">
      <div className="rounded-full bg-white/10 px-2 py-0.5 text-white/70 ring-1 ring-white/10">90° Open</div>
      <div className="rounded-full bg-brand-violet/30 px-2 py-0.5 text-white ring-1 ring-brand-violet/40">45° Blur</div>
      <div className="rounded-full bg-white/10 px-2 py-0.5 text-white/70 ring-1 ring-white/10">10° Safe</div>
    </div>

    {/* status pill */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 8] }}
      transition={{ duration: 5, times: [0, 0.3, 0.5, 0.85, 1], repeat: Infinity }}
      className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[10px] text-white ring-1 ring-white/10 backdrop-blur"
    >
      <Laptop className="mr-1 inline h-3 w-3" /> Lid closing — frosting screen
    </motion.div>

    <style>{`
      @keyframes lidClose {
        0%   { transform: perspective(1200px) rotateX(-8deg); }
        35%  { transform: perspective(1200px) rotateX(35deg); }
        60%  { transform: perspective(1200px) rotateX(72deg); }
        100% { transform: perspective(1200px) rotateX(-8deg); }
      }
      @keyframes lidFrost {
        0%, 20% { opacity: 0; }
        45%     { opacity: 1; }
        80%     { opacity: 1; }
        100%    { opacity: 0; }
      }
      @keyframes lidShimmer {
        0%   { transform: translateX(-200%) rotate(12deg); opacity: 0; }
        40%  { opacity: 1; }
        70%  { transform: translateX(500%) rotate(12deg); opacity: 0.8; }
        100% { transform: translateX(500%) rotate(12deg); opacity: 0; }
      }
    `}</style>
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