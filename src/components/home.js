import React from 'react'
import Navbar from './navbar'
import BookTile from './bookTile'

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : false
        }
    }

    componentDidMount(){
        this.setState({
            isLoggedIn: localStorage.getItem('userId') != null
        })
    }

    handleLogout =()=>{
        this.setState({
            isLoggedIn: localStorage.getItem('userId') != null
        })
    }

    render(){
        return (
            <React.Fragment>
                <Navbar rerenderParent={this.handleLogout} />
                <BookTile key={this.state.isLoggedIn} />
            </React.Fragment>
        )
    }
}

export default Home;