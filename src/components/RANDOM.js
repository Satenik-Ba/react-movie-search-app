
export default function Movie({title, popularity, release_date, image}) {
    return (

          <div >
            <h1>{title}</h1>
            <img src={"https://image.tmdb.org/t/p/w500/"+image} alt = ""></img>
            <p>{popularity}</p>
            <p>{release_date}</p>
        </div>  

    )
}
