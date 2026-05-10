import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Wind, Laptop, Command, BellOff, EyeOff, Plus, Settings, X, Mail } from "lucide-react";

const TrafficLight = () => (
  <div className="flex items-center gap-1.5">
    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
  </div>
);

type Scene = "idle" | "cough" | "windowBlur" | "notification" | "areaBlur" | "tabs";

const SCENES: Scene[] = ["idle", "cough", "windowBlur", "notification", "areaBlur", "tabs"];

const HeroMockup = () => {
  const [scene, setScene] = useState<Scene>("idle");

  useEffect(() => {
    const timings: Record<Scene, number> = {
      idle: 1800,
      cough: 1600,
      windowBlur: 2200,
      notification: 2600,
      areaBlur: 2400,
      tabs: 2400,
    };
    const t = setTimeout(() => {
      const next = SCENES[(SCENES.indexOf(scene) + 1) % SCENES.length];
      setScene(next);
    }, timings[scene]);
    return () => clearTimeout(t);
  }, [scene]);

  const windowBlurred = scene === "windowBlur" || scene === "notification" || scene === "areaBlur";
  const showAreaBlur = scene === "areaBlur";
  const showTabs = scene === "tabs";

  return (
    <div className="relative w-full">
      {/* Mac frame */}
      <div className="relative rounded-[28px] bg-gradient-to-b from-zinc-300/80 to-zinc-500/60 p-[6px] shadow-[0_40px_120px_-30px_hsl(245_80%_30%/0.7)]">
        <div className="rounded-[24px] bg-zinc-900 p-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[radial-gradient(ellipse_at_top,#a0a8e0_0%,#7c83d5_40%,#5a4fa8_100%)]">
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-30 h-4 w-32 -translate-x-1/2 rounded-b-xl bg-zinc-900" />

            {/* Menu bar */}
            <div className="absolute inset-x-0 top-0 z-20 flex h-6 items-center justify-between px-3 text-[10px] text-white/90 backdrop-blur-md bg-black/10">
              <div className="flex items-center gap-3">
                <span className="font-semibold">Safari</span>
                <span className="opacity-70 hidden sm:inline">File</span>
                <span className="opacity-70 hidden sm:inline">Edit</span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <span className="hidden sm:inline">Sun 12:53</span>
              </div>
            </div>

            {/* Tab stack reveal */}
            <AnimatePresence>
              {showTabs && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, x: -10 + i * 6, rotate: -4 + i * 2, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute z-[5] overflow-hidden rounded-xl bg-white shadow-2xl"
                      style={{
                        left: `${10 + i * 8}%`,
                        top: `${18 + i * 5}%`,
                        width: "55%",
                        height: "55%",
                      }}
                    >
                      <div className="flex items-center gap-2 border-b border-black/10 px-2 py-1.5">
                        <TrafficLight />
                        <div className="ml-2 rounded bg-black/5 px-2 py-0.5 text-[9px] text-black/60">
                          {["mail.app", "slack.com", "bank.com"][i]}
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="h-2 w-1/2 rounded bg-zinc-200 mb-2" />
                        <div className="h-2 w-3/4 rounded bg-zinc-200 mb-1.5" />
                        <div className="h-2 w-2/3 rounded bg-zinc-200" />
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Safari window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showTabs ? 0 : 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/2 top-[13%] z-10 w-[70%] -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-black/10 bg-white px-3 py-2">
                <TrafficLight />
                <div className="ml-3 flex flex-1 items-center justify-center">
                  <div className="rounded-md bg-black/5 px-3 py-0.5 text-[10px] text-black/60">private.notes</div>
                </div>
              </div>
              <div className="relative h-44 sm:h-56">
                {/* Sharp content */}
                <motion.div
                  animate={{ filter: windowBlurred ? "blur(18px)" : "blur(0px)" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 p-5"
                >
                  <div className="h-3 w-2/3 rounded bg-zinc-800/80 mb-3" />
                  <div className="h-2 w-full rounded bg-zinc-300 mb-2" />
                  <div className="h-2 w-5/6 rounded bg-zinc-300 mb-2" />
                  <div className="h-2 w-4/6 rounded bg-zinc-300 mb-4" />
                  <div className="flex gap-3">
                    <div className="h-16 w-20 rounded-lg bg-blue-400/80" />
                    <div className="h-16 w-20 rounded-lg bg-orange-400/80" />
                    <div className="h-16 w-20 rounded-lg bg-emerald-400/80" />
                  </div>
                </motion.div>

                {/* Frost overlay */}
                <AnimatePresence>
                  {windowBlurred && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-white/40 backdrop-blur-md"
                    />
                  )}
                </AnimatePresence>

                {/* Area blur rectangle */}
                <AnimatePresence>
                  {showAreaBlur && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute left-[40%] top-[55%] z-10 h-12 w-24 rounded-md border-2 border-dashed border-brand-violet/80 bg-white/70 backdrop-blur-lg shadow-lg"
                    >
                      <span className="absolute -top-5 left-0 rounded bg-brand-violet px-1.5 py-0.5 text-[8px] font-bold text-white">
                        Area frosted
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Notification banner */}
            <AnimatePresence>
              {scene === "notification" && (
                <motion.div
                  initial={{ opacity: 0, y: -30, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-[8%] top-[10%] z-30 flex items-center gap-2 rounded-xl bg-white/85 px-3 py-2 shadow-2xl backdrop-blur-md"
                  style={{ width: "32%" }}
                >
                  <Mail className="h-4 w-4 text-blue-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-semibold text-zinc-800 truncate">Mail · Sarah</p>
                    <p className="text-[9px] text-zinc-500 truncate">Re: confidential update</p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="absolute inset-0 rounded-xl bg-white/60 backdrop-blur-md flex items-center justify-center"
                  >
                    <BellOff className="h-4 w-4 text-zinc-600" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* COUGH detected toast */}
            <AnimatePresence>
              {scene === "cough" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-[40%] z-40 -translate-x-1/2 flex items-center gap-2 rounded-full bg-zinc-900/90 px-4 py-2 text-white shadow-2xl backdrop-blur"
                >
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <Wind className="h-4 w-4 text-orange-300" />
                  </motion.span>
                  <span className="text-xs font-semibold tracking-wide">Cough detected · blurring</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidy Panel */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[5%] top-[9%] z-20 w-[58%] sm:w-[42%] md:w-[36%] origin-top-right"
            >
              <div className="rounded-2xl bg-white/95 p-3 sm:p-4 shadow-[0_30px_80px_-20px_rgba(40,30,90,0.6)] ring-1 ring-black/5 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <p className="text-[10px] sm:text-xs font-medium text-zinc-700">Panic — hides everything</p>
                  <button className="grid h-5 w-5 place-items-center rounded-full bg-zinc-200/80 text-zinc-500">
                    <X className="h-3 w-3" />
                  </button>
                </div>

                {/* Trigger cards */}
                <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2">
                  <TriggerCard
                    icon={<Wind className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-700" />}
                    label="COUGH"
                    pillLabel={scene === "cough" ? "ON" : "OFF"}
                    pillClass={scene === "cough" ? "bg-emerald-500 text-white" : "bg-zinc-300 text-zinc-700"}
                    tile={scene === "cough" ? "bg-emerald-50 ring-1 ring-emerald-300" : "bg-zinc-50"}
                    pulse={scene === "cough"}
                  />
                  <TriggerCard
                    icon={<Laptop className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-800" />}
                    label="LID"
                    pillLabel="ON"
                    pillClass="bg-emerald-500 text-white"
                    tile="bg-emerald-50 ring-1 ring-emerald-300"
                  />
                  <TriggerCard
                    icon={<Command className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-700" />}
                    label="HOTKEY"
                    pillLabel="OFF"
                    pillClass="bg-zinc-300 text-zinc-700"
                    tile="bg-zinc-50"
                  />
                </div>

                {/* Notification Blur */}
                <p className="mt-3 text-[10px] sm:text-xs text-zinc-700">
                  Notification Blur — <span className="text-zinc-500">hide alerts during shares</span>
                </p>
                <div className={`mt-1 flex items-center gap-2 rounded-xl px-2.5 py-2 transition-colors ${scene === "notification" ? "bg-blue-50 ring-1 ring-blue-200" : "bg-zinc-100"}`}>
                  <BellOff className="h-4 w-4 text-zinc-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-medium text-zinc-800 leading-tight">On</p>
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 leading-tight truncate">Frosts incoming notification banners.</p>
                  </div>
                  <Toggle on />
                </div>

                {/* Area Blur */}
                <p className="mt-3 text-[10px] sm:text-xs text-zinc-700">
                  Area Blur — <span className="text-zinc-500">frost a fixed area on screen</span>
                </p>
                <div className={`mt-1 flex items-center justify-between rounded-xl px-2.5 py-2 transition-colors ${showAreaBlur ? "bg-violet-50 ring-1 ring-violet-200" : "bg-zinc-100"}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <EyeOff className="h-4 w-4 text-zinc-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs font-medium text-zinc-800 leading-tight">{showAreaBlur ? "1 region active" : "No regions yet"}</p>
                      <p className="text-[9px] sm:text-[10px] text-zinc-500 leading-tight truncate">Stays frosted regardless of which…</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-[10px] sm:text-xs text-blue-700 shrink-0">
                    <Plus className="h-3 w-3" /> Add
                  </button>
                </div>

                {/* Blur Now */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  animate={windowBlurred ? { backgroundColor: "#7c3aed" } : { backgroundColor: "#18181b" }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2 sm:py-2.5 text-[11px] sm:text-sm font-medium text-white shadow-md"
                >
                  <EyeOff className="h-4 w-4" /> {windowBlurred ? "Blurring…" : "Blur Now"}
                </motion.button>

                <div className="mt-2 flex justify-center">
                  <Settings className="h-3.5 w-3.5 text-zinc-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto h-3 w-[92%] rounded-b-2xl bg-gradient-to-b from-zinc-500/60 to-zinc-700/60" />
      <div className="mx-auto h-1 w-[60%] rounded-full bg-zinc-800/40 mt-1" />

      {/* Scene caption */}
      <div className="mt-6 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={scene}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-full px-4 py-1.5 text-xs text-muted-foreground"
          >
            {sceneLabel(scene)}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

const sceneLabel = (s: Scene) => ({
  idle: "Working in private",
  cough: "Cough detected — instant frost",
  windowBlur: "Window blur engaged",
  notification: "Notification frosted before reveal",
  areaBlur: "Area blur — fixed region locked",
  tabs: "Auto-blur across stacked apps",
}[s]);

const Toggle = ({ on }: { on?: boolean }) => (
  <span className={`relative inline-block h-4 w-7 rounded-full shrink-0 transition-colors ${on ? "bg-zinc-800" : "bg-zinc-300"}`}>
    <motion.span
      className="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow"
      animate={{ left: on ? 14 : 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    />
  </span>
);

const TriggerCard = ({
  icon, label, pillLabel, pillClass, tile, pulse,
}: {
  icon: React.ReactNode; label: string; pillLabel: string; pillClass: string; tile: string; pulse?: boolean;
}) => (
  <motion.div
    layout
    transition={{ duration: 0.3 }}
    className={`relative flex flex-col items-center gap-1 rounded-xl ${tile} px-1.5 py-2 sm:py-2.5`}
  >
    {pulse && (
      <motion.span
        animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-xl ring-2 ring-emerald-400"
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
