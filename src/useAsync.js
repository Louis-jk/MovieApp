import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function useAsync(callback, deps = []) {

    const state = useSelector(state => state.movieAPI)
    const dispatch = useDispatch()

    const fetchData = async () => {
        dispatch({ type: 'LOADING' })
        try {
            const movies = await callback()
            dispatch({ type: 'SUCCESS', movies })
        } catch(e) {
            dispatch({ type: 'ERROR', error: e })
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, deps)

    return [state, fetchData]
}

export default useAsync
