import { motion } from 'framer-motion';
import { ArrowRight, Users, Trophy, BarChart3, Zap, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '2,847', label: 'Players', icon: Users },
  { value: '1,523', label: 'Matches', icon: BarChart3 },
  { value: '24', label: 'Tournaments', icon: Trophy },
  { value: '500K+', label: 'Prize Pool (DZD)', icon: Zap },
];

const liveTournament = {
  name: 'DZ Pro League Season 1',
  teams: 16,
  prize: '500,000 DZD',
  stage: 'Playoffs',
  matches: [
    { team1: 'PHX', team2: 'WLV', score1: 2, score2: 1, live: true },
    { team1: 'DSE', team2: 'ATL', score1: 0, score2: 0, time: '18:00' },
  ],
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-cs2-blue/5 rounded-full blur-[100px]" />

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                Live Tournament Running
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.95] mb-6"
            >
              THE HOME OF
              <br />
              <span className="text-gradient">ALGERIAN</span>
              <br />
              ESPORTS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              Structured tournaments, real-time statistics, and a professional competitive 
              ecosystem for Counter-Strike 2 — built by the community, for the community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <Link to="/portal">
                <Button variant="hero" className="group">
                  Enter Portal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/sponsorship">
                <Button variant="heroOutline">
                  Partner With Us
                </Button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Live Tournament Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3 border-b border-border bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">Live Now</span>
                </div>
                <Link to="/portal" className="text-xs text-primary hover:underline">Watch →</Link>
              </div>

              {/* Tournament info */}
              <div className="px-5 py-4 border-b border-border/50">
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">{liveTournament.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{liveTournament.teams} teams</span>
                  <span>·</span>
                  <span className="text-primary font-medium">{liveTournament.prize}</span>
                  <span>·</span>
                  <span>{liveTournament.stage}</span>
                </div>
              </div>

              {/* Matches */}
              <div className="divide-y divide-border/30">
                {liveTournament.matches.map((match, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-secondary/80 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">{match.team1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {match.live ? (
                          <>
                            <span className="text-sm font-bold text-green-500">{match.score1}</span>
                            <span className="text-xs text-muted-foreground">-</span>
                            <span className="text-sm font-bold text-foreground">{match.score2}</span>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground">{match.time}</span>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded bg-secondary/80 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">{match.team2}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {match.live && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                          <Play className="w-2.5 h-2.5 fill-current" /> LIVE
                        </span>
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-2.5 border-t border-border bg-secondary/20 text-center">
                <Link to="/portal" className="text-xs text-primary hover:underline font-medium">
                  View all matches →
                </Link>
              </div>
            </div>

            {/* Top player mini card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 bg-card rounded-xl border border-border p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-cs2-gold/20 flex items-center justify-center border border-primary/30">
                <span className="text-lg font-heading font-bold text-primary">E</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">ENNY-K</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cs2-gold/20 text-cs2-gold font-medium">MVP</span>
                </div>
                <span className="text-xs text-muted-foreground">1.48 Rating · 98.4 ADR</span>
              </div>
              <span className="text-2xl font-heading font-bold text-gradient">1.48</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
