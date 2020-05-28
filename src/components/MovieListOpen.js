import React from 'react'

function MovieList({likedMovies, movie, imgPath, onSetLike, onClick}) {
    return (
        <div className="card mb-4 mb-lg-5 mt-lg-5 mx-2">
            <img className="card-img-top" src={(movie.poster_path)? `${imgPath}/w780${movie.poster_path}` : "../noimg.jpg"} alt={movie.title} title={movie.title} />
            <div className="card-body px-0 px-md-3">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">평점 : {movie.vote_average}</p>
                <p>장르 : {movie.genre_ids.map(genreId => genreId+',')}</p>                            
                <p>개봉일자 : {movie.release_date}</p>   
                <button className="btn border-light float-right liked" value={movie.id} onClick={onClick}>자세히 보기</button>
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
