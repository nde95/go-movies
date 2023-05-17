import Tickets from '../../assets/images/movie_tickets.png'

const Home = () => {
    return(
        <>
        <div className="text-center">
            <h2>Search for a movie</h2>
            <hr />
            <img src={Tickets} alt="tickets"/>
        </div>
        </>
    )
}

export default Home; 