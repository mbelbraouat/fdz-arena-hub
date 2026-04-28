import { motion } from 'framer-motion';
import { Users, Target, Trophy, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function QuickStats() {
  const { data } = useQuery({
    queryKey: ['portal-quickstats'],
    queryFn: async () => {
      const [players, matches, tournaments, events] = await Promise.all([
        supabase.from('players').select('id, rating', { count: 'exact' }),
        supabase.from('matches').select('id', { count: 'exact', head: true }),
        supabase.from('tournaments').select('id, status', { count: 'exact' }),
        supabase.from('events').select('id, status'),
      ]);
      const avgRating = players.data && players.data.length
        ? (players.data.reduce((a: number, p: any) => a + Number(p.rating || 0), 0) / players.data.length).toFixed(2)
        : '—';
      const activeTournaments = tournaments.data?.filter((t: any) => t.status === 'live').length || 0;
      return {
        players: players.count || 0,
        matches: matches.count || 0,
        tournaments: tournaments.count || 0,
        activeTournaments,
        avgRating,
      };
    },
  });

  const stats = [
    { label: 'Active Players', value: data?.players ?? '—', icon: Users, change: 'Across all teams' },
    { label: 'Matches Played', value: data?.matches ?? '—', icon: Target, change: 'All time' },
    { label: 'Tournaments', value: data?.tournaments ?? '—', icon: Trophy, change: `${data?.activeTournaments || 0} active` },
    { label: 'Avg Rating', value: data?.avgRating ?? '—', icon: Zap, change: 'All players' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</span>
          </div>
          <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
          <span className="text-[10px] text-muted-foreground">{stat.change}</span>
        </motion.div>
      ))}
    </div>
  );
}
