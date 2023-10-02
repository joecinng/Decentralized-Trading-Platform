import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

// This is for all the functions of the cart
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // Initialize cart with data from localStorage, if it exists.
    const initialCart = () => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch {
            return [];
        }
    };
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        // This saves the cart to localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // This function adds to the list
    const addToCart = (asset) => {
        if (!cart.some(item => item.id === asset.id)) {
            setCart(prevCart => [...prevCart, asset]);
        } else {
            console.log("Item already in cart.");
        }
    };

    // Removes from the cart
    const removeFromCart = (assetId) => {
        setCart(prevCart => prevCart.filter(asset => asset.id !== assetId));
    };

    // Used to count the total
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
