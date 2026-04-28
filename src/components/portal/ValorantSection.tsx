import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, Bell } from 'lucide-react';

export function ValorantSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-val-red/30 min-h-[520px] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-val-red/15 via-card to-card" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-val-red/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 12px)',
      }} />

      <div className="relative text-center px-6 py-16 max-w-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-val-red/20 border border-val-red/40 mb-6">
          <Gamepad2 className="w-10 h-10 text-val-red" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-val-red/15 border border-val-red/30 mb-5">
          <Sparkles className="w-3 h-3 text-val-red" />
          <span className="text-[10px] font-bold text-val-red uppercase tracking-[0.2em]">Coming Soon</span>
        </div>

        <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 leading-[0.95]">
          VALORANT
          <br />
          <span className="text-val-red">TRACKER</span>
        </h2>

        <p className="text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          We're building a dedicated Valorant stats hub with team rankings, agent pick rates, map veto data
          and player leaderboards. Stay tuned — launching with the next tournament season.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Bell className="w-3.5 h-3.5 text-val-red" />
          <span>Tournament registrations are already open for Valorant teams.</span>
        </div>
      </div>
    </motion.div>
  );
}
