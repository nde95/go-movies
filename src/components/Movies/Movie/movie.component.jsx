import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [movie, setMovie] = useState({});
    let{ id } = useParams();

    useEffect(() => {
        let myMovie = {
            id: 1,
            title: "Interstellar",
            releaseDate: "October 26th, 2014",
            runtime: 169,
            mpaa_rating: "PG-13",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio inventore accusamus, nulla est vel itaque provident consectetur distinctio. Mollitia, autem et minus recusandae illum expedita laboriosam voluptates aspernatur repellendus nulla?"
        }
    setMovie(myMovie);
    }, [id])

    return(
        <div>
            <h2>Movie: {movie.title}</h2>
            <small><em> {movie.releaseDate}, {movie.runtime} minutes long, </em></small> <br />
            <small><em> Rated <strong> {movie.mpaa_rating} </strong> </em></small>
            <hr />
            <p>{movie.description}</p>
        </div>
    )
}

export default Movie; 

