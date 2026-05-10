import { motion } from "framer-motion";
import { Mail, BellOff, Laptop, Mic, Video, PhoneOff, MessageSquare, Users, MoreVertical } from "lucide-react";
import HeroMockup from "@/components/HeroMockup";
import { useEffect, useState } from "react";

const FrameShell = ({ children }: { children: React.ReactNode }) => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b0b14] ring-1 ring-white/5">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-violet)/0.18),transparent_70%)]" />
    {children}
  </div>
);

/* --------- MEETING MODE (Google Meet UI + notification banner that frosts) --------- */
export const NotificationMockup = () => (
  <FrameShell>
    {/* Meet dark backdrop */}
    <div className="absolute inset-0 bg-[#202124]" />

    {/* meeting tiles */}
    <div className="absolute inset-3 bottom-10 grid grid-cols-2 gap-2">
      {/* presenter tile */}
      <div className="relative col-span-1 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white text-[11px] font-semibold">SC</div>
        </div>
        <div className="absolute bottom-1 left-1.5 text-[8px] text-white/90 font-medium">Sarah Chen</div>
        <div className="absolute bottom-1 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black/60">
          <Mic className="h-2 w-2 text-white" />
        </div>
      </div>
      {/* self tile */}
      <div className="relative col-span-1 rounded-lg bg-gradient-to-br from-indigo-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center text-white text-[11px] font-semibold">You</div>
        </div>
        <div className="absolute bottom-1 left-1.5 text-[8px] text-white/90 font-medium">You</div>
        <div className="absolute bottom-1 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500">
          <Mic className="h-2 w-2 text-white" />
        </div>
      </div>
    </div>

    {/* meeting bottom bar */}
    <div className="absolute inset-x-0 bottom-0 h-8 bg-[#1a1a1c] flex items-center justify-between px-3">
      <div className="text-[8px] text-white/70 font-mono">14:32 | abc-defg-hij</div>
      <div className="flex items-center gap-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10"><Mic className="h-2.5 w-2.5 text-white" /></div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10"><Video className="h-2.5 w-2.5 text-white" /></div>
        <div className="flex h-5 w-7 items-center justify-center rounded-full bg-rose-500"><PhoneOff className="h-2.5 w-2.5 text-white" /></div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10"><MessageSquare className="h-2.5 w-2.5 text-white" /></div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10"><Users className="h-2.5 w-2.5 text-white" /></div>
      </div>
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10"><MoreVertical className="h-2.5 w-2.5 text-white" /></div>
    </div>

    {/* incoming notification banner */}
    <motion.div
      initial={{ opacity: 0, x: 40, y: -10 }}
      animate={{ opacity: [0, 1, 1, 1, 1], x: [40, 0, 0, 0, 0] }}
      transition={{ duration: 4, times: [0, 0.2, 0.5, 0.8, 1], repeat: Infinity, repeatDelay: 0.5 }}
      className="absolute right-3 top-3 w-[58%] rounded-xl bg-white/95 p-2.5 shadow-xl"
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

      {/* frost overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
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
const LID_PRESETS = [
  { label: "90° Open", angle: 75 },
  { label: "45° Blur", angle: 45 },
  { label: "10° Safe", angle: 8 },
];

export const LidMockup = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % LID_PRESETS.length), 1600);
    return () => clearInterval(t);
  }, []);
  const angle = LID_PRESETS[i].angle;

  return (
    <FrameShell>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0b0b14] to-black" />

      {/* layout: diagram centered, pills below */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 py-8">
        {/* diagram — sized so visual bbox is centered horizontally */}
        <div className="relative h-32 w-64">
          {/* base anchored at bottom-center */}
          <div className="absolute bottom-0 left-1/2 h-1 w-40 -translate-x-1/2 rounded-full bg-white/85" />
          {/* hinge at base left edge */}
          <div
            className="absolute bottom-[-3px] h-2.5 w-2.5 rounded-full bg-white/70"
            style={{ left: "calc(50% - 80px - 5px)" }}
          />
          {/* lid pivots from hinge */}
          <motion.div
            className="absolute bottom-0 h-1.5 w-40 origin-left rounded-full bg-gradient-to-r from-brand-violet to-brand-glow shadow-[0_0_22px_hsl(var(--brand-violet)/0.7)]"
            style={{ left: "calc(50% - 80px)" }}
            animate={{ rotate: -angle }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
          />
        </div>

        {/* preset pills */}
        <div className="flex gap-2 text-[10px] font-medium">
          {LID_PRESETS.map((p, idx) => (
            <div
              key={p.label}
              className={[
                "rounded-full px-3 py-1.5 ring-1 transition-all",
                idx === i
                  ? "bg-brand-violet text-white ring-brand-violet/60 shadow-[0_0_18px_hsl(var(--brand-violet)/0.5)]"
                  : "bg-white/5 text-white/60 ring-white/10",
              ].join(" ")}
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </FrameShell>
  );
};

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