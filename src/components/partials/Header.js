import React, { Component } from 'react';
import './Header.css';
import Cookies from 'js-cookie';
import {Link,withRouter} from "react-router-dom";
class Header extends Component {
    constructor(){
        super();
        let checkLogin = Cookies.get('id_user');
        if(!checkLogin){
            this.state = {
                isLogin : false
            }
        }else{
            this.state = {
                isLogin : true
            }
        }
        this.onLogout = this.onLogout.bind(this);
    }
    onLogout(){
         Cookies.remove('id_user');
         alert("Đăng xuất thành công!");
         this.setState({isLogin:false})
    }
    render() {
        return (
            <nav>
                <div class="menu-icon">
                    <span class="fas fa-bars"></span></div>
                <div class="logo">Dungx</div>
                <div class="nav-items">
                    <li><a href="/trang-chu">Home</a></li>
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
               
                {(this.state.isLogin)
                ?
                    <div style={{display:"flex"}}>
                    <div class="shopping-cart">
                        <Link className="link-shopping-cart" to="/gio-hang"><span class="cart-title">Giỏ hàng </span><i class="fas fa-shopping-basket"> <span class="cart-count">1</span></i></Link>
                    </div>
                    <div className="user-name" style={{color:"white"}}>Trần Công Dũng <button  onClick={this.onLogout}><span className="fa fa-sign-out-alt"></span></button></div>
                    </div>
                 : 
                <div class="shopping-cart">    
                    <span ><Link className="login-text" to="/dang-nhap">Đăng nhập/ Đăng ký</Link></span>
                </div>
                }    
                
             </nav>
        );
    }
}

export default withRouter(Header);
