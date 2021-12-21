import React from 'react'
import Navbar from './Navbar';
import '../css/Book.css'
import Book1 from '../images/kite.jpg'
import axios from 'axios'
import Star from './Stars'

class Book extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookData: {},
            newRating: 0,
            newReview: '',
            bookReviews: [],
            isLoggedIn: false,
            isEdit: false
        }
    }

    getData=()=>{
        const promise1 = axios.get(`/api/books/${this.props.params.match.bookId}`);
        const promise2 = axios.get('/api/users');
        const promise3 = axios.get(`/api/reviews/${this.props.params.match.bookId}`);

        Promise.all(promise1, promise3)
        .then(([res1, res3])=>{
            this.setState({
                bookData: res1.bookData,
                bookReviews: res3.reviewData
            })
            return promise2;
        })
        .then(response=>{
            this.setState({
                isLoggedIn: true
            })
        })
        .catch(error=>{
            console.log('Error Occured')
        })
    }

    componentDidMount(){
        this.getData();
    }

    handleSubmitReview = () =>{
        axios.post('/api/reviews', {
            newRating: this.state.newRating,
            newReview: this.state.newReview,
            bookId: this.props.params.match.bookId
        })
        .then(response=>{
            this.getData();
            this.setState({
                isEdit: false
            })
        })
        .catch(error=>{
            console.log('Something Went Wrong!');
        })
    }

    handleEditCancel = () =>{
        this.setState({
            isEdit: false
        })
    }

    handleEdit = () =>{
        this.setState({
            isEdit: true
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogout =()=>{
        axios.delete('/api/users')
        .then((response)=>{
            this.setState({
                isLoggedIn: false
            })
        })
        .catch(error=>{
            console.log('some issue occured')
        })
    }

    changeRating = (newRating)=>{
        if(this.state.isEdit){
            this.setState({
                newRating: newRating
            })
        }
    }

    render(){
        const book = this.state.bookData;

        return(
            <React.Fragment>
                <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                <div className="book-outer-box">
                    <div className="thumbnail-box">
                        <img className="book-thumbnail" src={Book1} alt='bookImg' />
                    </div>
                    <div>
                        <div className="book-detail-box">
                            <div>
                                <div>
                                    {parseInt(book.avgRating)}
                                </div>
                                <div>
                                    {book.ratingCount} Ratings
                                </div>
                                <div>
                                    {book.reviewCount} Reviews
                                </div>
                            </div>
                            <div className="about-book">
                                <div>
                                    <p id="book-title">{book.title}</p>&nbsp;
                                    <p id="book-author">by-{book.author}</p>
                                </div>
                                <p id="book-desc">
                                    {book.description}
                                </p>
                            </div>
                            <div>
                                <div className="detail-box">
                                    <p>edition: {book.edition}</p>
                                    <p>published: {book.published}</p>
                                    <p>ISBN: {book.isbn}</p>
                                </div>
                            </div>
                        </div>
                        <div className="user-review">
                            <div>
                                {
                                    this.state.isLoggedIn ?
                                        book.userReview !== undefined ?
                                            !this.state.isEdit ?
                                                <div>
                                                    <div className="rate-box">
                                                        <Star loginStatus={this.state.isLoggedIn} rating={book.userReview.rating} changeRating={()=>{}}/>
                                                    </div>
                                                    <div>
                                                        <div className="user-review-box">{book.userReview.review}</div>
                                                    </div>
                                                    <button className="book-modify-btn" onClick={this.handleEdit}>Edit</button>
                                                </div>
                                                :
                                                <div>
                                                    <div className="rate-box">
                                                        <Star loginStatus={this.state.isLoggedIn} rating={this.state.newRating} changeRating={this.changeRating}/>
                                                    </div>
                                                    <div>
                                                        <textarea className="user-review-box" name="newReview" value={this.state.newReview} onChange={this.handleChange} placeholder="Write your review here"></textarea>
                                                    </div>
                                                    <button className="book-modify-btn" onClick={this.handleSubmitReview}>Done</button><button className="book-modify-btn" onClick={this.handleEditCancel}>Cancel</button>
                                                </div>
                                            :
                                            <div>
                                                <div className="rate-box">
                                                    <Star loginStatus={this.state.isLoggedIn} rating={this.state.newRating} changeRating={this.changeRating}/>
                                                </div>
                                                <div>
                                                    <textarea className="user-review-box" name="newReview" value={this.state.newReview} onChange={this.handleChange} placeholder="Write your review here"></textarea>
                                                </div>
                                                <button className="book-modify-btn" onClick={this.handleSubmitReview}>Submit</button>
                                            </div>
                                        :
                                        <div>
                                            <a className="login-btn" href="/login" >Login to Review</a>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="book-avail-options">
                        <button id="x" disabled={'availability' in book && !book.availability.amazon}>Amazon</button>
                        <button id="y" disabled={'availability' in book && !book.availability.flipkart}>Flikart</button>
                        <button id="z" disabled={'availability' in book && !book.availability.kindle}>Kindle</button>                        
                    </div>
                    <div className="all-reviews"> 
                        {
                           
                            this.state.bookReviews.map(review=>{
                                if(book.userReview === undefined || review._id !== book.userReview._id)
                                {
                                    return <div key={review._id} className="book-review">
                                        <p>{review.userName}</p>
                                        <p>{review.rating}</p>
                                        <p>{review.review}</p>
                                    </div>
                                }else{
                                    return <div key={review._id}>''</div>
                                }
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Book;
