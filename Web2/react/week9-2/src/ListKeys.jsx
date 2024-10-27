import React from 'react';

function ItemList ({ items }) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}><i>Ship</i> {item.name}</li>
            ))}
        </ul>
    );
};

const AppList = () => {
    const items = [
        { id: 1, name: 'Item 1a' },
        { id: 2, name: 'Item 2b' },
        { id: 3, name: 'Item 3c' },
    ];

    return <ItemList items={items} />;
};

export default AppList;