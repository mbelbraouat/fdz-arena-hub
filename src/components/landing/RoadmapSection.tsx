import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Rocket } from 'lucide-react';

const roadmapItems = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'completed' as const,
    date: 'Q4 2024',
    items: ['Platform architecture', 'Core tournament system', 'Stats tracking', 'Community launch'],
  },
  {
    phase: 'Phase 2',
    title: 'Portal Launch',
    status: 'current' as const,
    date: 'Q1 2025',
    items: ['DZ Portal beta', 'CS2 full integration', 'Player & team profiles', 'Live match tracking'],
  },
  {
    phase: 'Phase 3',
    title: 'Expansion',
    status: 'upcoming' as const,
    date: 'Q2 2025',
    items: ['Valorant integration', 'Advanced analytics', 'Mobile app', 'Partner API'],
  },
  {
    phase: 'Phase 4',
    title: 'Scale',
    status: 'future' as const,
    date: 'H2 2025',
    items: ['Regional expansion', 'Pro league system', 'Broadcast studio', 'Talent program'],
  },
];

const statusConfig = {
  completed: { icon: CheckCircle2, dot: 'bg-green-500', text: 'text-green-500', border: 'border-green-500/20', bg: 'bg-green-500/5' },
  current: { icon: Rocket, dot: 'bg-primary', text: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/5' },
  upcoming: { icon: Clock, dot: 'bg-muted-foreground', text: 'text-muted-foreground', border: 'border-border', bg: 'bg-card' },
  future: { icon: Circle, dot: 'bg-muted-foreground/30', text: 'text-muted-foreground/50', border: 'border-border/50', bg: 'bg-card/50' },
};

export function RoadmapSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 block">Roadmap</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            OUR <span className="text-gradient">JOURNEY</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-green-500/40 via-primary/40 to-border/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapItems.map((item, index) => {
              const config = statusConfig[item.status];
              const Icon = config.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex w-12 h-12 rounded-full border-4 border-background bg-card items-center justify-center mx-auto mb-4 relative z-10">
                    <Icon className={`w-4 h-4 ${config.text}`} />
                  </div>

                  <div className={`p-5 rounded-xl border ${config.border} ${config.bg} hover:scale-[1.02] transition-transform duration-200`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.phase}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/60 text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <ul className="space-y-1.5">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className={`w-1 h-1 rounded-full ${config.dot} shrink-0`} />
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
