import React, { createContext, useContext, useState, useMemo } from 'react';

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

    const totalPrice = useMemo(() => {
        return cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.current_price;
        }, 0);
    }, [cart]); // Recompute the value whenever 'cart' changes

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
