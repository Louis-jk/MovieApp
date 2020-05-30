import React, { useState, useRef, useCallback } from 'react'
import Nav from '../layout/Nav'
import useMovieSearch from './useMovieSearch'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import ScrollToTop from './ScrollToTop'
import { setLikedMovies, setUnLikedMovies } from '../modules/movieAPI'
import MovieList from './MovieList'

const url = process.env.REACT_APP_BASEURL
const api_key = process.env.REACT_APP_ACCESSKEY
const imgPath = process.env.REACT_APP_BASEIMGPATH


function Search() {

    const { language } = useSelector(state => state.movieAPI)
    const dispatch = useDispatch()
    const state = useSelector(state => state.movieAPI)
    const likedMovies = state.likedMovies
    
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const { movies, hasMore, loading, error } = useMovieSearch(url,api_key, query, language, pageNumber)

    const observer = useRef()
    const lastMovieElementRef = useCallback( node => {
        if (loading) return
        if (observer.current) observer.current.disconnect() 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
                // console.log('Visible')
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleSearch(e) {   
        const {value} = e.target
        setQuery(value)
        setPageNumber(1)
    }

    const onClick = (e) => {
        const id = e.target.value
        window.open(`/sub-details/${id}`,'_blank');
    }

    const onSetLike = (e) => {       
        const data = JSON.parse(e.target.value)
        if (likedMovies.find(l => l.id === data.id)) {
            dispatch(setUnLikedMovies(data.id))
        } else {
            dispatch(setLikedMovies(data))
        }
    }

    return (
        <>
            <Nav />
            <div className="container-fluid px-lg-5">
                <div className="d-flex justify-content-center">
                    <div className="search-form">
                        <input type="text" name="search" value={query} onChange={handleSearch} placeholder="영화제목을 검색해보세요." autoComplete="off" />
                        <label htmlFor="search" className="search-label">
                            <span className="content-name">Search</span>
                        </label>
                    </div>
                </div>

                <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">                
                    {                
                    movies.map((movie, index) => 
                        (movies.length === index + 1) ?
                        <div ref={lastMovieElementRef} key={movie.id}>
                            <MovieList likedMovies={likedMovies} movie={movie} imgPath={imgPath} onClick={onClick} onSetLike={onSetLike} />
                        </div> :
                        <div key={movie.id}>
                            <MovieList likedMovies={likedMovies} movie={movie} imgPath={imgPath} onClick={onClick} onSetLike={onSetLike} />
                        </div>
                        )}
                </div>
                
                { loading ? <Loading /> : null }
                <div>{error && 'Error'}</div>                     
            </div>
            <ScrollToTop />
        </>
    )
}

export default Search
