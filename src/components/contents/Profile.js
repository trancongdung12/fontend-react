import React, { Component } from 'react';
import upload from './upload.png';
import Cookies from 'js-cookie';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import ReactModal from 'react-modal';
import './Profile.css'
class Profile extends Component {
    constructor(){
        super();
        this.state = {
            user : [],
            bill:[],
            editUser:[],
            showModal:false,
            changeAvt:false,
            valueAvt:''
        }
        this.OpenModal = this.OpenModal.bind(this);
        this.CloseModal = this.CloseModal.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }
    componentDidMount(){
        let userId = Cookies.get("id_user");
        
        fetch("http://127.0.0.1:8000/api/user/profile", {
            method: "get",
            headers: {"Authorization": userId}
        }).then(res => res.json())
        .then(
          (result) => {
            this.setState({user:result.data, editUser:result.data})
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
    OpenModal () {
        this.setState({ showModal: true });
      }
      
    CloseModal () {
        this.setState({ showModal: false });
        window.location.reload();
    }
    handleChangeValue(event){
          this.setState({editUser : event.target.value})
    }
    changeAvatar(event){
        var file = URL.createObjectURL(event.target.files[0]);
        this.setState({changeAvt:true,valueAvt:file});
    }
    updateProfile(event){
        event.preventDefault();
        var name = event.target['name'].value;
        var email = event.target['email'].value;
        var image = event.target['image'].files[0];
        if(!image){
            image = null
        }
        let data = new FormData();
        data.append('image', image);
        data.append('name', name);
        data.append('email', email);

        let userId = Cookies.get("id_user");
        fetch("http://127.0.0.1:8000/api/user/update", {
            method: "post",
            headers: {"Authorization": userId},
            body : data
        }).then(res => res.json())
        .then(
          (result) => {
              alert("Thay đổi thông tin thành công!");
              window.location.reload();
          });



    }
    render() { 
         var {user,bill,editUser,changeAvt,valueAvt} = this.state;
         var i = 1;
        return (
            <div>
            <Header/>
            <div className="container">
                <div className="personal-info">
                    <h2>Trang cá nhân</h2>
                    <img className="user-avatar" src={'http://127.0.0.1:8000'+user.image} height="150px" width="150px" />
                    <p>Welcome {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p><button onClick={this.OpenModal} className="btn-profile">Chỉnh sửa thông tin cá nhân</button></p>
                    <hr/>
                </div>
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="Modal Profile"
                    portalClassName="modal-edit-profie"
                 >
                <div className="modal-profile">
                        <form onSubmit={this.updateProfile}>
                            <p>Họ và tên</p>
                            <input type="text" onChange={this.handleChangeValue} name="name" value={editUser.name} />
                            <p>Email</p>
                            <input type="text" onChange={this.handleChangeValue} name="email" value={editUser.email} />
                            <p>Avatar</p>
                            {
                                (!changeAvt)?
                                <img  src={'http://127.0.0.1:8000'+user.image} height="100px" width="100px" />
                                :
                                <img  src={valueAvt} height="100px" width="100px" />
                            }
                            
                            <div class="image-upload">
                            <label for="file-input">
                                <img src={upload}/>
                            </label>
                                <input onChange={this.changeAvatar} name="image" id="file-input" type="file" />
                            </div>
                            <button className="btn-profile" type="submit">Cập nhật</button>
                        </form>
                        <button className="btn-close" onClick={this.CloseModal}>Huỷ</button>
                    </div>
                    
                </ReactModal>
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