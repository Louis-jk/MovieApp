import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMovieSearch(api_key, query, language, pageNumber) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [movies, setMovies] = useState([])
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {
        setMovies([])
    }, [query])
 
    useEffect(() => {     
    
            let cancel
            
            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=${language}&query=${query}&page=${pageNumber}`,
                cancelToken: new axios.CancelToken(c => cancel = c)
    
            }).then(res => {            
                console.log(res.data)
                setMovies(prevMovies => {
                    return [...new Set([...prevMovies, ...res.data.results])]
                })                
                setHasMore(res.data.results.length > 0)
                setLoading(false)    
            }).catch(e => {
                if (axios.isCancel(e)) return
            })
            return () => cancel()
        },[api_key, language, query, pageNumber])

    return { loading, error, movies, hasMore }
}

