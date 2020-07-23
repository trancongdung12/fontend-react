import React, { Component } from 'react';
import Cookies from 'js-cookie';
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
    render() { 
         var {user,bill} = this.state;
        return (
            <div className="container">
                <h2>Trang cá nhân</h2>
                 <p>{user.name}</p>
                 <p>{user.email}</p>
                 <div className="bill">
                    { 
                    bill.map((item)=>(
        
                        JSON.parse(item.cart).map((product)=>(
                            <img src={"http://127.0.0.1:8000"+product.image} />
                        ))
                    ))
                    }
                 </div>
                 <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        );
    }
}

export default Profile;