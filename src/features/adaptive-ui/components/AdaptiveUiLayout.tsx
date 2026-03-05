import { NavLink, Outlet } from 'react-router-dom';

const AdaptiveUiLayout = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Adaptive UI Agent</h1>
          <p className="text-muted-foreground">Monitor and configure the adaptive user experience.</p>
        </div>
        <nav className="flex items-center gap-2 bg-muted p-1 rounded-md">
          <NavLink
            to="/adaptive-ui"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${
                isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/adaptive-ui/insights"
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${
                isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            Insights
          </NavLink>
          <NavLink
            to="/adaptive-ui/evaluation"
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${
                isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            Evaluation
          </NavLink>
          <NavLink
            to="/adaptive-ui/demo"
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${
                isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            Demo
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default AdaptiveUiLayout;
