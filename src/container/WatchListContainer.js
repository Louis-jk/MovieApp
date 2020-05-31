import React from 'react'
import { useSelector } from 'react-redux'
import Nav from '../layout/Nav'
import WatchList from '../components/WatchList'
import ScrollToTop from '../components/ScrollToTop'

const api_key = process.env.REACT_APP_ACCESSKEY
const url = process.env.REACT_APP_BASEURL
const imgPath = process.env.REACT_APP_BASEIMGPATH

export default function WatchListContainer() {

    const state = useSelector(state => state.movieAPI)
    const { watchList, likedMovies, genres, language, region } = state

    return (
        <>
            <Nav language={language} region={region} />
            <WatchList 
                watchList={watchList}
                likedMovies={likedMovies} 
                api_key={api_key} 
                url={url} 
                imgPath={imgPath} 
                language={language} 
                genres={genres}
            />
            <ScrollToTop />
        </>
    )
}
