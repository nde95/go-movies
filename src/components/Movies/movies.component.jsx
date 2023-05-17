import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect( () => {
        let moviesList = [
            {
                id: 1,
                title: "Interstellar",
                releaseDate: "October 26th, 2014",
                runtime: 169,
                mpaa_rating: "PG-13",
                description: "lorem ipsum"
            },
            {
                id: 2,
                title: "Apollo 13",
                releaseDate: "June 30th, 1995",
                runtime: 140,
                mpaa_rating: "PG",
                description: "lorem ipsum"
            },
        ];

        setMovies(moviesList)
    }, []);
    

    return(
        <div>
            <h2>Movies</h2>
            <hr />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                        <th>Runtime</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <Link to={`/movies/${m.id}`}>
                                    {m.title}
                                </Link>
                            </td>
                            <td>{m.releaseDate}</td>
                            <td>{m.mpaa_rating}</td>
                            <td>{m.runtime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Movies; 