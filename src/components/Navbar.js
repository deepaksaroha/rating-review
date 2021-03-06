import React from 'react'
import '../css/Navbar.css'

class Navbar extends React.Component{
    handleLogout = () =>{
        this.props.handleLogout();
    }


    render(){
        return(
            <React.Fragment>
                <div className="navbar">
                    <a href="/home"><p>Home</p></a>
                    <p id="site-name">BookBag</p>
                    <div className="btn-box">
                    {
                        this.props.loginStatus ?
                        <button id="navbar-logout-btn" onClick={this.handleLogout}>Logout</button>
                        : 
                        <div><a className="login-btn" href="/login">Login</a>&nbsp;&nbsp;<a href="/signup">Signup</a></div> 
                    }
                    </div>
                </div>
                <div id="nav-margin-box">
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar;
