import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function RankingSidebar() {
  const { data: teams, isLoading } = useQuery({
    queryKey: ['portal-teams-cs2'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('game', 'cs2')
        .order('rating', { ascending: false })
        .limit(8);
      if (error) throw error;
      return data;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-border bg-secondary/30">
        <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Team Rankings</span>
      </div>

      {isLoading ? (
        <div className="p-4 text-xs text-muted-foreground">Loading...</div>
      ) : !teams || teams.length === 0 ? (
        <div className="p-6 text-center text-xs text-muted-foreground">No teams yet. Add teams from the admin dashboard.</div>
      ) : (
        <div className="divide-y divide-border/30">
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/30 transition-colors cursor-pointer group"
            >
              <span className={`w-5 text-center font-heading font-bold text-sm ${
                index === 0 ? 'text-cs2-gold' : index < 3 ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {index + 1}
              </span>

              <div className="w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center border border-border/50 overflow-hidden">
                {team.logo_url ? (
                  <img src={team.logo_url} alt={team.tag} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-bold text-primary">{team.tag}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate block">
                  {team.name}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="text-green-500">{team.wins}W</span>
                  <span className="text-red-500">{team.losses}L</span>
                  {team.streak && <span className={team.streak.startsWith('W') ? 'text-green-500' : 'text-red-500'}>{team.streak}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{Number(team.rating).toFixed(2)}</span>
                {team.rank_change > 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : team.rank_change < 0 ? (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                ) : (
                  <Minus className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="px-4 py-2.5 border-t border-border text-center">
        <span className="text-xs text-primary hover:underline cursor-pointer font-medium">View full ranking →</span>
      </div>
    </motion.div>
  );
}
