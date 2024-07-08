import { useContext, useEffect } from "react"
import "./MovieDetail.css"
import { myContext } from "../../app/context"

function MovieDetail () {

    const { state, SetAuth } = useContext(myContext)

    useEffect(()=>{
        console.log(state)
    }, [state])

    return(
        <div className="detail-design">
        <div className="movie-container">
        <img src={"https://image.tmdb.org/t/p/w500/"+state.global.movie?.poster_path}/>
        <div className="second-movie-container"><h1>{state.global.movie?.title}</h1>
        <p>{state.global.movie?.overview}</p></div>
        </div>
        </div>
    )
}

export default MovieDetail