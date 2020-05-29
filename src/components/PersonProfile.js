import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import '../App.css'
import Nav from '../layout/Nav'
import ScrollToTop from './ScrollToTop'
import { setLikedMovies, setUnLikedMovies } from '../modules/movieAPI'

const api_key = process.env.REACT_APP_ACCESSKEY
const url = process.env.REACT_APP_BASEURL
const imgPath = process.env.REACT_APP_BASEIMGPATH

function PersonProfile({history, match}) {

    const dispatch = useDispatch()
    const state = useSelector(state => state.movieAPI)
    const likedMovies = state.likedMovies
    const { language } = state

    const personId = match.params.id

    const [person, setPerson] = useState(null)
    const [castMovies, setCastMovies] = useState(null)
    const [crewMovies, setCrewMovies] = useState(null)
    const [images, setImages] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchmovies = async () => {
        try {
            setLoading(true)
            const response = await Axios.get(`${url}/person/${personId}?api_key=${api_key}&language=${language}`)
            const person = response.data
            setPerson(person)
           
            const personCastRes = await Axios.get(`${url}/person/${personId}/movie_credits?api_key=${api_key}&language=${language}`)
            const castMovies = personCastRes.data.cast
            setCastMovies(castMovies)

            const personCrewRes = await Axios.get(`${url}/person/${personId}/movie_credits?api_key=${api_key}&language=${language}`)
            const crewMovies = personCrewRes.data.crew
            setCrewMovies(crewMovies)

            const personImage = await Axios.get(`${url}/person/${personId}/images?api_key=${api_key}`)
            const images = personImage.data.profiles
            setImages(images)
            
        } catch(err) {
            setError(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchmovies()
    }, [url, personId, api_key, language])

 
    if (loading) return <Loading />
    if (error) return <div>에러 발생</div>
    if (!castMovies) return <div>추천영화가 없습니다.</div>
    
    const onClick = (e) => {
        const id = e.target.value
        dispatch({ type: 'MOVIE_ID', id })
        window.location.replace(`/details/${id}`); 
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
        <div className="container-fluid">
            <div className="mt-5">
                <a href="#" onClick={history.goBack} style={{"fontSize": 1.3+"rem", "color": "#fff","verticalAlign": "center"}}><i className="fa fa-arrow-left" aria-hidden="true" style={{"marginRight": 10 + "px", "marginLeft": 30 + "px"}}></i>뒤로가기</a>
            </div>

            <div className="row px-md-5 py-md-5">
                <div className="col-md-4 col-xl-3 ">
                    <img src={ person.profile_path ? `${imgPath}/w500${person.profile_path}` : "../noimg.jpg" } title={person.name} alt={person.name} />
                </div>
                <div className="col-md-8 mx-xl-auto col-xl-8 details">
                    <h3 className="display-4 mb-5">{ person.name ? person.name : "정보가 없습니다."}</h3>
                    <div className="row col-12">
                        <div className="col-12 col-lg-4">
                            <h4 className="display-5 mb-3">잘 알려진 이름</h4>
                            <ul>
                                {
                                    person.also_known_as.length === 0 ? <li><p>알려진 이름의 정보가 없습니다.</p></li> :
                                    person.also_known_as.map((name,index) => <li key={index} className="text-white"><p>{name}</p></li>)
                                    
                                }
                            </ul>
                        </div>
                        <div className="col-12 col-lg-4">
                            <h4 className="display-5">생년월일</h4>
                            <p>{ person.birthday ? person.birthday : "정보가 없습니다."}</p>
                        </div>
                        <div className="col-12 col-lg-4">
                            <h4 className="display-5">태어난곳</h4>
                            <p>{ person.place_of_birth ? person.place_of_birth : "정보가 없습니다." }</p> 
                        </div>      
                    </div>                                 
                </div>

                <div className="col-12 my-5">       
                    <h3 className="col-12 mt-5">갤러리</h3>
                        {                            
                            images.map((img,index) => <div key={index}><img src={`${imgPath}/w185${img.file_path}`} alt={img.file_path} /></div>)
                        }
                </div>

                <div className="mt-5 col-12">
                    <h3 className="sub_title">{ person.name ? person.name : "정보가 없습니다."} 의 출연 영화</h3>
                    
                    <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">
                        {   castMovies.length === 0 ? <p className="block mx-3">출연한 영화가 없습니다.</p> :
                            castMovies.map(movie => <div key={movie.id}>                    
                            <div className="card mb-4 mb-lg-5 mt-lg-5 mx-2">
                                <img className="card-img-top" src={(movie.poster_path)? `${imgPath}/w500${movie.poster_path}` : "../noimg.jpg" } title={movie.title} alt={movie.title} />
                                <div className="card-body px-0 px-md-1">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">평점 : {movie.vote_average}</p>
                                    <p>장르 : {movie.genre_ids.map(genreId => genreId+',')}</p>                            
                                    <p>개봉일자 : {movie.release_date}</p>
                                    <button className="btn border-light float-right" value={movie.id} onClick={onClick}>자세히 보기</button>
                                    {likedMovies.find(e => e.id === movie.id) ?
                                        <button className="btn border-light float-right liked done" value={JSON.stringify(movie)} onClick={onSetLike}>찜취소</button>
                                        :
                                        <button className="btn border-light float-right liked" value={JSON.stringify(movie)} onClick={onSetLike}>찜하기</button>
                                    }
                                </div>
                            </div>
                            </div>)}
                    </div>
                </div>

                <div className="mt-5 col-12 crew_bg">
                    <h3 className="sub_title">{ person.name ? person.name : "정보가 없습니다."} 의 제작 참여 영화</h3>
                    
                    <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5">
                        {   crewMovies.length === 0 ? <p className="block mx-3">제작에 참여한 영화가 없습니다.</p> :
                            crewMovies.map(movie => 
                            <div key={movie.id}>                    
                                <div className="card mb-4 mb-lg-5 mt-lg-5 mx-2">
                                    <img className="card-img-top" src={(movie.poster_path)? "https://image.tmdb.org/t/p/w500"+movie.poster_path : "../noimg.jpg"} title={movie.title} alt={movie.title} />
                                    <div className="card-body px-0 px-md-1">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">평점 : {movie.vote_average}</p>
                                        <p>장르 : {movie.genre_ids.map(genreId => genreId+',')}</p>                            
                                        <p>개봉일자 : {movie.release_date}</p>
                                        <button className="btn border-light float-right" value={movie.id} onClick={onClick}>자세히 보기</button>
                                        {likedMovies.find(e => e.id === movie.id) ?
                                            <button className="btn border-light float-right liked done" value={JSON.stringify(movie)} onClick={onSetLike}>찜취소</button>
                                            :
                                            <button className="btn border-light float-right liked" value={JSON.stringify(movie)} onClick={onSetLike}>찜하기</button>
                                        }
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>            
            </div>
            <ScrollToTop />
            </>
        )
    }

export default PersonProfile
