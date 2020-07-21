import React, { Component } from 'react'
import './Detail.css'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { withRouter } from 'react-router-dom';
class Detail extends Component {
    constructor(props){
        super();
        this.state = {
            product :[],
            
        }
       
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        fetch('http://127.0.0.1:8000/api/product/'+id)
        .then(res => res.json())
        .then( (result)=>{
            this.setState({product:result});
        })
    }
    render() {
        var item = this.state.product
        return (
            <div>
                <Header/>
            <div class="container" id="container-detail">
                <div class="content">
                <div class="content-img">
                    <img src={'http://127.0.0.1:8000'+item.image} alt=""/>
                </div>
                <div class="content-detail">
                    <h3 class="detail-title">{item.name}</h3>
                    <p class="detail-price">{item.price} đ</p>
                    <ul class="detail-text">
                        <li>Tận hưởng sự thoải mái và hiệu quả của miếng lót giày OrthoLite® </li>
                        <li>Cảm giác mềm mại </li>
                        <li>Màu sản phẩm: Cloud White / Cloud White / Crystal White</li>
                        <li>{item.description}</li>
                    </ul>
                    <div class="detail-size">
                        <b>Size</b>
                        <span>
                            <button class="btn-size">40</button>
                            <button class="btn-size">40</button>
                            <button class="btn-size">40</button>
                            <button class="btn-size">40</button>
                        </span>
                    </div>
                    <div class="detail-buy">
                        <div class="detail-quantity">
                            <button>-</button>
                            <input type="text" disabled value="1"/>
                            <button>+</button>
                        </div>
                        <button class="btn-buy">Mua hàng</button>
                    </div>
                </div>
            </div>
            
            </div>
            <Footer/>
        </div>
        )
    }
}export default withRouter(Detail);
