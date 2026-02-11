import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/': return 'Home';
            case '/mental-model': return 'Mental Model';
            case '/composition': return 'Composition';
            case '/state-hooks': return 'State & Hooks';
            case '/async-ux': return 'Async UX';
            case '/workflow': return 'Workflow';
            case '/performance': return 'Performance';
            default: return 'Dashboard';
        }
    };

    return (
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur top-0 sticky z-10 flex items-center justify-between px-6">
            <h2 className="text-lg font-semibold text-foreground">{getPageTitle()}</h2>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="h-9 w-64 rounded-md border border-input bg-transparent px-9 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <button className="h-9 w-9 flex items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground">
                    <Bell size={18} />
                </button>
            </div>
        </header>
    );
};

export default Header;
