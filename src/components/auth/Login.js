import React, { Component } from 'react';
import './Login.css';
import {Link} from "react-router-dom";
class Login extends Component {
    constructor(){
        super();
        this.state ={
            account : []
        }
        this.onLoginAccount = this.onLoginAccount.bind(this);
    }
    onLoginAccount(event){
        event.preventDefault();

        var email = event.target['email'].value;
        var password = event.target['password'].value;

        let account = {
            email:email,
            password:password
        }

        let accountInJson = JSON.stringify(account);
        fetch("http://127.0.0.1:8000/api/login", {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: accountInJson
        })
        .then((response) => {
            if(response.status === 400){
                alert('Email hoặc mật khẩu của bạn không đúng :(');
            }else if(response.status === 200){
                this.setState({
                    account: response
                })
                alert('Đăng nhập thành công');
            }
        });
    }
    render() {
        console.log(this.state.account);
        return (
        <div className="body">
            <div id="container">
                <div className="content-form"> 
                <form class="form" onSubmit={this.onLoginAccount}>
                    <div class="form-title">
                        <p class="title">ĐĂNG NHẬP</p>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="far fa-envelope"></i></span><input name="email" type="email" placeholder="Email"/>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="fa fa-lock"></i></span><input name="password" type="password" placeholder="Mật khẩu"/>
                    </div>
                    <button type="submit" class="btn-login">ĐĂNG NHẬP</button>
                    <p class="form-text">Bạn chưa có tài khoản?<Link to="/dang-ky">Đăng ký ngay</Link></p>
                </form>
                </div>
            </div>
         </div>
        );
    }
}

export default Login;