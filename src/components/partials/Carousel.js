import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './Carousel.css'
class Carousel extends Component {
    
    
    render() {
        const slideImages = [
            'https://fsport247.com/cdn/afficheimg/giay-the-thao-1584664589.png',
            'https://fsport247.com/cdn/afficheimg/sale-giay-vans-1592389306.gif',
            'https://theme.hstatic.net/1000405402/1000573892/14/product_slideshow_2.jpg?v=67'
          ];
        return (
                <div className="slide-container">
                <Slide>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                    <span></span>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                    <span></span>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                    <span></span>
                    </div>
                </div>
                </Slide>
            </div>
        );
    }
}

export default Carousel;
