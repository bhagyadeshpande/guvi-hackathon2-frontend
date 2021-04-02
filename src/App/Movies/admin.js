import React, { useContext, useEffect, useState } from "react"
import { WrapperContext } from "../index"
import { addMovie, fetchMovies } from "../interactions";

export const AdminMovieList = () =>{
  const {token}=useContext(WrapperContext)
  
  const [movie, setMovie] = useState({movie_id:"",movie_name:"",language:"", genre:"",
  duration:"",release_date:""});
  const [movies, setMovies] = useState([]);
  const [isOpen,toggleOpen]=useState(false);

  const handleMovies = ()=>{
      fetchMovies(token).then((data)=>{
          setMovies(data)
          console.log("data:::",data)
      })
  }

  const handleClose=()=>{
    setMovie({movie_id:"",movie_name:"",language:"", genre:"",
    duration:"",release_date:""});
    toggleOpen(!isOpen)
}

const handleCreate = ()=>{
  const {movie_id,movie_name,language,genre,duration,release_date} = movie;
  addMovie(token, movie_id,movie_name,language,genre,duration,release_date).then(()=>{
      handleMovies();
      handleClose();
  })
}
useEffect(()=>{
  handleMovies();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

if(isOpen)
    return(
        <div className="container-fluid">
            <div className="col-sm-8">
                <form action="">
                    <input 
                    type="text"
                    name="id"
                    className="form-control"
                    required
                    value={movie.movie_id}
                    onChange={(e)=>{
                        setMovie((mov)=>({...mov,movie_id:e.target.value}))
                    }}
                    />
                     <input 
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={movie.movie_name}
                    onChange={(e)=>{
                        setMovie((mov)=>({...mov,movie_name:e.target.value}))
                    }}
                    />
                    
                    <input 
                    type="text"
                    name="language"
                    className="form-control"
                    required
                    value={movie.language}
                    onChange={(e)=>{
                        setMovie((mov)=>({...mov,language:e.target.value}))
                    }}
                    />

                    <input 
                    type="text"
                    name="genre"
                    className="form-control"
                    required
                    value={movie.genre}
                    onChange={(e)=>{
                        setMovie((mov)=>({...mov,genre:e.target.value}))
                    }}
                    />

                    <input 
                    type="text"
                    name="duration"
                    className="form-control"
                    required
                    value={movie.duration}
                    onChange={(e)=>{
                        setMovie((mov)=>({...mov,duration:e.target.value}))
                    }}
                    />

<input 
                    type="text"
                    name="release_date"
                    className="form-control"
                    required
                    value={movie.release_date}
                    onChange={(e)=>{
                        setMovie((mov)=>({...mov,release_date:e.target.value}))
                    }}
                    />

                    <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreate}
                    >Add Movie</button>

                    <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClose}
                    >Cancel</button>

                </form>
            </div>
        </div>
    )

    return(
       <div className="container-fluid">

            <div className="row">
                <h2>Movies List</h2>
            </div>

            <div className="row">
                <button
                onClick={()=>{
                    toggleOpen(!isOpen)
                }}
                >+Add Movie</button>
            </div>

            <div className="row">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Movie_ID</th>
                            <th>Name</th>
                            <th>Language</th>
                            <th>Genre</th>
                            <th>Duration</th>
                            <th>release_date</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {movies?.map((data,index)=>(
                            <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{data.movie_id}</td>
                            <td>{data.movie_name}</td>
                            <td>{data.language}</td>
                            <td>{data.genre}</td>
                            <td>{data.duration}</td>
                            <td>{data.release_date}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

       </div>
    )
}