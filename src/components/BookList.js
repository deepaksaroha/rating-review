import axios from 'axios';
import React from 'react'
import { withRouter } from "react-router-dom";
import BookCard from './BookCard';

import '../css/BookTile.css'
import kite from '../images/kite.jpg'

class BookTile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            books: [],
            isEdit: false
        }
    }
    

    fetchData = () =>{

        axios.get('/api/books')
        .then(response=>{
            this.setState({
                books: response.bookList,
                isLoggedIn: this.props.loginStatus
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }


    componentDidMount(){
        this.fetchData();        
    }

    handleChange=()=>{
        this.fetchData();
    }

    handleBookSelect = (event)=>{
        this.props.history.replace(`/book/${event.target.value}`);
    }

    render(){
        return (
            <React.Fragment>
                <main>
                {
                    this.state.books.map((book, index)=>{
                        return(
                                <div key={book.bookId} onClick={this.handleBookSelect} id={book.bookId}>
                                    <BookCard book={book} handleChange={this.handleChange}/>
                                </div>
                        )
                    })
                }
                </main>
            </React.Fragment>
        )
    }
}

export default withRouter(BookTile);
