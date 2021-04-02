import React, { useContext, useEffect, useState } from "react"
import { WrapperContext } from "../index"
import { fetchMovies } from "../interactions";


export const UserMovieList = () =>{
  const {token}=useContext(WrapperContext)  
  const [movies, setMovies] = useState([]);  

  const handleMovies = ()=>{
      fetchMovies(token).then((data)=>{
          setMovies(data)
          console.log("data:::",data)
      })
  }

  useEffect(()=>{
    handleMovies();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
return(
    <div className="container-fluid">
      <div className="row">
      <h2>Movies List</h2>
      </div>
      <div className="row">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Movie_Id</th>
                            <th>Movie Name</th>
                            <th>Language</th>
                            <th>genre</th>
                            <th>Duration Url</th>
                            <th>Release Date</th>
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
