import React from 'react'
import { Link } from 'react-router-dom'


function MovieList({ likedMovies, movie, imgPath, onSetLike, genresList }) {    

    return (
        <div className="card mb-4 mb-lg-5 mt-lg-5 mx-2">
            <img className="card-img-top" src={(movie.poster_path)? `${imgPath}/w780${movie.poster_path}` : "noimg.jpg"} alt={movie.title} title={movie.title} />
            <div className="card-body px-0 px-md-3">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">평점 : {movie.vote_average}</p>   
                <p>장르 : {movie.genre_ids.map(genreId => genreId).join(', ')}</p>                            
                <p>개봉일자 : {movie.release_date}</p>   
                <Link to={`/details/${movie.id}`} className="btn border-light float-right liked">자세히 보기</Link>
                {likedMovies.find(e => e.id === movie.id) ?
                <button className="btn border-light float-right liked done" value={JSON.stringify(movie)} onClick={onSetLike}>찜취소</button>
                :
                <button className="btn border-light float-right liked" value={JSON.stringify(movie)} onClick={onSetLike}>찜하기</button>
                }
            </div>
        </div>
    )
}

export default MovieList
