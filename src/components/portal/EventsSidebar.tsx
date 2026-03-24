import { motion } from 'framer-motion';
import { Calendar, Trophy, ChevronRight, Users } from 'lucide-react';

interface Event {
  name: string;
  status: 'live' | 'upcoming' | 'completed';
  teams: number;
  prize: string;
  date: string;
  winner?: string;
}

const events: Event[] = [
  { name: 'DZ Pro League Season 1', status: 'live', teams: 16, prize: '500,000 DZD', date: 'Mar 2025' },
  { name: 'USTHB Open Cup', status: 'upcoming', teams: 32, prize: '200,000 DZD', date: 'Apr 2025' },
  { name: 'Game Sphere USTHB', status: 'completed', teams: 8, prize: '150,000 DZD', date: 'Jan 2025', winner: 'Fifteen Average' },
  { name: 'DZ Winter Cup', status: 'completed', teams: 12, prize: '100,000 DZD', date: 'Dec 2024', winner: 'Team PHOENIX' },
  { name: 'Novacore Showdown', status: 'completed', teams: 8, prize: '80,000 DZD', date: 'Nov 2024', winner: 'Wolves Gaming' },
];

export function EventsSidebar() {
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

      <div className="divide-y divide-border/30">
        {events.map((event, index) => (
          <motion.div
            key={index}
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
              <span>{event.date}</span>
              <span>·</span>
              <span className="flex items-center gap-0.5"><Users className="w-2.5 h-2.5" /> {event.teams}</span>
              <span>·</span>
              <span className="text-primary font-medium">{event.prize}</span>
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

      <div className="px-4 py-2.5 border-t border-border text-center">
        <span className="text-xs text-primary hover:underline cursor-pointer font-medium">Event calendar →</span>
      </div>
    </motion.div>
  );
}
