import React from 'react'
import Star from './Star'
import axios from 'axios'
import '../css/BookCard.css'

class BookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            focus: false,
            newRating: 0,
            isEdit: false
        }
    }

    changeRating = (newRating)=>{
        console.log(newRating);
        this.setState({
            newRating: newRating
        }, this.submitRating);
    }

    submitRating = () =>{
        axios.post('/api/reviews', {
            newRating: this.state.newRating,
            bookId: this.props.book.bookId
        })
        .then(response=>{
            this.setState({isEdit: false})
            this.props.handleChange();
        })
        .catch(error=>{
            console.log('Something Went Wrong!');
        })
    }

    handleBookClick =(id)=>{
        if(this.state.focus !== true){
            this.props.handleBookSelect(id);
        }        
    }

    render(){
        const book = this.props.book;
        return (
            <React.Fragment>
                <div className='books' key={book.bookId} value={book.bookId} onClick={()=>this.handleBookClick(book.bookId)}>
                    <div className='book-container'>
                        <div className="desc-box">
                            <div className="book-heading-box">
                                <div>
                                    <p className="book-title">
                                        <p className='book-title-expand'>{book.title}</p>
                                    </p>
                                    <p className="book-author">by-{book.author}</p>
                                </div>
                                <div className="rating-info">
                                    <Star rating={parseInt(book.avgRating)} changeRating={()=>{}}/>
                                    <p>{book.ratingCount} Ratings</p>
                                    <p>{book.reviewCount} Reviews</p>
                                </div>
                            </div>
                            {/* <div className="book-desc">
                                {book.description}
                            </div> */}
                        </div>
                        
                        <div className="thumbnail-box">
                            {
                                this.props.index === 0 ?
                                <img className="book-thumbnail" src={book.thumbnailUrl || '/images/defaultbookthumbnail.png'} alt='bookImg' loading='lazy' /> :
                                <img className="book-thumbnail" data-src={book.thumbnailUrl || '/images/defaultbookthumbnail.png'} alt='bookImg' loading='lazy' />
                            }
                            
                            <div className="user-rating" onMouseEnter={()=>{this.setState({focus:true})}} onMouseLeave={()=>{this.setState({focus:false})}}>
                                {
                                    this.props.loginStatus ?
                                        book.userReview !== undefined?
                                            !this.state.isEdit ?
                                                <div>
                                                    <Star rating={book.userReview.rating} changeRating={()=>{}}/>
                                                    <button onClick={()=>{this.setState({isEdit: true})}}>Edit</button>
                                                </div>
                                                :
                                                <div>
                                                    <Star rating={this.state.newRating} changeRating={this.changeRating} />
                                                </div>
                                            :
                                            <div>
                                                <Star rating={this.state.newRating} changeRating={this.changeRating} />
                                            </div>
                                        :
                                        ''
                                }
                            </div>
                        </div>
                        
                        <div className="detail-box">
                            <p>edition: {book.edition}</p>
                            <p>published: {new Date(book.published).getFullYear()}</p>
                            <p>ISBN: {book.isbn}</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default BookCard;