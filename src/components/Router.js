import React from 'react'
import Home from './Home';
import Book from './Book';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class AppRouter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }



    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/home' component={Home} />
                    <Route path='/book/:bookId' component={Book} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                </Switch>
            </Router>
            
        )
    }
}

export default AppRouter;
