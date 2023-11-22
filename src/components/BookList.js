import axios from 'axios';
import React from 'react'
import BookCard from './BookCard';

import '../css/BookList.css'

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            books: [],
            isEdit: false
        }
    }


    fetchData = () => {

        axios.get('/api/books')
            .then(response => {
                this.setState({
                    books: response.data.bookList,
                    isLoggedIn: this.props.loginStatus
                })
            })
            .catch(error => {
                console.log(error);
            })
    }


    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        
        if (window.IntersectionObserver) {
            console.log("dserdfas")

            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0) {
                        console.log(entry.target)
                        const image = entry.target;
                        if(!image.src){
                            image.src = image.dataset.src;
                        }
                        imageObserver.unobserve(image);
                    }
                })
            }, {
                rootMargin: "0px",
                /* implies the amount of part of element is in the visible area.
                    0 is also default value for threshold.
                    we can omit threshold.
                */
                threshold: 0,
            })

            const images = document.querySelectorAll(".book-thumbnail");
            images.forEach(image => {
                imageObserver.observe(image);
            })
        }
    }

    handleChange = () => {
        this.fetchData();
    }




    render() {
        return (
            <React.Fragment>
                <main>
                    <div id='book-container' className="book-list">
                        {
                            this.state.books.map((book, index) => {
                                return (
                                    <div key={book.bookId} id={book.bookId}>
                                        <BookCard index={index} book={book} handleChange={this.handleChange} handleBookSelect={this.props.handleBookSelect} loginStatus={this.state.isLoggedIn} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default BookList;
