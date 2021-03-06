import React from 'react'
import '../Loading.css'

function Loading() {
    return (
        <div className="spinner_bg">
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
        </div>
    )
}

export default Loading
