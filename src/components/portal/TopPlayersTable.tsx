import { motion } from 'framer-motion';
import { Medal, ChevronRight } from 'lucide-react';

interface Player {
  rank: number;
  name: string;
  team: string;
  teamTag: string;
  maps: number;
  kd: number;
  adr: number;
  kast: number;
  hs: number;
  rating: number;
}

const players: Player[] = [
  { rank: 1, name: 'ENNY-K', team: 'Team PHOENIX', teamTag: 'PHX', maps: 42, kd: 1.52, adr: 98.4, kast: 78.2, hs: 58, rating: 1.48 },
  { rank: 2, name: 'MAHI_DZ', team: 'Wolves Gaming', teamTag: 'WLV', maps: 38, kd: 1.45, adr: 92.1, kast: 75.6, hs: 52, rating: 1.42 },
  { rank: 3, name: 'NAPS__', team: 'Desert Eagles', teamTag: 'DSE', maps: 35, kd: 1.38, adr: 88.6, kast: 73.1, hs: 61, rating: 1.36 },
  { rank: 4, name: 'DADY', team: 'Atlas Esports', teamTag: 'ATL', maps: 40, kd: 1.35, adr: 85.2, kast: 71.8, hs: 48, rating: 1.32 },
  { rank: 5, name: 'ZeRo_DZ', team: 'Nova Force', teamTag: 'NVF', maps: 36, kd: 1.31, adr: 82.8, kast: 70.4, hs: 55, rating: 1.29 },
  { rank: 6, name: 'SNIPER_X', team: 'Thunder Strike', teamTag: 'THS', maps: 34, kd: 1.28, adr: 80.1, kast: 69.2, hs: 42, rating: 1.26 },
  { rank: 7, name: 'KaZaM', team: 'Sahara Squad', teamTag: 'SAH', maps: 33, kd: 1.25, adr: 78.5, kast: 68.7, hs: 50, rating: 1.23 },
  { rank: 8, name: 'FrostByte', team: 'Medina Crew', teamTag: 'MDN', maps: 31, kd: 1.22, adr: 76.3, kast: 67.1, hs: 46, rating: 1.20 },
  { rank: 9, name: 'RUSH_DZ', team: 'Team PHOENIX', teamTag: 'PHX', maps: 42, kd: 1.19, adr: 74.8, kast: 66.5, hs: 53, rating: 1.18 },
  { rank: 10, name: 'AceMan', team: 'Wolves Gaming', teamTag: 'WLV', maps: 38, kd: 1.16, adr: 72.4, kast: 65.3, hs: 49, rating: 1.15 },
];

export function TopPlayersTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Medal className="w-4 h-4 text-primary" />
          <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Top Players</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground uppercase">Minimum 30 maps</span>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[40px_1fr_50px_60px_60px_60px_50px_70px_32px] gap-2 px-5 py-2.5 bg-secondary/30 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
        <span>#</span>
        <span>Player</span>
        <span className="text-center">Maps</span>
        <span className="text-center">K/D</span>
        <span className="text-center">ADR</span>
        <span className="text-center">KAST</span>
        <span className="text-center">HS%</span>
        <span className="text-center">Rating</span>
        <span />
      </div>

      <div className="divide-y divide-border/30">
        {players.map((player, index) => (
          <motion.div
            key={player.rank}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03 }}
            className="grid grid-cols-[40px_1fr_50px_60px_60px_60px_50px_70px_32px] gap-2 px-5 py-2.5 items-center hover:bg-secondary/20 transition-colors cursor-pointer group"
          >
            <span className={`font-heading font-bold text-sm ${
              player.rank === 1 ? 'text-cs2-gold' :
              player.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {player.rank}
            </span>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded bg-secondary/80 flex items-center justify-center border border-border/50 shrink-0">
                <span className="text-[8px] font-bold text-primary">{player.teamTag}</span>
              </div>
              <div className="min-w-0">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block truncate">
                  {player.name}
                </span>
                <span className="text-[10px] text-muted-foreground truncate block">{player.team}</span>
              </div>
            </div>

            <span className="text-center text-xs text-muted-foreground">{player.maps}</span>
            <span className={`text-center text-xs font-bold ${player.kd >= 1.3 ? 'text-green-500' : player.kd >= 1.0 ? 'text-foreground' : 'text-red-500'}`}>
              {player.kd}
            </span>
            <span className={`text-center text-xs font-bold ${player.adr >= 85 ? 'text-green-500' : 'text-foreground'}`}>
              {player.adr}
            </span>
            <span className="text-center text-xs text-foreground">{player.kast}%</span>
            <span className="text-center text-xs text-foreground">{player.hs}%</span>
            <div className="flex justify-center">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                player.rating >= 1.3 ? 'bg-green-500/20 text-green-500' :
                player.rating >= 1.1 ? 'bg-primary/20 text-primary' :
                'bg-secondary text-foreground'
              }`}>
                {player.rating}
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
