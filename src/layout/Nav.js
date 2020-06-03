import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'

function Nav() {
   

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand">theMovies</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapseExample" aria-controls="collapseExample" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapseExample">
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
                <li className="nav-item">
                    <NavLink to="/watched" className="nav-link"
                    activeClassName='nav-menu'><em>최근본영화</em></NavLink>
                </li>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Nav
