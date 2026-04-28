import { motion } from 'framer-motion';
import { Calendar, Trophy, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function EventsSidebar() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['portal-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);
      if (error) throw error;
      return data;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-border bg-secondary/30 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary" />
        <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Events</span>
      </div>

      {isLoading ? (
        <div className="p-4 text-xs text-muted-foreground">Loading...</div>
      ) : !events || events.length === 0 ? (
        <div className="p-6 text-center text-xs text-muted-foreground">No events yet.</div>
      ) : (
        <div className="divide-y divide-border/30">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.04 }}
              className="px-4 py-3 hover:bg-secondary/20 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                  {event.name}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap shrink-0 ${
                  event.status === 'live' ? 'bg-green-500/20 text-green-500' :
                  event.status === 'upcoming' ? 'bg-cs2-gold/20 text-cs2-gold' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {event.status === 'live' ? '● LIVE' : event.status === 'upcoming' ? 'SOON' : 'DONE'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                {event.event_date && <span>{event.event_date}</span>}
                <span className="flex items-center gap-0.5"><Users className="w-2.5 h-2.5" /> {event.teams_count}</span>
                <span className="text-primary font-medium">{event.prize_pool}</span>
              </div>

              {event.winner && (
                <div className="flex items-center gap-1 mt-1 text-[10px]">
                  <Trophy className="w-2.5 h-2.5 text-cs2-gold" />
                  <span className="text-cs2-gold">{event.winner}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <div className="px-4 py-2.5 border-t border-border text-center">
        <span className="text-xs text-primary hover:underline cursor-pointer font-medium">Event calendar →</span>
      </div>
    </motion.div>
  );
}
