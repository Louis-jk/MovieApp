import React from 'react'
import Upcoming from '../components/Upcoming'
import { useSelector } from 'react-redux'
import Nav from '../layout/Nav'

function UpcomingContainer() {

    const { language, region } = useSelector(state => state.movieAPI)
    const category = 'upcoming'
    
    return (
        <>
            <Nav language={language} category={category} region={region} />
            <Upcoming category={category} language={language} region={region} />
        </>
    )
}

export default UpcomingContainer
