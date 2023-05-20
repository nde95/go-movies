import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "../forms/input.component";
import Select from "../forms/select.component";
import TextArea from "../forms/text-area.component";


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
    });

    // pull id from url
    let { id } = useParams();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return;
        }
    }, [jwtToken, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = () => (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setMovie({...movie, [name]: value });
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

           
           
            </form>
        </div>
    )
}

export default EditMovie; 