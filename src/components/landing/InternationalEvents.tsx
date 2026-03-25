import { motion } from 'framer-motion';
import { Globe, Trophy, Users, Calendar, ChevronRight, Gamepad2 } from 'lucide-react';

const internationalEvents = [
  {
    game: 'cs2' as const,
    events: [
      { name: 'BLAST Open Rotterdam 2026', status: 'live', teams: 16, prize: '$200,000', date: 'Mar 24-30', stage: 'Playoffs', region: 'Europe' },
      { name: 'IEM Cologne Major 2026', status: 'upcoming', teams: 24, prize: '$1,250,000', date: 'Apr 12-28', stage: 'Qualifier', region: 'Global' },
      { name: 'PGL Major Copenhagen', status: 'completed', teams: 24, prize: '$1,250,000', date: 'Mar 10-20', winner: 'Vitality', region: 'Europe' },
      { name: 'ESL Pro League S21', status: 'upcoming', teams: 32, prize: '$850,000', date: 'Apr 5-18', stage: 'Group Stage', region: 'Global' },
      { name: 'CCT South America S5', status: 'live', teams: 16, prize: '$50,000', date: 'Mar 22-28', stage: 'Semifinals', region: 'South America' },
    ],
  },
  {
    game: 'valorant' as const,
    events: [
      { name: 'VCT Masters Madrid 2026', status: 'live', teams: 12, prize: '$500,000', date: 'Mar 20-Apr 2', stage: 'Group Stage', region: 'Global' },
      { name: 'VCT EMEA Challengers', status: 'upcoming', teams: 10, prize: '$250,000', date: 'Apr 8-22', stage: 'Playoffs', region: 'EMEA' },
      { name: 'VCT Pacific Split 2', status: 'completed', teams: 10, prize: '$250,000', date: 'Mar 5-18', winner: 'DRX', region: 'Pacific' },
      { name: 'VCT Americas Split 2', status: 'upcoming', teams: 10, prize: '$250,000', date: 'Apr 1-15', stage: 'Week 1', region: 'Americas' },
    ],
  },
];

export function InternationalEvents() {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 block">Worldwide</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              INTERNATIONAL <span className="text-gradient">EVENTS</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">Follow the biggest CS2 & Valorant tournaments happening around the globe.</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Live worldwide coverage</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {internationalEvents.map((section) => (
            <motion.div
              key={section.game}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              {/* Game header */}
              <div className="px-5 py-3 border-b border-border bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gamepad2 className={`w-4 h-4 ${section.game === 'cs2' ? 'text-cs2-gold' : 'text-val-red'}`} />
                  <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">
                    {section.game === 'cs2' ? 'Counter-Strike 2' : 'Valorant'}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">{section.events.filter(e => e.status === 'live').length} live</span>
              </div>

              <div className="divide-y divide-border/30">
                {section.events.map((event, i) => (
                  <div key={i} className="px-5 py-3 hover:bg-secondary/20 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            event.status === 'live' ? 'bg-green-500/20 text-green-500' :
                            event.status === 'upcoming' ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {event.status === 'live' ? '● LIVE' : event.status === 'upcoming' ? 'SOON' : 'DONE'}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{event.region}</span>
                        </div>
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {event.name}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1">
                          <span className="flex items-center gap-0.5"><Users className="w-2.5 h-2.5" /> {event.teams}</span>
                          <span className="text-primary font-medium">{event.prize}</span>
                          <span>{event.date}</span>
                          {'stage' in event && event.stage && <span className="text-primary/70">{event.stage}</span>}
                        </div>
                        {'winner' in event && event.winner && (
                          <div className="flex items-center gap-1 mt-1 text-[10px]">
                            <Trophy className="w-2.5 h-2.5 text-cs2-gold" />
                            <span className="text-cs2-gold font-medium">{event.winner}</span>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
