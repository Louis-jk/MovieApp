import React, { useEffect, useState, useRef } from 'react'
import Loading from './Loading'
import '../App.css'
import Axios from 'axios'
import Recommend from './Recommend'
import Similar from './Similar'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from 'react-redux'
import { setWatchList } from '../modules/movieAPI'
import { findDOMNode } from 'react-dom'

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  }


function MovieDetail ({ history, movie_id, api_key, url, imgPath, language, region }) {  

    const dispatch = useDispatch()

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ trailer, setTrailer ] = useState(null)
    const [ credits, setCredits ] = useState(null)
    const [ details, setDetails ] = useState(null)
    const [ actorVisible, setActorVisible ] = useState(8)
    const [ crewVisible, setCrewVisible ] = useState(8)
    const [ btnMsg01, setBtnMsg01 ] = useState(false)
    const [ btnMsg02, setBtnMsg02 ] = useState(false)

    const slide = useRef()
    const track = useRef()

    useEffect(() => {        
        
        window.scrollTo(0,0)
        dispatch(setWatchList(movie_id))
        
        setLoading(true)
        setError(false)
        
            Axios.get(`${url}/movie/${movie_id}/videos?api_key=${api_key}&language=${language}`)
            .then(res => res.data.results)
            .then(data => setTrailer(data))
            .catch(e => setError(e))

            Axios.get(`${url}/movie/${movie_id}/credits?api_key=${api_key}`)
            .then(res => res.data)
            .then(data => setCredits(data))
            .catch(e => setError(e))

            Axios.get(`${url}/movie/${movie_id}?api_key=${api_key}&language=${language}`)
            .then(res => res.data)
            .then(data => setDetails(data))
            .catch(e => setError(e))

        setLoading(false)            
        
        
    }, [dispatch, url, movie_id, api_key, language])


    if (loading) return <Loading />
    if (error) return <div>에러 발생</div>
    if (!credits) return null    
    if (!details) return null    


    const backgroundImage = {
        position: 'absolute',
        top: 0,
        left: 0,
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

    
 /*    let currentIdx = 0

    const moveSlide = (num) => {     
        let i = 0;
        for (i = 0; i < slide.current.children.length; i++) {
            slide.current.children.item(i).style.transform = `translateX(-${num*130}px)`                        
        } 
        currentIdx = num
    }

    const nextSlide = () => {
        console.log(slide)
        const slideCount = slide.current.children.length
        if(currentIdx < slideCount - 1) {
            moveSlide(currentIdx + 1)
        } else {
            moveSlide(0)
        }
        console.log(currentIdx)
    }

    const prevSlide = () => {
        const slideCount = slide.current.children.length
        if(currentIdx > 0) {
            moveSlide(currentIdx - 1)
        } else {
            moveSlide(slideCount - 1)
        }
        console.log(currentIdx)
    } */

      
    let isDown = false
    let startX
    let scrollLeft

    const onMouseDown = (e) => {
        isDown = true
        for (let i = 0; i < track.current.children.length; i++) {
            track.current.children.item(i).classList.add('active')
        }
        startX = e.pageX - track.current.offsetLeft  

        scrollLeft = track.current.scrollLeft
    }

    const onMouseLeave = () => {
        isDown = false
        for (let i = 0; i < track.current.children.length; i++) {
            track.current.children.item(i).classList.remove('active')
        }
    }
    
    const onMouseUp = () => {
        isDown = false
        for (let i = 0; i < track.current.children.length; i++) {
            track.current.children.item(i).classList.remove('active')
        }
    }
    
    const onMouseMove = (e) => {
        if(!isDown) return
        // e.preventDefault()
        const x = e.pageX - track.current.offsetLeft 
        const walk = x - startX

        track.current.scrollLeft = scrollLeft - walk        
    }

    
    return (
        <div className="container-fluid">
            <div className="mt-4 mt-md-5 mb-4 mb-md-0">
                <Link to="#" onClick={history.goBack} className="backBtn"><i className="fa fa-arrow-left backIcon" aria-hidden="true"></i>뒤로가기</Link>
            </div>
            <div style={ backgroundImage }></div>
            <div className="row px-md-5 py-md-5">
                <div className="row mb-3">
                    <div className="col-md-12 col-lg-5 col-xl-3 mx-3 mx-md-0 ml-xl-3 mb-md-5">
                        <img src={(details.poster_path) ? `${imgPath}/w780${details.poster_path}` : "../noimg.jpg"} className="img-fluid rounded" title={details.title} alt={details.title}/>                    
                    </div>
                    <div className="col-md-12 col-lg-7 col-xl-8 mx-xl-auto details">
                        <div className="mx-3">
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
                    </div>
                </div>

                
                <div className="col-md-12 mt-5">
                    <h5 className="display-6">관련영상</h5>
                    
                    <div className="mb-3 mb-4 my-lg-3">
                        {
                            (!trailer || trailer.length === 0) ? <p className="block">관련영상이 없습니다.</p> :  
                            <Carousel 
                                responsive={responsive} 
                                infinite={true} 
                                removeArrowOnDeviceType={["tablet", "mobile"]} 
                                itemClass="carousel-item-padding-40-px" 
                                autoPlay={false}
                                autoPlaySpeed={1500}
                                keyBoardControl={true}
                                customTransition="all .5s"
                                transitionDuration={500}
                                containerClass="carousel-container"
                            >
                            {  
                            trailer.map(video => 
                                    <div key={video.id} className="trailer-wrap">
                                        <div className="trailer-content">
                                            <iframe title={video.key} src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" scrolling="no" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                )
                            }
                        </Carousel>
                        }
                    </div>                    
                </div>

                <div className="d-lg-flex mt-5">
                    <div className="col-12">
                        <h5 className="display-6">출연배우</h5>   
                        <div className="only-desk">
                            {/* <button className="btn primary" onClick={prevSlide}>Prev</button>
                            <button className="btn primary" onClick={nextSlide}>Next</button> */}
                        </div>
                        
                        {/* { credits.cast.length > 8 ? <button className="btn btn-primary float-right moreBtn" onClick={moreBtn01}>{!btnMsg01 ? '더보기' : '닫기'}</button> : null} */}
                            {              
                                credits.cast.length === 0 ? <p className="row col-12 my-3">배우 정보가 없습니다.</p> :
                                <div className="carousel mb-4 my-lg-3">
                                    <ul 
                                        ref={track} 
                                        className="creditsList-wrap" 
                                        onTouchStart={onMouseMove}
                                        onTouchMove={onMouseDown}
                                        onTouchCancel={onMouseLeave}
                                        onTouchEnd={onMouseUp}
                                        onPointerDown={onMouseDown} 
                                        onPointerLeave={onMouseLeave} 
                                        onPointerUp={onMouseUp} 
                                        onPointerMove={onMouseMove}
                                        onMouseDown={onMouseDown} 
                                        onMouseLeave={onMouseLeave} 
                                        onMouseUp={onMouseUp} 
                                        onMouseMove={onMouseMove}
                                    >
                                        {   
                                            credits.cast.map((actor,idx) => <li key={idx} className='creditsList'>
                                                <Link to={`/person/${actor.id}`}>
                                                    <img src={actor.profile_path? `${imgPath}/w300${actor.profile_path}` : "../noimg.jpg"} className="img-fluid rounded" title={actor.name} alt={actor.name} />
                                                </Link>
                                                <h6>역할명<br />{ actor.character ? actor.character : "-" }</h6><h6>배우명<br />{ actor.name ? actor.name : "정보없음" }</h6>
                                            
                                            </li>) // .slice(0,actorVisible)
                                        }     
                                    </ul>
                                </div>
                            }                 
                    </div>
{/*                     <div className="col-lg-6">
                        <h5 className="primary">제작진</h5>
                        { credits.crew.length > 8 ? <button className="btn btn-primary float-right moreBtn" onClick={moreBtn02}>{!btnMsg02 ? '더보기' : '닫기'}</button> : null}                        
                            {credits.crew.length === 0 ? <p className="row col-12 my-3">제작진 정보가 없습니다.</p> :  
                                <div className="carousel">                              
                                    <ul className="creditsList-wrap">                           
                                        { 
                                            credits.crew.map((staff,idx) => <li key={idx} className='creditsList'>
                                            <Link to={`/person/${staff.id}`}>
                                                <img src={staff.profile_path? `${imgPath}/w300${staff.profile_path}` : "../noimg.jpg"} className="img-fluid rounded" title={staff.name} alt={staff.name} />                                        
                                                <h6>포지션<br />{ staff.job ? staff.job : "-" }</h6><h6>이름<br />{ staff.name ? staff.name : "정보없음" }</h6>
                                            </Link>
                                            </li>) // .slice(0,crewVisible)
                                        }
                                    </ul>
                                </div>
                            }                           
                    </div> */}
                </div>                
                <Recommend movie_id={movie_id} url={url} api_key={api_key} language={language} region={region} imgPath={imgPath} />
                <Similar movie_id={movie_id} url={url} api_key={api_key} language={language} region={region} imgPath={imgPath} />
            </div>            
        </div>
    )
}

export default MovieDetail
