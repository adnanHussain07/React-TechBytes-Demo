import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    Brain,
    Layers,
    Database,
    Zap,
    GitBranch,
    Activity,
    Code2
} from 'lucide-react';
import logo from '../../assets/TDSecondBlue.png';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/mental-model', label: 'Mental Model', icon: Brain },
        { path: '/composition', label: 'Composition', icon: Layers },
        { path: '/state-hooks', label: 'State & Hooks', icon: Database },
        { path: '/async-ux', label: 'Async UX', icon: Zap },
        { path: '/workflow', label: 'Workflow', icon: GitBranch },
        { path: '/performance', label: 'Performance', icon: Activity },
        { path: '/legacy-vs-modern', label: 'Legacy vs Modern', icon: Code2 },
    ];

    return (
        <aside className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-border flex justify-center">
                <Link to="/">
                    <img
                        src={logo}
                        alt="TechBytes"
                        className="h-10 w-auto object-contain"
                    />
                </Link>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                ? 'bg-primary text-primary-foreground font-medium'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-border mt-auto">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                        TB
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">TechBytes</p>
                        <p className="text-xs text-muted-foreground truncate">Adnan Hussain</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
