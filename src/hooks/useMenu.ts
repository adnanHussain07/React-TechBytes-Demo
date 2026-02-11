import { useState, useEffect } from 'react';

// Define the interface for the menu item
interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
}

/**
 * Custom hook to fetch menu items.
 * Isolates the Data Fetching Logic from the UI.
 * @returns {Object} An object containing menuItems and isLoading state.
 */
export const useMenu = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMenu = async () => {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setMenuItems([
                { id: 1, name: 'Burger', price: 10, category: 'Main' },
                { id: 2, name: 'Pizza', price: 12, category: 'Main' },
                { id: 3, name: 'Salad', price: 8, category: 'Starters' },
                { id: 4, name: 'Fries', price: 5, category: 'Sides' },
                { id: 5, name: 'Soda', price: 2, category: 'Drinks' }
            ]);
            setIsLoading(false);
        };

        fetchMenu();
    }, []);

    return { menuItems, isLoading };
};
