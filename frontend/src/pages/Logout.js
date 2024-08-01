import React ,{ useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function Logout() {

  var navigate = useNavigate();
  
  var [res,setres]=useState();
  
  useEffect(()=>{

    const fetchApi = async()=>{
      const response = await fetch('/logout',{method:"GET",credentials:"include",headers:{"Content-type": "application/json"}});
      const resJson = await response.json();
      // console.log(resJson.data);
      setres(resJson.data);
      if(resJson.data === "logout"){
        return (navigate("/"));
      }
      if(resJson.data === "nosession"){
        return (navigate("/"));
      }
      
    }
    fetchApi();

  },[]);

  return (
    <div>
      <h2>{res}</h2>
    </div>
  )
}

