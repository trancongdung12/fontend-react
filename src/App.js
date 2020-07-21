import React, { Component } from 'react';
import Home from './components/contents/Home';
import Detail from './components/contents/Detail';
import Cart from './components/contents/Cart';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
class App extends Component {
    render() {
        return (
        <Router>
            <div>
                 {/* <Cart /> */}
                 <Switch>
                    <Route exact path="/dang-nhap">
                        <Login />
                    </Route>
                    <Route exact path="/dang-ky">
                        <Register />
                    </Route>
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
            </div>
            </Router>
        );
    }
}

export default App;
