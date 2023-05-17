import { Outlet, Link } from "react-router-dom";
import Movies from "./components/Movies/movies.component";
import { useState } from "react";


function App() {
  const [jwtToken, setJwtToken] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Let's watch a movie</h1>
        </div>
          <div className="col text-end">
            {/* login conditional */}
            {jwtToken === ""
            ?  <Link to="/login"><span className="badge bg-success">Login</span></Link>
            :  <a href="#!"> <span className="badge bg-danger">Log Out</span> </a>
            }
        </div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
              {/* admin routes  */}
              {jwtToken !== "" && 
              <>
              <Link to="/admin/movie/0" className="list-group-item list-group-item-action">Add Movies</Link>
              <Link to="/manage-catalogue" className="list-group-item list-group-item-action">Manage Catalogue</Link>
              <Link to="/graphql" className="list-group-item list-group-item-action">GraphQL</Link>
              </>
              }            
              </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
