import {useState, useEffect} from 'react'
import './style.css'
import Card from './components/Card'
import Particle from './components/Particle'

function App() {
	const [searchTerm, setSearchTerm] = useState('animated')
	const [isLoading, setisLoading] = useState(true)
	const [isError, setisError] = useState(false)
	const [movies, setMovies] = useState([])
	const [pages, setPages] = useState([])
	const [pageQuerry, setPageQuerry] =useState(1)
	let searchString =''

	function handleKeyPress(e) {
		if(e.key === 'Enter' && !searchString.match(/^\s*$/)) {
			setisLoading(true)
			setSearchTerm(searchString)
			setPageQuerry(1)
		}
	}

	const getData = async() =>{
		try {
			//enter omdb api key to make it work 
			const res = await fetch(`http://www.omdbapi.com?apikey=YOUR_API_KEY&s=${searchTerm}&page=${pageQuerry}`)
			const data= await res.json()
			const result = data.totalResults
			if(!result)
				throw setisError(true)
			const totalResults = data.totalResults > 99 ? 10 : Math.floor(data.totalResults/10 + 1)
			const movieList= data.Search.filter((s)=> s.Poster !== 'N/A' )

			setPages([])
			for ( let i= 0 ; i < totalResults; i++) {
				setPages(oldArray => [...oldArray,i+1])
			}
			if (!movieList || movieList=== []) {
				throw setisError(true)
			}
			setMovies(movieList)
			setisLoading(false)
			setisError(false)
		} catch (err) {
			setisLoading(false)
		}
	}

	useEffect( ()=>{
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[searchTerm, pageQuerry])

	function handlePage(e) {
		setPageQuerry(e.target.innerHTML)
	}

  return (
		<div className="container">
			<Particle/>
			<div className="title">
				<h2 className="glow">PosterBay</h2>
				<div className="searchContainer">
					<input className="searchInput" placeholder='Search ... ' 
						onChange={(e) => searchString = e.target.value}
						onKeyDown = {handleKeyPress}/>
				</div>
			</div>

			{isLoading && <div className="loader"></div> }

			{isError ? <div className="error">Oops! Could not find your data.</div> :
			<div className="movieContainer">
				{movies.map((movie) => (
					<Card movie={movie} key={movie.imdbID}/>
				))}
			</div>}
			
			{isError ? '':<div className="pagination">
				{pages.map((page)=>(
					<div className="pageIcon" onClick={handlePage} key={page}>{page}</div>
				))}
			</div>
			}
		</div>
	)
}

export default App;
