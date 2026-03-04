import { useActionState } from 'react';
import { useMenu } from '../../hooks/useMenu';
import { useOrder } from '../../context/OrderContext';
import { PlusCircle, Trash2, Loader2, Sparkles } from 'lucide-react';
import { withLogger } from '../../hocs/withLogger';

// Mock Server Action
async function addItemToMenu(_previousState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!name || name.length < 3) {
        return { error: 'Item name must be at least 3 chars', success: false };
    }

    if (!price || Number(price) <= 0) {
        return { error: 'Price must be greater than 0', success: false };
    }

    // In a real app, this would mutate the DB. 
    // Here we just return success to update the UI.
    return {
        success: true,
        message: `Successfully added "${name}" - $${price}`,
        timestamp: Date.now()
    };
}

const KitchenManagerModernBase = (props: any) => {
    const { menuItems, isLoading } = useMenu();
    const { orders, addOrder, removeOrder, totalRevenue } = useOrder();

    // Check if HOC props are present
    const isHocEnhanced = props._hocMeta?.enabled;

    // React 19 useActionState Hook
    const [formState, formAction, isPending] = useActionState(addItemToMenu, null);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-10 text-muted-foreground animate-pulse">
                Fetching fresh menu data...
            </div>
        );
    }

    return (
        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary flex-wrap">
                <span>✅ Modern Kitchen Manager</span>
                <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-normal">Hooks + Context</span>
                    <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-normal">useActionState (R19)</span>
                    {isHocEnhanced && (
                        <span className="text-xs bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded-full font-normal flex items-center gap-1">
                            <Sparkles size={10} /> HOC Enhanced
                        </span>
                    )}
                </div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Menu Section */}
                <div className="space-y-6">

                    {/* Add Item Form (useActionState Demo) */}
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            Kitchen Admin: Add Item
                            {isPending && <Loader2 className="animate-spin h-3 w-3 text-primary" />}
                        </h3>
                        <form action={formAction} className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Item Name"
                                    className="flex-1 px-3 py-1.5 rounded-md border border-input bg-background/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    disabled={isPending}
                                />
                                <input
                                    name="price"
                                    type="number"
                                    placeholder="$ Price"
                                    className="w-20 px-3 py-1.5 rounded-md border border-input bg-background/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    disabled={isPending}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary text-primary-foreground text-xs font-medium py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                            >
                                {isPending ? 'Adding to Menu...' : 'Add New Item'}
                            </button>
                            {formState?.error && (
                                <p className="text-xs text-destructive font-medium">{formState.error}</p>
                            )}
                            {formState?.success && (
                                <p className="text-xs text-green-600 font-medium">{formState.message}</p>
                            )}
                        </form>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center justify-between">
                            Menu Items
                            <span className="text-xs text-muted-foreground font-normal">{menuItems.length} items available</span>
                        </h3>
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between p-3 rounded-md bg-secondary/30 hover:bg-secondary/60 transition-colors group"
                                >
                                    <div>
                                        <span className="font-medium">{item.name}</span>
                                        <span className="ml-2 text-sm text-muted-foreground">${item.price}</span>
                                    </div>
                                    <button
                                        onClick={() => addOrder(item)}
                                        className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        aria-label={`Add ${item.name}`}
                                    >
                                        <PlusCircle size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="space-y-4 border-l border-border pl-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Current Orders</h3>
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                            {orders.length}
                        </span>
                    </div>

                    <div className="h-64 overflow-y-auto pr-2 space-y-2 border border-border rounded-md p-2 bg-background/50">
                        {orders.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm">
                                <p>No active orders</p>
                                <p className="text-xs">Select items from the menu</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.orderId} className="flex items-center justify-between p-2 rounded bg-card border border-border text-sm animate-in fade-in slide-in-from-left-2">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.name}</span>
                                        <span className="text-xs text-muted-foreground">ID: {order.orderId.toString().slice(-4)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono">${order.price}</span>
                                        <button
                                            onClick={() => removeOrder(order.orderId)}
                                            className="text-destructive hover:text-destructive/80 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="pt-4 border-t border-border flex justify-between items-center bg-secondary/20 p-4 rounded-lg">
                        <span className="text-muted-foreground font-medium">Total Revenue</span>
                        <span className="text-2xl font-bold text-primary">${totalRevenue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Wrap with HOC before exporting
const KitchenManagerModern = withLogger(KitchenManagerModernBase, 'KitchenManagerModern');

export default KitchenManagerModern;
