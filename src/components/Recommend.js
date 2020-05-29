import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { setLikedMovies, setUnLikedMovies,  } from '../modules/movieAPI'
import MovieList from './MovieListOpen'


function Recommend({movie_id, url, api_key, language, region, imgPath}) {

    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const state = useSelector(state => state.movieAPI)
    const likedMovies = state.likedMovies

    const onClick = (e) => {
        const id = e.target.value
        dispatch({ type: 'MOVIE_ID', id })
        window.open(`/sub-details/${id}`,'_blank');
    }

    useEffect(() => {
        const fetchmovies = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${url}/movie/${movie_id}/recommendations?api_key=${api_key}&language=${language}`)
                const movies = response.data.results
                setMovies(movies)
                setError(null)
            } catch(err) {
                setError(err)
            }
            setLoading(false)
        }
        fetchmovies();
    }, [url, movie_id, api_key, language])

    const onSetLike = (e) => {       
        const data = JSON.parse(e.target.value)
        if (likedMovies.find(l => l.id === data.id)) {
            dispatch(setUnLikedMovies(data.id))
        } else {
            dispatch(setLikedMovies(data))
        }
    }

    if (loading) return <Loading />
    if (error) return <div className="col-12 mb-5">에러 발생</div>
    if (!movies) return <div className="col-12 mb-5"><h3>추천 영화가 없습니다.</h3></div>


    return (

        <div className="mt-5 col-12">
            <h3>추천영화</h3>

            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">
                { 
                    movies.length === 0 ? <p className="col-12 my-3">추천영화가 없습니다.</p> :
                    movies.map(movie => <div key={movie.id}>                           
                        <MovieList likedMovies={likedMovies} movie={movie} imgPath={imgPath} onClick={onClick} onSetLike={onSetLike} />                        
                    </div>)
                }
            </div>
            
        </div>
    )
}




export default Recommend
