import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import { setUnLikedMovies, setLikedMovies } from '../modules/movieAPI'


const imgPath = process.env.REACT_APP_BASEIMGPATH

function Liked({language, region, category}) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // const [movies, setMovies] = useState([])
    // const [hasMore, setHasMore] = useState(false)
    // const [pageNumber, setPageNumber] = useState(1)    
    
    const dispatch = useDispatch()
    const state = useSelector(state => state.movieAPI)
    const movies = state.likedMovies


    const onSetLike = (e) => {       
        const data = JSON.parse(e.target.value)
        if (data.id) {
            dispatch(setUnLikedMovies(data.id))
        } else {
            dispatch(setLikedMovies(data))
        }
    }

    
    useEffect(() => {
               
        setLoading(false)
        setError(false)
        
    }, [])



    if (error) return <div>에러 발생</div>
    if (movies.length === 0) return <div className="info-msg"><p>찜한 영화가 없습니다.</p></div>
   
    
    return (
        <div className="container-fluid px-lg-5">
            
            <h5 className="mt-5 border-left pl-3 mb-2">찜한영화</h5>

            {/* <Regions category={category} language={language} region={region} onChange={onChange} /> */}
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">
            
                {
                movies.map(movie => 
                    <div key={movie.id}>
                        <div className="card mb-4 mb-lg-5 mt-lg-5 mx-2">
                        <Link to={`/details/${movie.id}`}><img className="card-img-top" src={(movie.poster_path)? `${imgPath}/w780${movie.poster_path}` : "noimg.jpg"} alt={movie.title} title={movie.title} /></Link>
                            <div className="card-body px-0 px-md-3">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">평점 : {movie.vote_average} / 10</p>
                                {/* <p>장르 : {movie.genres.map(genre => genre.name).join(', ')}</p> */}
                                <p>개봉일자 : {movie.release_date}</p>         
                                <Link to={`/details/${movie.id}`} className="btn border-light float-right liked">자세히 보기</Link>
                                {movie.id ?
                                    <button className="btn border-light float-right liked done" value={JSON.stringify(movie)} onClick={onSetLike}>찜취소</button>
                                    :
                                    <button className="btn border-light float-right liked" value={JSON.stringify(movie)} onClick={onSetLike}>찜하기</button>
                                }
                            </div>
                        </div>
                    </div>
                ).reverse()}
                
            </div>
            
            <ScrollToTop />
            <div>{loading && <Loading />}</div>
        </div>
    )
}

export default Liked
