import React, { Component } from 'react'
import './Cart.css'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
export default class Cart extends Component {
    render() {
        return (
            <div>
            <Header/>
            <div class="container" id="container-cart">
            <div class="shopping-cart">
                <div class="cart-info">
                    <div class="cart-item">
                        <div class="cart-content">
                            <span class="fa fa-trash"></span>
                            <img src="https://fsport247.com/cdn1/images/202002/thumb_img/nhung-doi-sneaker-nu-nen-co-thumb-G1413-1580557901623.jpg" alt="" />
                            <p class="cart-title">Giày van</p>
                        </div>
                        <p class="cart-price">1,000,000 đ</p>
                        <div class="cart-quantity">
                            <button>-</button>
                            <input type="text" disabled value="1"/>
                            <button>+</button>
                        </div>
                        <p class="cart-price">1,000,000 đ</p>
                    </div>
                    <div class="cart-item">
                        <div class="cart-content">
                            <span class="fa fa-trash"></span>
                            <img src="https://fsport247.com/cdn1/images/202002/thumb_img/nhung-doi-sneaker-nu-nen-co-thumb-G1413-1580557901623.jpg" alt="" />
                            <p class="cart-title">Giày van</p>
                        </div>
                        <p class="cart-price">1,000,000 đ</p>
                        <div class="cart-quantity">
                            <button>-</button>
                            <input type="text" disabled value="1"/>
                            <button>+</button>
                        </div>
                        <p class="cart-price">1,000,000 đ</p>
                    </div>
                </div>
    
                <div class="cart-total">
                    <b>Tổng tiền: 1,000,000 đ</b>
                </div>
                <hr/>
                <form class="personal-info">
                    <div class="form-control">
                        <p><span class="red-item">* </span>Tên người nhận</p>
                        <input type="text"/>
                    </div>
                    <div class="form-control">
                        <p><span class="red-item">* </span>Số điện thoại</p>
                        <input type="text"/>
                    </div>
                    <div class="form-control">
                        <p><span class="red-item">* </span>Email</p>
                        <input type="text"/>
                    </div>
                    <div class="form-control">
                        <p><span class="red-item">* </span>Địa chỉ</p>
                        <input type="text"/>
                    </div>
                    <button class="btn-buy">Mua Hàng</button>
                </form>
            </div>
        </div>
        <Footer/>
        </div>
        )
    }
}
