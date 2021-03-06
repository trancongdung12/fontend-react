import React, { Component } from 'react';
import './Home.css';
import messages from './mes.png';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Carousel from '../partials/Carousel';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
import NumberFormat from 'react-number-format';
class Home extends Component {
    constructor(){
        super();
        this.state ={
            categories : [],
            messages:false,
            chatbox : [],
            textmessage: "",
            id_user: '',
            indexStart: 0,
            indexEnd: 4,
            indexEndResponsive:1,
            disabledNext: false,
            disabledPrev: true,    
        }
        this.onOpenChatBot = this.onOpenChatBot.bind(this);
        this.onCloseChatBot = this.onCloseChatBot.bind(this);
        this.onSendMessages = this.onSendMessages.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.toggleNext = this.toggleNext.bind(this);
        this.togglePrev = this.togglePrev.bind(this);
        this.toggleNextRespon = this.toggleNextRespon.bind(this);
        this.togglePrevRespon = this.togglePrevRespon.bind(this);
    }
    componentDidMount(){
        fetch("http://127.0.0.1:8000/api/category")
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({categories: result})
          })
        
          setInterval(() => {
            var userId =Cookies.get('id_user');
            if(userId){
                fetch("http://127.0.0.1:8000/api/user/message", {
                    method: "get",
                    headers: {"Authorization": userId}
                }).then(res =>{
                    console.log(res.status);
                    if(res.status === 429){
                        window.location.reload();
                    }
                    return res.json();
                }
                ).then(
                  (result) => {       
                      if(result != 1){   
                          
                          this.setState({chatbox:result[0].data,id_user:result[0].id_user})
                      }
                    
                  })
            }
          }, 3000)    
    }
    onAddToCart(item){
        return (event)=>{
            var cart = JSON.parse(localStorage.getItem("carts"));
            if(!cart){
              cart = [];
            }
            let userId = Cookies.get('id_user');
            var oldItem = cart.find((el)=>(el.id === item.id && el.user_id === userId ));
            if(oldItem){
              oldItem.quantity  +=1;
            }else{
              item.user_id = userId;
              item.quantity = 1;
              cart.push(item);
            }
            let userCart = cart.filter( function (item) {
                return item.user_id === userId;
              });
            this.forceUpdate();
            Cookies.set('count_cart',userCart.length);
            alert("Đã thêm vào giỏ hàng thành công!");
            localStorage.setItem("carts",JSON.stringify(cart));
          }
    }
    onOpenChatBot(){
        this.setState({messages:true})
    }
    onCloseChatBot(){
        this.setState({messages:false})
    }
    onSendMessages(event){
        event.preventDefault();
        let userId = Cookies.get('id_user');
        var content = event.target['messages'].value;
        var body = {
            content : content,
            id_recipient : 1
        }
        
        let bodyInJson = JSON.stringify(body);
        fetch("http://127.0.0.1:8000/api/user/message", {
            method: "post",
            headers: {
                "Content-Type":"application/json",
                "Authorization": userId
            },
            body: bodyInJson
        })
        .then((response) => {
            return response.json();
            // this.props.history.push('/dang-nhap'); 
        }).then(response=>{
            this.setState({chatbox:response.data,textmessage:""})
        })
    }
    onChangeText(event){
        this.setState({textmessage:event.target.value})
    }
    togglePrev(e) {
        var indexStart = this.state.indexStart - 4;
        var indexEnd = this.state.indexEnd - 4;
        var disabledPrev = false;
    
        if (indexStart <= 0) {
        e.preventDefault()
        indexStart = 0;
        indexEnd = 4;  
        disabledPrev = true
        }
    
        this.setState({ indexStart: indexStart, indexEnd:indexEnd , disabledPrev: disabledPrev, disabledNext: false })
    }
    
    toggleNext(e) {
        var indexStart = this.state.indexStart + 4;
        var indexEnd = this.state.indexEnd + 4;
        var disabledNext = false
        if (indexEnd == 8) {
          e.preventDefault()
          disabledNext = true
        }
        // else
        //  if(this.state.searchItem && indexEnd > this.state.searchItem.length){
        //   e.preventDefault()
        //   disabledNext = true
        // }
        this.setState({indexStart: indexStart, indexEnd:indexEnd, disabledNext: disabledNext, disabledPrev: false })
    }
    togglePrevRespon(e) {
        var indexStart = this.state.indexStart - 1;
        var indexEnd = this.state.indexEndResponsive - 1;
        var disabledPrev = false;
    
        if (indexStart <= 0) {
        e.preventDefault()
        indexStart = 0;
        indexEnd = 1;  
        disabledPrev = true
        }
    
        this.setState({ indexStart: indexStart, indexEndResponsive:indexEnd , disabledPrev: disabledPrev, disabledNext: false })
    }
    
    toggleNextRespon(e) {
        var indexStart = this.state.indexStart + 1;
        var indexEnd = this.state.indexEndResponsive + 1;
        var disabledNext = false
        // if (indexEnd == 8) {
        //   e.preventDefault()
        //   disabledNext = true
        // }
        // else
        //  if(this.state.searchItem && indexEnd > this.state.searchItem.length){
        //   e.preventDefault()
        //   disabledNext = true
        // }
        this.setState({indexStart: indexStart, indexEndResponsive:indexEnd, disabledNext: disabledNext, disabledPrev: false })
    }

      
    render() {
        return (
    
            <div>
                <Header />
                <Carousel/>
                {this.state.categories.map((category)=>(
                <div class="container">
                    <div class="content">
                        <div class="content-title">
                        <div class="title">{category.name}</div>
                        </div>
                        <hr class="content-hr" />
                        <button className="btn-disable" disabled={this.state.disabledPrev}><span  onClick={this.togglePrev} className="icon fa fa-chevron-circle-left"></span></button>
                        <button className="btn-disable" disabled={this.state.disabledNext}><span onClick={this.toggleNext} className="icon fa fa-chevron-circle-right"></span></button>

                        <button className="btn-disable-respon" disabled={this.state.disabledPrev}><span  onClick={this.togglePrevRespon} className="icon fa fa-chevron-circle-left"></span></button>
                        <button className="btn-disable-respon" disabled={this.state.disabledNext}><span onClick={this.toggleNextRespon} className="icon fa fa-chevron-circle-right"></span></button>
                        <div class="content-item">
                            {category.products.slice(this.state.indexStart, this.state.indexEnd).map((item)=>(
                                <div class="card">
                                 <Link to={"trang-chu/chi-tiet/"+item.id}>
                                     <img class="card-img" src={'http://127.0.0.1:8000'+item.image} alt="Image"/> 
                                </Link>
                                <p class="card-title">{item.name}</p>
                                <p class="card-price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> đ</p>
                               
                                <button onClick={this.onAddToCart(item)} class="btn-add-cart btn-disable"><i class="fas fa-shopping-basket"></i></button>
                            </div>
                            ))}
                           
                        </div>
                        <div class="content-item-responsive">
                            {category.products.slice(this.state.indexStart, this.state.indexEndResponsive).map((item)=>(
                                <div class="card">
                                 <Link to={"trang-chu/chi-tiet/"+item.id}>
                                     <img class="card-img" src={'http://127.0.0.1:8000'+item.image} alt="Image"/> 
                                </Link>
                                <p class="card-title">{item.name}</p>
                                <p class="card-price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> đ</p>
                               
                                <button onClick={this.onAddToCart(item)} class="btn-add-cart"><i class="fas fa-shopping-basket"></i></button>
                            </div>
                            ))}
                           
                        </div>
                    </div>  
                </div>
                ))}
                
                        {(Cookies.get('id_user'))&&<div className="icon-messages">
                            <img onClick={this.onOpenChatBot} src={messages} height="50px" width="50px" />
                        </div>}
                   {(this.state.messages)&&
                  <div className="messages">
                      <div className="header-messages">
                          <span>Admin</span><button className="close-button" onClick={this.onCloseChatBot}>x</button>
                      </div>
                      <div className="content-messages">
                          {this.state.chatbox.map((item)=>(
                              (item.id_seeder !== 1)?
                                <div className="user-messages">
                                 <p className="name-messages">
                                   <span className="name"> {item.users.name} </span>
                                     <span className="time">{item.created_at}</span>
                                     </p>
                                 <div className="content">{item.content}</div>
                               </div>
                               :(item.id_recipient===this.state.id_user)?
                               <div className="admin-messages">
                               <p className="name-messages">
                                   <span className="time">{item.created_at}</span>
                               <span>Admin</span></p>
                               <div className="content">{item.content}</div>
                             </div>:""
                          ))}                    
                         
                         
                      </div>
                      <form onSubmit={this.onSendMessages} className="input-messages">
                          <input type="text" value={this.state.textmessage} onChange={this.onChangeText} name="messages" placeholder="Nhập tin nhắn" />
                          <button className="btn-send-messages" type="submit"><span  className="far fa-paper-plane"></span></button>
                      </form>
                      </div>  
                    } 
                
                <Footer/>
             </div>

        );
    }
}

export default Home;
