import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  var navigate = useNavigate();
  var [username, setusername] = useState();
  var [password, setpassword] = useState();
  var [result, setresult] = useState();

  var [res, setres] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch("/logincheck", {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      const resJson = await response.json();
      // console.log(resJson.data);
      // setres(resJson.data);
      if (resJson.data != "notlogin") {
        return navigate("/dashboard");
      }
    };
    fetchApi();
  }, []);

  function check() {
    var a = { username: username, password: password };
    const fetchApi = async () => {
      const response = await fetch("/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(a),
      });
      const resJson = await response.json();
      console.log(resJson);
      setresult(resJson.data);
      if (resJson.data === "Valid User") {
        window.location = "/dashboard";
      }
    };
    fetchApi();
  }

  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Log In </h2>
          <div className="fadeIn first">
            <i className=" fa fa-solid fa-user fa-7x"></i>
          </div>
          {/* <!-- Login Form --> */}
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Username"
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <input
            type="button"
            className="fadeIn fourth bg-success"
            value="Log In"
            onClick={check}
          />
          <br></br>
          <br></br>
          {/* <!-- Remind Passowrd --> */}
          <div id="formFooter">
            <Link className="underlineHover" to="/signup">
              Signup
            </Link>
          </div>
        </div>
        {result ? (
          <div>
            <h1 style={{ color:"pink"}}>
              {result}
              {res}
            </h1>
          </div>
        ) : (
          <div>
            <h1></h1>
          </div>
        )}
      </div>
    </div>
  );
}
