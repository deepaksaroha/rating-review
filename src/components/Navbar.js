import React from 'react'
import '../css/Navbar.css'

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount(){
        this.setState({
            isLoggedIn: localStorage.getItem('userId')
        })
    }

    handleLogout = () =>{
        const request = new Request('/api/users',
            {
                method: 'DELETE',
            }
        )

        fetch(request)
        .then(response=>{
            if(!response.ok){
                throw new Error('Something went wrong!')
            }

            localStorage.removeItem('userId');

            console.log(localStorage.getItem('userId'))

            this.setState({
                isLoggedIn: localStorage.getItem('userId')
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
                    {this.state.isLoggedIn ? <button id="navbar-logout-btn" onClick={this.handleLogout}>Logout</button> : <div><a className="login-btn" href="/login">Login</a>&nbsp;&nbsp;<a href="/signup">Signup</a></div> }
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar;
