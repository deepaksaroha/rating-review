import React from 'react'
import { withRouter } from "react-router-dom";

import '../css/BookTile.css'
import kite from '../images/kite.jpg'

class BookTile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            books: []
        }
    }
    

    fetchData = () =>{
        // console.log(this.state.a)
        this.setState({
            isLoggedIn: localStorage.getItem('userId') != null
        })


        let bookList = [];
        fetch('/api/books')
        .then(response=>response.json())
        .then(response=>{
            bookList = response.bookList;

            let promiseList = []

            if(localStorage.getItem('userId')){
                bookList.forEach(book=>{
                    promiseList.push(fetch(`/api/reviews/${book.bookId}-${localStorage.getItem('userId')}`))
                })
            }

            return Promise.all(promiseList)
        })
        .then(responses=>{
            return Promise.all(responses.map(response=>{
                return response.json();
            }))
        })
        .then(responses=>{
            for(let i in responses){
                bookList[i]['userReview'] = responses[i].reviewData;
            }

            this.setState({
                books: bookList
            })
        })
        .catch(error=>{
            console.log('Something went wrong')
        })
    }


    componentDidMount(){
        this.fetchData();        
    }

    
    handleClick = (event)=>{
        this.props.history.replace(`/book/${event.target.value}`);
    }

    handleStaring = (e) =>{
        e.preventDefault();
        if(!localStorage.getItem('userId')){
            this.props.history.replace('/login');
            return;
        }

        console.log(Object.keys(this.state.books[e.target.name].userReview.reviewid))

        if(this.state.books[e.target.name].userReview){
            const request1 = new Request(
                `/api/reviews/${this.state.books[e.target.name].userReview.reviewid}`,
                {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: '{ "newrating":"'+e.target.value+'"}'
                }
            );

            fetch(request1)
            .then(response=>response.json())
            .then(response=>{
                this.fetchData()
            })
            .catch(error=>{
                console.log('Something Went Wrong!');
            })

            return;
        }


        const request2 = new Request(
            `/api/reviews`,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: '{ "rating":'+e.target.value+', "bookId":'+this.state.books[e.target.name].bookId+', "userId":'+localStorage.getItem('userId')+'}'
            }
        );

        fetch(request2)
        .then(response=>response.json())
        .then(response=>{
            this.getData();
        })
        .catch(error=>{
            console.log('Something Went Wrong!');
        })

        this.fetchData(); 

    }

    peon = () =>{
        this.setState({
            focus: true
        })
    }

    peoff = () =>{
        this.setState({
            focus: false
        })
    }


    render(){

        const filledStarElement = (index, id) => {
            return <span key={id}>
                <input className="stars-input" type="text" onClick={this.handleStaring} name={index} id={String(id)} value={String(id)} readOnly/>
                <label className="filled-stars" onMouseEnter={this.peon} onMouseLeave={this.peoff} htmlFor={String(id)}>&#9733;</label>
            </span>
        }

        const emptyStarElement = (index, id) => {
            return <span key={id}>
                <input className="stars-input" type="text" onClick={this.handleStaring} name={index} id={String(id)} value={String(id)} readOnly/>
                <label className="empty-stars" onMouseEnter={this.peon} onMouseLeave={this.peoff} htmlFor={String(id)}>&#9733;</label>
            </span>
        }

        const starElement = (index, rating = 0) => {
            return(
                <div>
                    {[1,2,3,4,5].map(id=>{
                        if(id<=rating){
                            return filledStarElement(index, id);
                        }else{
                            return emptyStarElement(index, id);
                        }
                    })}
                </div>
            )
        }

        return (
            <React.Fragment>
                <main>
                {
                    this.state.books.map((book, index)=>{
                        return(
                                <button className='books' style={{pointerEvents: this.state.focus? 'none':'auto' }} key={book.bookId} value={book.bookId} onClick={this.state.focus? ()=>{} : this.handleClick}>
                                    <div className='book-container'>
                                        <div className="desc-box">
                                            <div className="book-heading-box">
                                                <div>
                                                    <p className="book-title">{book.title}</p>
                                                    <p className="book-author">by-{book.author}</p>
                                                </div>
                                                <div className="rating-info">
                                                    <p>{starElement(null, book.avgRating)}</p>
                                                    <p>{book.ratingCount} Ratings</p>&nbsp;
                                                    <p>{book.reviewCount} Reviews</p>
                                                </div>
                                            </div>
                                            <div className="book-desc">
                                                {book.description}
                                            </div>
                                        </div>
                                        
                                        <div className="thumbnail-box">
                                            <img className="book-thumbnail" src={kite} alt='bookImg' />
                                            <div className="user-rating">
                                                {    
                                                    this.state.isLoggedIn ?
                                                        book.userReview ?
                                                            <div>
                                                                {starElement(index, book.userReview.rating)}
                                                                {/* filled stars */}
                                                            </div>
                                                            :
                                                            <div>
                                                                {starElement(book.bookId)}
                                                                {/* empty stars */}
                                                            </div>
                                                        :
                                                        <div>
                                                            {starElement(book.bookId)}
                                                            {/* empty stars */}
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
                        )
                    })
                }
                </main>
            </React.Fragment>
        )
    }
}

export default withRouter(BookTile);
