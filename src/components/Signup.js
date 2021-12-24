import React from 'react'
import Navbar from './Navbar';
import '../css/Signup.css'
import axios from 'axios';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            emailId: '',
            password: '',
            error: '',
            successMessage: '',
            isLoggedIn: false
        }
    }

    checkLoginStatus = async () => {
        axios.get('/api/users')
        .then(response=>{
            this.props.history.replace('/home');
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

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate=()=>{
        const un = this.state.userName;
        const em = this.state.emailId;
        const pw = this.state.password;

        if(un === '' || em === '' || pw === ''){
            this.setState({
                error: 'All fields are mandatory!'
            })
            return false
        }

        const unRegex = /^[1-9]|\s+/;

        if(unRegex.test(un)){
            this.setState({
                error: 'User Name can not start with Numbers and can not contain spaces'
            })
            return false
        }

        const emRegex = /[a-zA-Z]\w*@\w*\.\D+/

        if(!emRegex.test(em)){
            this.setState({
                error: 'Email Id needs to be of the form abc@xyz.com'
            })
            return false
        }

        if(pw.includes(' ')){
            this.setState({
                error: 'Password can not contain spaces'
            })
            return false
        }

        this.setState({
            validationError: ''
        })
        return true;
    }

    handleSignUp = (e) => {
        e.preventDefault();

        if(this.validate()){
            axios.post('/api/users', {
                userName: this.state.userName,
                emailId: this.state.emailId,
                password: this.state.password                         
            })
            .then(response=>{
                this.setState({
                    successMessage: 'SignUp Successful',
                    error: ''
                })
            })
            .catch(error=>{
                this.setState({
                    error: error.response.data.message
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
                    <h2>“Show me a family of readers, and I will show you the people who move the world.” – Napoleon Bonaparte</h2>
                    <div className="signup-form-box">
                        <form>
                            <p id="signup-heading">User SignUp</p>
                            <div className="signup-input-box">
                                <label>User Name: </label><br/>
                                <input className="signup-input" type="text" name="userName" value={this.state.userName} onChange={this.onChange} placeholder="UserName" /><br/>
                                <label>Email: </label><br/>
                                <input className="signup-input" type="email" name="emailId" value={this.state.emailId} onChange={this.onChange} placeholder="Email" /><br/>
                                <label>Password: </label><br/>
                                <input className="signup-input" type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" /><br/>                                
                                <button id="signup-btn" onClick={this.handleSignUp}>Signup</button>
                            </div>
                        </form>
                        {this.state.error !== ''? <p className="error-message" style={{color: "red", fontSize: "16px"}}>{this.state.error}</p> : ''}
                        {this.state.successMessage !== ''? <span><p className="success-message" style={{color: "green", fontSize: "16px"}}>{this.state.successMessage}</p><a href="/login">Login</a></span> : ''}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Signup;
