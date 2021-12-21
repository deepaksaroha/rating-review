import axios from 'axios';
import React from 'react'

class Stars extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rating: 0,
            bookId: '',
            isLoggedIn: false
        }
    }

    componentDidMount(){
        axios.get('/api/users')
        .then(response=>{
            this.setState({
                isLoggedIn: true
            })
        })

        this.setState({
            rating: this.props.rating,
            bookId: this.props.bookId
        })
    }

    filledStarElement = (index) => {
        return <span key={index}>
            <input className="stars-input" type="hidden" onClick={this.handleStaring} name={index} id={index} value={index} readOnly/>
            <label className="filled-stars" onMouseEnter={this.peon} onMouseLeave={this.peoff} htmlFor={index}>&#9733;</label>
        </span>
    }

    emptyStarElement = (index) => {
        return <span key={index}>
            <input className="stars-input" type="hidden" onClick={this.handleStaring} name={index} id={index} value={index} readOnly/>
            <label className="empty-stars" onMouseEnter={this.peon} onMouseLeave={this.peoff} htmlFor={index}>&#9733;</label>
        </span>
    }

    rate=()=>{

    }


    render(){
        return(
            <React.Fragment>
                {
                    [1,2,3,4,5].forEach(i=>{
                        if(i<=this.state.rating){
                            this.filledStarElement(i)
                        }else{
                            this.emptyStarElement(i)
                        }
                    })
                }
            </React.Fragment>
        )
    }
}