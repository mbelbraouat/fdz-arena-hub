import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Trophy, Users, Star, Target, Calendar, Plus, Trash2, Edit2, Save, X, UserPlus, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Tab = 'tournaments' | 'teams' | 'players' | 'matches' | 'events' | 'registrations';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'tournaments', label: 'Tournaments', icon: Trophy },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'players', label: 'Players', icon: Star },
  { id: 'matches', label: 'Matches', icon: Target },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'registrations', label: 'Registrations', icon: UserPlus },
];

export function AdminLayout({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('tournaments');

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-56 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <h1 className="font-heading text-lg font-bold text-foreground">FDZ Admin</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Tournament Manager</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />Sign Out
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'tournaments' && <TournamentsPanel />}
        {activeTab === 'teams' && <TeamsPanel />}
        {activeTab === 'players' && <PlayersPanel />}
        {activeTab === 'matches' && <MatchesPanel />}
        {activeTab === 'events' && <EventsPanel />}
        {activeTab === 'registrations' && <RegistrationsPanel />}
      </div>
    </div>
  );
}

// ─── TOURNAMENTS ──────────────────────────────────────

function TournamentsPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', game: 'cs2' as 'cs2' | 'valorant', status: 'upcoming', teams_count: 0, prize_pool: '', stage: 'Group Stage', start_date: '', end_date: '', description: '' });

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['admin-tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, teams_count: Number(form.teams_count), start_date: form.start_date || null, end_date: form.end_date || null };
      if (editId) {
        const { error } = await supabase.from('tournaments').update(payload).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('tournaments').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tournaments'] });
      setShowForm(false); setEditId(null); resetForm();
      toast({ title: editId ? 'Tournament updated' : 'Tournament created' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('tournaments').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-tournaments'] }); toast({ title: 'Tournament deleted' }); },
  });

  const resetForm = () => setForm({ name: '', game: 'cs2', status: 'upcoming', teams_count: 0, prize_pool: '', stage: 'Group Stage', start_date: '', end_date: '', description: '' });

  const startEdit = (t: any) => {
    setForm({ name: t.name, game: t.game, status: t.status, teams_count: t.teams_count, prize_pool: t.prize_pool, stage: t.stage || '', start_date: t.start_date || '', end_date: t.end_date || '', description: t.description || '' });
    setEditId(t.id); setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Tournaments</h2>
        <Button onClick={() => { resetForm(); setEditId(null); setShowForm(true); }} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Tournament</Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs">Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tournament name" /></div>
            <div><Label className="text-xs">Game</Label>
              <select value={form.game} onChange={(e) => setForm({ ...form, game: e.target.value as any })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="cs2">CS2</option><option value="valorant">Valorant</option>
              </select></div>
            <div><Label className="text-xs">Status</Label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="upcoming">Upcoming</option><option value="live">Live</option><option value="completed">Completed</option>
              </select></div>
            <div><Label className="text-xs">Teams Count</Label><Input type="number" value={form.teams_count} onChange={(e) => setForm({ ...form, teams_count: parseInt(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">Prize Pool</Label><Input value={form.prize_pool} onChange={(e) => setForm({ ...form, prize_pool: e.target.value })} placeholder="500,000 DZD" /></div>
            <div><Label className="text-xs">Stage</Label><Input value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} placeholder="Group Stage" /></div>
            <div><Label className="text-xs">Start Date</Label><Input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} /></div>
            <div><Label className="text-xs">End Date</Label><Input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} /></div>
          </div>
          <div><Label className="text-xs">Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tournament description..." /></div>
          <div className="flex gap-2">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} size="sm"><Save className="w-4 h-4 mr-1" /> {editId ? 'Update' : 'Create'}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); }} size="sm"><X className="w-4 h-4 mr-1" /> Cancel</Button>
          </div>
        </div>
      )}

      {isLoading ? <div className="text-muted-foreground text-sm">Loading...</div> : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_80px_80px_100px_100px_80px] gap-3 px-4 py-2.5 bg-secondary/30 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
            <span>Name</span><span>Game</span><span>Status</span><span>Teams</span><span>Prize</span><span>Actions</span>
          </div>
          {tournaments?.map((t) => (
            <div key={t.id} className="grid grid-cols-[1fr_80px_80px_100px_100px_80px] gap-3 px-4 py-3 border-b border-border/30 items-center hover:bg-secondary/10 text-sm">
              <span className="font-medium text-foreground truncate">{t.name}</span>
              <span className="text-xs text-muted-foreground uppercase">{t.game}</span>
              <span className={`text-xs font-medium ${t.status === 'live' ? 'text-green-500' : t.status === 'upcoming' ? 'text-cs2-gold' : 'text-muted-foreground'}`}>{t.status}</span>
              <span className="text-xs text-muted-foreground">{t.teams_count} teams</span>
              <span className="text-xs text-primary font-medium">{t.prize_pool}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEdit(t)}><Edit2 className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(t.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          ))}
          {tournaments?.length === 0 && <div className="p-6 text-center text-muted-foreground text-sm">No tournaments yet.</div>}
        </div>
      )}
    </div>
  );
}

// ─── TEAMS ──────────────────────────────────────

function TeamsPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', tag: '', game: 'cs2' as 'cs2' | 'valorant', wins: 0, losses: 0, rating: 1.0, rank_change: 0, streak: 'W0' });

  const { data: teams, isLoading } = useQuery({
    queryKey: ['admin-teams'],
    queryFn: async () => { const { data, error } = await supabase.from('teams').select('*').order('rating', { ascending: false }); if (error) throw error; return data; },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, wins: Number(form.wins), losses: Number(form.losses), rating: Number(form.rating), rank_change: Number(form.rank_change) };
      if (editId) { const { error } = await supabase.from('teams').update(payload).eq('id', editId); if (error) throw error; }
      else { const { error } = await supabase.from('teams').insert(payload); if (error) throw error; }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-teams'] }); setShowForm(false); setEditId(null);
      setForm({ name: '', tag: '', game: 'cs2', wins: 0, losses: 0, rating: 1.0, rank_change: 0, streak: 'W0' });
      toast({ title: editId ? 'Team updated' : 'Team created' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('teams').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-teams'] }); toast({ title: 'Team deleted' }); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Teams</h2>
        <Button onClick={() => { setForm({ name: '', tag: '', game: 'cs2', wins: 0, losses: 0, rating: 1.0, rank_change: 0, streak: 'W0' }); setEditId(null); setShowForm(true); }} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Team</Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><Label className="text-xs">Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label className="text-xs">Tag</Label><Input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="PHX" /></div>
            <div><Label className="text-xs">Game</Label>
              <select value={form.game} onChange={(e) => setForm({ ...form, game: e.target.value as any })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="cs2">CS2</option><option value="valorant">Valorant</option>
              </select></div>
            <div><Label className="text-xs">Streak</Label><Input value={form.streak} onChange={(e) => setForm({ ...form, streak: e.target.value })} placeholder="W5" /></div>
            <div><Label className="text-xs">Wins</Label><Input type="number" value={form.wins} onChange={(e) => setForm({ ...form, wins: parseInt(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">Losses</Label><Input type="number" value={form.losses} onChange={(e) => setForm({ ...form, losses: parseInt(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">Rating</Label><Input type="number" step="0.01" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 1 })} /></div>
            <div><Label className="text-xs">Rank Change</Label><Input type="number" value={form.rank_change} onChange={(e) => setForm({ ...form, rank_change: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} size="sm"><Save className="w-4 h-4 mr-1" /> {editId ? 'Update' : 'Create'}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); }} size="sm"><X className="w-4 h-4 mr-1" /> Cancel</Button>
          </div>
        </div>
      )}

      {isLoading ? <div className="text-muted-foreground text-sm">Loading...</div> : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[40px_1fr_60px_60px_80px_60px_60px_70px] gap-2 px-4 py-2.5 bg-secondary/30 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
            <span>#</span><span>Team</span><span>Tag</span><span>Game</span><span>W/L</span><span>Rating</span><span>Streak</span><span>Actions</span>
          </div>
          {teams?.map((t, i) => (
            <div key={t.id} className="grid grid-cols-[40px_1fr_60px_60px_80px_60px_60px_70px] gap-2 px-4 py-2.5 border-b border-border/30 items-center hover:bg-secondary/10 text-sm">
              <span className="text-muted-foreground font-heading font-bold">{i + 1}</span>
              <span className="font-medium text-foreground truncate">{t.name}</span>
              <span className="text-xs text-primary font-bold">{t.tag}</span>
              <span className="text-xs text-muted-foreground uppercase">{t.game}</span>
              <span className="text-xs"><span className="text-green-500">{t.wins}</span>/<span className="text-red-500">{t.losses}</span></span>
              <span className="text-xs font-bold text-foreground">{t.rating}</span>
              <span className="text-xs text-muted-foreground">{t.streak}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setForm({ name: t.name, tag: t.tag, game: t.game, wins: t.wins, losses: t.losses, rating: t.rating, rank_change: t.rank_change, streak: t.streak || 'W0' }); setEditId(t.id); setShowForm(true); }}><Edit2 className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(t.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          ))}
          {teams?.length === 0 && <div className="p-6 text-center text-muted-foreground text-sm">No teams yet.</div>}
        </div>
      )}
    </div>
  );
}

// ─── PLAYERS ──────────────────────────────────────

function PlayersPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', team_id: '', game: 'cs2' as 'cs2' | 'valorant', maps_played: 0, kd: 1.0, adr: 0, kast: 0, hs_percentage: 0, rating: 1.0, is_mvp: false });

  const { data: players, isLoading } = useQuery({
    queryKey: ['admin-players'],
    queryFn: async () => { const { data, error } = await supabase.from('players').select('*, teams(name, tag)').order('rating', { ascending: false }); if (error) throw error; return data; },
  });

  const { data: teams } = useQuery({
    queryKey: ['admin-teams-list'],
    queryFn: async () => { const { data, error } = await supabase.from('teams').select('id, name, tag').order('name'); if (error) throw error; return data; },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { name: form.name, team_id: form.team_id || null, game: form.game, maps_played: Number(form.maps_played), kd: Number(form.kd), adr: Number(form.adr), kast: Number(form.kast), hs_percentage: Number(form.hs_percentage), rating: Number(form.rating), is_mvp: form.is_mvp };
      if (editId) { const { error } = await supabase.from('players').update(payload).eq('id', editId); if (error) throw error; }
      else { const { error } = await supabase.from('players').insert(payload); if (error) throw error; }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-players'] }); setShowForm(false); setEditId(null);
      setForm({ name: '', team_id: '', game: 'cs2', maps_played: 0, kd: 1.0, adr: 0, kast: 0, hs_percentage: 0, rating: 1.0, is_mvp: false });
      toast({ title: editId ? 'Player updated' : 'Player created' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('players').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-players'] }); toast({ title: 'Player deleted' }); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Players</h2>
        <Button onClick={() => { setForm({ name: '', team_id: '', game: 'cs2', maps_played: 0, kd: 1.0, adr: 0, kast: 0, hs_percentage: 0, rating: 1.0, is_mvp: false }); setEditId(null); setShowForm(true); }} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Player</Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><Label className="text-xs">Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label className="text-xs">Team</Label>
              <select value={form.team_id} onChange={(e) => setForm({ ...form, team_id: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">No team</option>{teams?.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.tag})</option>)}
              </select></div>
            <div><Label className="text-xs">Game</Label>
              <select value={form.game} onChange={(e) => setForm({ ...form, game: e.target.value as any })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="cs2">CS2</option><option value="valorant">Valorant</option>
              </select></div>
            <div><Label className="text-xs">Maps</Label><Input type="number" value={form.maps_played} onChange={(e) => setForm({ ...form, maps_played: parseInt(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">K/D</Label><Input type="number" step="0.01" value={form.kd} onChange={(e) => setForm({ ...form, kd: parseFloat(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">ADR</Label><Input type="number" step="0.1" value={form.adr} onChange={(e) => setForm({ ...form, adr: parseFloat(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">KAST %</Label><Input type="number" step="0.1" value={form.kast} onChange={(e) => setForm({ ...form, kast: parseFloat(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">HS %</Label><Input type="number" step="0.1" value={form.hs_percentage} onChange={(e) => setForm({ ...form, hs_percentage: parseFloat(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">Rating</Label><Input type="number" step="0.01" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} /></div>
            <div className="flex items-end gap-2 pb-1"><input type="checkbox" checked={form.is_mvp} onChange={(e) => setForm({ ...form, is_mvp: e.target.checked })} className="w-4 h-4" /><Label className="text-xs">MVP</Label></div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} size="sm"><Save className="w-4 h-4 mr-1" /> {editId ? 'Update' : 'Create'}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); }} size="sm"><X className="w-4 h-4 mr-1" /> Cancel</Button>
          </div>
        </div>
      )}

      {isLoading ? <div className="text-muted-foreground text-sm">Loading...</div> : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_80px_50px_50px_50px_50px_50px_60px_70px] gap-2 px-4 py-2.5 bg-secondary/30 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
            <span>Player</span><span>Team</span><span>Maps</span><span>K/D</span><span>ADR</span><span>KAST</span><span>HS%</span><span>Rating</span><span>Actions</span>
          </div>
          {players?.map((p: any) => (
            <div key={p.id} className="grid grid-cols-[1fr_80px_50px_50px_50px_50px_50px_60px_70px] gap-2 px-4 py-2.5 border-b border-border/30 items-center hover:bg-secondary/10 text-sm">
              <div className="flex items-center gap-1.5">{p.is_mvp && <Star className="w-3 h-3 text-cs2-gold fill-cs2-gold" />}<span className="font-medium text-foreground truncate">{p.name}</span></div>
              <span className="text-xs text-primary font-medium truncate">{p.teams?.tag || '—'}</span>
              <span className="text-xs text-muted-foreground">{p.maps_played}</span>
              <span className="text-xs font-bold text-foreground">{p.kd}</span>
              <span className="text-xs text-foreground">{p.adr}</span>
              <span className="text-xs text-foreground">{p.kast}%</span>
              <span className="text-xs text-foreground">{p.hs_percentage}%</span>
              <span className="text-xs font-bold text-primary">{p.rating}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setForm({ name: p.name, team_id: p.team_id || '', game: p.game, maps_played: p.maps_played, kd: p.kd, adr: p.adr, kast: p.kast, hs_percentage: p.hs_percentage, rating: p.rating, is_mvp: p.is_mvp }); setEditId(p.id); setShowForm(true); }}><Edit2 className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(p.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          ))}
          {players?.length === 0 && <div className="p-6 text-center text-muted-foreground text-sm">No players yet.</div>}
        </div>
      )}
    </div>
  );
}

// ─── MATCHES ──────────────────────────────────────

function MatchesPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ tournament_id: '', team1_id: '', team2_id: '', score1: 0, score2: 0, map: 'TBD', status: 'upcoming', match_date: '' });

  const { data: matches, isLoading } = useQuery({
    queryKey: ['admin-matches'],
    queryFn: async () => { const { data, error } = await supabase.from('matches').select('*, team1:teams!matches_team1_id_fkey(name, tag), team2:teams!matches_team2_id_fkey(name, tag), tournaments(name)').order('match_date', { ascending: false }); if (error) throw error; return data; },
  });

  const { data: teams } = useQuery({ queryKey: ['admin-teams-list'], queryFn: async () => { const { data } = await supabase.from('teams').select('id, name, tag').order('name'); return data || []; } });
  const { data: tournaments } = useQuery({ queryKey: ['admin-tournaments-list'], queryFn: async () => { const { data } = await supabase.from('tournaments').select('id, name').order('name'); return data || []; } });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { tournament_id: form.tournament_id || null, team1_id: form.team1_id, team2_id: form.team2_id, score1: Number(form.score1), score2: Number(form.score2), map: form.map, status: form.status, match_date: form.match_date || new Date().toISOString() };
      if (editId) { const { error } = await supabase.from('matches').update(payload).eq('id', editId); if (error) throw error; }
      else { const { error } = await supabase.from('matches').insert(payload); if (error) throw error; }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-matches'] }); setShowForm(false); setEditId(null);
      setForm({ tournament_id: '', team1_id: '', team2_id: '', score1: 0, score2: 0, map: 'TBD', status: 'upcoming', match_date: '' });
      toast({ title: editId ? 'Match updated' : 'Match created' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('matches').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-matches'] }); toast({ title: 'Match deleted' }); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Matches</h2>
        <Button onClick={() => { setForm({ tournament_id: '', team1_id: '', team2_id: '', score1: 0, score2: 0, map: 'TBD', status: 'upcoming', match_date: '' }); setEditId(null); setShowForm(true); }} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Match</Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><Label className="text-xs">Tournament</Label>
              <select value={form.tournament_id} onChange={(e) => setForm({ ...form, tournament_id: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">None</option>{tournaments?.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select></div>
            <div><Label className="text-xs">Team 1</Label>
              <select value={form.team1_id} onChange={(e) => setForm({ ...form, team1_id: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select team</option>{teams?.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.tag})</option>)}
              </select></div>
            <div><Label className="text-xs">Team 2</Label>
              <select value={form.team2_id} onChange={(e) => setForm({ ...form, team2_id: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select team</option>{teams?.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.tag})</option>)}
              </select></div>
            <div><Label className="text-xs">Map</Label>
              <select value={form.map} onChange={(e) => setForm({ ...form, map: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                {['TBD', 'Mirage', 'Inferno', 'Dust2', 'Ancient', 'Nuke', 'Anubis', 'Vertigo'].map(m => <option key={m} value={m}>{m}</option>)}
              </select></div>
            <div><Label className="text-xs">Score 1</Label><Input type="number" value={form.score1} onChange={(e) => setForm({ ...form, score1: parseInt(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">Score 2</Label><Input type="number" value={form.score2} onChange={(e) => setForm({ ...form, score2: parseInt(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">Status</Label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="upcoming">Upcoming</option><option value="live">Live</option><option value="finished">Finished</option>
              </select></div>
            <div><Label className="text-xs">Date</Label><Input type="datetime-local" value={form.match_date} onChange={(e) => setForm({ ...form, match_date: e.target.value })} /></div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} size="sm"><Save className="w-4 h-4 mr-1" /> {editId ? 'Update' : 'Create'}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); }} size="sm"><X className="w-4 h-4 mr-1" /> Cancel</Button>
          </div>
        </div>
      )}

      {isLoading ? <div className="text-muted-foreground text-sm">Loading...</div> : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_40px_100px_60px_60px_70px] gap-2 px-4 py-2.5 bg-secondary/30 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
            <span>Team 1</span><span>vs</span><span></span><span>Team 2</span><span>Map</span><span>Status</span><span>Actions</span>
          </div>
          {matches?.map((m: any) => (
            <div key={m.id} className="grid grid-cols-[1fr_100px_40px_100px_60px_60px_70px] gap-2 px-4 py-2.5 border-b border-border/30 items-center hover:bg-secondary/10 text-sm">
              <span className={`font-medium truncate ${m.score1 > m.score2 ? 'text-foreground' : 'text-muted-foreground'}`}>{m.team1?.name || '?'}</span>
              <div className="flex items-center gap-1">
                <span className={`font-bold ${m.score1 > m.score2 ? 'text-green-500' : 'text-foreground'}`}>{m.score1}</span>
                <span className="text-muted-foreground">-</span>
                <span className={`font-bold ${m.score2 > m.score1 ? 'text-green-500' : 'text-foreground'}`}>{m.score2}</span>
              </div>
              <span></span>
              <span className={`font-medium truncate ${m.score2 > m.score1 ? 'text-foreground' : 'text-muted-foreground'}`}>{m.team2?.name || '?'}</span>
              <span className="text-xs text-muted-foreground">{m.map}</span>
              <span className={`text-xs font-medium ${m.status === 'live' ? 'text-green-500' : m.status === 'upcoming' ? 'text-cs2-gold' : 'text-muted-foreground'}`}>{m.status}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                  setForm({ tournament_id: m.tournament_id || '', team1_id: m.team1_id, team2_id: m.team2_id, score1: m.score1, score2: m.score2, map: m.map, status: m.status, match_date: m.match_date?.slice(0, 16) || '' });
                  setEditId(m.id); setShowForm(true);
                }}><Edit2 className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(m.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          ))}
          {matches?.length === 0 && <div className="p-6 text-center text-muted-foreground text-sm">No matches yet.</div>}
        </div>
      )}
    </div>
  );
}

// ─── EVENTS ──────────────────────────────────────

function EventsPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', status: 'upcoming', teams_count: 0, prize_pool: '', event_date: '', winner: '', game: 'cs2' as 'cs2' | 'valorant' });

  const { data: events, isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => { const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false }); if (error) throw error; return data; },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, teams_count: Number(form.teams_count), winner: form.winner || null };
      if (editId) { const { error } = await supabase.from('events').update(payload).eq('id', editId); if (error) throw error; }
      else { const { error } = await supabase.from('events').insert(payload); if (error) throw error; }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] }); setShowForm(false); setEditId(null);
      setForm({ name: '', status: 'upcoming', teams_count: 0, prize_pool: '', event_date: '', winner: '', game: 'cs2' });
      toast({ title: editId ? 'Event updated' : 'Event created' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('events').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-events'] }); toast({ title: 'Event deleted' }); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Events</h2>
        <Button onClick={() => { setForm({ name: '', status: 'upcoming', teams_count: 0, prize_pool: '', event_date: '', winner: '', game: 'cs2' }); setEditId(null); setShowForm(true); }} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Event</Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><Label className="text-xs">Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label className="text-xs">Game</Label>
              <select value={form.game} onChange={(e) => setForm({ ...form, game: e.target.value as any })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="cs2">CS2</option><option value="valorant">Valorant</option>
              </select></div>
            <div><Label className="text-xs">Status</Label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="upcoming">Upcoming</option><option value="live">Live</option><option value="completed">Completed</option>
              </select></div>
            <div><Label className="text-xs">Teams</Label><Input type="number" value={form.teams_count} onChange={(e) => setForm({ ...form, teams_count: parseInt(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs">Prize Pool</Label><Input value={form.prize_pool} onChange={(e) => setForm({ ...form, prize_pool: e.target.value })} /></div>
            <div><Label className="text-xs">Date</Label><Input value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} placeholder="Mar 2025" /></div>
            <div><Label className="text-xs">Winner</Label><Input value={form.winner} onChange={(e) => setForm({ ...form, winner: e.target.value })} placeholder="Team name" /></div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} size="sm"><Save className="w-4 h-4 mr-1" /> {editId ? 'Update' : 'Create'}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); }} size="sm"><X className="w-4 h-4 mr-1" /> Cancel</Button>
          </div>
        </div>
      )}

      {isLoading ? <div className="text-muted-foreground text-sm">Loading...</div> : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_60px_70px_60px_90px_70px_70px] gap-2 px-4 py-2.5 bg-secondary/30 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
            <span>Name</span><span>Game</span><span>Status</span><span>Teams</span><span>Prize</span><span>Winner</span><span>Actions</span>
          </div>
          {events?.map((e: any) => (
            <div key={e.id} className="grid grid-cols-[1fr_60px_70px_60px_90px_70px_70px] gap-2 px-4 py-2.5 border-b border-border/30 items-center hover:bg-secondary/10 text-sm">
              <span className="font-medium text-foreground truncate">{e.name}</span>
              <span className="text-xs text-muted-foreground uppercase">{e.game}</span>
              <span className={`text-xs font-medium ${e.status === 'live' ? 'text-green-500' : e.status === 'upcoming' ? 'text-cs2-gold' : 'text-muted-foreground'}`}>{e.status}</span>
              <span className="text-xs text-muted-foreground">{e.teams_count}</span>
              <span className="text-xs text-primary font-medium">{e.prize_pool}</span>
              <span className="text-xs text-cs2-gold truncate">{e.winner || '—'}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                  setForm({ name: e.name, status: e.status, teams_count: e.teams_count, prize_pool: e.prize_pool, event_date: e.event_date || '', winner: e.winner || '', game: e.game });
                  setEditId(e.id); setShowForm(true);
                }}><Edit2 className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(e.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          ))}
          {events?.length === 0 && <div className="p-6 text-center text-muted-foreground text-sm">No events yet.</div>}
        </div>
      )}
    </div>
  );
}

// ─── REGISTRATIONS ──────────────────────────────────────

function RegistrationsPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: registrations, isLoading } = useQuery({
    queryKey: ['admin-registrations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('registrations').select('*, tournaments(name)').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('registrations').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-registrations'] });
      toast({ title: 'Status updated' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('registrations').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-registrations'] }); toast({ title: 'Registration deleted' }); },
  });

  const statusIcon = (status: string) => {
    if (status === 'approved') return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
    if (status === 'rejected') return <XCircle className="w-3.5 h-3.5 text-red-500" />;
    return <Clock className="w-3.5 h-3.5 text-cs2-gold" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Registrations</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage tournament team registrations</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-cs2-gold" /> {registrations?.filter(r => r.status === 'pending').length || 0} pending</span>
        </div>
      </div>

      {isLoading ? <div className="text-muted-foreground text-sm">Loading...</div> : (
        <div className="space-y-3">
          {registrations?.map((r: any) => (
            <div key={r.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading text-lg font-bold text-foreground">{r.team_name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">{r.team_tag}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-medium uppercase ${
                      r.game === 'cs2' ? 'bg-cs2-gold/20 text-cs2-gold' : 'bg-val-red/20 text-val-red'
                    }`}>{r.game}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tournament: <span className="text-primary">{r.tournaments?.name || '—'}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {statusIcon(r.status)}
                  <span className={`text-xs font-medium ${
                    r.status === 'approved' ? 'text-green-500' : r.status === 'rejected' ? 'text-red-500' : 'text-cs2-gold'
                  }`}>{r.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
                <div><span className="text-muted-foreground">Captain:</span> <span className="text-foreground">{r.captain_name}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{r.captain_email}</span></div>
                <div><span className="text-muted-foreground">Players:</span> <span className="text-foreground">{(r.players as string[])?.length || 0}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="text-foreground">{new Date(r.created_at).toLocaleDateString()}</span></div>
              </div>

              {r.players && (r.players as string[]).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(r.players as string[]).map((p: string, i: number) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-foreground">{p}</span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                {r.status === 'pending' && (
                  <>
                    <Button size="sm" variant="default" className="h-7 text-xs" onClick={() => updateStatus.mutate({ id: r.id, status: 'approved' })}>
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs text-red-500" onClick={() => updateStatus.mutate({ id: r.id, status: 'rejected' })}>
                      <XCircle className="w-3 h-3 mr-1" /> Reject
                    </Button>
                  </>
                )}
                {r.status !== 'pending' && (
                  <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => updateStatus.mutate({ id: r.id, status: 'pending' })}>
                    <Clock className="w-3 h-3 mr-1" /> Reset to Pending
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => deleteMutation.mutate(r.id)}>
                  <Trash2 className="w-3 h-3 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
          {registrations?.length === 0 && <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground text-sm">No registrations yet.</div>}
        </div>
      )}
    </div>
  );
}
