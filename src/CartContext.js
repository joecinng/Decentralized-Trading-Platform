import React, { createContext, useContext, useState } from 'react';

// Create Context
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (asset) => {
        if (!cart.some(item => item.id === asset.id)) {
            setCart(prevCart => [...prevCart, asset]);
        } else {
            console.log("Item already in cart.");
        }
    };

    const removeFromCart = (assetId) => {
        setCart(prevCart => prevCart.filter(asset => asset.id !== assetId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
