import { motion } from "framer-motion";
import { Wind, Laptop, Command, Copy, EyeOff, Plus, Settings, X } from "lucide-react";

const TrafficLight = () => (
  <div className="flex items-center gap-1.5">
    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
  </div>
);

/**
 * Animated mockup of a Mac with the Hidy panel floating over a Safari window.
 * Built entirely in CSS/SVG/HTML to stay crisp at any size and animate.
 */
const HeroMockup = () => {
  return (
    <div className="relative w-full">
      {/* Mac frame */}
      <div className="relative rounded-[28px] bg-gradient-to-b from-zinc-300/80 to-zinc-500/60 p-[6px] shadow-[0_40px_120px_-30px_hsl(245_80%_30%/0.7)]">
        <div className="rounded-[24px] bg-zinc-900 p-2">
          {/* Screen */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[radial-gradient(ellipse_at_top,#a0a8e0_0%,#7c83d5_40%,#5a4fa8_100%)]">
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-30 h-4 w-32 -translate-x-1/2 rounded-b-xl bg-zinc-900" />

            {/* macOS menu bar */}
            <div className="absolute inset-x-0 top-0 z-20 flex h-6 items-center justify-between px-3 text-[10px] text-white/90 backdrop-blur-md bg-black/10">
              <div className="flex items-center gap-3">
                <span className="font-semibold"></span>
                <span className="font-semibold">Safari</span>
                <span className="opacity-70 hidden sm:inline">File</span>
                <span className="opacity-70 hidden sm:inline">Edit</span>
                <span className="opacity-70 hidden sm:inline">View</span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <span>100%</span>
                <span className="hidden sm:inline">Sun 12:53</span>
              </div>
            </div>

            {/* Safari window with frosted content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-1/2 top-[14%] z-10 w-[70%] -translate-x-1/2 overflow-hidden rounded-xl bg-white/95 shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-black/10 bg-white px-3 py-2">
                <TrafficLight />
                <div className="ml-3 flex flex-1 items-center justify-center">
                  <div className="rounded-md bg-black/5 px-3 py-0.5 text-[10px] text-black/60">repose · bopere</div>
                </div>
              </div>
              <div className="relative h-44 sm:h-56">
                {/* Frosted content — gradient blobs blurred heavily */}
                <div className="absolute inset-0">
                  <div className="absolute left-6 top-8 h-24 w-16 rounded-2xl bg-zinc-700/80 blur-2xl" />
                  <div className="absolute left-1/2 top-10 h-28 w-20 -translate-x-1/2 rounded-2xl bg-blue-400/80 blur-2xl" />
                  <div className="absolute right-8 top-12 h-24 w-16 rounded-2xl bg-orange-400/80 blur-2xl" />
                  <div className="absolute bottom-3 left-6 right-6 h-3 rounded bg-black/10 blur-sm" />
                </div>
              </div>
            </motion.div>

            {/* Hidy Panel — mimics the photo */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[6%] top-[10%] z-20 w-[58%] sm:w-[44%] md:w-[38%] origin-top-right"
            >
              <div className="rounded-2xl bg-white/95 p-3 sm:p-4 shadow-[0_30px_80px_-20px_rgba(40,30,90,0.6)] ring-1 ring-black/5 backdrop-blur-xl">
                {/* Close */}
                <div className="flex items-start justify-between">
                  <p className="text-[10px] sm:text-xs font-medium text-zinc-700">Panic — hides everything</p>
                  <button className="grid h-5 w-5 place-items-center rounded-full bg-zinc-200/80 text-zinc-500">
                    <X className="h-3 w-3" />
                  </button>
                </div>

                {/* 3 trigger cards */}
                <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2">
                  <TriggerCard icon={<Wind className="h-4 w-4 sm:h-5 sm:w-5 text-orange-700" />} label="COUGH" pillLabel="NEEDS MIC" pillClass="bg-orange-400 text-white" tile="bg-orange-50" delay={0.9} pulse />
                  <TriggerCard icon={<Laptop className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-800" />} label="LID" pillLabel="ON" pillClass="bg-emerald-500 text-white" tile="bg-emerald-50 ring-1 ring-emerald-300" delay={1.05} />
                  <TriggerCard icon={<Command className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-700" />} label="HOTKEY" pillLabel="OFF" pillClass="bg-zinc-300 text-zinc-700" tile="bg-zinc-50" delay={1.2} />
                </div>

                {/* Window Blur */}
                <p className="mt-3 text-[10px] sm:text-xs text-zinc-700">
                  Window Blur — <span className="text-zinc-500">frost specific app windows</span>
                </p>
                <div className="mt-1 flex items-center justify-between rounded-xl bg-zinc-100 px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <Copy className="h-4 w-4 text-zinc-500" />
                    <Toggle on />
                    <span className="text-[10px] sm:text-xs text-zinc-700">Blur 8 apps · Manage…</span>
                  </div>
                  <span className="text-zinc-400 text-xs">›</span>
                </div>

                {/* Marking Blur */}
                <p className="mt-3 text-[10px] sm:text-xs text-zinc-700">
                  Marking Blur — <span className="text-zinc-500">frost a fixed area on screen</span>
                </p>
                <div className="mt-1 flex items-center justify-between rounded-xl bg-zinc-100 px-2.5 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <EyeOff className="h-4 w-4 text-zinc-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs font-medium text-zinc-800 leading-tight">No regions yet</p>
                      <p className="text-[9px] sm:text-[10px] text-zinc-500 leading-tight truncate">Stays frosted regardless of which…</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-[10px] sm:text-xs text-blue-700">
                    <Plus className="h-3 w-3" /> Add region
                  </button>
                </div>

                {/* Blur Now */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2 sm:py-2.5 text-[11px] sm:text-sm font-medium text-white shadow-md"
                >
                  <EyeOff className="h-4 w-4" /> Blur Now
                </motion.button>

                <div className="mt-2 flex justify-center">
                  <Settings className="h-3.5 w-3.5 text-zinc-400" />
                </div>
              </div>
            </motion.div>

            {/* Floating frost burst when "Blur Now" pulses */}
            <motion.div
              animate={{ opacity: [0, 0.6, 0], scale: [0.9, 1.15, 1.3] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_60%,hsl(230_95%_75%/0.35),transparent_60%)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom keyboard sliver */}
      <div className="mx-auto h-3 w-[92%] rounded-b-2xl bg-gradient-to-b from-zinc-500/60 to-zinc-700/60" />
      <div className="mx-auto h-1 w-[60%] rounded-full bg-zinc-800/40 mt-1" />
    </div>
  );
};

const Toggle = ({ on }: { on?: boolean }) => (
  <span className={`relative inline-block h-4 w-7 rounded-full transition-colors ${on ? "bg-zinc-800" : "bg-zinc-300"}`}>
    <motion.span
      layout
      className="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow"
      animate={{ left: on ? 14 : 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    />
  </span>
);

const TriggerCard = ({
  icon, label, pillLabel, pillClass, tile, delay, pulse,
}: {
  icon: React.ReactNode; label: string; pillLabel: string; pillClass: string; tile: string; delay: number; pulse?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`relative flex flex-col items-center gap-1 rounded-xl ${tile} px-1.5 py-2 sm:py-2.5`}
  >
    {pulse && (
      <motion.span
        animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-xl ring-2 ring-orange-400"
      />
    )}
    <div>{icon}</div>
    <p className="text-[9px] sm:text-[11px] font-bold tracking-wider text-zinc-800">{label}</p>
    <span className={`mt-0.5 inline-flex rounded-md px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold tracking-wider ${pillClass}`}>
      {pillLabel}
    </span>
  </motion.div>
);

export default HeroMockup;
