import React from 'react';
import { Router, Route, Link } from 'react-router'
import './App.css';
import {HashRouter, Switch,Redirect} from "react-router-dom";
import C1 from "./pages/c1/c1";
import C2 from "./pages/c2/c2";
import Wallet from './pages/wallet/wallet'
import Error from "./pages/Error";
import http from "./http";
class App extends React.Component  {
  componentDidMount() {
    http.get('/Api/GetPayInfo.do',{ a:1})
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  render() {
    return(
        <div className="App">
          {/*<header className="App-header">*/}
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            {/*<Header text="父组件文本" nums={[1,2,3,4,5,6]}></Header>*/}
            {/*<Clock date={new Date()}></Clock>*/}
          {/*</header>*/}
          {/*<div>头部</div>*/}
          <div id="content">
            <HashRouter>
              <Switch>
                <Route exact path="/C1" component={C1} />
                <Route path="/C2" component={C2} />
                <Route path="/wallet/index" component={Wallet} />
                <Redirect from='/' to='/wallet/index?platformCoin=200&platformCoinName=金币'/>
                <Route component={Error} />
              </Switch>
            </HashRouter>
          </div>
        </div>
    )
  };
}
// React.render((
//   <Router>
//     <Route path="/C1" component={C1} />
//     <Route path="/C2" component={C2} />
//   </Router>
// ), document.body)
export default App;
