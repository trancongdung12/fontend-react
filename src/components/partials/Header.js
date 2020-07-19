import React, { Component } from 'react';
import './Header.css'
class Header extends Component {
    render() {
        return (
            <nav>
                <div class="menu-icon">
                    <span class="fas fa-bars"></span></div>
                <div class="logo">Dungx</div>
                <div class="nav-items">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Blogs</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Feedback</a></li>
                </div>
                <div class="search-icon">
                    <span class="fas fa-search"></span></div>
                <div class="cancel-icon">
                    <span class="fas fa-times"></span></div>
                <form action="#">
                    <input type="search" class="search-data" placeholder="Search" required/>
                    <button type="submit" class="fas fa-search"></button>
                </form>
                <div class="shopping-cart">
                    <span class="cart-title">Giỏ hàng </span><i class="fas fa-shopping-basket"></i>
                </div>
                <div class="cart-count">1</div>
             </nav>
        );
    }
}

export default Header;
