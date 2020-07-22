import React, { Component } from 'react';
import './Home.css';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Carousel from '../partials/Carousel';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
class Home extends Component {
    constructor(){
        super();
        this.state ={
            categories : []
        }
    }
    componentDidMount(){
        fetch("http://127.0.0.1:8000/api/category")
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({categories: result})
          })
        
    }
    onAddToCart(item){
        return (event)=>{
            var cart = JSON.parse(localStorage.getItem("carts"));
            if(!cart){
              cart = [];
            }
            let userId = Cookies.get('id_user');
            var oldItem = cart.find((el)=>(el.id === item.id && el.user_id === userId ));
            if(oldItem){
              oldItem.quantity  +=1;
            }else{
              item.user_id = userId;
              item.quantity = 1;
              cart.push(item);
            }
            alert("Đã thêm vào giỏ hàng thành công!");
            // this.setState({countCartItem:cart.length})
            localStorage.setItem("carts",JSON.stringify(cart));
          }
    }
    render() {
        return (
            <div>
                <Header/>
                <Carousel/>
                {this.state.categories.map((category)=>(
                <div class="container">
                    <div class="content">
                        <div class="content-title">
                        <div class="title">{category.name}</div>
                        </div>
                        <hr class="content-hr" />
                        <div class="content-item">
                            {category.products.map((item)=>(
                                <div class="card">
                                 <Link to={"trang-chu/chi-tiet/"+item.id}>
                                     <img class="card-img" src={'http://127.0.0.1:8000'+item.image} alt="Image"/> 
                                </Link>
                                <p class="card-title">{item.name}</p>
                                <p class="card-price">{item.price} đ</p>
                               
                                <button onClick={this.onAddToCart(item)} class="btn-add-cart"><i class="fas fa-shopping-basket"></i></button>
                            </div>
                            ))}
                        </div>
                    </div>  
                </div>
                ))}
                <Footer/>
             </div>

        );
    }
}

export default Home;
