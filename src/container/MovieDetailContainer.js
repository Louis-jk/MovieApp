import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MovieDetail from '../components/MovieDetail'
import Nav from '../layout/Nav'

function MovieDetailContainer({match, history}) {

    
    const api_key = process.env.REACT_APP_ACCESSKEY
    const url = process.env.REACT_APP_BASEURL
    const imgPath = process.env.REACT_APP_BASEIMGPATH
    const { language,region } = useSelector(state => state.movieAPI)

    // const movie_id = useSelector(state => state.movieAPI.id)

    const movie_id = match.params.id

    const onChange = (e) => {
        console.log(e)
    }

    return (
        <>
            <Nav language={language} region={region} />
            <MovieDetail movie_id={movie_id} api_key={api_key} url={url} imgPath={imgPath} language={language} region={region} onChange={onChange} history={history} />
        </>
    )
}

export default MovieDetailContainer
