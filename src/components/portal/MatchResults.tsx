import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight } from 'lucide-react';

interface Match {
  id: number;
  team1: string;
  team1Tag: string;
  team2: string;
  team2Tag: string;
  score1: number;
  score2: number;
  map: string;
  date: string;
  event: string;
  halfScores?: { t1ct: number; t1t: number; t2ct: number; t2t: number };
}

const matches: Match[] = [
  { id: 1, team1: 'Team PHOENIX', team1Tag: 'PHX', team2: 'Wolves Gaming', team2Tag: 'WLV', score1: 16, score2: 12, map: 'Mirage', date: 'Today 16:30', event: 'DZ Pro League', halfScores: { t1ct: 9, t1t: 7, t2ct: 6, t2t: 6 } },
  { id: 2, team1: 'Desert Eagles', team1Tag: 'DSE', team2: 'Atlas Esports', team2Tag: 'ATL', score1: 13, score2: 16, map: 'Inferno', date: 'Today 14:00', event: 'DZ Pro League', halfScores: { t1ct: 7, t1t: 6, t2ct: 5, t2t: 11 } },
  { id: 3, team1: 'Nova Force', team1Tag: 'NVF', team2: 'Thunder Strike', team2Tag: 'THS', score1: 16, score2: 9, map: 'Dust2', date: 'Yesterday', event: 'USTHB Open', halfScores: { t1ct: 10, t1t: 6, t2ct: 5, t2t: 4 } },
  { id: 4, team1: 'Sahara Squad', team1Tag: 'SAH', team2: 'Medina Crew', team2Tag: 'MDN', score1: 16, score2: 14, map: 'Ancient', date: 'Yesterday', event: 'USTHB Open', halfScores: { t1ct: 8, t1t: 8, t2ct: 7, t2t: 7 } },
  { id: 5, team1: 'Team PHOENIX', team1Tag: 'PHX', team2: 'Nova Force', team2Tag: 'NVF', score1: 16, score2: 7, map: 'Nuke', date: '2 days ago', event: 'DZ Pro League', halfScores: { t1ct: 11, t1t: 5, t2ct: 4, t2t: 3 } },
];

export function MatchResults() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Recent Results</span>
        <span className="text-xs text-primary hover:underline cursor-pointer font-medium">All matches →</span>
      </div>

      <div className="divide-y divide-border/40">
        {matches.map((match, index) => {
          const team1Won = match.score1 > match.score2;
          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.04 }}
              className="px-5 py-3 hover:bg-secondary/20 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                {/* Event & Time */}
                <div className="w-20 shrink-0">
                  <span className="text-[10px] text-muted-foreground block truncate">{match.event}</span>
                  <span className="text-[10px] text-muted-foreground">{match.date}</span>
                </div>

                {/* Match */}
                <div className="flex-1 flex items-center justify-center gap-3">
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className={`text-sm font-medium ${team1Won ? 'text-foreground' : 'text-muted-foreground'} group-hover:text-primary transition-colors text-right`}>
                      {match.team1}
                    </span>
                    <div className="w-7 h-7 rounded bg-secondary/80 flex items-center justify-center border border-border/50 shrink-0">
                      <span className="text-[9px] font-bold text-primary">{match.team1Tag}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-lg font-heading font-bold w-6 text-right ${team1Won ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {match.score1}
                    </span>
                    <span className="text-xs text-muted-foreground">:</span>
                    <span className={`text-lg font-heading font-bold w-6 ${!team1Won ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {match.score2}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-7 h-7 rounded bg-secondary/80 flex items-center justify-center border border-border/50 shrink-0">
                      <span className="text-[9px] font-bold text-primary">{match.team2Tag}</span>
                    </div>
                    <span className={`text-sm font-medium ${!team1Won ? 'text-foreground' : 'text-muted-foreground'} group-hover:text-primary transition-colors`}>
                      {match.team2}
                    </span>
                  </div>
                </div>

                {/* Map & Half scores */}
                <div className="w-24 shrink-0 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{match.map}</span>
                  </div>
                  {match.halfScores && (
                    <span className="text-[10px] text-muted-foreground/60">
                      ({match.halfScores.t1ct}:{match.halfScores.t2ct}) ({match.halfScores.t1t}:{match.halfScores.t2t})
                    </span>
                  )}
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
