import { motion } from 'framer-motion';
import { Users, Target, Trophy, Zap } from 'lucide-react';

const stats = [
  { label: 'Active Players', value: '2,847', icon: Users, change: '+124 this month' },
  { label: 'Matches Played', value: '1,523', icon: Target, change: '+89 this week' },
  { label: 'Tournaments', value: '24', icon: Trophy, change: '3 active' },
  { label: 'Avg Rating', value: '1.08', icon: Zap, change: 'All players' },
];

export function QuickStats() {
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
