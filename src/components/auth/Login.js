import React, { Component } from 'react';
import './Login.css';
import {Link, withRouter} from "react-router-dom";
import Cookies from 'js-cookie';
class Login extends Component {
    constructor(){
        super();
        this.state ={
            account : [],
            fields: {},
            errors: {}
        }
        this.onLoginAccount = this.onLoginAccount.bind(this);
    }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "Password cannot be empty";
        }

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Email cannot be empty";
        }
        else{
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  

       this.setState({errors: errors});
       return formIsValid;
   }
    onLoginAccount(event){
        event.preventDefault();
        
        if(this.handleValidation()){
        
        var email = event.target['email'].value;
        var password = event.target['password'].value;

        let account = {
            email:email,
            password:password
        }
        let isAccount = false;
        let accountInJson = JSON.stringify(account);
        fetch("http://127.0.0.1:8000/api/auth/login", {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: accountInJson
        })
        .then((response) => {
            if(response.status === 200){
                isAccount = true;
            }
            return response.json();
        }).then(response => {
            if(isAccount){
            alert('Đăng nhập thành công');
            Cookies.set('id_user', response.data);
            this.props.history.push('/trang-chu');
            }else{
                alert('Email hoặc mật khẩu của bạn không đúng :(');
            }
               
        });
        }
    }
    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    render() {
        return (
        <div className="body">
            <div id="container">
                <div className="content-form"> 
                <form class="form" onSubmit={this.onLoginAccount}>
                    <div class="form-title">
                        <p class="title">ĐĂNG NHẬP</p>
                    </div>
              
                    <div class="form-control">
                        <span class="form-icon"><i class="far fa-envelope"></i></span><input name="email" type="text" placeholder="Email" className={(this.state.errors["email"])? "input-form error-valid" : "input-form"}  onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                        <small className="valid-input">  
                            {this.state.errors["email"]}
                        </small>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="fa fa-lock"></i></span><input className={(this.state.errors["password"])? "input-form error-valid" : "input-form"} name="password" type="password" placeholder="Mật khẩu" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                        <small className="valid-input">  
                            {this.state.errors["password"]}
                        </small>
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

export default withRouter(Login);