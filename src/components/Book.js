import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/Book.css'
// import Book1 from '../images/kite.jpg'
import axios from 'axios'
import Star from './Star'
const path = require('path');
class Book extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookData: {},
            newRating: 0,
            newReview: '',
            bookReviews: [],
            isLoggedIn: false,
            isEdit: false,
            isLoaded: false,
        }
    }

    getData=()=>{
        const promise1 = axios.get(`/api/books/${this.props.match.params.bookId}`);
        const promise2 = axios.get('/api/users');
        const promise3 = axios.get(`/api/reviews/${this.props.match.params.bookId}`);

        Promise.all([promise1, promise3])
        .then((responses)=>{
            this.setState({
                bookData: responses[0].data.bookData,
                bookReviews: responses[1].data.reviewList
            })
        })
        .catch(error=>{
            console.log('Error Occured')
        })

        promise2
        .then(response=>{
            this.setState({
                isLoggedIn: true,
                isLoaded: true
            })
        })
        .catch(error=>{
            this.setState({
                isLoggedIn: false,
                isLoaded: true
            })
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
            bookId: this.props.match.params.bookId
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
            isEdit: false,
            newRating: 0
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
        .then(()=>{
            this.getData();
        })
        .catch(error=>{
            console.log('some issue occured')
        })
    }

    changeRating = (newRating)=>{
        this.setState({
            newRating: newRating
        })
    }

    render(){
        const book = this.state.bookData;
        return(
            <React.Fragment>
            {
                !this.state.isLoaded?
                ''
                :
                <div>
                <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                <div className="book-outer-box">
                    {
                        Object.keys(book).length !== 0 ?
                        <div>
                        <div>
                            <div className="book-detail-box">
                                <div className="book-page-thumbnail-box">
                                    <img className="book-page-thumbnail" src={path.join(__dirname, 'build', book.thumbnailUrl)} alt='bookImg' loading='lazy'/>
                                </div>                                
                                <div className="box-1">
                                    <div className="about-book-box">
                                        <div>
                                            <p id="book-page-title">{book.title}</p>
                                            <p id="book-page-author">by-{book.author}</p>
                                        </div>
                                    </div>
                                    <div className="box-2">
                                        <div>
                                            <div>
                                                <div>
                                                    <Star loginStatus={this.state.isLoggedIn} rating={book.avgRating} changeRating={(v)=>{}}/>
                                                </div>
                                                <div>
                                                    {book.ratingCount} Ratings
                                                </div>
                                                <div>
                                                    {book.reviewCount} Reviews
                                                </div>
                                            </div>
                                            <div className="book-page-user-review">
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
                                                                {/* <div><a href="/login" ><button className="login-btn" >Login to Review</button></a></div> */}
                                                                <div><Link to="/login" ><button className="login-btn" >Login to Review</button></Link></div>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="book-page-detail-box">
                                                <p>edition: {book.edition}</p>
                                                <p>published: {new Date(book.published).toLocaleString().split(',')[0]}</p>
                                                <p>ISBN: {book.isbn}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p id="book-page-desc">
                                {book.description}
                            </p>
                        </div>
                        <div className="book-avail-options">available at -
                            {'availability' in book && book.availability.amazon ? <span className="x">Amazon</span>:null}
                            {'availability' in book && book.availability.flipkart ? <span className="x">Flipkart</span>:null}
                            {'availability' in book && book.availability.kindle ? <span className="x">Kindle</span>: null}
                        </div>
                        </div>
                        :
                        ''
                    }
                    
                    {
                        this.state.bookReviews.length !== 0 ?
                            <div className="all-reviews">
                                {
                                    this.state.bookReviews.map(review=>{
                                        if(book.userReview === undefined || review._id !== book.userReview._id)
                                        {
                                            return <div key={review._id} className="book-review">
                                                <p>{review.userName}</p>
                                                <Star rating={review.rating} changeRating={()=>{}} />
                                                {review.review !== '' ?<p>{review.review}</p>:''}
                                                <hr/>
                                            </div>
                                        }else{
                                            return ''
                                        }
                                    })
                                }
                            </div>
                            :
                            ''
                    }
                    
                </div>
                </div>
            }
            </React.Fragment>
        )
    }
}

export default Book;
