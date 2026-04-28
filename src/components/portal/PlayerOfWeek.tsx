import { motion } from 'framer-motion';
import { Crown, Crosshair, Flame, Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function PlayerOfWeek() {
  const { data: player } = useQuery({
    queryKey: ['player-of-week'],
    queryFn: async () => {
      // MVP takes priority; otherwise top-rated CS2 main
      const { data: mvp } = await supabase
        .from('players')
        .select('*, teams(name, tag)')
        .eq('is_mvp', true)
        .order('rating', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (mvp) return mvp as any;
      const { data } = await supabase
        .from('players')
        .select('*, teams(name, tag)')
        .eq('game', 'cs2')
        .eq('role', 'main')
        .order('rating', { ascending: false })
        .limit(1)
        .maybeSingle();
      return data as any;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl border border-primary/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-card to-card" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative p-5">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-4 h-4 text-cs2-gold" />
          <span className="text-xs font-bold text-cs2-gold uppercase tracking-widest">Player of the Week</span>
        </div>

        {!player ? (
          <div className="py-4 text-sm text-muted-foreground">Pick a player of the week in the admin dashboard.</div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-cs2-gold/20 flex items-center justify-center border border-primary/30">
                <span className="text-2xl font-heading font-bold text-primary">{player.name?.[0] || '?'}</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">{player.name}</h3>
                <p className="text-sm text-muted-foreground">{player.teams?.name || 'Free agent'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <StatMini icon={Crosshair} label="K/D" value={Number(player.kd).toFixed(2)} />
              <StatMini icon={Flame} label="ADR" value={Number(player.adr).toFixed(1)} />
              <StatMini icon={Shield} label="HS%" value={`${Number(player.hs_percentage).toFixed(0)}%`} />
              <StatMini label="Rating" value={Number(player.rating).toFixed(2)} highlight />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function StatMini({ icon: Icon, label, value, highlight }: { icon?: React.ElementType; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`px-3 py-2 rounded-lg ${highlight ? 'bg-primary/20 border border-primary/30' : 'bg-secondary/60'}`}>
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3 text-muted-foreground" />}
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <span className={`text-lg font-heading font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</span>
    </div>
  );
}
