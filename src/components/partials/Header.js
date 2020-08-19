import React, { Component } from 'react';
import './Header.css';
import Cookies from 'js-cookie';
import {Link,withRouter} from "react-router-dom";
class Header extends Component {
    constructor(){
        super();
        let checkLogin = Cookies.get('id_user');
        let cart = JSON.parse(localStorage.getItem("carts"));
        if(!cart){
            cart = [];
        }
        let userCart = cart.filter( function (item) {
            return item.user_id === checkLogin;
          });
        Cookies.set('count_cart',userCart.length);
        if(!checkLogin){
            this.state = {
                isLogin : false,
                user: [],
                isSearch:false,
                showMenu:false
               
            }
        }else{
            this.state = {
                isLogin : true,
                user: [],
                isSearch:false,
                showMenu:false
            }
        }
        this.onSearch = this.onSearch.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onCloseSearchBox = this.onCloseSearchBox.bind(this);
        this.onOpenSearchBox = this.onOpenSearchBox.bind(this);
        this.onShowMenu = this.onShowMenu.bind(this);
    }
    onLogout(){
         Cookies.remove('id_user');
         alert("Đăng xuất thành công!");
         this.setState({isLogin:false});
        //  this.props.histoty.push("dang-nhap");
    }
    componentDidMount(){
        if(this.state.isLogin){

            fetch("http://127.0.0.1:8000/api/user/profile",{
                headers:{
                    "Authorization":  Cookies.get('id_user')
                }
            })
            .then(res => res.json())
            .then(
              (result) => {
                  this.setState({user: result.data})
              })
        }
    }
    onSearch(event){
        event.preventDefault();
        var txt = event.target['txtsearch'].value;
        Cookies.set('txt-search', txt);      
        this.props.history.push('/tim-kiem');
        window.location.reload();
    }
    onOpenSearchBox(){
        this.setState({isSearch:true})
    }
    onCloseSearchBox(){
        this.setState({isSearch:false})
    }
    onShowMenu(){
        this.setState({showMenu:!this.state.showMenu})
    }
    render() {
        var {user} = this.state;
        return (
            <nav>
                <div class="menu-icon">
                    <span onClick={this.onShowMenu} class="fas fa-bars"></span></div>
                <div class="logo"><Link style={{textDecoration:"none",color:"white"}} to="/">Dungx</Link></div>
                <div className={(this.state.showMenu)?"nav-items active":"nav-items"}>
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="#">Về chúng tôi</a></li>
                    <li><a href="#">Blogs</a></li>
                    <li><a href="#">Liên hệ</a></li>
                    <li><a href="#">Phản hồi</a></li>
                </div>
                <div class="search-icon">
                    <span onClick={this.onOpenSearchBox} class="fas fa-search"></span></div>
                <div  className={(this.state.isSearch)?"cancel-icon show":"cancel-icon"}>
                    <span  onClick={this.onCloseSearchBox} class="fas fa-times"></span></div>
                <form onSubmit={this.onSearch} className={(this.state.isSearch)?"active":""}>
                    <input type="search" class="search-data" name="txtsearch" placeholder="Search" required/>
                    <button type="submit" class="fas fa-search"></button>
                </form>
               
                {(this.state.isLogin)
                ?
                    <div className="item-header-info" style={{display:"flex"}}>
                    <div class="shopping-cart">
                        <Link className="link-shopping-cart" to="/gio-hang"><span class="cart-title">Giỏ hàng </span><i class="fas fa-shopping-basket"> <span class="cart-count">{Cookies.get('count_cart')}</span></i></Link>
                    </div>
                    <div className="user-name">
                        <Link className="name" to="/trang-ca-nhan">  
                            <img className="img-circle" src={'http://127.0.0.1:8000'+user.image} height="30px" width="30px"/>
                            <span>{user.name} &nbsp;</span>
                        </Link> 
                        <button style={{background:"none",border:"none"}}  onClick={this.onLogout}><span style={{color:"white"}} className="fa fa-sign-out-alt"></span></button></div>
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
