import React from 'react';
import { TelemetryEvent } from '../types';

interface RecentEventsTableProps {
  events: TelemetryEvent[];
}

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/50">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent Events (Last 50)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">UI ID</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground italic">
                  No events captured yet. Interaction with [data-uiid] elements to see logs.
                </td>
              </tr>
            ) : (
              events.slice(-50).reverse().map((event) => (
                <tr key={event.eventId} className="hover:bg-accent/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">
                    {new Date(event.ts).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      event.type === 'click' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {event.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{event.uiId}</td>
                  <td className="px-4 py-3 text-muted-foreground">{event.routePath}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-[200px]">
                    {event.text || event.tag}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEventsTable;
