import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
export default function Signup() {

  var navigate = useNavigate();
  var [name, setname] = useState();
  var [username, setusername] = useState();
  var [password, setpassword] = useState();
  var [role, setrole] = useState();
  var [result, setresult] = useState();

  function send() {

    var a = { name : name, username : username, password : password , role : role};
    const fetchApi = async () => {
      // const url=`http://localhost:8080/login`;
      const response = await fetch("/signup", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(a) });
      const resJson = await response.json();
      console.log(resJson);
      setresult(resJson.data)
      if (resJson.data === "Register Secussfully") {
         return (navigate("/")) ;
      }
    }
    fetchApi();

  }

  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign Up </h2>
          <div className="fadeIn first">
            <i className=" fa fa-solid fa-user fa-7x"></i>
          </div>
          {/* <!-- Login Form --> */}
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="Name" onChange={(e) => { setname(e.target.value) }} /><br></br><br></br>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="Username" onChange={(e) => { setusername(e.target.value) }} /><br></br><br></br>
          <input type="text" id="password" className="fadeIn third" name="login" placeholder="Password" onChange={(e) => { setpassword(e.target.value); }} /><br></br><br></br>
          <input type="text" id="password" className="fadeIn third" name="login" placeholder="Role" onChange={(e) => { setrole(e.target.value); }} /><br></br><br></br>
          <input type="button" className="fadeIn fourth bg-success" value="Sign Up" onClick={send} /><br></br><br></br>
          {/* <!-- Change page --> */}
          <div id="formFooter">
            <Link className="underlineHover" to="/">Login</Link>
          </div>
        </div>
        {result ? (<div><h1>{result}</h1></div>) : (<div><h1></h1></div>)}
      </div>
    </div>
  );
}
