// action type
const LOADING = 'LOADING'
const SET_MOVIELIST = 'SET_MOVIELIST'
const SET_LIKED_MOVIES = 'SET_LIKED_MOVIES'
const SET_UNLIKED_MOVIES = 'SET_UNLIKED_MOVIES'
const SET_MOVIES_NOWPLAYING = 'SET_MOVIES_NOWPLAYING'
const SET_MOVIES_UPCOMING = 'SET_MOVIES_UPCOMING'
const SET_MOVIES_POPULAR = 'SET_MOVIES_POPULAR'
const ERROR = 'ERROR'
const SET_LANGUAGE = 'SET_LANGUAGE'
const SET_REGION = 'SET_REGION'
const DETAILS = 'DETAILS'
const CREDITS = 'CREDITS'
const RECOMMEND = 'RECOMMEND'
const MOVIE_ID = 'MOVIE_ID'
const PERSON_ID = 'PERSON_ID'
const TRAILER = 'TRAILER'
const SET_HASHMORE = 'SET_HASHMORE'
const SET_PAGENUMBER = 'SET_PAGENUMBER'
const SET_GENRES = 'SET_GENRES'
const SET_LIKEMOVIEID = 'SET_LIKEMOVIEID'
const SET_UNLIKEMOVIEID = 'SET_UNLIKEMOVIEID'
const SET_WATCHLIST = 'SET_WATCHLIST'


// action method

export const setMovieList = (movies) => ({ type: SET_MOVIELIST, movies })
export const setHashMore = payload => ({ type: SET_HASHMORE, payload})
export const setPageNumber = number => ({ type: SET_PAGENUMBER, number })
export const setLikedMovies = movies => ({ type: SET_LIKED_MOVIES, movies})
export const setUnLikedMovies = id => ({ type: SET_UNLIKED_MOVIES, id})
export const setMoviesNow = movies => ({ type: SET_MOVIES_NOWPLAYING, movies})
export const setMoviesUp = movies => ({ type: SET_MOVIES_UPCOMING, movies})
export const setMoviesPop = movies => ({ type: SET_MOVIES_POPULAR, movies})
export const setGenres = data => ({ type: SET_GENRES, data })

export const setLikeMovieId = id => ({ type: SET_LIKEMOVIEID, id})
export const setUnLikeMovieId = id => ({ type: SET_LIKEMOVIEID, id})
export const setLang = language => ({ type: SET_LANGUAGE, language })
export const setRegion = region => ({ type: SET_REGION, region })
export const setDetails = details => ({ type: DETAILS, details })
export const setCredits = credits => ({ type: CREDITS, credits })
export const setId = id => ({ type: MOVIE_ID, id })
export const setRecommend = recommends => ({ type: RECOMMEND, recommends })
export const setTrailer = trailer => ({ type: TRAILER, trailer})
export const setWatchList = id => ({ type: SET_WATCHLIST, id })


// initialize
const initialState = {
    loading: false,
    hasMore: false,
    movieList: [],
    likedMovies: [],
    likeMovieId: [],
    genres: [],
    apis:{
        nowPlaying: [],
        upComing: [],
        popular: []
    },
    pageNumber: 1,
    details: '',
    credits: '',    
    language : 'ko-KR',
    region: 'KR',
    recommends : '',
    personId: '',
    trailer: '',
    watchList: [],
    error: null
}

// reducer create
export default function setLangRegion(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_MOVIELIST:
            return {
                loading: false,          
                ...state,
                movieList: 
                        state.movieList.concat({...action.movies, like: false}),
                apis: {
                    ...state.nowPlaying,
                    ...state.upComing,
                    ...state.popular
                },
            }
        case SET_HASHMORE: 
            return {
                ...state,
                hasMore: true
            }
        case SET_LIKED_MOVIES:
            return {     
                loading: false,    
                ...state,
                likedMovies: [
                    ...state.likedMovies,
                    action.movies                    
                ]
            }
        case SET_UNLIKED_MOVIES:
            return {     
                loading: false,    
                ...state,
                likedMovies: [
                    ...state.likedMovies.filter(likedMovies => likedMovies.id !== action.id)
                ]
            }
        case SET_LIKEMOVIEID:
            return {
                loading: false,
                likeMovieId: [
                    ...state.likeMovieId,
                    action.id
                ]
            }
        case SET_UNLIKEMOVIEID:
            return {
                loading: false,
                likeMovieId: [
                    ...state.likeMovieId.filter(likeMovieId => likeMovieId.id !== action.id)
                ]
            }
        case SET_GENRES:
            return {
                ...state,
                genres: state.genres.concat(...action.data)
            }
        case SET_MOVIES_NOWPLAYING:
            return {        
                ...state,
                apis: {
                    nowPlaying: action.movies,
                    ...state.upComing,
                    ...state.popular
                },
            }
        case SET_MOVIES_UPCOMING:
            return {        
                ...state,
                apis: {
                    ...state.nowPlaying,
                    upComing: action.movies,
                    ...state.popular
                },
            }
        case SET_MOVIES_POPULAR:
            return {        
                ...state,
                apis: {
                    ...state.nowPlaying,
                    ...state.upComing,
                    popular: [
                        ...action.movies
                    ],
                },
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        case SET_REGION:
            return {
                ...state,
                region: action.region
            }
        case SET_PAGENUMBER:
            return {
                ...state,
                pageNumber: action.number
            }
        case DETAILS:
            return { 
                ...state,
                details: action.details,
            }
        case CREDITS:
            return {
                ...state,
                credits: action.credits,
            }
        case RECOMMEND: 
            return {
                ...state,
                recommends : action.recommends
            }          
        case MOVIE_ID: 
            return {
                ...state,
                id: action.id
            }        
        case PERSON_ID: 
            return {
                ...state,
                personId: action.personId
            }
        case TRAILER: 
            return {
                ...state,
                trailer: action.trailer
            }        
        case SET_WATCHLIST: 
            return {
                ...state,
                watchList: [
                    ...new Set([...state.watchList,
                    action.id]
                    )
                ]
            }
        case ERROR:
            return {
                loading: false,
                ...state,
                error: action.error
            }
        default:
            return state
    }
}
