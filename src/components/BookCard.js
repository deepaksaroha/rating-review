import React from 'react'
import Star from './Star'
import axios from 'axios'

class BookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newRating: 0,
            isEdit: false
        }
    }

    changeRating = (newRating)=>{
        if(this.state.isEdit){
            this.setState({
                newRating: newRating
            })
        }
    }

    submitRating = () =>{
        axios.post('/api/reviews', {
            newRating: this.state.newRating,
            bookId: this.props.book.bookId
        })
        .then(response=>{
            this.handleChange();
        })
        .catch(error=>{
            console.log('Something Went Wrong!');
        })
    }

    render(){
        const book = this.props.book;
        return (
            <React.Fragment>
                <button className='books' style={{pointerEvents: this.state.focus? 'none':'auto' }} key={book.bookId} value={book.bookId} onClick={this.state.focus? ()=>{} : this.handleClick}>
                    <div className='book-container'>
                        <div className="desc-box">
                            <div className="book-heading-box">
                                <div>
                                    <p className="book-title">{book.title}</p>
                                    <p className="book-author">by-{book.author}</p>
                                </div>
                                <div className="rating-info">
                                    <p><Star rating={parseInt(book.avgRating)}/></p>
                                    <p>{book.ratingCount} Ratings</p>&nbsp;
                                    <p>{book.reviewCount} Reviews</p>
                                </div>
                            </div>
                            <div className="book-desc">
                                {book.description}
                            </div>
                        </div>
                        
                        <div className="thumbnail-box">
                            <img className="book-thumbnail" src={book.imgLocation} alt='bookImg' />
                            <div className="user-rating">
                                {    
                                    this.state.isLoggedIn ?
                                        book.userReview !== undefined?
                                            !this.state.isEdit ?
                                                <div>
                                                    <Star rating={book.userReview.rating} changeRating={()=>{}}/>
                                                    <button onClick={()=>{this.setState({isEdit: true})}}>Edit</button>
                                                </div>
                                                :
                                                <div>
                                                    <Star rating={this.state.newRating} changeRating={this.changeRating} />
                                                    <buttton onClick={this.submitRating}>Done</buttton>
                                                </div>
                                            :
                                            <div>
                                                <Star rating={this.state.newRating} changeRating={this.changeRating} />
                                                <buttton onClick={this.submitRating}>Done</buttton>
                                            </div>
                                        :
                                        <div>
                                            <Star rating={0} changeRating={()=>{}} />
                                        </div>
                                }
                            </div>
                        </div>
                        
                        <div className="detail-box">
                            <p>edition: {book.edition}</p>
                            <p>published: {new Date(book.published).getFullYear()}</p>
                            <p>ISBN: {book.isbn}</p>
                        </div>
                    </div>
                </button>
            </React.Fragment>
        )
    }
}

export default BookCard;