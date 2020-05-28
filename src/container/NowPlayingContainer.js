import React from 'react'
import Nowplaying from '../components/NowPlaying'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../layout/Nav'


function NowPlayingContainer() {

    const { language,region } = useSelector(state => state.movieAPI)
    const category = 'now_playing'

    return (
        <>
            <Nav language={language} category={category} region={region} />
            <Nowplaying category={category} language={language} region={region} />
        </>
    )
}

export default NowPlayingContainer
