import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page-wrapper">
      <header className="hero container">
        <div className="hero-content fade-in">
          <h1>Get Your Favorite Food <br/><span>Delivered Fast</span></h1>
          <p>Fresh Pizza, Cold Drinks, and Delicious Breads at your doorstep.</p>
          <div className="hero-btns">
            <Link to="/menu" className="btn-primary">Order Now</Link>
            <Link to="/menu" className="btn-secondary">View Menu</Link>
          </div>
        </div>
        <div className="hero-image fade-in">
          <img src="/assets/pizza.png" alt="Delicious Pizza" />
        </div>
      </header>

      <section className="categories container">
        <h2 className="section-title">Explore Categories</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <Link to={`/menu?category=${cat.id}`} key={cat.id} className="category-card fade-in">
              <div className="cat-img">
                <img src={cat.image} alt={cat.name} />
              </div>
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured container">
        <div className="promo-banner glass fade-in">
          <h2>Special Weekend Offer!</h2>
          <p>Get 20% off on your first order. Use code: <strong>RETAIL20</strong></p>
          <Link to="/menu" className="btn-primary">Claim Offer</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
