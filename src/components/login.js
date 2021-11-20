import React from 'react'
import Navbar from './navbar';
import '../css/Login.css'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            emailId: '',
            password: ''
        }
    }

    checkLoginStatus = async () => {
        await this.setState({
            isLoggedIn: localStorage.getItem('userId') != null
        })

        if(this.state.isLoggedIn){
            this.props.history.goBack()
        }

    }

    componentDidMount(){
        this.checkLoginStatus();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        const request = new Request(
            '/api/users',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: '{ "emailId": "'+this.state.emailId+'", "password": "'+this.state.password+'" }'
            }
        )

        fetch(request)
        .then(response=>{
            if(!response.ok){
                Promise.reject(response);
                return
            }
            return response.json();
        })
        .then(response=>{
            localStorage.setItem('userId', response.userId);
            this.setState({
                isLoggedIn: true
            })

            this.props.history.goBack();
        })
        .catch(error=>{
            console.log(error.body)
        })
    }


    render(){
        return(
            <React.Fragment>
                <Navbar rerenderParent={this.handleLogout}/>
                <div className="outer-box">
                    <div className="login-form-box">
                        <form>
                            <p id="login-heading">User Login</p>
                            <div className="login-input-box">
                                <label>Email:</label><br/>
                                <input className="login-input" name="emailId" value={this.state.emailId} type="email" onChange={this.handleChange} placeholder="Email" /><br/>
                                <label>Password:</label><br/>
                                <input className="login-input" name="password" value={this.state.password} type="password" onChange={this.handleChange} placeholder="Password" />
                                <br/>
                                <button id="login-btn" onClick={this.handleLogin}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;