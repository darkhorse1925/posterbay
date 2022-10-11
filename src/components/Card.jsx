import './card.css'

const Card = ({movie:{imdbID, Year, Poster, Title, Type}}) => {
	return (
		<div className="card">
			<div className="shader">
				<div className="movieInfo">
					<h4 className="movieName">{Title}</h4>
					<h6 className="movieYear">{Year}</h6>
				</div>
			</div>

			<img className="poster" src={Poster} alt={Title} />
		</div>
	)
}
export default Card
