import React from 'react'

export default function Credits({credits}) {
    return (
        <div>
            {              
                credits.cast.length === 0 ? <p className="row col-12 my-3">배우 정보가 없습니다.</p> :
                credits.cast.map(actor => <li key={actor.id} className='creditsList'><a href={"/person/"+actor.id}>
                <img src={(actor.profile_path)? "https://image.tmdb.org/t/p/w300"+actor.profile_path : "../noimg.jpg"} className="img-fluid rounded" id={actor.id} onClick={getPersonProfile}/>
                <h6>역할명<br />{ actor.character ? actor.character : "-" }</h6><h6>배우명<br />{ actor.name ? actor.name : "정보없음" }</h6></a>
                </li>)
                
            }
        </div>
    )
}
