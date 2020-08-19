import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Cookies from 'js-cookie';
import './Search.css';
class Search extends Component {
    constructor(){
        super();
        this.state = {
            products : [],
            txtsearch: Cookies.get('txt-search')
        }
        this.onSoftUp = this.onSoftUp.bind(this);
        this.onSoftDown = this.onSoftDown.bind(this);
    }
    componentDidMount(){
        var txtsearch = this.state.txtsearch;
        var search = {
            txtsearch:txtsearch
        }
        let searchInJson = JSON.stringify(search);
        fetch("http://127.0.0.1:8000/api/product/search",{
            method: "post",
            headers: {
            "Content-Type":"application/json",
            },
            body:searchInJson
        })
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({products: result})
          })
    }
    onSoftDown(){
        var txtsearch = this.state.txtsearch;
        var search = {
            txtsearch:txtsearch
        }
        let searchInJson = JSON.stringify(search);
        fetch("http://127.0.0.1:8000/api/product/softdesc",{
            method: "post",
            headers: {
            "Content-Type":"application/json",
            },
            body:searchInJson
        })
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({products: result})
          })
    }
    onSoftUp(){
        var txtsearch = this.state.txtsearch;
        var search = {
            txtsearch:txtsearch
        }
        let searchInJson = JSON.stringify(search);
        fetch("http://127.0.0.1:8000/api/product/softasc",{
            method: "post",
            headers: {
            "Content-Type":"application/json",
            },
            body:searchInJson
        })
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({products: result})
          })
    }
    render() {
        return (
            <div className="search">
                <Header/>
                <div class="container">
                    <div class="content">
                <p>Từ khóa tìm kiếm: <b style={{color:"red"}}>{this.state.txtsearch}</b></p>
                <p>
                    <span>Sắp xếp: 
                        <button onClick={this.onSoftUp} className="btn-soft"><span className="fa fa-sort-numeric-up"></span></button>
                        <button onClick={this.onSoftDown} className="btn-soft"><span className="fa fa-sort-numeric-down"></span></button>
                    </span>
                </p>
                {
                        (this.state.products.length == 0)?<p><h1>Không tìm thấy :(</h1></p>
                        :
                        <div>
                        <div class="content-item">
                            {this.state.products.map((item)=>( 
                                <div class="card">
                                 <Link to={"trang-chu/chi-tiet/"+item.id}>
                                     <img class="card-img" src={'http://127.0.0.1:8000'+item.image} alt="Image"/> 
                                </Link>
                                <div className="card-control">
                                    <p class="card-title">{item.name}</p>
                                    <p class="card-price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> đ</p>
                                   
                                </div>
                                <button  class="btn-add-cart"><i class="fas fa-shopping-basket"></i></button>
                                </div>
                                ))
                            }
                        </div>
                        <div class="content-item-respon">
                        {this.state.products.map((item)=>( 
                            <div class="card">
                             <Link to={"trang-chu/chi-tiet/"+item.id}>
                                 <img class="card-img" src={'http://127.0.0.1:8000'+item.image} alt="Image"/> 
                            </Link>
                            <div className="card-control">
                                <p class="card-title">{item.name}</p>
                                <p class="card-price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> đ</p>
                               
                            </div>
                            <button  class="btn-add-cart"><i class="fas fa-shopping-basket"></i></button>
                            </div>
                            ))
                        }
                         </div>
                         </div>
                         } 
                    </div>  
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Search;