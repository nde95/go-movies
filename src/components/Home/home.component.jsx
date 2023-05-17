import Tickets from '../../assets/images/movie_tickets.png'
import { Link } from 'react-router-dom';


const Home = () => {
    return(
        <>
        <div className="text-center">
            <h2>Search for a movie</h2>
            <hr />
            <Link to="/movies">
            <img src={Tickets} alt="tickets"/>
            </Link>
        </div>
        </>
    )
}

export default Home; 