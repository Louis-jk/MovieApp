import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../App.css'
import Axios from 'axios'
import { setGenres } from '../modules/movieAPI'

const api_key = process.env.REACT_APP_ACCESSKEY
const url = process.env.REACT_APP_BASEURL

function Nav({category, language, region, page}) {

    const dispatch = useDispatch()    

    useEffect(()=>{
        Axios.get(`${url}/genre/movie/list?api_key=${api_key}&language=${language}`)
        .then(res => {            
            dispatch(setGenres(res.data.genres))
        }).catch( e => {
            console.log(e)
        })
    },)

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <a className="navbar-brand" href="/">PROJECT01</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" exact
                    activeClassName='nav-menu'><em>인기영화</em></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/now_playing" className="nav-link"
                    activeClassName='nav-menu'><em>현재 상영영화</em></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/upcoming" className="nav-link" exact
                    activeClassName='nav-menu'><em>개봉 예정영화</em></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/search" className="nav-link"
                    activeClassName='nav-menu'><em>영화검색</em></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/liked" className="nav-link"
                    activeClassName='nav-menu'><em>찜한영화</em></NavLink>
                </li>
                </ul>
                
                {/* <div className="dropdown ml-3">
                    <div className="dropdown-menu-right input-group">
                    <select className="custom-select" id="inputGroupSelect01" onChange={onChange}>
                        <option value="">언어선택</option>
                        <option value="ko-KR">한국어</option>
                        <option value="ja-JP">日本語</option>
                        <option value="en-US">English</option>
                    </select>
                    </div>
                </div> */}
            </div>
        </nav>
        </>
    )
}

export default Nav
