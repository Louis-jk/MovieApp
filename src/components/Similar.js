import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { setLikedMovies, setUnLikedMovies } from '../modules/movieAPI'
import MovieList from './MovieListOpen'

function Similar({movie_id, api_key, language, region, imgPath}) {
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const state = useSelector(state => state.movieAPI)
    const likedMovies = state.likedMovies

    const onClick = (e) => {
        const id = e.target.value
        console.log(id)
        dispatch({ type: 'MOVIE_ID', id })
        // window.location.replace(`/details/${id}`); 
        window.open(`/sub-details/${id}`,'_blank');
    }

    useEffect(() => {
        const fetchmovies = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${api_key}&language=${language}`)
                const recommends = response.data.results
                setMovies(recommends)
                setError(null)
            } catch(err) {
                console.log(err)
            }
            setLoading(false)
        }
        fetchmovies();
    }, [])

    const onSetLike = (e) => {       
        const data = JSON.parse(e.target.value)
        if (likedMovies.find(l => l.id === data.id)) {
            dispatch(setUnLikedMovies(data.id))
        } else {
            dispatch(setLikedMovies(data))
        }
    }

    if (loading) return <Loading />
    if (error) return <div>에러 발생</div>
    if (!movies) return <div><h3>비슷한 장르의 영화가 없습니다.</h3></div>

    return (
        <div className="mt-5 col-12">

            <h3>비슷한 장르의 영화</h3>
            
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">
                {
                    movies.length === 0 ? <p className="col-12 my-3">비슷한 장르의 영화가 없습니다.</p> :
                    movies.map(movie => <div key={movie.id}>                    
                        <MovieList likedMovies={likedMovies} movie={movie} imgPath={imgPath} onClick={onClick} onSetLike={onSetLike} />
                    </div>)
                }
            </div>
            
        </div>
    )
}




export default Similar
