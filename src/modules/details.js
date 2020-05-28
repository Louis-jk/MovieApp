import axios from 'axios'

export const getDetails = (id, api_key, language) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=${language}`)
}

export const getCredits = (id, api_key) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
}