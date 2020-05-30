import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import Loading from './Loading'
import { useSelector, useDispatch } from 'react-redux'
import { setLikedMovies, setUnLikedMovies } from '../modules/movieAPI'
import MovieList from './MovieList'

const api_key = process.env.REACT_APP_ACCESSKEY
const url = process.env.REACT_APP_BASEURL
const imgPath = process.env.REACT_APP_BASEIMGPATH

function NowPlaying({language, region, category}) {

    const dispatch = useDispatch()
    const state = useSelector(state => state.movieAPI)
    const likedMovies = state.likedMovies
   
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [movies, setMovies] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)

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

        let cancel
        
        axios({

            method: 'GET',
            url: `${url}/movie/now_playing?api_key=${api_key}&language=${language}&region=${region}&page=${pageNumber}`,
            cancelToken: new axios.CancelToken(c => cancel = c)

        }).then(res => {
            setMovies(prevMovies => {
                return [...new Set([...prevMovies, ...res.data.results])]
            })
            setHasMore(res.data.results.length > 0)
            setLoading(false)

        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
        
    }, [language, region, pageNumber])

    
    const onSetLike = (e) => {       
        const data = JSON.parse(e.target.value)
        if (likedMovies.find(l => l.id === data.id)) {
            dispatch(setUnLikedMovies(data.id))
        } else {
            dispatch(setLikedMovies(data))
        }
    }


    if (error) return <div>에러 발생</div>
    if (!movies) return null
    if (!movies) return <div>개봉할 영화가 없습니다.</div>
    
    return (
        <div className="container-fluid px-lg-5">
            
            <h5 className="mt-5 border-left pl-3 mb-2">현재 상영중인 영화</h5>

            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">                
                {                
                movies.map((movie, index) => 
                    (movies.length === index + 1) ?
                    <div ref={lastMovieElementRef} key={movie.id}>
                        <MovieList likedMovies={likedMovies} movie={movie} imgPath={imgPath} onSetLike={onSetLike} />
                    </div>
                     :                    
                    <div key={movie.id}>
                        <MovieList likedMovies={likedMovies} movie={movie} imgPath={imgPath} onSetLike={onSetLike} />
                    </div>
                    )}
            </div>
            <div>{loading && <Loading />}</div>
            <div>{error && 'Error'}</div>            
        </div>
    )
}

export default NowPlaying
