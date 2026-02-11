import { useState } from 'react';
import KitchenManagerLegacy from '../components/legacy/KitchenManagerLegacy';
import KitchenManagerModern from '../components/modern/KitchenManagerModern';
import { OrderProvider } from '../context/OrderContext';
import { ToggleLeft, ToggleRight } from 'lucide-react';

const LegacyVsModern = () => {
    const [viewMode, setViewMode] = useState<'split' | 'legacy' | 'modern'>('split');

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Legacy vs. Modern</h1>
                    <p className="text-muted-foreground mt-2">
                        Comparing Class Components vs. Functional Components with Hooks & Context.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-secondary p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('legacy')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'legacy'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-background/50'
                            }`}
                    >
                        Legacy Only
                    </button>
                    <button
                        onClick={() => setViewMode('split')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'split'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-background/50'
                            }`}
                    >
                        Split View
                    </button>
                    <button
                        onClick={() => setViewMode('modern')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'modern'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-background/50'
                            }`}
                    >
                        Modern Only
                    </button>
                </div>
            </div>

            <div className={`grid gap-8 ${viewMode === 'split' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>

                {/* Legacy Section */}
                {(viewMode === 'legacy' || viewMode === 'split') && (
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-destructive border-b border-destructive/20 pb-2">
                            <ToggleLeft className="h-6 w-6" />
                            <h2 className="text-2xl font-bold">The Old Way</h2>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                            Heavy Class Component, Spaghetti State, Prop Drilling, Imperative Logic.
                        </p>
                        <div className="border-4 border-destructive/10 rounded-xl overflow-hidden shadow-sm">
                            <KitchenManagerLegacy />
                        </div>
                    </section>
                )}

                {/* Modern Section */}
                {(viewMode === 'modern' || viewMode === 'split') && (
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/20 pb-2">
                            <ToggleRight className="h-6 w-6" />
                            <h2 className="text-2xl font-bold">The Modern Way</h2>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                            Functional Component, Custom Hooks, Context API, Declarative UI.
                        </p>
                        <div className="border-4 border-primary/10 rounded-xl overflow-hidden shadow-sm h-full">
                            <OrderProvider>
                                <KitchenManagerModern />
                            </OrderProvider>
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default LegacyVsModern;
