import { motion } from "framer-motion";
import { Mail, BellOff, Wind, Laptop, Command } from "lucide-react";

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
    <div className="absolute inset-0 flex items-center justify-center [perspective:900px]">
      <div className="relative h-[55%] w-[70%]">
        {/* base / keyboard */}
        <div className="absolute bottom-0 left-1/2 h-[14%] w-[110%] -translate-x-1/2 rounded-b-xl bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
        {/* lid */}
        <motion.div
          initial={{ rotateX: -5 }}
          animate={{ rotateX: [-5, -5, -55, -55, -5] }}
          transition={{ duration: 4.5, times: [0, 0.2, 0.55, 0.85, 1], repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
          className="absolute bottom-[12%] left-0 right-0 top-0 rounded-xl bg-zinc-800 p-1 shadow-2xl ring-1 ring-white/10"
        >
          <div className="relative h-full w-full overflow-hidden rounded-lg">
            {/* screen content */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.4),transparent_50%)]" />
            {/* progressive frost */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: 4.5, times: [0, 0.25, 0.55, 0.85, 1], repeat: Infinity, repeatDelay: 0.4 }}
              className="absolute inset-0 backdrop-blur-xl bg-white/10"
              style={{ backdropFilter: "blur(14px)" as any }}
            />
          </div>
        </motion.div>
      </div>
    </div>
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

/* --------- BLOW TO BLUR (mic waveform, then frost) --------- */
export const BlowMockup = () => (
  <FrameShell>
    <div className="absolute inset-0 bg-gradient-to-br from-sky-900/40 via-slate-900 to-black" />
    {/* fake screen content */}
    <div className="absolute inset-x-6 top-6 bottom-16 rounded-xl bg-gradient-to-br from-cyan-300/80 to-sky-200/80 ring-1 ring-white/10">
      <div className="space-y-2 p-4">
        <div className="h-2 w-2/3 rounded-full bg-sky-900/30" />
        <div className="h-2 w-1/2 rounded-full bg-sky-900/20" />
        <div className="h-2 w-3/4 rounded-full bg-sky-900/20" />
      </div>
      {/* frost layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.4, 0.55, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
        className="absolute inset-0 rounded-xl bg-white/40"
        style={{ backdropFilter: "blur(12px)" as any }}
      />
    </div>

    {/* mic + waveform bar */}
    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
      <motion.div
        animate={{ scale: [1, 1, 1.15, 1, 1] }}
        transition={{ duration: 4, times: [0, 0.3, 0.45, 0.6, 1], repeat: Infinity, repeatDelay: 0.4 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-violet/30 ring-1 ring-brand-violet/60"
      >
        <Wind className="h-4 w-4 text-brand-glow" />
      </motion.div>
      <div className="flex h-7 items-center gap-[3px]">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              height: ["20%", "20%", `${30 + Math.sin(i) * 30 + 50}%`, "20%", "20%"],
            }}
            transition={{ duration: 4, times: [0, 0.3, 0.5, 0.7, 1], repeat: Infinity, repeatDelay: 0.4, delay: i * 0.02 }}
            className="w-[3px] rounded-full bg-gradient-to-t from-brand-violet to-brand-glow"
          />
        ))}
      </div>
    </div>

    {/* label */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{ duration: 4, times: [0, 0.4, 0.5, 0.9, 1], repeat: Infinity, repeatDelay: 0.4 }}
      className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[10px] text-white ring-1 ring-white/10 backdrop-blur"
    >
      Blow detected — frosting
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