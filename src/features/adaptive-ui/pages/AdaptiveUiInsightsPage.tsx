import { useMemo } from 'react';
import { listEvents, getUserId } from '../storage/eventStore';
import RecentEventsTable from '../components/RecentEventsTable';

const AdaptiveUiInsightsPage = () => {
  const userId = getUserId();
  const events = useMemo(() => listEvents(userId), [userId]);

  const stats = useMemo(() => {
    const counts = {
      total: events.length,
      clicks: 0,
      hovers: 0,
      uniqueTargets: new Set<string>(),
      routeDistribution: {} as Record<string, number>,
    };

    events.forEach(e => {
      if (e.type === 'click') counts.clicks++;
      if (e.type === 'hover') counts.hovers++;
      counts.uniqueTargets.add(e.uiId);
      counts.routeDistribution[e.routePath] = (counts.routeDistribution[e.routePath] || 0) + 1;
    });

    return counts;
  }, [events]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Events" value={stats.total} icon="📊" />
        <StatCard title="Clicks" value={stats.clicks} icon="🖱️" />
        <StatCard title="Hovers" value={stats.hovers} icon="👀" />
        <StatCard title="Unique UI Targets" value={stats.uniqueTargets.size} icon="🎯" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentEventsTable events={events} />
        </div>
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Traffic by Route</h3>
            <div className="space-y-3">
              {Object.entries(stats.routeDistribution)
                .sort((a, b) => b[1] - a[1])
                .map(([route, count]) => (
                  <div key={route} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate max-w-[140px]">{route}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(count / stats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: string }) => (
  <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center justify-between">
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <span className="text-2xl">{icon}</span>
  </div>
);

export default AdaptiveUiInsightsPage;
