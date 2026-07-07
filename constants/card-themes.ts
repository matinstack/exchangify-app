export const CARD_THEMES = {
  "purple-indigo": {
    bg: "bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-neutral-950 border-indigo-500/20 dark:border-purple-500/10",
    text: "text-white",
    subText: "text-indigo-200/70 dark:text-purple-300/60",
    chip: "bg-white/15 dark:bg-purple-500/20 border-white/10 dark:border-purple-400/20",
    label: "Purple",
  },

  "emerald-crypto": {
    bg: "bg-gradient-to-br from-emerald-600 via-teal-700 to-zinc-900 dark:from-emerald-950 dark:via-teal-950 dark:to-neutral-950 border-emerald-500/20 dark:border-emerald-500/10",
    text: "text-zinc-50",
    subText: "text-emerald-200/60 dark:text-emerald-400/50",
    chip: "bg-white/10 dark:bg-emerald-500/20 border-white/10 dark:border-emerald-500/20",
    label: "Emerald",
  },

  "sunset-rose": {
    bg: "bg-gradient-to-br from-rose-500 via-orange-600 to-neutral-900 dark:from-rose-950 dark:via-orange-950 dark:to-neutral-950 border-rose-500/20 dark:border-rose-500/10",
    text: "text-white",
    subText: "text-rose-100/70 dark:text-rose-300/60",
    chip: "bg-white/15 dark:bg-rose-500/20 border-white/10 dark:border-rose-500/20",
    label: "Rose",
  },

  "ocean-cyber": {
    bg: "bg-gradient-to-br from-blue-600 via-cyan-600 to-stone-900 dark:from-blue-950 dark:via-cyan-950 dark:to-neutral-950 border-blue-500/20 dark:border-blue-500/10",
    text: "text-white",
    subText: "text-blue-100/70 dark:text-cyan-300/60",
    chip: "bg-white/15 dark:bg-blue-500/20 border-white/10 dark:border-blue-500/20",
    label: "Ocean Blue",
  },

  "carbon-vip": {
    bg: "bg-gradient-to-br from-zinc-800 via-zinc-900 to-neutral-950 dark:from-zinc-900 dark:via-stone-950 dark:to-black border-zinc-700/40 dark:border-zinc-800/50",
    text: "text-zinc-100",
    subText: "text-zinc-400/80",
    chip: "bg-zinc-700/50 dark:bg-zinc-800/60 border-zinc-600 dark:border-zinc-700",
    label: "Carbon",
  },

  "premium-gold": {
    bg: "bg-gradient-to-br from-amber-600 via-amber-700 to-stone-950 dark:from-amber-950 dark:via-amber-900/40 dark:to-black border-amber-500/20 dark:border-amber-600/10",
    text: "text-amber-50",
    subText: "text-amber-200/60 dark:text-amber-400/50",
    chip: "bg-white/10 dark:bg-amber-500/10 border-white/10 dark:border-amber-600/20",
    label: "Gold",
  },
} as const;

export type CardThemes = keyof typeof CARD_THEMES;

export const CARD_THEMES_ARRAY = Object.entries(CARD_THEMES).map(
  ([key, value]) => ({
    value: key as CardThemes,
    label: value.label,
  }),
);
