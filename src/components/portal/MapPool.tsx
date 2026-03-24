import { motion } from 'framer-motion';

interface MapStat {
  name: string;
  played: number;
  ctWin: number;
  tWin: number;
  avgRounds: number;
}

const maps: MapStat[] = [
  { name: 'Mirage', played: 342, ctWin: 53.2, tWin: 46.8, avgRounds: 26.4 },
  { name: 'Inferno', played: 287, ctWin: 51.8, tWin: 48.2, avgRounds: 27.1 },
  { name: 'Dust2', played: 231, ctWin: 48.9, tWin: 51.1, avgRounds: 25.8 },
  { name: 'Ancient', played: 198, ctWin: 55.3, tWin: 44.7, avgRounds: 26.9 },
  { name: 'Nuke', played: 156, ctWin: 57.1, tWin: 42.9, avgRounds: 25.2 },
  { name: 'Anubis', played: 134, ctWin: 52.6, tWin: 47.4, avgRounds: 26.1 },
];

const maxPlayed = Math.max(...maps.map(m => m.played));

export function MapPool() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border">
        <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Map Pool Statistics</span>
      </div>

      <div className="divide-y divide-border/40">
        {maps.map((map, index) => (
          <motion.div
            key={map.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.04 }}
            className="px-5 py-3 hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground">{map.name}</span>
              <span className="text-xs text-muted-foreground">{map.played} played</span>
            </div>

            {/* CT/T win rate bar */}
            <div className="flex h-1.5 rounded-full overflow-hidden mb-1">
              <div
                className="transition-all duration-500"
                style={{ width: `${map.ctWin}%`, background: 'hsl(var(--cs2-blue))' }}
              />
              <div
                className="transition-all duration-500"
                style={{ width: `${map.tWin}%`, background: 'hsl(var(--cs2-gold))' }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px]">
              <span className="text-cs2-blue">CT {map.ctWin}%</span>
              <span className="text-muted-foreground">Avg {map.avgRounds} rds</span>
              <span className="text-cs2-gold">T {map.tWin}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
