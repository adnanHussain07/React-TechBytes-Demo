import { Component } from 'react';

class KitchenManagerLegacy extends Component {
    constructor(props: any) {
        super(props);
        // Massive state object as requested
        this.state = {
            menuItems: [],
            orders: [],
            isLoading: true,
            theme: 'light',
            error: null,
            tempOrder: [],
            searchQuery: '',
            activeTab: 'menu',
            notifications: []
        };
    }

    componentDidMount() {
        // Simulate fetching data with spaghetti logic
        setTimeout(() => {
            this.setState({
                menuItems: [
                    { id: 1, name: 'Burger', price: 10, category: 'Main' },
                    { id: 2, name: 'Pizza', price: 12, category: 'Main' },
                    { id: 3, name: 'Salad', price: 8, category: 'Starters' },
                    { id: 4, name: 'Fries', price: 5, category: 'Sides' }
                ],
                isLoading: false
            });
        }, 1500);
    }

    handleAddToOrder = (item: any) => {
        // Direct state mutation simulation (bad practice but common in legacy)
        const newOrder = [...(this.state as any).orders, { ...item, orderId: Date.now() }];
        this.setState({ orders: newOrder });
        alert(`Added ${item.name} to order!`); // Annoying alert
    };

    renderWithErrorHandling() {
        if ((this.state as any).error) return <div>Error!</div>;
        return null;
    }

    render() {
        const { menuItems, orders, isLoading, theme } = this.state as any;

        if (isLoading) {
            return <div style={{ padding: 20 }}>Loading kitchen data... please wait...</div>;
        }

        return (
            <div style={{ padding: 20, border: '1px solid #999', backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
                {this.renderWithErrorHandling()}
                <h2 style={{ textDecoration: 'underline' }}>Legacy Kitchen Manager (Class Component)</h2>

                <div style={{ display: 'flex', gap: 20 }}>
                    {/* Menu Section */}
                    <div style={{ width: '50%', borderRight: '1px solid #ccc', paddingRight: 10 }}>
                        <h3>Menu Items</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {menuItems.map((item: any) => (
                                <li key={item.id} style={{ borderBottom: '1px solid #eee', padding: 10, display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{item.name} - ${item.price} ({item.category})</span>
                                    <button onClick={() => this.handleAddToOrder(item)} style={{ cursor: 'pointer', background: '#eee', border: '1px solid #000' }}>Add</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Orders Section */}
                    <div style={{ width: '50%', paddingLeft: 10 }}>
                        <h3>Current Orders ({orders.length})</h3>
                        <table border={1} cellPadding={5} style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Item</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{order.orderId}</td>
                                        <td>{order.name}</td>
                                        <td>${order.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <div>
                            <strong>Total Revenue: </strong>
                            ${orders.reduce((acc: number, curr: any) => acc + curr.price, 0)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default KitchenManagerLegacy;
