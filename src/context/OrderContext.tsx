import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the order item and context
interface OrderItem {
    id: number;
    name: string;
    price: number;
    orderId: number;
}

interface OrderContextType {
    orders: OrderItem[];
    addOrder: (item: any) => void;
    removeOrder: (orderId: number) => void;
    totalRevenue: number;
}

// Create the Context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Create the Provider
export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<OrderItem[]>([]);

    const addOrder = (item: any) => {
        const newOrder = { ...item, orderId: Date.now() };
        setOrders((prev) => [...prev, newOrder]);
    };

    const removeOrder = (orderId: number) => {
        setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    };

    const totalRevenue = orders.reduce((acc, curr) => acc + curr.price, 0);

    return (
        <OrderContext.Provider value={{ orders, addOrder, removeOrder, totalRevenue }}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook to consume the context
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};
