import { motion } from 'framer-motion';

interface LiveMatch {
  id: number;
  team1: string;
  team1Tag: string;
  team2: string;
  team2Tag: string;
  score1: number;
  score2: number;
  status: 'live' | 'upcoming' | 'finished';
  time?: string;
  event: string;
}

const liveMatches: LiveMatch[] = [
  { id: 1, team1: 'Team PHOENIX', team1Tag: 'PHX', team2: 'Wolves Gaming', team2Tag: 'WLV', score1: 12, score2: 9, status: 'live', event: 'DZ Pro League S1' },
  { id: 2, team1: 'Desert Eagles', team1Tag: 'DSE', team2: 'Atlas Esports', team2Tag: 'ATL', score1: 0, score2: 0, status: 'upcoming', time: '18:00', event: 'DZ Pro League S1' },
  { id: 3, team1: 'Nova Force', team1Tag: 'NVF', team2: 'Thunder Strike', team2Tag: 'THS', score1: 16, score2: 14, status: 'finished', event: 'USTHB Open' },
  { id: 4, team1: 'Sahara Squad', team1Tag: 'SAH', team2: 'Medina Crew', team2Tag: 'MDN', score1: 0, score2: 0, status: 'upcoming', time: '20:00', event: 'DZ Pro League S1' },
];

export function LiveMatchTicker() {
  return (
    <div className="w-full bg-card/80 border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          <span className="text-xs font-bold text-primary uppercase tracking-wider mr-3 whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            LIVE
          </span>
          {liveMatches.map((match) => (
            <motion.div
              key={match.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/50 hover:border-primary/40 transition-colors cursor-pointer whitespace-nowrap min-w-fit"
            >
              <span className={`text-xs font-semibold ${match.status === 'live' ? 'text-foreground' : 'text-muted-foreground'}`}>
                {match.team1Tag}
              </span>
              {match.status === 'live' ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-green-500">{match.score1}</span>
                  <span className="text-[10px] text-muted-foreground">-</span>
                  <span className="text-xs font-bold text-foreground">{match.score2}</span>
                </div>
              ) : match.status === 'upcoming' ? (
                <span className="text-[10px] text-muted-foreground">{match.time}</span>
              ) : (
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-bold ${match.score1 > match.score2 ? 'text-green-500' : 'text-muted-foreground'}`}>{match.score1}</span>
                  <span className="text-[10px] text-muted-foreground">-</span>
                  <span className={`text-xs font-bold ${match.score2 > match.score1 ? 'text-green-500' : 'text-muted-foreground'}`}>{match.score2}</span>
                </div>
              )}
              <span className={`text-xs font-semibold ${match.status === 'live' ? 'text-foreground' : 'text-muted-foreground'}`}>
                {match.team2Tag}
              </span>
              {match.status === 'live' && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
