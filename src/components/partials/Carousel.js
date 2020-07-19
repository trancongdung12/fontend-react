import React, { Component } from 'react';
import './Carousel.css'
class Carousel extends Component {
    constructor(){
        super();
        this.state={
            index : 0
        }
    }
    componentDidMount(){
        setTimeout(this.setState({index:this.state.index+1}), 1000);

    }
    render() {
        console.log(this.state.index);
        return (
        <div class="slide">
            <img class="slide-item" src="https://fsport247.com/cdn/afficheimg/giay-the-thao-1584664589.png" alt=""/>
            <img class="slide-item hide" src="https://fsport247.com/cdn/afficheimg/sale-giay-vans-1592389306.gif" alt=""/>
            <img class="slide-item hide" src="https://theme.hstatic.net/1000405402/1000573892/14/product_slideshow_2.jpg?v=67" alt=""/>
        </div>
        );
    }
}

export default Carousel;
