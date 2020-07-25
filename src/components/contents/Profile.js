import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import './Profile.css'
class Profile extends Component {
    constructor(){
        super();
        this.state = {
            user : [],
            bill:[]
        }
    }
    componentDidMount(){
        let userId = Cookies.get("id_user");
        
        fetch("http://127.0.0.1:8000/api/user/profile", {
            method: "get",
            headers: {"Authorization": userId}
        }).then(res => res.json())
        .then(
          (result) => {
            this.setState({user:result.data})
          })


        fetch("http://127.0.0.1:8000/api/bill", {
            method: "get",
             headers: {"Authorization": userId}
        }).then(res => res.json())
        .then((result) => {
            this.setState({bill:result.data})
          })
    }
    onRemoveBill(item){
        return (event)=>{
            let userId = Cookies.get("id_user");
            fetch("http://127.0.0.1:8000/api/bill/"+item.id,{
                method :"DELETE",
                headers: {"Authorization": userId}
            })
            .then(res => res.json())
            .then((result) => {
                this.setState({bill:result.data})
              })
        }
    }
    render() { 
         var {user,bill} = this.state;
         var i = 1;
        return (
            <div>
            <Header/>
            <div className="container">
                <div className="personal-info">
                    <h2>Trang cá nhân</h2>
                    <p>Welcome {user.name}</p>
                    <p>Email: {user.email}</p>
                    <hr/>
                </div>
                 <div className="bill">
                 <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Thông tin đặt hàng</th>
                        <th scope="col">Sản phẩm</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                    bill.map((item)=>(
                   <tr>
                        <th scope="row">{i++}</th>
                        <td>
                        <h5>Tên: {item.name}</h5>
                        <h5>Địa chỉ: {item.address}</h5>
                        <h5>Số điện thoại: {item.phone}</h5>
                        <h5>Tổng tiền: <span style={{color:"red"}}>{item.phone} đ</span></h5>
                        </td>
                        <td>
                            <table style={{width:"100%"}}> 
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên</th>
                                <th>Giá</th>
                            </tr>
                            {
                            JSON.parse(item.cart).map((product)=>(
                                <tr>
                                <td><img src={"http://127.0.0.1:8000"+product.image} height="30px" width="30px" /></td>
                                <td>{product.name}</td>
                                <td>{product.price} đ</td>
                                </tr>
                            
                            ))}
                            </table>
                        </td>
                        <td className="btn-trash"><span onClick={this.onRemoveBill(item)} className="fa fa-trash"></span></td>
                    </tr>  
                    ))
                    }
                    </tbody>
                    </table>
                 </div>
                
            </div>
            <Footer/>
            </div>
        );
    }
}

export default Profile;