import { motion } from 'framer-motion';
import { Check, Star, Crown, Diamond, ArrowRight, Users, Eye, BarChart3, Handshake, MessageCircle, Tv, Shirt, Gift, Monitor, Trophy, Zap, Globe, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const tiers = [
  {
    id: 'silver',
    name: 'Silver',
    icon: Star,
    price: '50,000 DZD',
    priceNote: 'per season',
    gradient: 'from-[hsl(0,0%,70%)] to-[hsl(0,0%,50%)]',
    accentColor: 'text-muted-foreground',
    borderColor: 'border-border hover:border-muted-foreground/50',
    features: [
      { name: 'Logo on stream overlay', included: true },
      { name: 'Social media mentions (2x/month)', included: true },
      { name: 'Logo on event banners', included: true },
      { name: 'Logo on team jersey', included: false },
      { name: 'Product giveaway integration', included: false },
      { name: 'DZ Portal branding', included: false },
      { name: 'Custom content series', included: false },
      { name: 'Exclusive naming rights', included: false },
    ],
    description: 'Get visible in the Algerian esports scene with essential brand exposure across our streams and events.',
    reach: '10K+ viewers/event',
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: Crown,
    price: '150,000 DZD',
    priceNote: 'per season',
    gradient: 'from-[hsl(45,100%,50%)] to-[hsl(35,100%,40%)]',
    accentColor: 'text-cs2-gold',
    borderColor: 'border-cs2-gold/30 hover:border-cs2-gold/60',
    popular: true,
    features: [
      { name: 'Logo on stream overlay', included: true },
      { name: 'Social media mentions (4x/month)', included: true },
      { name: 'Logo on event banners', included: true },
      { name: 'Logo on team jersey', included: true },
      { name: 'Product giveaway integration', included: true },
      { name: 'DZ Portal branding', included: false },
      { name: 'Custom content series', included: false },
      { name: 'Exclusive naming rights', included: false },
    ],
    description: 'Maximum exposure across streams, socials, events, and team gear. The ideal tier for growing brands.',
    reach: '25K+ viewers/event',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    icon: Diamond,
    price: 'Custom',
    priceNote: 'contact us',
    gradient: 'from-[hsl(195,80%,70%)] via-[hsl(240,60%,60%)] to-[hsl(280,60%,60%)]',
    accentColor: 'text-cs2-blue',
    borderColor: 'border-cs2-blue/30 hover:border-cs2-blue/60',
    features: [
      { name: 'Logo on stream overlay', included: true },
      { name: 'Social media mentions (unlimited)', included: true },
      { name: 'Logo on event banners', included: true },
      { name: 'Logo on team jersey', included: true },
      { name: 'Product giveaway integration', included: true },
      { name: 'DZ Portal branding & integration', included: true },
      { name: 'Custom content series', included: true },
      { name: 'Exclusive naming rights', included: true },
    ],
    description: 'Full partnership with deep integration across every FDZ touchpoint. Built for enterprise.',
    reach: '50K+ viewers/event',
  },
];

const impactStats = [
  { value: '50K+', label: 'Monthly Reach', icon: Eye },
  { value: '24', label: 'Events / Year', icon: BarChart3 },
  { value: '2,800+', label: 'Active Players', icon: Users },
  { value: '11', label: 'Partners', icon: Handshake },
];

const benefits = [
  { icon: Tv, title: 'Live Stream Branding', desc: 'Your logo featured on every tournament broadcast overlay with 10K+ concurrent viewers.' },
  { icon: Shirt, title: 'Jersey Placement', desc: 'Brand visibility on official FDZ team jerseys worn at LAN events across Algeria.' },
  { icon: Gift, title: 'Product Integration', desc: 'Run branded giveaways during streams and events to engage the gaming audience directly.' },
  { icon: Monitor, title: 'Portal Integration', desc: 'Your brand embedded into the DZ Portal — seen by thousands of daily active users.' },
  { icon: Globe, title: 'Social Amplification', desc: 'Dedicated posts, stories, and mentions across all FDZ social channels with 30K+ followers.' },
  { icon: Target, title: 'Event Naming Rights', desc: 'Name a tournament after your brand — full ownership of event branding and marketing.' },
];

const testimonials = [
  { quote: 'FDZ gave us direct access to the most engaged gaming audience in Algeria. Our brand awareness tripled.', author: 'Novacore', role: 'Gold Partner' },
  { quote: 'The professionalism and reach exceeded our expectations. Best investment in the Algerian esports market.', author: 'Game Sphere', role: 'Silver Partner' },
  { quote: 'Working with FDZ transformed how we connect with the younger demographic. Real results, real engagement.', author: 'WTFast', role: 'Gold Partner' },
];

export default function Sponsorship() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Partnerships</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 leading-[0.95]">
              GROW YOUR BRAND<br />WITH <span className="text-gradient">FDZ</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Reach thousands of engaged gamers across Algeria through tournaments,
              live broadcasts, and community events. Real exposure, measurable impact.
            </p>
          </motion.div>
        </section>

        {/* Impact Stats */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {impactStats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-5">
                <stat.icon className="w-4 h-4 text-primary mb-2" />
                <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What You Get */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 block">Benefits</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">WHAT <span className="text-gradient">YOU GET</span></h2>
            <p className="text-muted-foreground mt-2 max-w-lg">Comprehensive exposure across every channel where Algerian gamers are watching.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-card rounded-xl border border-border/50 p-5 hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-secondary/80 border border-border/50 flex items-center justify-center mb-3 group-hover:border-primary/30 transition-colors">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="container mx-auto px-4 mb-20">
          <div className="mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 block">Plans</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">CHOOSE YOUR <span className="text-gradient">TIER</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier, index) => (
              <motion.div key={tier.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                className={`relative bg-card rounded-xl border ${tier.borderColor} p-6 transition-all duration-300 group ${tier.popular ? 'ring-1 ring-cs2-gold/30' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-cs2-gold text-primary-foreground text-[10px] font-bold uppercase tracking-wider">Most Popular</div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.gradient} flex items-center justify-center`}>
                    <tier.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{tier.name}</h3>
                    <span className="text-[10px] text-muted-foreground uppercase">{tier.reach}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className={`font-heading text-2xl font-bold ${tier.accentColor}`}>{tier.price}</span>
                  <span className="text-xs text-muted-foreground ml-1">/ {tier.priceNote}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-5">{tier.description}</p>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${feature.included ? 'bg-green-500/20' : 'bg-secondary'}`}>
                        {feature.included ? <Check className="w-2.5 h-2.5 text-green-500" /> : <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={tier.popular ? 'default' : 'outline'} className="w-full group">
                  Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 mb-20">
          <div className="mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 block">Testimonials</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">PARTNER <span className="text-gradient">VOICES</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{t.author[0]}</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground">{t.author}</span>
                    <span className="text-[10px] text-muted-foreground block">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="container mx-auto px-4 mb-20">
          <div className="mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 block">Comparison</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">DETAILED <span className="text-gradient">BREAKDOWN</span></h2>
          </div>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-[1fr_100px_100px_100px] gap-2 px-5 py-3 bg-secondary/30 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Feature</span>
              <span className="text-center">Silver</span>
              <span className="text-center text-cs2-gold">Gold</span>
              <span className="text-center text-cs2-blue">Diamond</span>
            </div>
            {[
              { feature: 'Stream Overlay Logo', silver: true, gold: true, diamond: true },
              { feature: 'Social Media Posts', silver: '2/mo', gold: '4/mo', diamond: '∞' },
              { feature: 'Event Banner Branding', silver: true, gold: true, diamond: true },
              { feature: 'Team Jersey Logo', silver: false, gold: true, diamond: true },
              { feature: 'Product Giveaways', silver: false, gold: true, diamond: true },
              { feature: 'Portal Integration', silver: false, gold: false, diamond: true },
              { feature: 'Custom Content Series', silver: false, gold: false, diamond: true },
              { feature: 'Naming Rights', silver: false, gold: false, diamond: true },
              { feature: 'Dedicated Account Manager', silver: false, gold: false, diamond: true },
              { feature: 'Analytics & Reports', silver: 'Basic', gold: 'Advanced', diamond: 'Full' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_100px_100px_100px] gap-2 px-5 py-2.5 border-b border-border/30 items-center text-sm">
                <span className="text-foreground">{row.feature}</span>
                {[row.silver, row.gold, row.diamond].map((val, j) => (
                  <div key={j} className="flex justify-center">
                    {val === true ? <Check className="w-4 h-4 text-green-500" /> :
                     val === false ? <X className="w-4 h-4 text-muted-foreground/30" /> :
                     <span className="text-xs text-muted-foreground">{val}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card rounded-xl border border-border p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="relative z-10">
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                CUSTOM <span className="text-gradient">PARTNERSHIP?</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Have something specific in mind? We build custom sponsorship packages tailored to your goals and budget.
              </p>
              <Button variant="hero" className="group">
                Contact Our Team <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
