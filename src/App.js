import React, { Component } from 'react';
import Header from './components/partials/Header';
import Carousel from './components/partials/Carousel';
import Home from './components/contents/Home';
import Footer from './components/partials/Footer';
import Detail from './components/contents/Detail';
import Cart from './components/contents/Cart';
class App extends Component {
    render() {
        return (
            <div>
                 <Header/>
                 {/* <Carousel/> */}
                 {/* <Home /> */}
                 {/* <Detail /> */}
                 <Cart />
                 <Footer/>
            </div>
        );
    }
}

export default App;
