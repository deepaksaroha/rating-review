import React from 'react'
import Navbar from './Navbar';
import '../css/Signup.css'

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            emailId: '',
            password: '',
            error: '',
            successMessage: '',
            validationError: ''
        }
    }

    checkLoginStatus = async () => {
        await this.setState({
            isLoggedIn: localStorage.getItem('userId') != null
        })

        if(this.state.isLoggedIn){
            this.props.history.goBack();
        }

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
                validationError: 'All fields are mandatory!'
            })
            return false
        }

        const unRegex = /^[1-9]|\s+/;

        if(unRegex.test(un)){
            this.setState({
                validationError: 'User Name can not start with Numbers and can not contain spaces'
            })
            return false
        }

        const emRegex = /[a-zA-Z]\w*@\w*\.\D+/

        if(!emRegex.test(em)){
            this.setState({
                validationError: 'Email Id needs to be of the form abc@xyz.com'
            })
            return false
        }

        if(pw.includes(' ')){
            this.setState({
                validationError: 'Password can not contain spaces'
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
        this.setState({
            error: ''
        })

        if(!this.validate()){
            return;
        }
        
        const request = new Request(
            '/api/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: '{ "userName":"'+this.state.userName+'", "emailId":"'+this.state.emailId+'", "password":"'+this.state.password+'"}'
            }
        )

        fetch(request)
        .then(response=>{
            if(!response.ok){
                if(response.exists){
                    throw new Error('Email Id already registered!');
                }
                throw new Error(response.error);
            }

            return response.json();
        })
        .then(response=>{
            this.setState({
                successMessage: 'Signup Successful'
            })

            this.props.history.replace('/login')
        })
        .catch(error=>{
            this.setState({
                error: error.message
            })
        })


    }

    render(){
        return(
            <React.Fragment>
                <Navbar />
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
                                {this.state.validationError? <p className="valid-error">{this.state.validationError}</p> : <p className="valid-error">{this.state.error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Signup;