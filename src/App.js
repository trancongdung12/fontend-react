import React, { Component } from 'react';
import Header from './components/partials/Header';
import Carousel from './components/partials/Carousel';
import Home from './components/contents/Home';
import Footer from './components/partials/Footer';
import Detail from './components/contents/Detail';
import Cart from './components/contents/Cart';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
class App extends Component {
    render() {
        return (
        <Router>
            <div>
                 <Header/>
                 <Carousel/>
                 {/* <Cart /> */}
                 <Switch>
                    <Route exact path="/trang-chu">
                        <Home />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/trang-chu/chi-tiet/:id">
                        <Detail />
                    </Route>
                </Switch>
                 <Footer/>
            </div>
            </Router>
        );
    }
}

export default App;
