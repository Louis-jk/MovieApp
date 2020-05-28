import React from 'react'
import { useSelector } from 'react-redux'
import Nav from '../layout/Nav'
import Liked from '../components/Liked'

function LikedContainer() {

    const { language,region } = useSelector(state => state.movieAPI)
    const category = 'popular'

    return (
        <>
            <Nav language={language} category={category} region={region} />
            <Liked category={category} language={language} region={region} />
        </>
    )
}

export default LikedContainer
