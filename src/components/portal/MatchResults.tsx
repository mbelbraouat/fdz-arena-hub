import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

function formatRelative(iso: string) {
  const d = new Date(iso);
  const diffH = (Date.now() - d.getTime()) / 36e5;
  if (diffH < 24) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffH < 48) return 'Yesterday';
  return d.toLocaleDateString();
}

export function MatchResults() {
  const { data: matches, isLoading } = useQuery({
    queryKey: ['portal-match-results'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*, team1:teams!matches_team1_id_fkey(name, tag), team2:teams!matches_team2_id_fkey(name, tag), tournaments(name)')
        .order('match_date', { ascending: false })
        .limit(12);
      if (error) throw error;
      return data as any[];
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Recent Matches</span>
        <span className="text-xs text-primary hover:underline cursor-pointer font-medium">All matches →</span>
      </div>

      {isLoading ? (
        <div className="p-6 text-center text-xs text-muted-foreground">Loading...</div>
      ) : !matches || matches.length === 0 ? (
        <div className="p-10 text-center text-sm text-muted-foreground">
          No matches yet. Add matches from the admin dashboard.
        </div>
      ) : (
        <div className="divide-y divide-border/40">
          {matches.map((match, index) => {
            const team1Won = match.status === 'finished' && match.score1 > match.score2;
            const team2Won = match.status === 'finished' && match.score2 > match.score1;
            const half = match.half_scores as any;
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.04 }}
                className="px-5 py-3 hover:bg-secondary/20 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-24 shrink-0">
                    <span className="text-[10px] text-muted-foreground block truncate">{match.tournaments?.name || 'Friendly'}</span>
                    <span className="text-[10px] text-muted-foreground">{formatRelative(match.match_date)}</span>
                  </div>

                  <div className="flex-1 flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className={`text-sm font-medium ${team1Won ? 'text-foreground' : 'text-muted-foreground'} group-hover:text-primary transition-colors text-right`}>
                        {match.team1?.name || '?'}
                      </span>
                      <div className="w-7 h-7 rounded bg-secondary/80 flex items-center justify-center border border-border/50 shrink-0">
                        <span className="text-[9px] font-bold text-primary">{match.team1?.tag || '—'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {match.status === 'upcoming' ? (
                        <span className="text-xs text-cs2-gold font-bold uppercase">vs</span>
                      ) : (
                        <>
                          <span className={`text-lg font-heading font-bold w-6 text-right ${team1Won ? 'text-green-500' : 'text-muted-foreground'}`}>{match.score1}</span>
                          <span className="text-xs text-muted-foreground">:</span>
                          <span className={`text-lg font-heading font-bold w-6 ${team2Won ? 'text-green-500' : 'text-muted-foreground'}`}>{match.score2}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-7 h-7 rounded bg-secondary/80 flex items-center justify-center border border-border/50 shrink-0">
                        <span className="text-[9px] font-bold text-primary">{match.team2?.tag || '—'}</span>
                      </div>
                      <span className={`text-sm font-medium ${team2Won ? 'text-foreground' : 'text-muted-foreground'} group-hover:text-primary transition-colors`}>
                        {match.team2?.name || '?'}
                      </span>
                    </div>
                  </div>

                  <div className="w-28 shrink-0 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{match.map}</span>
                    </div>
                    {half && (
                      <span className="text-[10px] text-muted-foreground/60">
                        ({half.t1ct}:{half.t2ct}) ({half.t1t}:{half.t2t})
                      </span>
                    )}
                    {match.status === 'live' && (
                      <span className="text-[10px] text-green-500 font-bold flex items-center justify-end gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /> LIVE
                      </span>
                    )}
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
