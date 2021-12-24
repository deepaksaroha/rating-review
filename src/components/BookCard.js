import React from 'react'
import Star from './Star'
import axios from 'axios'

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
        this.setState({
            newRating: newRating
        })
    }

    submitRating = () =>{
        axios.post('/api/reviews', {
            newRating: this.state.newRating,
            bookId: this.props.book.bookId
        })
        .then(response=>{
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
                <div className='books' style={{backgroundColor: 'whitesmoke', border: '1px solid black'}} key={book.bookId} value={book.bookId} onClick={()=>this.handleBookClick(book.bookId)}>
                    <div className='book-container'>
                        <div className="desc-box">
                            <div className="book-heading-box">
                                <div>
                                    <p className="book-title">{book.title}</p>
                                    <p className="book-author">by-{book.author}</p>
                                </div>
                                <div className="rating-info">
                                    <Star rating={parseInt(book.avgRating)} changeRating={()=>{}}/>
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
                                                    <button onClick={this.submitRating}>Done</button>
                                                    <button onClick={()=>{this.setState({newRating: 0})}}>Clear</button>
                                                </div>
                                            :
                                            <div>
                                                <Star rating={this.state.newRating} changeRating={this.changeRating} />
                                                <button onClick={this.submitRating}>Done</button>
                                                <button onClick={()=>{this.setState({newRating: 0})}}>Clear</button>
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