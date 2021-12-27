import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history'

import PageRegisterConfirm from './Pages/PageAuthenticateConfirm';
import PageGame from './Pages/PageGame';
import PageMain from './Pages/PageMain';
import PageAdminLogin from './Pages/PageAdminLogin';
import PageAdminMain from './Pages/PageAdminMain';
import PageAdminGame from './Pages/PageAdminGame';
import PageAuthenticate from './Pages/PageAuthenticate';

import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    const history = createBrowserHistory(props);
    this.state = {
      history : history
    }

  }
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          {/* <Route render={({location}) => (*/}
            <Switch> 
              <Route path='/authenticate' >
                <PageAuthenticate />
              </Route>
              <Route path='/authenticateconfirm' >
                <PageRegisterConfirm />
              </Route>
              <Route path='/game' >
                <PageGame />
              </Route>
              <Route path='/admin/main/*' >
                <PageAdminMain />
              </Route>
              <Route path='/admin/login' >
                <PageAdminLogin />
              </Route>
              <Route path='/' >
                <PageMain />
              </Route>
             </Switch>
         {/* )}/> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
