import React from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import BookList from './BookList'

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : false
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

    handleBookSelect=(id)=>{
        this.props.history.push(`/book/${id}`);
    }

    render(){
        return (
            <React.Fragment>
                <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                <BookList loginStatus={this.state.isLoggedIn} handleBookSelect={this.handleBookSelect}/>
            </React.Fragment>
        )
    }
}

export default Home;
