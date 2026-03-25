import { motion } from 'framer-motion';
import { MessageSquare, Clock, TrendingUp, ChevronRight, Eye } from 'lucide-react';

const featuredNews = {
  title: 'BLAST Open Rotterdam: Favorites struggle at Playoff bracket set',
  excerpt: 'The biggest upsets of the tournament as underdogs dominate the playoff stage. BLAST Rotterdam delivers another incredible playoff bracket.',
  date: '2 hours ago',
  comments: 129,
  views: '12.4K',
  category: 'Tournament',
};

const newsItems = [
  { title: 'FDZ DZ Pro League Season 1 reaches Playoffs — 8 teams remain', date: '4 hours ago', comments: 47, category: 'FDZ' },
  { title: 'Vitality confirm roster changes ahead of IEM Cologne Major', date: '6 hours ago', comments: 84, category: 'Roster' },
  { title: 'Team PHOENIX extends winning streak to 12 in DZ Pro League', date: '8 hours ago', comments: 32, category: 'FDZ' },
  { title: 'VCT Masters Madrid 2026 Group Stage: Day 2 recap and standings', date: '10 hours ago', comments: 56, category: 'Valorant' },
  { title: 'apEX: "Even when we\'re not playing our A-game, it\'s still good enough"', date: '12 hours ago', comments: 23, category: 'Interview' },
  { title: 'USTHB Open Cup registration opens — 32 team slots available', date: '1 day ago', comments: 18, category: 'FDZ' },
  { title: 'Desert Eagles sign two new players from Algerian FPL', date: '1 day ago', comments: 41, category: 'Roster' },
  { title: 'Wolves Gaming bootcamp before DZ Pro League Playoffs', date: '2 days ago', comments: 15, category: 'FDZ' },
];

export function NewsSection() {
  return (
    <section className="py-20 bg-card/20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 block">Latest</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              NEWS & <span className="text-gradient">UPDATES</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Featured + List */}
          <div className="space-y-4">
            {/* Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-bold uppercase">{featuredNews.category}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-500 font-bold">FEATURED</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                  {featuredNews.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{featuredNews.excerpt}</p>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredNews.date}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {featuredNews.comments}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {featuredNews.views}</span>
                </div>
              </div>
            </motion.div>

            {/* News list */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-secondary/30">
                <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Today's News</span>
              </div>
              <div className="divide-y divide-border/30">
                {newsItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="px-5 py-3 hover:bg-secondary/20 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            item.category === 'FDZ' ? 'bg-primary/20 text-primary' :
                            item.category === 'Valorant' ? 'bg-val-red/20 text-val-red' :
                            item.category === 'Roster' ? 'bg-cs2-blue/20 text-cs2-blue' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1">
                          <span>{item.date}</span>
                          <span className="flex items-center gap-0.5"><MessageSquare className="w-2.5 h-2.5" /> {item.comments}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary shrink-0 mt-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Trending */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-secondary/30 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Recent Activity</span>
              </div>
              <div className="divide-y divide-border/30">
                {[
                  { text: 'FDZ reached 3,000 registered players', time: '2h ago', type: 'milestone' },
                  { text: 'Team PHOENIX vs Wolves Gaming — 16:12 on Inferno', time: '3h ago', type: 'match' },
                  { text: 'USTHB Open Cup registrations opened', time: '5h ago', type: 'event' },
                  { text: 'ENNY-K reached 1.50 rating — new record', time: '8h ago', type: 'player' },
                  { text: 'Desert Eagles roster update: +SNIPER_X', time: '12h ago', type: 'roster' },
                  { text: 'DZ Pro League S1 moves to Playoff bracket', time: '1d ago', type: 'event' },
                  { text: 'Novacore confirmed as Gold sponsor', time: '1d ago', type: 'sponsor' },
                  { text: 'New Valorant division announced for Q2', time: '2d ago', type: 'news' },
                ].map((item, i) => (
                  <div key={i} className="px-4 py-2.5 hover:bg-secondary/20 transition-colors cursor-pointer">
                    <p className="text-xs text-foreground leading-snug">{item.text}</p>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-card rounded-xl border border-primary/30 p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="relative z-10">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">JOIN THE COMPETITION</h3>
                <p className="text-xs text-muted-foreground mb-4">Register your team now for upcoming FDZ tournaments.</p>
                <a href="/registration" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  Register Now <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
