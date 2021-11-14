import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-dom'

class Router extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }



    render(){
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/home' component={Home} />
                    <Route path='/book/:bookId' component={Book} />
                    <Route path='/review/:bookId' component={Reviews} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Register} />
                </Switch>
            </React.Fragment>
        )
    }
}