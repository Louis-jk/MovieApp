import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import '../App.css'
import Axios from 'axios'
import Recommend from './Recommend'
import Similar from './Similar'
import { Link } from 'react-router-dom'


function MovieSubDetails ({ movie_id, api_key, url, imgPath, language, region }) {

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ trailer, setTrailer ] = useState(null)
    const [ credits, setCredits ] = useState(null)
    const [ details, setDetails ] = useState(null)
    const [ actorVisible, setActorVisible ] = useState(8)
    const [ crewVisible, setCrewVisible ] = useState(8)
    const [ btnMsg01, setBtnMsg01 ] = useState(false)
    const [ btnMsg02, setBtnMsg02 ] = useState(false)
    

    const movieDetail = async () => {
        
        setLoading(true)
        setError(false)

        try {            
            const videos = await Axios.get(`${url}/movie/${movie_id}/videos?api_key=${api_key}&language=${language}`)
            const trailer = videos.data.results 
            setTrailer(trailer)

            const credit = await Axios.get(`${url}/movie/${movie_id}/credits?api_key=${api_key}`);
            const credits = credit.data
            setCredits(credits)

            const detail = await Axios.get(`${url}/movie/${movie_id}?api_key=${api_key}&language=${language}`)
            const details = detail.data
            setDetails(details)

        } catch(err) {
            setError(true)
        }

        setLoading(false)
    }

    useEffect(() => {
        movieDetail()
        return () => {
            movieDetail()
        }
    }, [url, movie_id, api_key, language])


    if (loading) return <Loading />
    if (error) return <div>에러 발생</div>
    if (!credits) return null    
    if (!details) return null


    const backgroundImage = {
        position: 'absolute',
        display: 'block',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${imgPath}/w780${details.backdrop_path})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'blur(7px)',
        opacity: '0.5',
        zIndex: '-1'
    }

    const moreBtn01 = (e) => {
        actorVisible <= 8 ? setActorVisible(e.length) : setActorVisible(8)
        setBtnMsg01(!btnMsg01)
    }

    const moreBtn02 = (e) => {
        crewVisible <= 8 ? setCrewVisible(e.length) : setCrewVisible(8)
        setBtnMsg02(!btnMsg02)
    }
    
        
    return (
        <div className="container-fluid">
            <div className="mt-5">
                <a href="/" onClick={window.self.close} style={{"fontSize": 1.3+"rem", "color": "#fff","verticalAlign": "center"}}><i className="fa fa-times" aria-hidden="true" style={{"marginRight": 10 + "px", "marginLeft": 30 + "px"}}></i>닫기</a>
            </div>
            <div style={backgroundImage}></div>
            <div className="row px-md-5 py-md-5">
                <div className="col-md-4 col-xl-3">
                     <img src={(details.poster_path) ? `${imgPath}/w780${details.poster_path}` : "../noimg.jpg"} className="img-fluid rounded" title={details.title} alt={details.title}/>                    
                </div>
                <div className="col-md-8 mx-xl-auto col-xl-8 details">
                    <h3 className="display-4">{details.title}</h3>
                    {/* <p>({(details.adult) ? "미성년자 관람불가" : "미성년자 시청가능"})</p> */}
                    <h5 className="display-5">Original Title : {details.original_title}</h5>
                    <h5 className="mt-5 mb-3">영화 줄거리</h5>
                    <p>{(details.overview) ? details.overview : "작성된 줄거리가 없습니다."}</p>
                    <h5 className="mt-5 mb-3">태그라인</h5>
                    <p>{(details.tagline) ? details.tagline : "작성된 태그라인이 없습니다."}</p>
                    <h5 className="mt-5 mb-3">장르</h5>
                    <p>{(details.genres.map(genre => genre.name)) ? details.genres.map(genre => genre.name).join(', ') : "작성된 장르가 없습니다."}</p>
                    <h5 className="mt-5 mb-3">제조국</h5>
                    <p>{(details.production_countries.map(country => country.name)) ? details.production_countries.map(country => country.name).join(' / ') : "작성된 제조국이 없습니다."}</p>                    
                </div>

                <div className="col-md-12 mt-5">
                    <h5>관련영상</h5>
                    <div className="row inline-block">
                        {
                            trailer.length === 0 ? <p className="block mx-3">관련영상이 없습니다.</p> :
                            trailer.map(video => <div key={video.id} className="mx-3 inline-block"><iframe src={`https://www.youtube.com/embed/${video.key}`} width="400" height="300" frameBorder="0" scrolling="no" allowFullScreen></iframe></div>)
                            .slice(0,5)
                        }
                    </div>
                </div>

                <div className="col-md-12 row mt-5">
                    <div className="col-lg-6">
                        <h5>출연배우</h5>   
                        { credits.cast.length > 8 ? <button className="btn btn-primary float-right moreBtn" onClick={moreBtn01}>{!btnMsg01 ? '더보기' : '닫기'}</button> : null}
                            {              
                                credits.cast.length === 0 ? <p className="row col-12 my-3">배우 정보가 없습니다.</p> :
                                <ul>
                                    {   
                                        credits.cast.map((actor,idx) => <li key={idx} className='creditsList'>
                                        <Link to={`/person/${actor.id}`}>
                                            <img src={actor.profile_path? `${imgPath}/w300${actor.profile_path}` : "../noimg.jpg"} className="img-fluid rounded" title={actor.name} alt={actor.name} />
                                            <h6>역할명<br />{ actor.character ? actor.character : "-" }</h6><h6>배우명<br />{ actor.name ? actor.name : "정보없음" }</h6>
                                        </Link>
                                        </li>).slice(0,actorVisible)
                                    }     
                                </ul>
                            }                 
                    </div>
                    <div className="col-lg-6">
                        <h5>제작진</h5>
                        { credits.crew.length > 8 ? <button className="btn btn-primary float-right moreBtn" onClick={moreBtn02}>{!btnMsg02 ? '더보기' : '닫기'}</button> : null}                        
                            {credits.crew.length === 0 ? <p className="row col-12 my-3">제작진 정보가 없습니다.</p> :                                
                                <ul>                                    
                                    { 
                                        credits.crew.map((staff,idx) => <li key={idx} className='creditsList'>
                                        <Link to={`/person/${staff.id}`}>
                                            <img src={staff.profile_path? `${imgPath}/w300${staff.profile_path}` : "../noimg.jpg"} className="img-fluid rounded" title={staff.name} alt={staff.name} />                                        
                                            <h6>포지션<br />{ staff.job ? staff.job : "-" }</h6><h6>이름<br />{ staff.name ? staff.name : "정보없음" }</h6>
                                        </Link>
                                        </li>).slice(0,crewVisible)
                                    }
                                </ul>
                            }                           
                    </div>
                </div>

                <Recommend movie_id={movie_id} url={url} api_key={api_key} language={language} region={region} imgPath={imgPath} />
                <Similar movie_id={movie_id} url={url} api_key={api_key} language={language} region={region} imgPath={imgPath} />
            </div>
        </div>
    )
}

export default MovieSubDetails
