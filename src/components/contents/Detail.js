import React, { Component } from 'react'
import './Detail.css'
export default class Detail extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         id : this.props.match.params.id
    //     }
    // }
    // componentDidMount(){
    //     console.log(this.state.id);
    // }
    render() {
        return (
            <div class="container" id="container-detail">
        <div class="content">
            <div class="content-img">
                <img src="https://fsport247.com/cdn1/images/202002/thumb_img/nhung-doi-sneaker-nu-nen-co-thumb-G1413-1580557901623.jpg" alt=""/>
            </div>
            <div class="content-detail">
                <h3 class="detail-title">GIÀY CONVERT</h3>
                <p class="detail-price">1,000,000 đ</p>
                <ul class="detail-text">
                    <li>Tận hưởng sự thoải mái và hiệu quả của miếng lót giày OrthoLite® </li>
                    <li>Cảm giác mềm mại </li>
                    <li>Màu sản phẩm: Cloud White / Cloud White / Crystal White</li>
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
        )
    }
}
