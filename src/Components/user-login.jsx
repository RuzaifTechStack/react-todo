import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export function UserLogin(){

    const [Users, SetUsers] = useState([]);
    const [cookie, setcookie, removecookie] = useCookies('userid');

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://127.0.0.1:7000/users')
        .then(response=>{
            SetUsers(response.data);
        });
    },[]);

    const formik = useFormik({
        initialValues: {
            UserId:'',
            password:''
        },
        onSubmit: (formdata)=>{
          var userdetails = Users.find(user=> user.UserId===formdata.UserId);
          if(userdetails.Password===formdata.Password){
            setcookie('userid',formdata.UserId);
            navigate('/dashboard');
            window.location.reload();
          }else{
            navigate('/invalid');
          }
        }
    })
    return(
        <div className="d-flex justify-content-center mt-4">
           <div className="bg-dark text-white p-3">
             <form onSubmit={formik.handleSubmit}>
                <h2>User Login</h2>
                <dl>
                    <dt>User Id</dt>
                    <dd><input className="form-control" type="text" name="UserId" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input className="form-control" type="password" name="Password" onChange={formik.handleChange} /></dd>
                    <button className="btn btn-warning w-100">Login</button>
                </dl>
             </form>
            </div> 
        </div>
    )
}