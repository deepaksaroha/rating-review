import axios from 'axios';
import React from 'react'
import BookCard from './BookCard';

import '../css/BookTile.css'

class BookList extends React.Component {
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
                books: response.data.bookList,
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

    handleBookSelect = (id)=>{
        this.props.handleBookSelect(id)
    }

    render(){
        // console.log(this.state.books);
        return (
            <React.Fragment>
                <main>
                {
                    this.state.books.map((book, index)=>{
                        return(
                                <div key={book.bookId} onClick={()=>this.handleBookSelect(book.bookId)} id={book.bookId}>
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

export default BookList;
