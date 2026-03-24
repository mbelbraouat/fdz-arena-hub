import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Diamond, Sparkles, Tv, Shirt, Gift, Monitor, ArrowRight, Users, Eye, BarChart3, Handshake, MessageCircle } from 'lucide-react';
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
    ],
    description: 'Get visible in the Algerian esports scene with essential brand exposure.',
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
    ],
    description: 'Maximum exposure across streams, socials, events, and team gear.',
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
    ],
    description: 'Full partnership with deep integration across every FDZ touchpoint.',
    reach: '50K+ viewers/event',
  },
];

const impactStats = [
  { value: '50K+', label: 'Monthly Reach', icon: Eye },
  { value: '24', label: 'Events / Year', icon: BarChart3 },
  { value: '2,800+', label: 'Active Players', icon: Users },
  { value: '11', label: 'Partners', icon: Handshake },
];

export default function Sponsorship() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Partnerships</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 leading-[0.95]">
              GROW YOUR BRAND
              <br />
              WITH <span className="text-gradient">FDZ</span>
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-5"
              >
                <stat.icon className="w-4 h-4 text-primary mb-2" />
                <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="container mx-auto px-4 mb-20">
          <div className="mb-8">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 block">Plans</span>
            <h2 className="font-heading text-3xl font-bold text-foreground">Choose Your Tier</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`relative bg-card rounded-xl border ${tier.borderColor} p-6 transition-all duration-300 group ${
                  tier.popular ? 'ring-1 ring-cs2-gold/30' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-cs2-gold text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
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
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        feature.included ? 'bg-green-500/20' : 'bg-secondary'
                      }`}>
                        {feature.included ? (
                          <Check className="w-2.5 h-2.5 text-green-500" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? 'default' : 'outline'}
                  className="w-full group"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl border border-border p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="relative z-10">
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                CUSTOM <span className="text-gradient">PARTNERSHIP?</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Have something specific in mind? We build custom sponsorship packages 
                tailored to your goals and budget.
              </p>
              <Button variant="hero" className="group">
                Contact Our Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
