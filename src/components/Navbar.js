import React from 'react'
import axios from 'axios'
import '../css/Navbar.css'

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    getLoginStatus=()=>{
        axios.get('/api/users')
        .then(response=>{
            this.setState({
                isLoggedIn: true
            })
        })
        .catch(error=>{
            this.setState({
                isLoggedIn: false
            })
        })
    }

    componentDidMount(){
        this.getLoginStatus();
    }

    handleLogout = () =>{
        axios.delete('/api/users')
        .then(response=>{
            this.setState({
                isLoggedIn: true
            })
            this.props.rerenderParent();
        })
        .catch(error=>{
            console.log(error);
        })
    }


    render(){
        return(
            <React.Fragment>
                <div className="navbar">
                    <a href="/home"><p>Home</p></a>
                    <p id="site-name">PaperPhile</p>
                    {
                        this.state.isLoggedIn ?
                        <button id="navbar-logout-btn" onClick={this.handleLogout}>Logout</button> 
                        : 
                        <div><a className="login-btn" href="/login">Login</a>&nbsp;&nbsp;<a href="/signup">Signup</a></div> 
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar;
