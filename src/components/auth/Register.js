import React, { Component } from 'react';
import './Login.css';
import {Link,withRouter} from "react-router-dom";
class Register extends Component {
    constructor(){
        super();
    }
    onCreateAccount(event){
        event.preventDefault();
        var name = event.target['name'].value;
        var email = event.target['email'].value;
        var password = event.target['password'].value;

        let account = {
            name:name,
            email:email,
            password:password
        }

        let accountInJson = JSON.stringify(account);
        fetch("http://127.0.0.1:8000/api/auth/register", {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: accountInJson
        })
        .then((response) => {
            console.log(response);
            // this.props.history.push('/trang-chu'); 
        });
    }
    render() {
        return (
        <div className="body">
            <div id="container">
                <div className="content-form"> 
                <form class="form" onSubmit={this.onCreateAccount}>
                    <div class="form-title">
                        <p class="title">ĐĂNG KÝ</p>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="far fa-user"></i></span><input name="name" type="text" placeholder="Tên của bạn" required/>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="far fa-envelope"></i></span><input name="email" type="email" placeholder="Email" required/>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="fa fa-lock"></i></span><input name="password" type="password" placeholder="Mật khẩu" required/>
                    </div>
                    <button type="submit" class="btn-login">ĐĂNG KÝ</button>
                </form>
                </div>
            </div>
         </div>
        );
    }
}

export default withRouter(Register);