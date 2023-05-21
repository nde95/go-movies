import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "../forms/input.component";
import Select from "../forms/select.component";
import TextArea from "../forms/text-area.component";
import CheckBox from "../forms/checkbox.component";


const EditMovie = () => {
    const navigate = useNavigate();
    const { jwtToken } = useOutletContext();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);

    const mpaaOption = [
        {id: "G", value: "G"},
        {id: "PG", value: "PG"},
        {id: "PG-13", value: "PG-13"},
        {id: "R", value: "R"},
        {id: "NC-17", value: "NC-17"},
        {id: "NC-18", value: "NC-18"},
    ]

    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    }

    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        description: "",
        genres: [],
        genres_array: [Array(13).fill(false)],
    });

    // pull id from url
    let { id } = useParams();
    if(id === undefined) {
        id = 0;
    } 

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return;
        }

        if (id === 0) {
            // new movie 
            setMovie({
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                description: "",
                genres: [],
                genres_array: [Array(13).fill(false)],
            })

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: headers,
            }

            fetch(`/genres`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    const checks = [];

                    data.forEach(g => {
                        checks.push({id: g.id, checked: false, genre: g.genre});
                    })

                    setMovie(m => ({
                        ...m,
                        genres: checks,
                        genres_array: [],
                    }))
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            // edit existing movie
        }


    }, [id, jwtToken, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = () => (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setMovie({...movie, [name]: value });
    }

    const handleCheck = (event, position) => {
        console.log("handleCheck called");
        console.log("value in handleCheck:", event.target.value);
        console.log("checked is", event.target.checked);
        console.log("position in handleCheck:", position)
    
        let tmpArr = movie.genres;
        tmpArr[position].checked = !tmpArr[position].checked;

        let tmpIDs = movie.genres_array;
        if(!event.target.checked) {
            tmpIDs.splice(tmpIDs.indexOf(event.target.value));
        } else {
            tmpIDs.push(parseInt(event.target.value, 10));
        }

        setMovie({...movie, genres_array: tmpIDs });
    } 

    return(
        <div>
            <h2>Add or Edit Movie</h2>
            <hr />
            <pre>{JSON.stringify(movie, null, 3)}</pre>

            <form onSubmit={handleSubmit}>

                <input type="hidden" name="id" value={movie.id} id="id"></input>

                <Input title={"Title"} className={"form-control"} type={"text"} name={"title"} value={movie.title} onChange={handleChange("title")} errorDiv={hasError("title") ? "text-danger" : "d-none"} errorMsg={"Please enter a valid title"} />
                <Input title={"Release Date"} className={"form-control"} type={"date"} name={"release_date"} value={movie.release_date} onChange={handleChange("release_date")} errorDiv={hasError("release_date") ? "text-danger" : "d-none"} errorMsg={"Please enter a valid release date"} />
                <Input title={"Runtime (in minutes)"} className={"form-control"} type={"number"} name={"runtime"} value={movie.runtime} onChange={handleChange("runtime")} errorDiv={hasError("runtime") ? "text-danger" : "d-none"} errorMsg={"Please enter a valid runtime"} />
                <Select title={"MPAA Rating"} className={"form-control"} name={"mpaa_rating"} options={mpaaOption} value={movie.mpaa_rating} onChange={handleChange("mpaa_rating")} errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"} errorMsg={"Please enter a valid rating"} />
                <TextArea title="Movie Description" name={"description"} value={movie.description} rows={"3"} onChange={handleChange("description")} errorMsg={"Please enter a description"} errorDiv={hasError("description") ? "text-danger" : "d-none"}  />
            <hr />
           
           <h3>Select Genres</h3>

           {movie.genres && movie.genres.length > 1 &&
                    <>
                        {Array.from(movie.genres).map((g, index) =>
                            <CheckBox
                                title={g.genre}
                                name={"genre"}
                                key={index}
                                id={"genre-" + index}
                                onChange={(event) => handleCheck(event, index)}
                                value={g.id}
                                checked={movie.genres[index].checked}
                            />
                        )}
                    </>

            }
           
            </form>
        </div>
    )
}

export default EditMovie; 