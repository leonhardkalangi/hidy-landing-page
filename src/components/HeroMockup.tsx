import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Wind, Laptop, Command, BellOff, EyeOff, Plus, Settings, X, Mail, FileText, Folder, Image as ImageIcon } from "lucide-react";

const TrafficLight = () => (
  <div className="flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
  </div>
);

type Scene = "idle" | "coughStack" | "coughPopup" | "coughBlur" | "notification" | "areaBlur" | "tabs";

const SCENES: Scene[] = ["idle", "coughStack", "coughPopup", "coughBlur", "notification", "areaBlur", "tabs"];

const TIMINGS: Record<Scene, number> = {
  idle: 1600,
  coughStack: 1500,
  coughPopup: 1500,
  coughBlur: 2000,
  notification: 2400,
  areaBlur: 2200,
  tabs: 2200,
};

const STACK_WINDOWS = [
  { name: "Inbox — sarah@", color: "bg-blue-50", icon: Mail, lines: 3 },
  { name: "Contract.pdf", color: "bg-amber-50", icon: FileText, lines: 4 },
  { name: "Photos", color: "bg-pink-50", icon: ImageIcon, lines: 0 },
  { name: "Documents", color: "bg-emerald-50", icon: Folder, lines: 2 },
];

const HeroMockup = () => {
  const [scene, setScene] = useState<Scene>("idle");

  useEffect(() => {
    const t = setTimeout(() => {
      setScene(SCENES[(SCENES.indexOf(scene) + 1) % SCENES.length]);
    }, TIMINGS[scene]);
    return () => clearTimeout(t);
  }, [scene]);

  const showStack = scene === "coughStack" || scene === "coughPopup" || scene === "coughBlur";
  const screenBlur = scene === "coughBlur";
  const windowFrosted = scene === "notification" || scene === "areaBlur";
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
                <span className="font-semibold">Finder</span>
                <span className="opacity-70 hidden sm:inline">File</span>
                <span className="opacity-70 hidden sm:inline">Edit</span>
                <span className="opacity-70 hidden sm:inline">View</span>
              </div>
              <div className="flex items-center gap-2 opacity-80 hidden sm:flex">
                <span>Sun 12:53</span>
              </div>
            </div>

            {/* === Everything that gets blurred during coughBlur lives in this group === */}
            <motion.div
              className="absolute inset-0 z-10"
              animate={{ filter: screenBlur ? "blur(22px)" : "blur(0px)" }}
              transition={{ duration: 0.5 }}
            >
              {/* Stacked windows (cough scene) */}
              <AnimatePresence>
                {showStack && STACK_WINDOWS.map((w, i) => {
                  const Icon = w.icon;
                  return (
                    <motion.div
                      key={w.name}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-black/10"
                      style={{
                        left: `${6 + i * 7}%`,
                        top: `${15 + i * 7}%`,
                        width: "44%",
                        height: "62%",
                        zIndex: 5 + i,
                      }}
                    >
                      <div className="flex items-center gap-2 border-b border-black/10 bg-zinc-50 px-2 py-1.5">
                        <TrafficLight />
                        <div className="ml-2 flex items-center gap-1 text-[9px] text-zinc-700">
                          <Icon className="h-3 w-3" /> {w.name}
                        </div>
                      </div>
                      <div className={`h-full p-2 ${w.color}`}>
                        {Array.from({ length: w.lines }).map((_, j) => (
                          <div key={j} className="mb-1 h-1.5 rounded bg-zinc-300" style={{ width: `${50 + ((j * 17) % 40)}%` }} />
                        ))}
                        {w.lines === 0 && (
                          <div className="grid grid-cols-3 gap-1.5 mt-1">
                            {Array.from({ length: 6 }).map((_, k) => (
                              <div key={k} className="aspect-square rounded bg-pink-200" />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Default Safari window (idle / notification / areaBlur scenes) */}
              <AnimatePresence>
                {!showStack && !showTabs && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-[6%] top-[14%] z-10 w-[55%] overflow-hidden rounded-lg bg-white shadow-2xl"
                  >
                    <div className="flex items-center gap-2 border-b border-black/10 bg-white px-3 py-1.5">
                      <TrafficLight />
                      <div className="ml-3 flex flex-1 items-center justify-center">
                        <div className="rounded bg-black/5 px-3 py-0.5 text-[9px] text-black/60">private.notes</div>
                      </div>
                    </div>
                    <div className="relative h-36 sm:h-44">
                      <motion.div
                        animate={{ filter: windowFrosted ? "blur(14px)" : "blur(0px)" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 p-4"
                      >
                        <div className="h-2.5 w-2/3 rounded bg-zinc-800/80 mb-2" />
                        <div className="h-1.5 w-full rounded bg-zinc-300 mb-1.5" />
                        <div className="h-1.5 w-5/6 rounded bg-zinc-300 mb-1.5" />
                        <div className="h-1.5 w-4/6 rounded bg-zinc-300 mb-3" />
                        <div className="flex gap-2">
                          <div className="h-12 w-16 rounded bg-blue-400/80" />
                          <div className="h-12 w-16 rounded bg-orange-400/80" />
                          <div className="h-12 w-16 rounded bg-emerald-400/80" />
                        </div>
                      </motion.div>

                      <AnimatePresence>
                        {windowFrosted && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-white/40 backdrop-blur-md"
                          />
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {showAreaBlur && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-[35%] top-[55%] z-10 h-10 w-20 rounded border-2 border-dashed border-brand-violet/80 bg-white/70 backdrop-blur-lg shadow-lg"
                          >
                            <span className="absolute -top-4 left-0 rounded bg-brand-violet px-1 py-0.5 text-[7px] font-bold text-white">
                              Area frosted
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tab stack reveal */}
              <AnimatePresence>
                {showTabs && [0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, rotate: -4 + i * 2, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="absolute z-[5] overflow-hidden rounded-lg bg-white shadow-2xl"
                    style={{ left: `${8 + i * 7}%`, top: `${16 + i * 5}%`, width: "48%", height: "55%" }}
                  >
                    <div className="flex items-center gap-2 border-b border-black/10 px-2 py-1.5">
                      <TrafficLight />
                      <div className="ml-2 rounded bg-black/5 px-2 py-0.5 text-[9px] text-black/60">
                        {["mail.app", "slack.com", "bank.com"][i]}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="h-1.5 w-1/2 rounded bg-zinc-200 mb-1.5" />
                      <div className="h-1.5 w-3/4 rounded bg-zinc-200 mb-1" />
                      <div className="h-1.5 w-2/3 rounded bg-zinc-200" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Frost overlay for full-screen cough blur */}
            <AnimatePresence>
              {screenBlur && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-20 bg-white/25"
                />
              )}
            </AnimatePresence>

            {/* COUGH popup — bigger, centered */}
            <AnimatePresence>
              {scene === "coughPopup" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 rounded-2xl bg-zinc-900/95 px-6 py-5 text-white shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500/20"
                  >
                    <Wind className="h-5 w-5 text-emerald-300" />
                  </motion.div>
                  <p className="text-sm font-semibold tracking-wide">Cough detected</p>
                  <p className="text-[10px] text-white/60">Frosting screen now…</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Frost shield indicator after blur */}
            <AnimatePresence>
              {screenBlur && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full bg-zinc-900/80 px-4 py-2 text-white text-xs shadow-2xl backdrop-blur"
                >
                  <EyeOff className="h-4 w-4 text-emerald-300" /> Screen frosted
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification banner */}
            <AnimatePresence>
              {scene === "notification" && (
                <motion.div
                  initial={{ opacity: 0, y: -25, x: 15 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="absolute right-[6%] top-[10%] z-30 flex items-center gap-2 rounded-lg bg-white/85 px-2.5 py-1.5 shadow-2xl backdrop-blur-md"
                  style={{ width: "30%" }}
                >
                  <Mail className="h-3.5 w-3.5 text-blue-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-semibold text-zinc-800 truncate">Mail · Sarah</p>
                    <p className="text-[8px] text-zinc-500 truncate">Re: confidential update</p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="absolute inset-0 rounded-lg bg-white/60 backdrop-blur-md flex items-center justify-center"
                  >
                    <BellOff className="h-3.5 w-3.5 text-zinc-600" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidy Panel — compact, never blurred */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute right-[3%] top-[10%] z-30 w-[38%] sm:w-[32%] md:w-[28%] origin-top-right"
            >
              <div className="rounded-xl bg-white/95 p-2.5 shadow-[0_30px_80px_-20px_rgba(40,30,90,0.6)] ring-1 ring-black/5 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <p className="text-[9px] font-medium text-zinc-700">Panic — hides everything</p>
                  <button className="grid h-3.5 w-3.5 place-items-center rounded-full bg-zinc-200 text-zinc-500">
                    <X className="h-2 w-2" />
                  </button>
                </div>

                <div className="mt-1.5 grid grid-cols-3 gap-1">
                  <TriggerCard
                    icon={<Wind className="h-3.5 w-3.5 text-zinc-700" />}
                    label="COUGH"
                    pillLabel={showStack ? "ON" : "OFF"}
                    pillClass={showStack ? "bg-emerald-500 text-white" : "bg-zinc-300 text-zinc-700"}
                    tile={showStack ? "bg-emerald-50 ring-1 ring-emerald-300" : "bg-zinc-50"}
                    pulse={scene === "coughPopup" || scene === "coughBlur"}
                  />
                  <TriggerCard
                    icon={<Laptop className="h-3.5 w-3.5 text-emerald-800" />}
                    label="LID"
                    pillLabel="ON"
                    pillClass="bg-emerald-500 text-white"
                    tile="bg-emerald-50 ring-1 ring-emerald-300"
                  />
                  <TriggerCard
                    icon={<Command className="h-3.5 w-3.5 text-zinc-700" />}
                    label="HOTKEY"
                    pillLabel="OFF"
                    pillClass="bg-zinc-300 text-zinc-700"
                    tile="bg-zinc-50"
                  />
                </div>

                <p className="mt-2 text-[8px] text-zinc-700">
                  Notification Blur — <span className="text-zinc-500">hide alerts</span>
                </p>
                <div className={`mt-1 flex items-center gap-1.5 rounded-md px-1.5 py-1 ${scene === "notification" ? "bg-blue-50 ring-1 ring-blue-200" : "bg-zinc-100"}`}>
                  <BellOff className="h-3 w-3 text-zinc-500 shrink-0" />
                  <p className="text-[8px] font-medium text-zinc-800 flex-1 truncate">On</p>
                  <Toggle on />
                </div>

                <p className="mt-2 text-[8px] text-zinc-700">
                  Area Blur — <span className="text-zinc-500">fixed area</span>
                </p>
                <div className={`mt-1 flex items-center justify-between rounded-md px-1.5 py-1 ${showAreaBlur ? "bg-violet-50 ring-1 ring-violet-200" : "bg-zinc-100"}`}>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <EyeOff className="h-3 w-3 text-zinc-500 shrink-0" />
                    <p className="text-[8px] font-medium text-zinc-800 truncate">{showAreaBlur ? "1 region" : "No regions"}</p>
                  </div>
                  <button className="flex items-center gap-0.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-[7px] text-blue-700 shrink-0">
                    <Plus className="h-2 w-2" /> Add
                  </button>
                </div>

                <motion.button
                  animate={screenBlur || windowFrosted ? { backgroundColor: "#7c3aed" } : { backgroundColor: "#18181b" }}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[9px] font-medium text-white shadow"
                >
                  <EyeOff className="h-3 w-3" /> {screenBlur || windowFrosted ? "Blurring…" : "Blur Now"}
                </motion.button>

                <div className="mt-1 flex justify-center">
                  <Settings className="h-2.5 w-2.5 text-zinc-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto h-3 w-[92%] rounded-b-2xl bg-gradient-to-b from-zinc-500/60 to-zinc-700/60" />
      <div className="mx-auto h-1 w-[60%] rounded-full bg-zinc-800/40 mt-1" />

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
  coughStack: "Multiple windows open — anyone could see",
  coughPopup: "Cough detected by mic",
  coughBlur: "Entire screen frosted instantly",
  notification: "Notification frosted before reveal",
  areaBlur: "Area blur — fixed region locked",
  tabs: "Auto-blur across stacked apps",
}[s]);

const Toggle = ({ on }: { on?: boolean }) => (
  <span className={`relative inline-block h-3 w-5 rounded-full shrink-0 ${on ? "bg-zinc-800" : "bg-zinc-300"}`}>
    <motion.span
      className="absolute top-0.5 h-2 w-2 rounded-full bg-white shadow"
      animate={{ left: on ? 11 : 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    />
  </span>
);

const TriggerCard = ({
  icon, label, pillLabel, pillClass, tile, pulse,
}: {
  icon: React.ReactNode; label: string; pillLabel: string; pillClass: string; tile: string; pulse?: boolean;
}) => (
  <div className={`relative flex flex-col items-center gap-0.5 rounded-md ${tile} px-1 py-1.5`}>
    {pulse && (
      <motion.span
        animate={{ scale: [1, 1.5], opacity: [0.55, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-md ring-2 ring-emerald-400"
      />
    )}
    <div>{icon}</div>
    <p className="text-[7px] font-bold tracking-wider text-zinc-800">{label}</p>
    <span className={`inline-flex rounded px-1 py-px text-[6px] font-bold tracking-wider ${pillClass}`}>
      {pillLabel}
    </span>
  </div>
);

export default HeroMockup;
