import React, { Component } from 'react';
import './Home.css'
import {Link} from "react-router-dom";
class Home extends Component {
    constructor(){
        super();
        this.state ={
            categories : []
        }
    }
    componentDidMount(){
        fetch("http://127.0.0.1:8000/api/category")
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({categories: result})
          })
        
    }
    render() {
        return (
            <div>
                {this.state.categories.map((category)=>(
                <div class="container">
                    <div class="content">
                        <div class="content-title">
                        <div class="title">{category.name}</div>
                        </div>
                        <hr class="content-hr" />
                        <div class="content-item">
                            {category.products.map((item)=>(
                                <div class="card">
                                 <Link to={"trang-chu/chi-tiet/"+item.id}><img class="card-img" src={item.image} alt=""/> </Link>
                                <p class="card-title">{item.name}</p>
                                <p class="card-price">{item.price} đ</p>
                               
                                <button class="btn-add-cart"><i class="fas fa-shopping-basket"></i></button>
                            </div>
                            ))}
                        </div>
                    </div>  
                </div>
                ))}
                 {/* <div class="container">
                 <div class="content">
                     <div class="content-title">
                         <div id="new-title" class="title">Bài Viết Mới</div>
                     </div>
                     <hr id="new-hr" class="content-hr" />
                     <div id="content-new" class="content-item">
                         <div class="item">
                             <img class="item-img" src="http://145.demomanhan.com/wp-content/uploads/sites/146/2019/11/Yeezy-Boost-700-V2-Hospital-Blue-FV8424.jpg" alt=""/>
                             <div class="item-caption">
                                 <p class="item-title">GIÀY YEEZY BOOST 700 V2 HOSPITAL BLUE VỪA MỚI RA MẮT GIÁ BAO NHIÊU?</p>
                                 <p class="item-text">Tháng 9 năm nay thị trường giày sneaker trở nên sôi động hơn bao giờ hết</p>
                             </div>
                         </div>
                         <div class="item">
                             <img class="item-img" src="http://145.demomanhan.com/wp-content/uploads/sites/146/2019/11/Yeezy-Boost-700-V2-Hospital-Blue-FV8424.jpg" alt=""/>
                             <div class="item-caption">
                                 <p class="item-title">GIÀY YEEZY BOOST 700 V2 HOSPITAL BLUE VỪA MỚI RA MẮT GIÁ BAO NHIÊU?</p>
                                 <p class="item-text">Tháng 9 năm nay thị trường giày sneaker trở nên sôi động hơn bao giờ hết</p>
                             </div>
                         </div>
                         <div class="item">
                             <img class="item-img" src="http://145.demomanhan.com/wp-content/uploads/sites/146/2019/11/Yeezy-Boost-700-V2-Hospital-Blue-FV8424.jpg" alt=""/>
                             <div class="item-caption">
                                 <p class="item-title">GIÀY YEEZY BOOST 700 V2 HOSPITAL BLUE VỪA MỚI RA MẮT GIÁ BAO NHIÊU?</p>
                                 <p class="item-text">Tháng 9 năm nay thị trường giày sneaker trở nên sôi động hơn bao giờ hết</p>
                             </div>
                         </div>
                         <div class="item">
                             <img class="item-img" src="http://145.demomanhan.com/wp-content/uploads/sites/146/2019/11/Yeezy-Boost-700-V2-Hospital-Blue-FV8424.jpg" alt=""/>
                             <div class="item-caption">
                                 <p class="item-title">GIÀY YEEZY BOOST 700 V2 HOSPITAL BLUE VỪA MỚI RA MẮT GIÁ BAO NHIÊU?</p>
                                 <p class="item-text">Tháng 9 năm nay thị trường giày sneaker trở nên sôi động hơn bao giờ hết</p>
                             </div>
                         </div>
                     </div>
                 </div>
 
             </div> */}
             </div>

        );
    }
}

export default Home;
