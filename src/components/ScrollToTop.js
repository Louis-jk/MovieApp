import React, { useEffect, useState }  from 'react'

function ScrollToTop() {

    const [scroll, setScroll] = useState()

    useEffect(() => {
        setScroll(false)
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 1000 || document.documentElement.scrollTop < 1000            
            if (isTop !== true) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }, [])    

    const onScrollToUp = () => {
        window.scrollTo({top:0, left:0, behavior:'smooth'})
    }

    return <div className={scroll ? 'toTop active' : 'toTop'} onClick={onScrollToUp}><i className="arrow up"></i></div>
}

export default ScrollToTop
