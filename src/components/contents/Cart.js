import React, { Component } from 'react'
import './Cart.css'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom'; 
class Cart extends Component {
    constructor(){
        super();
        var cart = JSON.parse(localStorage.getItem("carts"));
            if(!cart){
              cart = [];
        }
        this.state = {
            carts : cart
        }
        this.onSaveBill = this.onSaveBill.bind(this);
        this.onRemoveCart = this.onRemoveCart.bind(this);
        this.minusQuantityCart = this.minusQuantityCart.bind(this);
        this.plusQuantityCart = this.plusQuantityCart.bind(this);
    }
    onSaveBill(event){
        event.preventDefault();
        let name = event.target['name'].value;
        let phone = event.target['phone'].value;
        let email = event.target['email'].value;
        let address = event.target['address'].value;
        var cart = this.state.carts;
        let userId = Cookies.get('id_user');
        let userCart = cart.filter( function (item) {
            return item.user_id === userId;
          });
        let difCart = cart.filter( function (item) {
            return item.user_id !== userId;
        }); 
        localStorage.setItem("carts",JSON.stringify(difCart));
        var bill = {
            name:name,
            phone:phone,
            email:email,
            address:address,
            cart:JSON.stringify(userCart),
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
            alert("Mua hàng thành công !");
            this.setState({
                carts : difCart
            })
            this.props.history.push('/trang-chu'); 
        });
  
    }
    onRemoveCart(key){
        return (event)=>{
            var newArr = this.state.carts;
            newArr.splice(key, 1);
            localStorage.setItem("carts",JSON.stringify(newArr));
            this.setState({carts: newArr });  
        }
       }
    minusQuantityCart(item,key){
        return (event)=>{
            let userId = Cookies.get('id_user');
            var cart = this.state.carts;
            let userCart = cart.filter( function (item) {
                return item.user_id === userId;
            });
            var oldItem = userCart.find((el)=>(el.id === item.id));
            oldItem.quantity  = oldItem.quantity-1 ;
            if(oldItem.quantity == 0){
                alert("Số lượng không được nhỏ hơn 1");
                oldItem.quantity = 1;
                
            }
            localStorage.setItem("carts",JSON.stringify(cart));          
            this.setState({carts: cart});
        }
    }
    plusQuantityCart(item){
        return (event)=>{
            let userId = Cookies.get('id_user');
            var cart = this.state.carts;
            let userCart = cart.filter( function (item) {
                return item.user_id === userId;
            });
            var oldItem = userCart.find((el)=>(el.id === item.id));
            oldItem.quantity  = oldItem.quantity+1 ;
            this.setState({carts: cart});
            localStorage.setItem("carts",JSON.stringify(cart));
        }
    }
    render() {
        return (
            <div>
            <Header/>
            <div class="container" id="container-cart">
            <div class="shopping-cart">
                <div class="cart-info">
                    {this.state.carts.map((item,key)=>(
                        (item.user_id === Cookies.get('id_user'))?
                        <div class="cart-item">
                        <div class="cart-content">
                            <span onClick={this.onRemoveCart(key)} class="fa fa-trash"></span>
                            <img src={"http://127.0.0.1:8000"+item.image} alt="" />
                            <p class="cart-title">{item.name}</p>
                        </div>
                        <p class="cart-price">{item.price} đ</p>
                        <div class="cart-quantity">
                            <button onClick={this.minusQuantityCart(item)}>-</button>
                            <input type="text" disabled value={item.quantity}/>
                            <button onClick={this.plusQuantityCart(item)}>+</button>
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
}export default withRouter(Cart);
