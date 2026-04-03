import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantsData = [
  { name: 'Monstera', cost: '$15.00', image: '/images/monstera.jpg', category: 'Tropical' },
  { name: 'Snake Plant', cost: '$12.50', image: '/images/snakeplant.jpg', category: 'Succulent' },
  { name: 'Fiddle Leaf', cost: '$18.00', image: '/images/fiddleleaf.jpg', category: 'Tropical' },
  { name: 'Aloe Vera', cost: '$10.00', image: '/images/aloe.jpg', category: 'Succulent' },
  { name: 'Peace Lily', cost: '$14.00', image: '/images/peacelily.jpg', category: 'Flowering' },
  { name: 'Orchid', cost: '$20.00', image: '/images/orchid.jpg', category: 'Flowering' },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  // Check if item is already in cart
  const isInCart = (name) => cart.some(item => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 }));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="product-list-container">
      <h2>Paradise Nursery Plants</h2>
      <div className="cart-summary">
        <span>Items in Cart: {totalItems}</span>
      </div>
      <div className="product-grid">
        {plantsData.map((plant) => (
          <div key={plant.name} className="product-card">
            <img src={plant.image} alt={plant.name} className="product-image" />
            <h3>{plant.name}</h3>
            <p>{plant.cost}</p>
            <button
              disabled={isInCart(plant.name)}
              onClick={() => handleAddToCart(plant)}
              className={isInCart(plant.name) ? 'disabled-button' : 'add-cart-button'}
            >
              {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;