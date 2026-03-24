import { motion } from 'framer-motion';
import { Trophy, Users, BarChart3, Tv, ArrowRight, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Trophy,
    title: 'Tournaments',
    description: 'Online & offline CS2 tournaments with clear formats, brackets, anti-cheat, and professional production.',
    stats: '24 events run',
    features: ['Swiss / Double Elim', 'Prize Pools', 'Live Broadcast'],
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: Users,
    title: 'Leagues & Seasons',
    description: 'Structured seasonal leagues with divisions, promotion/relegation, and playoff qualification.',
    stats: '16 teams active',
    features: ['Division System', 'Standings', 'Playoffs'],
    color: 'from-cs2-gold/20 to-cs2-gold/5',
  },
  {
    icon: BarChart3,
    title: 'DZ Portal Stats',
    description: 'Real-time player and team analytics: K/D, ADR, KAST, weapon stats, map performance, and more.',
    stats: '2,847 players tracked',
    features: ['Live Tracking', 'Player Profiles', 'Weapon Stats'],
    color: 'from-cs2-blue/20 to-cs2-blue/5',
  },
  {
    icon: Tv,
    title: 'Live Broadcasting',
    description: 'HD streaming with commentary, replays, and highlights for every major tournament match.',
    stats: '500+ hours streamed',
    features: ['HD Quality', 'Commentary', 'VODs'],
    color: 'from-val-red/20 to-val-red/5',
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 block">What We Do</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              BUILT FOR <span className="text-gradient">COMPETITION</span>
            </h2>
          </div>
          <Link to="/portal">
            <Button variant="outline" size="sm" className="group">
              View Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative bg-card rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-lg bg-secondary/80 border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{service.stats}</span>
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {service.features.map((feature, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-secondary/60 text-xs text-muted-foreground font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
