import React from 'react'
import Navbar from './Navbar';
import '../css/Book.css'
import Book1 from '../images/kite.jpg'

class Book extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            isReviewed: false,
            bookData: {
                // title: 'The Kite Runner',
                // bookId: '1',
                // author: 'HM',
                // edition: 1,
                // description: 'If you have 6 months to prepare for the interview I would definitely suggest the following things assuming that you have a formal CS degree and/or you have software development experience in some company',
                // published: 1984,
                // isbn: '12',
                // languages: ['English', 'Urdu'],
                // avgRating: 4,
                // reviewCount: 100,
                // ratingCount: 1000,
                // availability: {
                //     amazon: false,
                //     flipkart: true,
                //     kindle: true
                // }
            },
            userReview: {
                reviewid: '1',
                bookid: '1',
                userid: '1',
                rating: 3,
                review:'a Good book',
                date: new Date(),
                upvoteCount: 5,
            },
            reviews: [],
            review: '',
            isEdit: false,
            newRating: 0
        }
    }

    async getData(){


        fetch(`/api/books/1`)
        // fetch(`/api/books/${this.props.params.match.bookId}`)
        .then(response=>{
            
            if(!response.ok){
                throw new Error('Something Went Wrong!');
            }
            
            return response.json();
        })
        .then(response=>{
            this.setState({
                bookData: response.bookData
            })
        })
        .catch(error=>{
            console.log(error.message);
        })

        fetch(`/api/reviews/1`)
        // fetch(`/api/reviews/${this.props.params.match.bookId}`)
        .then(response=>{
            if(!response.ok){
                throw new Error('Something Went Wrong!');
            }

            return response.json();
        })
        .then(response=>{

            const reviewList = response.reviewList;

            reviewList.forEach(async review =>{
                let userNames = []
                
                await fetch('/api/users/'+review.userid)
                .then(response=>{
                    if(!response.ok){
                        throw new Error('some issue occured')
                    }
                    return response.json();
                })
                .then(response=>{
                    userNames.push(response.userName)
                })
                .catch(error=>{
                    console.log(error)
                })


                for(let i in reviewList){
                    reviewList[i].userName = userNames[i];
                }

                this.setState({
                    reviews: reviewList
                })
            })


            


        })
        .catch(error=>{
            console.log('something went wrong');
        })

       

        
        await this.setState({
            isLoggedIn: localStorage.getItem('userId') !== null
        })

        if(this.state.isLoggedIn){
            // fetch(`/api/reviews/${this.this.props.params.match.bookId}-${localStorage.getItem('userId')}`)
            fetch(`/api/reviews/1-${localStorage.getItem('userId')}`)
            .then(response=>{

                if(!response.ok){
                    throw new Error(response.error)
                }

                return response.json();

            })
            .then(response=>{
                this.setState({
                    isReviewed: true,
                    userReview: response.reviewData
                })
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }

    componentDidMount(){
        this.getData();
    }

    handleSubmitReview = () =>{
        const request = new Request(
            `/api/reviews`,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: '{ "newrating":"' +this.state.newRating+'" , "newreview":"' +this.state.review+'" , "bookId":"' +this.state.bookData.bookId+'" , "userId":"' +localStorage.getItem('userId')+'" }'
            }
        );

        fetch(request)
        .then(response=>response.json())
        .then(response=>{
            this.getData();
            this.setState({
                review: ''
            })
        })
        .catch(error=>{
            console.log('Something Went Wrong!');
        })
    }

    handleEditDone = () =>{
        const request = new Request(
            `/api/reviews/${this.state.userReview.reviewid}`,
            {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: '{ "newrating":"'+this.state.newRating+'", "newreview":"'+this.state.review+'" }'
            }
        );

        fetch(request)
        .then(response=>response.json())
        .then(response=>{
            this.getData();
            this.setState({
                isEdit: false,
                review: ''
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
            review: this.state.userReview.review,
            isEdit: true
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogout =()=>{
        this.setState({
            isLoggedIn: localStorage.getItem('userId') != null
        })
    }

    


    handleStaring = (e) =>{

        this.setState({
            newRating: e.target.value
        })

    }

    render(){
        const book = this.state.bookData;
        const review = this.state.userReview;

        const filledStarElement = (id) => {
            return <span key={id}>
                <input className="stars-input" type="text" onClick={(!this.isReviewed || this.isEdit) ? this.handleStaring:()=>{} } id={String(id)} value={String(id)} readOnly/>
                <label className="filled-stars" htmlFor={String(id)}>&#9733;</label>
            </span>
        }

        const emptyStarElement = (id) => {
            return <span key={id}>
                <input className="stars-input" type="text" onClick={(!this.isReviewed || this.isEdit) ? this.handleStaring:()=>{} } id={String(id)} value={String(id)} readOnly/>
                <label className="empty-stars" htmlFor={String(id)}>&#9733;</label>
            </span>
        }

        const starElement = (rating = 0) => {
            return(
                <div>
                    {[1,2,3,4,5].map(id=>{
                        if(id<=rating){
                            return filledStarElement(id);
                        }else{
                            return emptyStarElement(id);
                        }
                    })}
                </div>
            )
        }


        return(
            <React.Fragment>
                <Navbar rerenderParent={this.handleLogout} />
                <div className="book-outer-box">
                    <div className="thumbnail-box">
                        <img className="book-thumbnail" src={Book1} alt='bookImg' />
                    </div>
                    <div>
                        <div className="book-detail-box">
                            <div>
                                <div>
                                    {book.avgRating}
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
                        <div className="book-reviews-box">
                            <div>
                                {
                                    this.state.isLoggedIn ?
                                        this.state.isReviewed ?
                                            !this.state.isEdit ?
                                                <div>
                                                    <div className="rate-box">
                                                        {starElement(review.rating)}
                                                    </div>
                                                    <div>
                                                        <div className="user-review-box">{review.review}</div>
                                                    </div>
                                                    <button className="book-modify-btn" onClick={this.handleEdit}>Edit</button>
                                                </div>
                                                :
                                                <div>
                                                    <div className="rate-box">
                                                        {starElement(this.state.newRating)}
                                                    </div>
                                                    <div>
                                                        <textarea className="user-review-box" name="review" value={this.state.review} onChange={this.handleChange} placeholder="Write your review here"></textarea>
                                                    </div>
                                                    <button className="book-modify-btn" onClick={this.handleEditDone}>Done</button><button className="book-modify-btn" onClick={this.handleEditCancel}>Cancel</button>
                                                </div>
                                            :
                                            <div>
                                                <div className="rate-box">
                                                    {starElement(this.state.newRating)}
                                                </div>
                                                <div>
                                                    <textarea className="user-review-box" name="review" value={this.state.review} onChange={this.handleChange} placeholder="Write your review here"></textarea>
                                                </div>
                                                <button className="book-modify-btn" onClick={this.handleSubmitReview}>Submit</button>
                                            </div>
                                        :
                                        <div>
                                            <a className="login-btn" href="/login" >Login to Review</a>
                                        </div>
                                }
                            </div>
                            <div>
                                most helpful reviews
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
                           
                            this.state.reviews.map(review=>{
                                if(review.userId !== localStorage.getItem('userId'))
                                {
                                    return <div key={review.reviewId} className="book-review">
                                        <p>{review.userName}</p>
                                        <p>{review.rating}</p>
                                        <p>{review.review}</p>
                                    </div>
                                }else{
                                    return <div key={review.reviewId}>''</div>
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