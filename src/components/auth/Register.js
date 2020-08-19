import React, { Component } from 'react';
import './Login.css';
import {Link,withRouter} from "react-router-dom";
class Register extends Component {
    constructor(){
        super();
        this.state ={
            fields: {},
            errors: {}
        }
        this.onCreateAccount = this.onCreateAccount.bind(this);
    }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Name cannot be empty";
         }

        //Password
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
    onCreateAccount(event){
        event.preventDefault();
        if(this.handleValidation()){
        let errors = {};
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
            if(response.status === 400){
                errors["email"] = "Email đã tồn tại";
                this.setState({errors: errors});
            }else{
                this.props.history.push('/dang-nhap'); 
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
                <form class="form" onSubmit={this.onCreateAccount}>
                    <div class="form-title">
                        <p class="title">ĐĂNG KÝ</p>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="far fa-user"></i></span><input  className={(this.state.errors["name"])? "input-form error-valid" : "input-form"}  onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} name="name" type="text" placeholder="Tên của bạn" />
                        <small className="valid-input">  
                            {this.state.errors["name"]}
                        </small>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="far fa-envelope"></i></span><input className={(this.state.errors["email"])? "input-form error-valid" : "input-form"}  onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} name="email" type="text" placeholder="Email" />
                        <small className="valid-input">  
                            {this.state.errors["email"]}
                        </small>
                    </div>
                    <div class="form-control">
                        <span class="form-icon"><i class="fa fa-lock"></i></span><input className={(this.state.errors["password"])? "input-form error-valid" : "input-form"}  onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} name="password" type="password" placeholder="Mật khẩu" />
                        <small className="valid-input">  
                            {this.state.errors["password"]}
                        </small>
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