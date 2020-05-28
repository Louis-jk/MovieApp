import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const api_key = process.env.REACT_APP_ACCESSKEY
const url = process.env.REACT_APP_BASEURL

function Regions({language, region, category, page}) {

    const state = useSelector(state => state.movieAPI)
    const dispatch = useDispatch()


    const onChange = (e) => {
        const region = e.target.value
        
        const redirectMovies = async () => {
            try {
                
                const response = await axios.get(`${url}/movie/${category}?api_key=${api_key}&language=${language}&region=${region}&page=${page}`)
                const movies = response.data.results
                if (category === 'now_playing') dispatch({ type: 'SET_MOVIES_NOWPLAYING', movies })
                if (category === 'upcoming') dispatch({ type: 'SET_MOVIES_UPCOMING', movies })
                if (category === 'popular') dispatch({ type: 'SET_MOVIES_POPULAR', movies })
                dispatch({ type:'SET_REGION', region: region }) 
                 
            } catch(err) {
                console.log(err)
            }            
        }
        redirectMovies();
        }

    return (
        <div className="dropdown-menu-right input-group my-3">
            <select className="custom-select col-lg-1" id="inputGroupSelect01" onChange={onChange}>
            <option>국가 선택</option>
                <option value="KR" name="region">한국</option>
                <option value="JP" name="region">일본</option>
                <option value="US" name="region">미국</option>
                {/* <option value="DE" name="region">독일</option>
                <option value="FR" name="region">프랑스</option>
                <option value="AU" name="region">호주</option>
                <option value="CN" name="region">중국</option>
                <option value="ES" name="region">스페인</option>
                <option value="GB" name="region">영국</option>
                <option value="CA" name="region">캐나다</option>
                <option value="NZ" name="region">뉴질랜드</option> */}
            </select>
        </div>
    )
}

export default Regions
