/* Team 47: BlockMania 
    Stefan Ralph Kumarasinghe (103804645)
    Joe Cin NG (102765534)
    Miran Abeyewardene (103824193) */

import React, { createContext, useContext, useState, useMemo } from 'react';

// This is for all the functions of the cart
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
// This function adds to the list
    const addToCart = (asset) => {
        if (!cart.some(item => item.id === asset.id)) {
            setCart(prevCart => [...prevCart, asset]);
        } else {
            console.log("Item already in cart.");
        }
    };
//Removes from the cart
    const removeFromCart = (assetId) => {
        setCart(prevCart => prevCart.filter(asset => asset.id !== assetId));
    };
//Used to count the total, useMemo() is a computed function which automatically computes the total and updates it without the use of a separate function
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
