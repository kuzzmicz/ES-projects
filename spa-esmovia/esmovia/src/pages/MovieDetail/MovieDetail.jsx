import { useContext, useEffect } from "react"
import "./MovieDetail.css"
import { myContext } from "../../app/context"

function MovieDetail () {

    const { state, SetAuth } = useContext(myContext)

    useEffect(()=>{
        console.log(state)
    }, [state])

    return(
        <div className="detail-design">{state.global.movie?.title}</div>
    )
}

export default MovieDetail