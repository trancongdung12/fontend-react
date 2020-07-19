import React, { Component } from 'react';
import './Footer.css';
class footer extends Component {
    render() {
        return (
            <footer>
                    <div class="main-content">
                        <div class="left box">
                            <h2>
                                About us</h2>
                            <div class="content">
                                <p>
                                    Writing something</p>
                                <div class="social">
                                    <a><span class="fab fa-facebook-f"></span></a>
                                    <a><span class="fab fa-twitter"></span></a>
                                    <a><span class="fab fa-instagram"></span></a>
                                    <a><span class="fab fa-youtube"></span></a>
                                </div>
                            </div>
                        </div>
                        <div class="center box">
                            <h2>
                                Address</h2>
                            <div class="content">
                                <div class="place">
                                    <span class="fas fa-map-marker-alt"></span>
                                    <span class="text">Da Nang, Viet Nam</span>
                                </div>
                                <div class="phone">
                                    <span class="fas fa-phone"></span>
                                    <span class="text">+084-765432100</span>
                                </div>
                                <div class="email">
                                    <span class="fas fa-envelope"></span>
                                    <span class="text">trancongdung.dev@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        <div class="right box">
                            <h2>
                                Contact us</h2>
                            <div class="content">
                                <form action="#">
                                    <div class="email">
                                        <div class="text">
                                            Email *</div>
                                        <input type="email" required/>
                                    </div>
                                    <div class="msg">
                                        <div class="text">
                                            Message *</div>

                                        <textarea id=".msgForm" rows="2" cols="25" required></textarea>

                                        <br />
                                        <div class="btn">
                                            <button type="submit">Send</button>
                                        </div>
                                        <div class="bottom">
                                            <center>
                                                <span class="credit">Edited By <a href="#">Dungx</a> | </span>
                                                <span class="far fa-copyright"></span> 2020 All rights reserved.
                                            </center>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </footer>
        );
    }
}

export default footer;
