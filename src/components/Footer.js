import React from 'react'

function Footer(){
    return (
        <React.Fragment>
            <div style={{backgroundColor: 'rgb(36, 26, 26)', width:'100%', textAlign: 'center', position:'fixed', bottom: '0', padding:'20px', color: 'white'}} className="footer">
                Developed by : Deepak, &nbsp;
                {/* <span style={{color: 'red'}}>&#10084;</span> */}
                <span>Connect over: deepaksaroha@yahoo.com</span>
            </div>
        </React.Fragment>
    )
}

export default Footer;