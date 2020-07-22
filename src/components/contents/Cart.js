import React, { Component } from 'react'
import './Cart.css'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
export default class Cart extends Component {
    constructor(){
        super();
        var cart = JSON.parse(localStorage.getItem("carts"));
            if(!cart){
              cart = [];
        }
        this.state = {
            carts : cart
        }
    }
    render() {
        return (
            <div>
            <Header/>
            <div class="container" id="container-cart">
            <div class="shopping-cart">
                <div class="cart-info">
                    {this.state.carts.map((item)=>(
                        <div class="cart-item">
                        <div class="cart-content">
                            <span class="fa fa-trash"></span>
                            <img src={"http://127.0.0.1:8000"+item.image} alt="" />
                            <p class="cart-title">{item.name}</p>
                        </div>
                        <p class="cart-price">{item.price} đ</p>
                        <div class="cart-quantity">
                            <button>-</button>
                            <input type="text" disabled value={item.quantity}/>
                            <button>+</button>
                        </div>
                        <p class="cart-price">{item.price*item.quantity} đ</p>
                    </div>
                    ))}   
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
