import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { setLikedMovies, setUnLikedMovies,  } from '../modules/movieAPI'
import MovieList from './MovieList'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 6 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    }
  }


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

            <div>
                { 
                    movies.length === 0 ? <p className="col-12 my-3">추천영화가 없습니다.</p> :
                    <Carousel 
                        responsive={responsive} 
                        infinite={true} 
                        // removeArrowOnDeviceType={["tablet", "mobile"]} 
                        itemClass="carousel-item-padding-40-px" 
                        autoPlay={false}
                        autoPlaySpeed={1500}
                        keyBoardControl={true}
                        customTransition="all .5s"
                        transitionDuration={500}
                        containerClass="carousel-container"                        
                    >
                        {movies.map(movie => <div key={movie.id}>
                            <MovieList likedMovies={likedMovies} movie={movie} imgPath={imgPath} onClick={onClick} onSetLike={onSetLike} />                        
                        </div>)}
                    </Carousel>
                }
            </div>
            
        </div>
    )
}




export default Recommend
