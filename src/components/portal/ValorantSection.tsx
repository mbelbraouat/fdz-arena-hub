import { motion } from 'framer-motion';
import { Medal, Shield, Crosshair, Users, Trophy, TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';

const valPlayers = [
  { rank: 1, name: 'KIRA_DZ', team: 'Phantom Force', tag: 'PHF', agent: 'Jett', maps: 38, kd: 1.45, acs: 278, kast: 76.2, hs: 28, rating: 1.42 },
  { rank: 2, name: 'ShadowX', team: 'Viper Squad', tag: 'VPS', agent: 'Omen', maps: 35, kd: 1.38, acs: 265, kast: 74.1, hs: 24, rating: 1.36 },
  { rank: 3, name: 'ACE_Val', team: 'Radiant Gaming', tag: 'RDG', agent: 'Reyna', maps: 40, kd: 1.35, acs: 258, kast: 72.8, hs: 31, rating: 1.33 },
  { rank: 4, name: 'NOVA_DZ', team: 'Phantom Force', tag: 'PHF', agent: 'Sova', maps: 38, kd: 1.28, acs: 242, kast: 71.5, hs: 22, rating: 1.27 },
  { rank: 5, name: 'RiftWalker', team: 'Astra Elite', tag: 'ASE', agent: 'Chamber', maps: 33, kd: 1.25, acs: 235, kast: 70.1, hs: 26, rating: 1.24 },
  { rank: 6, name: 'BLAZE_VL', team: 'Viper Squad', tag: 'VPS', agent: 'Raze', maps: 36, kd: 1.22, acs: 228, kast: 68.9, hs: 29, rating: 1.21 },
  { rank: 7, name: 'Sentinel_K', team: 'Iron Wall', tag: 'IRW', agent: 'Killjoy', maps: 34, kd: 1.18, acs: 218, kast: 73.4, hs: 20, rating: 1.18 },
  { rank: 8, name: 'FlashDZ', team: 'Radiant Gaming', tag: 'RDG', agent: 'Phoenix', maps: 32, kd: 1.15, acs: 212, kast: 67.2, hs: 32, rating: 1.15 },
];

const valTeams = [
  { rank: 1, name: 'Phantom Force', tag: 'PHF', wins: 18, losses: 4, rating: 1.35, change: 1, streak: 'W6' },
  { rank: 2, name: 'Viper Squad', tag: 'VPS', wins: 16, losses: 6, rating: 1.30, change: 2, streak: 'W3' },
  { rank: 3, name: 'Radiant Gaming', tag: 'RDG', wins: 15, losses: 7, rating: 1.26, change: -1, streak: 'L2' },
  { rank: 4, name: 'Astra Elite', tag: 'ASE', wins: 14, losses: 8, rating: 1.22, change: 0, streak: 'W1' },
  { rank: 5, name: 'Iron Wall', tag: 'IRW', wins: 12, losses: 10, rating: 1.18, change: -2, streak: 'L1' },
];

const valMaps = [
  { name: 'Ascent', played: 124, atkWin: 52.1, defWin: 47.9 },
  { name: 'Bind', played: 118, atkWin: 48.3, defWin: 51.7 },
  { name: 'Haven', played: 112, atkWin: 50.8, defWin: 49.2 },
  { name: 'Split', played: 98, atkWin: 46.2, defWin: 53.8 },
  { name: 'Lotus', played: 95, atkWin: 51.5, defWin: 48.5 },
  { name: 'Sunset', played: 88, atkWin: 49.1, defWin: 50.9 },
];

const agentPicks = [
  { name: 'Jett', pickRate: 38.2, winRate: 52.1, role: 'Duelist', color: 'hsl(var(--val-teal))' },
  { name: 'Omen', pickRate: 31.5, winRate: 50.8, role: 'Controller', color: 'hsl(var(--cs2-blue))' },
  { name: 'Killjoy', pickRate: 28.4, winRate: 54.2, role: 'Sentinel', color: 'hsl(var(--cs2-gold))' },
  { name: 'Sova', pickRate: 25.1, winRate: 51.5, role: 'Initiator', color: 'hsl(var(--primary))' },
  { name: 'Reyna', pickRate: 22.8, winRate: 48.9, role: 'Duelist', color: 'hsl(var(--val-red))' },
  { name: 'Chamber', pickRate: 20.5, winRate: 49.3, role: 'Sentinel', color: 'hsl(var(--cs2-gold))' },
];

export function ValorantSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-val-red/30 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-val-red/10 to-transparent" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-1">VALORANT <span className="text-val-red">DIVISION</span></h2>
            <p className="text-sm text-muted-foreground">Algerian Valorant competitive scene — rankings, stats, and tournament results.</p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-center">
            <div><div className="font-heading text-2xl font-bold text-foreground">5</div><span className="text-[10px] text-muted-foreground uppercase">Teams</span></div>
            <div><div className="font-heading text-2xl font-bold text-foreground">40+</div><span className="text-[10px] text-muted-foreground uppercase">Players</span></div>
            <div><div className="font-heading text-2xl font-bold text-foreground">6</div><span className="text-[10px] text-muted-foreground uppercase">Events</span></div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Main content */}
        <div className="space-y-5">
          {/* Top Players */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Medal className="w-4 h-4 text-val-red" />
                <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Top Valorant Players</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Min 30 maps</span>
            </div>
            <div className="grid grid-cols-[40px_1fr_60px_50px_60px_60px_50px_50px_70px] gap-2 px-5 py-2.5 bg-secondary/30 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span>#</span><span>Player</span><span>Agent</span><span>Maps</span><span>K/D</span><span>ACS</span><span>KAST</span><span>HS%</span><span className="text-center">Rating</span>
            </div>
            <div className="divide-y divide-border/30">
              {valPlayers.map((p, i) => (
                <motion.div key={p.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-[40px_1fr_60px_50px_60px_60px_50px_50px_70px] gap-2 px-5 py-2.5 items-center hover:bg-secondary/20 transition-colors cursor-pointer group">
                  <span className={`font-heading font-bold text-sm ${p.rank === 1 ? 'text-val-red' : p.rank <= 3 ? 'text-val-teal' : 'text-muted-foreground'}`}>{p.rank}</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded bg-val-red/20 flex items-center justify-center border border-val-red/30 shrink-0">
                      <span className="text-[8px] font-bold text-val-red">{p.tag}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-foreground group-hover:text-val-red transition-colors block truncate">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground truncate block">{p.team}</span>
                    </div>
                  </div>
                  <span className="text-xs text-val-teal font-medium">{p.agent}</span>
                  <span className="text-xs text-muted-foreground">{p.maps}</span>
                  <span className={`text-xs font-bold ${p.kd >= 1.3 ? 'text-green-500' : 'text-foreground'}`}>{p.kd}</span>
                  <span className={`text-xs font-bold ${p.acs >= 250 ? 'text-green-500' : 'text-foreground'}`}>{p.acs}</span>
                  <span className="text-xs text-foreground">{p.kast}%</span>
                  <span className="text-xs text-foreground">{p.hs}%</span>
                  <div className="flex justify-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${p.rating >= 1.3 ? 'bg-green-500/20 text-green-500' : 'bg-val-red/20 text-val-red'}`}>{p.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Maps + Agents side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Map Pool */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Shield className="w-4 h-4 text-val-red" />
                <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Map Pool</span>
              </div>
              <div className="divide-y divide-border/30">
                {valMaps.map((map, i) => (
                  <div key={i} className="px-5 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{map.name}</span>
                      <span className="text-[10px] text-muted-foreground">{map.played} played</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-secondary">
                      <div className="bg-val-red/70 transition-all" style={{ width: `${map.atkWin}%` }} />
                      <div className="bg-val-teal/70 transition-all" style={{ width: `${map.defWin}%` }} />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
                      <span className="text-val-red">ATK {map.atkWin}%</span>
                      <span className="text-val-teal">DEF {map.defWin}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Agent Picks */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-val-red" />
                <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Agent Picks</span>
              </div>
              <div className="divide-y divide-border/30">
                {agentPicks.map((agent, i) => (
                  <div key={i} className="relative px-5 py-3 hover:bg-secondary/20 transition-colors group">
                    <div className="absolute inset-y-0 left-0 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity"
                      style={{ width: `${agent.pickRate * 2.5}%`, background: agent.color }} />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-4 font-mono">{i + 1}</span>
                        <div>
                          <span className="text-sm font-medium text-foreground">{agent.name}</span>
                          <span className="text-[10px] text-muted-foreground block">{agent.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Pick</span>
                          <span className="text-sm font-bold text-foreground">{agent.pickRate}%</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Win</span>
                          <span className={`text-sm font-bold ${agent.winRate >= 51 ? 'text-green-500' : 'text-foreground'}`}>{agent.winRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sidebar: Team Rankings */}
        <div className="space-y-5">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-secondary/30 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-val-red" />
              <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">VAL Rankings</span>
            </div>
            <div className="divide-y divide-border/30">
              {valTeams.map((team, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/30 transition-colors cursor-pointer group">
                  <span className={`w-5 text-center font-heading font-bold text-sm ${team.rank === 1 ? 'text-val-red' : team.rank <= 3 ? 'text-val-teal' : 'text-muted-foreground'}`}>{team.rank}</span>
                  <div className="w-8 h-8 rounded-md bg-val-red/20 flex items-center justify-center border border-val-red/30">
                    <span className="text-[10px] font-bold text-val-red">{team.tag}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground group-hover:text-val-red transition-colors truncate block">{team.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="text-green-500">{team.wins}W</span>
                      <span className="text-red-500">{team.losses}L</span>
                      <span className={team.streak.startsWith('W') ? 'text-green-500' : 'text-red-500'}>{team.streak}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{team.rating}</span>
                    {team.change > 0 ? <TrendingUp className="w-3 h-3 text-green-500" /> :
                     team.change < 0 ? <TrendingDown className="w-3 h-3 text-red-500" /> :
                     <Minus className="w-3 h-3 text-muted-foreground" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Valorant Events */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-secondary/30 flex items-center gap-2">
              <Users className="w-4 h-4 text-val-red" />
              <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">VAL Events</span>
            </div>
            <div className="divide-y divide-border/30">
              {[
                { name: 'DZ Valorant Cup S1', status: 'live', teams: 8, prize: '200,000 DZD', date: 'Mar 2025' },
                { name: 'Radiant Championship', status: 'upcoming', teams: 16, prize: '300,000 DZD', date: 'Apr 2025' },
                { name: 'USTHB Val Open', status: 'completed', teams: 12, prize: '100,000 DZD', date: 'Feb 2025', winner: 'Phantom Force' },
              ].map((event, i) => (
                <div key={i} className="px-4 py-3 hover:bg-secondary/20 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground group-hover:text-val-red transition-colors">{event.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      event.status === 'live' ? 'bg-green-500/20 text-green-500' :
                      event.status === 'upcoming' ? 'bg-val-red/20 text-val-red' : 'bg-muted text-muted-foreground'
                    }`}>
                      {event.status === 'live' ? '● LIVE' : event.status === 'upcoming' ? 'SOON' : 'DONE'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>{event.date}</span><span>·</span><span>{event.teams} teams</span><span>·</span>
                    <span className="text-val-red font-medium">{event.prize}</span>
                  </div>
                  {'winner' in event && event.winner && (
                    <div className="flex items-center gap-1 mt-1 text-[10px]">
                      <Trophy className="w-2.5 h-2.5 text-val-teal" />
                      <span className="text-val-teal">{event.winner}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
