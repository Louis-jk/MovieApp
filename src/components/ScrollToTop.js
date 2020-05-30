import React, { useEffect, useState }  from 'react'

function ScrollToTop() {

    const [scroll, setScroll] = useState()

    const onScrollToUp = () => {
        window.scrollTo({top:0, left:0, behavior:'smooth'})
    }

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
        return () => setScroll(false)
    }, [])    


    return <div className={scroll ? 'toTop active' : 'toTop'} onClick={onScrollToUp}><i className="arrow up"></i></div>
}

export default ScrollToTop
