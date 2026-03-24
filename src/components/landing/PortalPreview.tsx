import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Award, Target, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const topPlayers = [
  { rank: 1, name: 'ENNY-K', team: 'PHX', rating: 1.48, kd: 1.52, adr: 98.4 },
  { rank: 2, name: 'MAHI_DZ', team: 'WLV', rating: 1.42, kd: 1.45, adr: 92.1 },
  { rank: 3, name: 'NAPS__', team: 'DSE', rating: 1.36, kd: 1.38, adr: 88.6 },
  { rank: 4, name: 'DADY', team: 'ATL', rating: 1.32, kd: 1.35, adr: 85.2 },
  { rank: 5, name: 'ZeRo_DZ', team: 'NVF', rating: 1.29, kd: 1.31, adr: 82.8 },
];

export function PortalPreview() {
  return (
    <section className="py-24 bg-card/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Table header */}
              <div className="px-5 py-3 border-b border-border bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-primary" />
                  <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Top Rated Players</span>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">DZ Pro League S1</span>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-[32px_1fr_60px_60px_60px_70px] gap-2 px-5 py-2 bg-secondary/15 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50">
                <span>#</span>
                <span>Player</span>
                <span className="text-center">K/D</span>
                <span className="text-center">ADR</span>
                <span className="text-center hidden md:block">Team</span>
                <span className="text-center">Rating</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-border/30">
                {topPlayers.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="grid grid-cols-[32px_1fr_60px_60px_60px_70px] gap-2 px-5 py-3 items-center hover:bg-secondary/20 transition-colors"
                  >
                    <span className={`font-heading font-bold text-sm ${
                      player.rank === 1 ? 'text-cs2-gold' : player.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {player.rank}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-secondary/80 flex items-center justify-center border border-border/50">
                        <span className="text-[8px] font-bold text-primary">{player.team}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{player.name}</span>
                    </div>
                    <span className="text-center text-xs font-bold text-foreground">{player.kd}</span>
                    <span className="text-center text-xs font-bold text-foreground">{player.adr}</span>
                    <span className="text-center text-[10px] text-muted-foreground hidden md:block">{player.team}</span>
                    <div className="flex justify-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        player.rating >= 1.4 ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'
                      }`}>
                        {player.rating}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="px-5 py-2.5 border-t border-border bg-secondary/10 text-center">
                <Link to="/portal" className="text-xs text-primary hover:underline font-medium">
                  View full rankings →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 block">Data & Analytics</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              MEET THE <span className="text-gradient">DZ PORTAL</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The complete statistics hub for Algerian CS2. Track every kill, every round, 
              every clutch. Player ratings, weapon analytics, map pool data, and team rankings — 
              all in one place.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
                <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <span className="text-xs text-muted-foreground">Live Stats</span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
                <Award className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <span className="text-xs text-muted-foreground">Rankings</span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
                <Target className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <span className="text-xs text-muted-foreground">Analytics</span>
              </div>
            </div>

            <Link to="/portal">
              <Button variant="hero" className="group">
                Enter DZ Portal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
