import React from 'react'

class BookTile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            books: []
        }
    }
    
    handleClick = (event)=>{
        this.props.history.replace(`/book/${event.target.value}`);
    }


    componentDidMount(){
        
        let bookList = [];
        fetch('/api/books')
        .then(response=>response.json())
        .then(response=>{
            bookList = response.bookList;
        })
        .catch(error=>{
            console.log('some issue occured.');
        })

        if(sessionStorage.getItem('loginStatus')){
            bookList.forEach(book=>{
                fetch(`/api/reviews/${book.bookId}-${sessionStorage.getItem('userId')}`)
                .then(response=>response.json())
                .then(response=>{
                    book['userRating'] = response.reviewData.rating;
                })
                .catch(error=>{
                    console.log('Something went wrong')
                })
            })
        }

        this.setState({
            books: bookList
        })
    }



    render(){

        return (
            <React.Fragment>
                {
                    this.state.books.map(book=>{
                        return(
                            <button className='books' key={book.bookId} value={book.bookId} onClick={this.handleClick}>
                                <div className='book-container'>
                                    <div className="thumbnail-box">
                                        <img className="book-thumbnail" src={book.bookImg} alt='bookImg' />
                                        <div className="user-rating">{book.rating}</div>
                                    </div>
                                    <div className="desc-box">
                                        <div>
                                            <p className="book-title">{book.title}</p>
                                            <p className="book-author">by-{book.author}</p>
                                            <p>{book.avgRating}</p>
                                            <p>{book.ratingCount}</p>
                                            <p>{book.reviewCount}</p>
                                        </div>
                                        <div className="book-desc">
                                            {book.description}
                                        </div>
                                    </div>
                                    <div className="detail-box">
                                        <p>edition: {book.edition}</p>
                                        <p>published: {book.pub}</p>
                                        <p>ISBN: {book.isbn}</p>
                                    </div>
                                </div>
                            </button>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}