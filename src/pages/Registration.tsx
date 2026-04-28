import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Trophy, Users, Calendar, CheckCircle2, Shield, Image as ImageIcon } from 'lucide-react';

type RosterSlot = { role: 'main' | 'substitute' | 'coach'; name: string; label: string };

const INITIAL_ROSTER: RosterSlot[] = [
  { role: 'main', name: '', label: 'Player 1 (Captain)' },
  { role: 'main', name: '', label: 'Player 2' },
  { role: 'main', name: '', label: 'Player 3' },
  { role: 'main', name: '', label: 'Player 4' },
  { role: 'main', name: '', label: 'Player 5' },
  { role: 'substitute', name: '', label: 'Substitute (optional)' },
  { role: 'coach', name: '', label: 'Coach (optional)' },
];

export default function Registration() {
  const { toast } = useToast();
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
  const [form, setForm] = useState({
    team_name: '',
    team_tag: '',
    logo_url: '',
    captain_name: '',
    captain_email: '',
    roster: INITIAL_ROSTER.map(s => ({ ...s })),
  });

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['public-tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments').select('*').in('status', ['upcoming', 'live']).order('start_date', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTournament) throw new Error('Select a tournament');
      const tournament = tournaments?.find(t => t.id === selectedTournament);
      const mains = form.roster.filter(s => s.role === 'main' && s.name.trim());
      if (mains.length < 5) throw new Error('You must fill all 5 main roster players');
      const players = form.roster
        .filter(s => s.name.trim())
        .map(s => ({ name: s.name.trim(), role: s.role }));
      const { error } = await supabase.from('registrations').insert({
        tournament_id: selectedTournament,
        team_name: form.team_name,
        team_tag: form.team_tag.toUpperCase(),
        logo_url: form.logo_url || null,
        captain_name: form.captain_name,
        captain_email: form.captain_email,
        players,
        game: tournament?.game || 'cs2',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Registration submitted!', description: 'Your team has been registered. You will receive a confirmation email.' });
      setForm({ team_name: '', team_tag: '', logo_url: '', captain_name: '', captain_email: '', roster: INITIAL_ROSTER.map(s => ({ ...s })) });
      setSelectedTournament(null);
    },
    onError: (e: Error) => toast({ title: 'Registration Failed', description: e.message, variant: 'destructive' }),
  });

  const updateSlot = (idx: number, name: string) => {
    const roster = [...form.roster];
    roster[idx] = { ...roster[idx], name };
    setForm({ ...form, roster });
  };

  const selectedTournamentData = tournaments?.find(t => t.id === selectedTournament);
  const mainsFilled = form.roster.filter(s => s.role === 'main' && s.name.trim()).length;
  const canSubmit = !!selectedTournament && !!form.team_name && !!form.team_tag && !!form.captain_name && !!form.captain_email && mainsFilled === 5 && !registerMutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Registration</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 leading-[0.95]">
              REGISTER YOUR
              <br />
              <span className="text-gradient">TEAM</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Sign up for upcoming FDZ tournaments. Submit your team name, tag, logo and full roster —
              5 main players, 1 optional substitute and 1 optional coach.
            </p>
          </motion.div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8">
            {/* Tournament Selection */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 block">Step 1</span>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Choose Tournament</h2>
              </div>

              {isLoading ? (
                <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-24 bg-card rounded-xl border border-border animate-pulse" />)}</div>
              ) : tournaments?.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center">
                  <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">No Tournaments Available</h3>
                  <p className="text-sm text-muted-foreground">Check back soon for upcoming tournaments.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tournaments?.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedTournament(t.id)}
                      className={`relative bg-card rounded-xl border p-5 cursor-pointer transition-all duration-200 group ${
                        selectedTournament === t.id ? 'border-primary ring-1 ring-primary/30' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                              t.game === 'cs2' ? 'bg-cs2-gold/20 text-cs2-gold' : 'bg-val-red/20 text-val-red'
                            }`}>{t.game}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                              t.status === 'live' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'
                            }`}>{t.status === 'live' ? '● LIVE' : 'UPCOMING'}</span>
                          </div>
                          <h3 className="font-heading text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{t.name}</h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {t.teams_count} teams</span>
                            <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {t.prize_pool}</span>
                            {t.start_date && <span>{t.start_date}</span>}
                            {t.stage && <span className="text-primary">{t.stage}</span>}
                          </div>
                          {t.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{t.description}</p>}
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                          selectedTournament === t.id ? 'border-primary bg-primary' : 'border-border'
                        }`}>
                          {selectedTournament === t.id && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Registration Form */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="px-5 py-4 border-b border-border bg-secondary/30">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Team Registration</span>
                  </div>
                  {selectedTournamentData && <p className="text-xs text-primary mt-1">{selectedTournamentData.name}</p>}
                </div>

                <div className="p-5 space-y-4">
                  {/* Team identity */}
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-lg bg-secondary/60 border border-border flex items-center justify-center overflow-hidden shrink-0">
                      {form.logo_url ? (
                        <img src={form.logo_url} alt="logo" className="w-full h-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Team Name</Label>
                        <Input value={form.team_name} onChange={e => setForm({ ...form, team_name: e.target.value })} placeholder="e.g. Team PHOENIX" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Tag (3-5)</Label>
                        <Input value={form.team_tag} onChange={e => setForm({ ...form, team_tag: e.target.value })} placeholder="PHX" maxLength={5} className="mt-1 uppercase" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Logo URL</Label>
                    <Input value={form.logo_url} onChange={e => setForm({ ...form, logo_url: e.target.value })} placeholder="https://..." className="mt-1" />
                  </div>

                  <div className="border-t border-border pt-4">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Captain Info</Label>
                    <div className="space-y-2">
                      <Input value={form.captain_name} onChange={e => setForm({ ...form, captain_name: e.target.value })} placeholder="Captain name" />
                      <Input type="email" value={form.captain_email} onChange={e => setForm({ ...form, captain_email: e.target.value })} placeholder="Captain email" />
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Roster</Label>
                      <span className={`text-[10px] font-bold ${mainsFilled === 5 ? 'text-green-500' : 'text-cs2-gold'}`}>
                        {mainsFilled}/5 main players
                      </span>
                    </div>
                    <div className="space-y-2">
                      {form.roster.map((slot, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className={`text-[9px] font-bold uppercase tracking-wider w-16 shrink-0 ${
                            slot.role === 'main' ? 'text-primary' : slot.role === 'substitute' ? 'text-cs2-gold' : 'text-val-red'
                          }`}>
                            {slot.role === 'main' ? `Main ${idx + 1}` : slot.role === 'substitute' ? 'Sub' : 'Coach'}
                          </span>
                          <Input
                            value={slot.name}
                            onChange={e => updateSlot(idx, e.target.value)}
                            placeholder={slot.label}
                            className="flex-1 h-9"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" disabled={!canSubmit} onClick={() => registerMutation.mutate()}>
                    {registerMutation.isPending ? 'Submitting...' : 'Register Team'}
                    <UserPlus className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    By registering, you agree to FDZ tournament rules and code of conduct.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
