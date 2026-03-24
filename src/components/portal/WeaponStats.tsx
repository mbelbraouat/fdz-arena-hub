import { motion } from 'framer-motion';
import { Crosshair } from 'lucide-react';

interface WeaponStat {
  name: string;
  kills: number;
  hsRate: number;
  accuracy: number;
  color: string;
}

const weaponStats: WeaponStat[] = [
  { name: 'AK-47', kills: 14523, hsRate: 52.3, accuracy: 21.8, color: 'hsl(var(--primary))' },
  { name: 'AWP', kills: 6841, hsRate: 0, accuracy: 45.2, color: 'hsl(var(--cs2-gold))' },
  { name: 'M4A4', kills: 5932, hsRate: 48.1, accuracy: 23.4, color: 'hsl(var(--cs2-blue))' },
  { name: 'Desert Eagle', kills: 3215, hsRate: 67.8, accuracy: 32.1, color: 'hsl(var(--val-red))' },
  { name: 'USP-S', kills: 2876, hsRate: 62.4, accuracy: 35.6, color: 'hsl(var(--muted-foreground))' },
  { name: 'Glock-18', kills: 2103, hsRate: 44.2, accuracy: 18.9, color: 'hsl(var(--muted-foreground))' },
];

const maxKills = Math.max(...weaponStats.map(w => w.kills));

export function WeaponStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-primary" />
          <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Top Weapons</span>
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">All tournaments</span>
      </div>

      <div className="divide-y divide-border/40">
        {weaponStats.map((weapon, index) => (
          <motion.div
            key={weapon.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative px-5 py-3 hover:bg-secondary/30 transition-colors group"
          >
            {/* Kill bar background */}
            <div
              className="absolute inset-y-0 left-0 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity"
              style={{
                width: `${(weapon.kills / maxKills) * 100}%`,
                background: weapon.color,
              }}
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 font-mono">{index + 1}</span>
                <span className="font-medium text-foreground text-sm">{weapon.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block">Kills</span>
                  <span className="text-sm font-bold text-foreground">{weapon.kills.toLocaleString()}</span>
                </div>
                {weapon.hsRate > 0 && (
                  <div className="text-right w-14">
                    <span className="text-xs text-muted-foreground block">HS%</span>
                    <span className="text-sm font-bold text-primary">{weapon.hsRate}%</span>
                  </div>
                )}
                <div className="text-right w-14">
                  <span className="text-xs text-muted-foreground block">Acc</span>
                  <span className="text-sm font-medium text-muted-foreground">{weapon.accuracy}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
