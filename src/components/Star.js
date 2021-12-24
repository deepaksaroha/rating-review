import React from 'react'

class Star extends React.Component{

    changeRating=(e)=>{
        this.props.changeRating(parseInt(e.target.id));        
    }


    filledStarElement = (index) => {
        return <div style={{display: "inline-block", color: "orange"}} key={index} id={index} onClick={this.changeRating}>&#9733;</div>
    }

    emptyStarElement = (index) => {
        return <div style={{display: "inline-block", color: "grey"}} key={index} id={index} onClick={this.changeRating}>&#9733;</div>
    }

    render(){
        return(
            <React.Fragment>
                {
                    [1,2,3,4,5].map(i=>{
                        if(i<=parseInt(this.props.rating)){
                            return this.filledStarElement(i)
                            // return <div style={{display: "inline-block", color: "orange"}} id={i} onClick={this.changeRating}>&#9733;</div>
                        }else{
                            return this.emptyStarElement(i)
                            // return <div style={{display: "inline-block", color: "grey"}} id={i} onClick={this.changeRating}>&#9733;</div>
                        }
                    })
                }
            </React.Fragment>
        )
    }
}

export default Star;