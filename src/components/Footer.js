import React from 'react'
import '../css/Footer.css'

function Footer(){
    return (
        <React.Fragment>
            <div className="footer-box"></div>
            <div className="footer-text">
                Developed by : Deepak,  
                {/* <span style={{color: 'red'}}>&#10084;</span> */}
                Connect over: deepaksaroha@yahoo.com
            </div>
        </React.Fragment>
    )
}

export default Footer;