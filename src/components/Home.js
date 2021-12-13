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
        this.setState({
            isLoggedIn: false
        })
    }

    render(){
        return (
            <React.Fragment>
                <Navbar rerenderParent={this.handleLogout} />
                <BookList key={this.state.isLoggedIn} />
            </React.Fragment>
        )
    }
}

export default Home;
