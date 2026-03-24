import { motion } from 'framer-motion';

const partners = [
  'Mouloudia Club d\'Alger',
  'Novacore',
  'Stream',
  'Leetify',
  'WTFast',
  'Fifteen Average',
  'Institut Français',
  'Game Sphere',
  'AGI Galaxy',
  'FACEIT',
  'USTHB',
];

export function PartnersSection() {
  return (
    <section className="py-12 bg-card/30 border-y border-border/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-medium"
        >
          Trusted Partners & Collaborators
        </motion.p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-[scroll_35s_linear_infinite]">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-8 md:px-12 flex items-center justify-center"
            >
              <span className="font-heading text-lg md:text-xl font-bold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-300 whitespace-nowrap cursor-default">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
