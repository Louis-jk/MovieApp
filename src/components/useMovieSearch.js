import { useEffect, useState } from 'react'
import Axios from 'axios'

export default function useMovieSearch(url, api_key, query, language, pageNumber) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [movies, setMovies] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setMovies([])
    }, [query])
 
    useEffect(() => {     
            
            let cancel
            
            Axios({
                method: 'GET',
                url: `${url}/search/movie?api_key=${api_key}&language=${language}&query=${query}&page=${pageNumber}`,
                cancelToken: new Axios.CancelToken(c => cancel = c)
    
            }).then(res => {       
                setMovies(prevMovies => {
                    return [...new Set([...prevMovies, ...res.data.results])]
                })                
                setHasMore(res.data.results.length > 0)
                setLoading(false)    
            }).catch(e => {
                if (Axios.isCancel(e))
                setError(true)
            })
            return () => cancel()
        },[url, api_key, language, query, pageNumber])

    return { loading, error, movies, hasMore }
}

