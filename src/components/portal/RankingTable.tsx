import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Team {
  rank: number;
  name: string;
  tag: string;
  wins: number;
  losses: number;
  rating: number;
  change: number;
  streak: string;
}

const teams: Team[] = [
  { rank: 1, name: 'Team PHOENIX', tag: 'PHX', wins: 24, losses: 3, rating: 1.42, change: 2, streak: 'W12' },
  { rank: 2, name: 'Wolves Gaming', tag: 'WLV', wins: 22, losses: 5, rating: 1.38, change: 1, streak: 'W5' },
  { rank: 3, name: 'Desert Eagles', tag: 'DSE', wins: 20, losses: 7, rating: 1.31, change: -1, streak: 'L1' },
  { rank: 4, name: 'Atlas Esports', tag: 'ATL', wins: 19, losses: 8, rating: 1.28, change: 0, streak: 'W2' },
  { rank: 5, name: 'Nova Force', tag: 'NVF', wins: 18, losses: 9, rating: 1.25, change: 3, streak: 'W8' },
];

export function RankingSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-border bg-secondary/30">
        <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Team Rankings</span>
      </div>

      <div className="divide-y divide-border/30">
        {teams.map((team, index) => (
          <motion.div
            key={team.rank}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/30 transition-colors cursor-pointer group"
          >
            <span className={`w-5 text-center font-heading font-bold text-sm ${
              team.rank === 1 ? 'text-cs2-gold' : team.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {team.rank}
            </span>

            <div className="w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center border border-border/50">
              <span className="text-[10px] font-bold text-primary">{team.tag}</span>
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate block">
                {team.name}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="text-green-500">{team.wins}W</span>
                <span className="text-red-500">{team.losses}L</span>
                <span className={team.streak.startsWith('W') ? 'text-green-500' : 'text-red-500'}>{team.streak}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">{team.rating}</span>
              {team.change > 0 ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : team.change < 0 ? (
                <TrendingDown className="w-3 h-3 text-red-500" />
              ) : (
                <Minus className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-4 py-2.5 border-t border-border text-center">
        <span className="text-xs text-primary hover:underline cursor-pointer font-medium">View full ranking →</span>
      </div>
    </motion.div>
  );
}
