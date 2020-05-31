import React from 'react'
import { useSelector } from 'react-redux'
import Nav from '../layout/Nav'
import Liked from '../components/Liked'

function LikedContainer() {

    const { language,region } = useSelector(state => state.movieAPI)

    return (
        <>
            <Nav language={language} region={region} />
            <Liked language={language} region={region} />
        </>
    )
}

export default LikedContainer
