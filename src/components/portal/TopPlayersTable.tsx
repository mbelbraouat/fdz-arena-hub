import { motion } from 'framer-motion';
import { Medal, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function TopPlayersTable() {
  const { data: players, isLoading } = useQuery({
    queryKey: ['portal-players-cs2'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*, teams(name, tag)')
        .eq('game', 'cs2')
        .eq('role', 'main')
        .order('rating', { ascending: false })
        .limit(25);
      if (error) throw error;
      return data as any[];
    },
  });

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
        <span className="text-[10px] text-muted-foreground uppercase">Ranked by rating</span>
      </div>

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

      {isLoading ? (
        <div className="p-6 text-center text-xs text-muted-foreground">Loading players...</div>
      ) : !players || players.length === 0 ? (
        <div className="p-10 text-center text-sm text-muted-foreground">
          No players yet. Add players from the admin dashboard to populate rankings.
        </div>
      ) : (
        <div className="divide-y divide-border/30">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              className="grid grid-cols-[40px_1fr_50px_60px_60px_60px_50px_70px_32px] gap-2 px-5 py-2.5 items-center hover:bg-secondary/20 transition-colors cursor-pointer group"
            >
              <span className={`font-heading font-bold text-sm ${
                index === 0 ? 'text-cs2-gold' : index < 3 ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {index + 1}
              </span>

              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded bg-secondary/80 flex items-center justify-center border border-border/50 shrink-0">
                  <span className="text-[8px] font-bold text-primary">{player.teams?.tag || '—'}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block truncate">
                    {player.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate block">{player.teams?.name || 'Free agent'}</span>
                </div>
              </div>

              <span className="text-center text-xs text-muted-foreground">{player.maps_played}</span>
              <span className={`text-center text-xs font-bold ${Number(player.kd) >= 1.3 ? 'text-green-500' : Number(player.kd) >= 1.0 ? 'text-foreground' : 'text-red-500'}`}>
                {Number(player.kd).toFixed(2)}
              </span>
              <span className={`text-center text-xs font-bold ${Number(player.adr) >= 85 ? 'text-green-500' : 'text-foreground'}`}>
                {Number(player.adr).toFixed(1)}
              </span>
              <span className="text-center text-xs text-foreground">{Number(player.kast).toFixed(1)}%</span>
              <span className="text-center text-xs text-foreground">{Number(player.hs_percentage).toFixed(0)}%</span>
              <div className="flex justify-center">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  Number(player.rating) >= 1.3 ? 'bg-green-500/20 text-green-500' :
                  Number(player.rating) >= 1.1 ? 'bg-primary/20 text-primary' :
                  'bg-secondary text-foreground'
                }`}>
                  {Number(player.rating).toFixed(2)}
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
