import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, Users, Target, Star, BarChart3 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LiveMatchTicker } from '@/components/portal/LiveMatchTicker';
import { PlayerOfWeek } from '@/components/portal/PlayerOfWeek';
import { RankingSidebar } from '@/components/portal/RankingTable';
import { MatchResults } from '@/components/portal/MatchResults';
import { WeaponStats } from '@/components/portal/WeaponStats';
import { MapPool } from '@/components/portal/MapPool';
import { TopPlayersTable } from '@/components/portal/TopPlayersTable';
import { EventsSidebar } from '@/components/portal/EventsSidebar';
import { QuickStats } from '@/components/portal/QuickStats';

type ViewType = 'overview' | 'players' | 'matches' | 'stats';

const views: { id: ViewType; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'players', label: 'Players', icon: Star },
  { id: 'matches', label: 'Results', icon: Target },
  { id: 'stats', label: 'Stats', icon: Trophy },
];

export default function Portal() {
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Live Match Ticker */}
      <div className="pt-20">
        <LiveMatchTicker />
      </div>

      {/* Sub-navigation */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-1">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeView === view.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <view.icon className="w-3.5 h-3.5" />
                  {view.label}
                </button>
              ))}
            </div>

            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats Bar */}
            <QuickStats />

            {/* HLTV-style 3-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5">
              {/* Left Sidebar */}
              <div className="space-y-5 order-2 lg:order-1">
                <PlayerOfWeek />
                <RankingSidebar />
              </div>

              {/* Main Content */}
              <div className="space-y-5 order-1 lg:order-2">
                <MatchResults />
                <MapPool />
              </div>

              {/* Right Sidebar */}
              <div className="space-y-5 order-3">
                <EventsSidebar />
                <WeaponStats />
              </div>
            </div>
          </div>
        )}

        {activeView === 'players' && (
          <TopPlayersTable />
        )}

        {activeView === 'matches' && (
          <MatchResults />
        )}

        {activeView === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <WeaponStats />
            <MapPool />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
