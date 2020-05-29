import React from 'react'
import { useSelector } from 'react-redux'
import Popular from '../components/Popular'
import Nav from '../layout/Nav'
import ScrollToTop from '../components/ScrollToTop'

function PopularContainer() {

    const { language,region } = useSelector(state => state.movieAPI)
    const category = 'popular'

    return (
        <>
            <Nav language={language} category={category} region={region} />
            <Popular category={category} language={language} region={region} />
            <ScrollToTop />
        </>
    )
}

export default PopularContainer
