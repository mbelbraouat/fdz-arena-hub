import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function LiveMatchTicker() {
  const { data: matches } = useQuery({
    queryKey: ['ticker-matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('id, score1, score2, status, match_date, team1:teams!matches_team1_id_fkey(tag), team2:teams!matches_team2_id_fkey(tag)')
        .in('status', ['live', 'upcoming', 'finished'])
        .order('match_date', { ascending: false })
        .limit(8);
      if (error) throw error;
      return data as any[];
    },
    refetchInterval: 30000,
  });

  if (!matches || matches.length === 0) {
    return (
      <div className="w-full bg-card/80 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2 flex items-center gap-3">
          <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> LIVE
          </span>
          <span className="text-xs text-muted-foreground">No matches scheduled. Admin can add matches from the dashboard.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-card/80 border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          <span className="text-xs font-bold text-primary uppercase tracking-wider mr-3 whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            LIVE
          </span>
          {matches.map((m) => {
            const time = new Date(m.match_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <motion.div
                key={m.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/50 hover:border-primary/40 transition-colors cursor-pointer whitespace-nowrap min-w-fit"
              >
                <span className={`text-xs font-semibold ${m.status === 'live' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {m.team1?.tag || '???'}
                </span>
                {m.status === 'upcoming' ? (
                  <span className="text-[10px] text-muted-foreground">{time}</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-bold ${m.score1 > m.score2 ? 'text-green-500' : 'text-foreground'}`}>{m.score1}</span>
                    <span className="text-[10px] text-muted-foreground">-</span>
                    <span className={`text-xs font-bold ${m.score2 > m.score1 ? 'text-green-500' : 'text-foreground'}`}>{m.score2}</span>
                  </div>
                )}
                <span className={`text-xs font-semibold ${m.status === 'live' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {m.team2?.tag || '???'}
                </span>
                {m.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
