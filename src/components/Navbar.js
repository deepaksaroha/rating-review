import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

class Navbar extends React.Component{
    handleLogout = () =>{
        this.props.handleLogout();
    }


    render(){
        return(
            <React.Fragment>
                <div className="navbar">
                    <Link to="/home"><p>Home</p></Link>
                    <p id="site-name">BookBag</p>
                    <div className="btn-box">
                    {
                        this.props.loginStatus ?
                        <button id="navbar-logout-btn" onClick={this.handleLogout}>Logout</button>
                        :
                        // <div><a className="login-btn" href="/login">Login</a>&nbsp;&nbsp;<a href="/signup">Signup</a></div> 
                        <div><Link className="login-btn" to="/login">Login</Link>&nbsp;&nbsp;<Link to="/signup">Signup</Link></div> 
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
