import React from 'react'

class Star extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

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
                    [1,2,3,4,5].forEach(i=>{
                        if(i<=this.props.rating){
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

export default Star;