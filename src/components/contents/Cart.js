import React, { Component } from 'react'
import './Cart.css'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Cookies from 'js-cookie';
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
    onSaveBill(event){
        event.preventDefault();
        let name = event.target['name'].value;
        let phone = event.target['phone'].value;
        let email = event.target['email'].value;
        let address = event.target['address'].value;
        var cart = JSON.parse(localStorage.getItem("carts"));
        let userId = Cookies.get('id_user');
        let userCart = cart.filter( function (item) {
            return item.user_id == userId;
          });
        console.log(userCart);
        var bill = {
            name:name,
            phone:phone,
            email:email,
            address:address,
            cart:JSON.stringify(userCart),
            // user_id: userId
        }
        let billInJson = JSON.stringify(bill);
        fetch("http://127.0.0.1:8000/api/bill", {
            method: "post",
            headers: {
                "Content-Type":"application/json",
                "Authorization":  userId
            },
            body: billInJson
        })
        .then((response) => {
            console.log(response);
            // this.props.history.push('/trang-chu'); 
        });
  
    }
    render() {
        console.log(this.state.carts);
        return (
            <div>
            <Header/>
            <div class="container" id="container-cart">
            <div class="shopping-cart">
                <div class="cart-info">
                    {this.state.carts.map((item)=>(
                        (item.user_id === Cookies.get('id_user'))?
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
                    :""
                    ))}   
                </div>
    
                <div class="cart-total">
                    <b>Tổng tiền: 1,000,000 đ</b>
                </div>
                <hr/>
                <form class="personal-info" onSubmit={this.onSaveBill}>
                    <div class="form-control">
                        <p><span class="red-item">* </span>Tên người nhận</p>
                        <input name="name" type="text"/>
                    </div>
                    <div class="form-control">
                        <p><span class="red-item">* </span>Số điện thoại</p>
                        <input name="phone" type="text"/>
                    </div>
                    <div class="form-control">
                        <p><span class="red-item">* </span>Email</p>
                        <input name="email" type="text"/>
                    </div>
                    <div class="form-control">
                        <p><span class="red-item">* </span>Địa chỉ</p>
                        <input name="address" type="text"/>
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
