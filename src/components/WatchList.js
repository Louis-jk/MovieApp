import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import MovieList from './MovieList'
import { setUnLikedMovies, setLikedMovies, setPageNumber } from '../modules/movieAPI'
import Loading from './Loading'


export default function WatchList({url, api_key, imgPath, watchList, likedMovies, genres, language, region }) {

    const dispatch = useDispatch()
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [movies, setMovies] = useState([])
    const genresList = genres

    const observer = useRef()

    const lastMovieElementRef = useCallback( node => {
        if (loading) return
        if (observer.current) observer.current.disconnect() 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])
    

    useEffect(() => {

        setLoading(true)
        setError(false)

        watchList.map( id => Axios.get(`${url}/movie/${id}?api_key=${api_key}&language=${language}`)
        .then(res => res.data)
        .then(data => {
            setMovies(prev => [...new Set([...prev.concat(data)])])
            setHasMore(data.length > 0)
            setLoading(false)  
        
        })
        .catch(e => setError(e))
        )
        
    }, [watchList, url, api_key, language])

    const onSetLike = (e) => {       
        const data = JSON.parse(e.target.value)
        if (likedMovies.find(l => l.id === data.id)) {
            dispatch(setUnLikedMovies(data.id))
        } else {
            dispatch(setLikedMovies(data))
        }
    }    

    if (error) return <div>에러 발생</div>
    if (movies.length === 0) return <div className="info-msg"><p>최근 본 영화가 없습니다.</p></div>

    return (
        <div className="container-fluid px-lg-5">
            <h5 className="mt-5 border-left pl-3 mb-2">최근 본 영화</h5>            
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">                
                {
                movies.map((movie, index) => 
                    (movies.length === index + 1) ?                        
                        <div ref={lastMovieElementRef} key={movie.id}>
                            <MovieList likedMovies={likedMovies} movie={movie} genres={genres} genresList={genresList} imgPath={imgPath} onSetLike={onSetLike} />
                        </div>
                        :
                        <div key={movie.id}>
                            <MovieList likedMovies={likedMovies} movie={movie} genres={genres} genresList={genresList} imgPath={imgPath} onSetLike={onSetLike} />
                        </div>
                    ).reverse()}
            </div>
            <div>{loading && <Loading />}</div>
            <div>{error && 'Error'}</div>            
        </div>
    )
}
