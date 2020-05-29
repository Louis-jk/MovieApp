import React from 'react'
import { useSelector } from 'react-redux'
import MovieSubDetails from '../components/MovieSubDetails'
import Nav from '../layout/Nav'
import ScrollToTop from '../components/ScrollToTop'

function MovieSubDetailsContainer({match, history}) {
    
    const url = process.env.REACT_APP_BASEURL
    const api_key = process.env.REACT_APP_ACCESSKEY
    const imgPath = process.env.REACT_APP_BASEIMGPATH
    const { language,region } = useSelector(state => state.movieAPI)
  

    const movie_id = match.params.id
    console.log(movie_id)

    const onChange = (e) => {
        console.log(e)
    }

    return (
        <>
            <Nav language={language} region={region} />
            <MovieSubDetails movie_id={movie_id} api_key={api_key} url={url} imgPath={imgPath} language={language} region={region} onChange={onChange} history={history} />
            <ScrollToTop />
        </>
    )
}

export default MovieSubDetailsContainer
