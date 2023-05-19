import { Outlet, Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Alert from "./Services/login/alert.component";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none")

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate()

  const logout = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch("/logout", requestOptions)
    .catch(error => {
      console.log("Error logging out", error)
    })
    .finally(() => {
      setJwtToken("");
      toggleRefresh(false)
    })
    navigate("/login")
  }

  const toggleRefresh = useCallback((status) => {
    console.log("clicked")

    if(status) {
      console.log("activiate ticking")
      let i = setInterval(() => {
        const requestOptions = {
          method: "GET",
          credentials: "include",
        }
        fetch("/refresh", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token)
          
          }
        })
        .catch(error => {
          console.log("User is not logged in")
        })
      }, 600000);
      setTickInterval(i);
      console.log("setting tick interval to", i);
    } else {
      console.log("de-activating ticking");
      console.log("clearing interval", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval])

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      }

      fetch("/refresh", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          setJwtToken(data.access_token)
          toggleRefresh(true)
        }
      })
      .catch(error => {
        console.log("User is not logged in", error)
      })
    } 
  }, [jwtToken, toggleRefresh])



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
            :  <a href="#!"> <span onClick={logout} className="badge bg-danger">Log Out</span> </a>
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
         
          <Alert  message={alertMessage} className={alertClassName} />
            
            
          <Outlet context={{
            jwtToken, setJwtToken, setAlertClassName, setAlertMessage, toggleRefresh,
          }}/>
        </div>
      </div>
    </div>
  );
}

export default App;
