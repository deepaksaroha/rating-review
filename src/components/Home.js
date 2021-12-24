import React from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import BookList from './BookList'

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn : false
        }
    }

    getLoginStatus=()=>{
        this.setState({
            isLoaded: false
        })
        axios.get('/api/users')
        .then(response=>{
            this.setState({
                isLoaded: true,
                isLoggedIn: true
            })
        })
        .catch(error=>{
            this.setState({
                isLoaded: true,
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
            this.getLoginStatus();
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
                {
                    this.state.isLoaded ?
                    <div>
                        <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                        <BookList loginStatus={this.state.isLoggedIn} handleBookSelect={this.handleBookSelect}/>
                    </div>
                    :
                    ''
                }
                
            </React.Fragment>
        )
    }
}

export default Home;
