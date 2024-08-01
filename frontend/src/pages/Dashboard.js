import React ,{ useEffect, useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';


export default function Dashboard() {
 
  var navigate = useNavigate();
  
  var [res,setres]=useState();
  
  useEffect(()=>{

    const fetchApi = async()=>{
      const response = await fetch('/logincheck',{method:"GET",credentials:"include",headers:{"Content-type": "application/json"}});
      const resJson = await response.json();
      // console.log(resJson);
      setres(resJson.data);
      if(resJson.data === "notlogin"){
        return (navigate("/"));
      }
    }
    fetchApi();

  },[]);


  return (


         <div>
            <div class="wrapper fadeInDown " style={{paddingTop:"170px"}}>
                <div id="formContent">

                    {/* <!-- Tabs Titles --> */}
                    <h2 class="active">Welcome to Login </h2>
                    {/* <h2 class="inactive underlineHover">Sign Up </h2> */}

                    {/* <!-- Icon --> */}
                    <div class="fadeIn first">
                      

                      {res}
                    </div>

                    
                   <Link to="/logout"> <input type="button" class="fadeIn fourth bg-success" value="Log Out"/></Link>


                  
                </div>
            </div>

        </div>



   
  )
}
