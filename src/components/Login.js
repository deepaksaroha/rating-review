import React from 'react'
import Navbar from './Navbar';
import '../css/Login.css'
import axios from 'axios';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            emailId: '',
            password: '',
            error: ''
        }
    }

    checkLoginStatus = async () => {
        axios.get('/api/users')
        .then(response=>{
            this.setState({
                isLoggedIn: true
            })
            this.props.history.goBack();
        })
        .catch(error=>{
            this.setState({
                isLoggedIn: false
            })
        })
    }

    componentDidMount(){
        this.checkLoginStatus();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate=()=>{
        if(this.state.emailId === '' || this.state.password === ''){
            this.setState({
                error: 'all fields are mandatory'
            })
            return false
        }

        const emRegex = /[a-zA-Z]\w*@\w*\.\D+/

        if(!emRegex.test(this.state.emailId)){
            this.setState({
                error: 'Email Id needs to be of the form abc@xyz.com'
            })
            return false
        }

        return true;
    }

    handleLogin = (e) => {
        e.preventDefault();
        if(this.validate()){
            axios.put('/api/users', {
                emailId: this.state.emailId,
                password: this.state.password
            })
            .then(response=>{
                this.props.history.goBack();
            })
            .catch(error=>{
                this.setState({
                    error: error.response.data
                })
            })
        }
        
    }

    handleLogout =()=>{
        axios.delete('/api/users')
        .then((response)=>{
            this.setState({
                isLoggedIn: false
            })
        })
        .catch(error=>{
            console.log('some issue occured')
        })
    }


    render(){
        return(
            <React.Fragment>
                <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} />
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
                    { this.state.error !== '' ? <p style={{color: "red", fontSize: "16px"}}>{this.state.error}</p>:''}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;
