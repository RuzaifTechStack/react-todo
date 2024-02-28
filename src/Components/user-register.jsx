
import axios from "axios";
import { Field, Formik, useFormik, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

export function UserRegister(){

    let navigate = useNavigate();
    return(
        <div className="d-flex justify-content-center mt-4">
           <div className="bg-dark text-white p-3">
           <Formik initialValues={{
             UserId:'',
             UserName:'',
             Password:'',
             Mobile:'',
             Email:''
           }}
            validationSchema={yup.object({
                UserId:yup.string().required('UserId Required'),
                UserName:yup.string().min(4,'Name too short min 4 char').required('UserName Required'),
                Password: yup.string().required('Password Required'),
                Mobile:yup.string().matches(/\+91\d{10}/,'Invalid Mobile +91 6302120207').required('Mobile Required'),
                Email: yup.string().required('Email Required') 
            })}
            onSubmit={(user)=>{
                axios.post('http://127.0.0.1:7000/register-user', user);
                alert('Registered Successfully..');
                navigate('/login');

            }}
           >
              {
                form =>
                <Form>
                <h2 className="text-danger">Register User</h2>
                <dl>
                    <dt>User Id</dt>
                    <dd> <Field type="text" name="UserId" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="UserId" /></dd>
                    <dt>User Name</dt>
                    <dd><Field type="text" name="UserName" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="UserName" /></dd>
                    <dt>Password</dt>
                    <dd> <Field type="password" name="Password" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="Password" /></dd>
                    <dt>Mobile</dt>
                    <dd><Field type="text" name="Mobile" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="Mobile" /></dd>
                    <dt>Email</dt>
                    <dd><Field type="email" name="Email" className='form-control'></Field></dd>
                    <dd className="text-danger"><ErrorMessage name="Email" /></dd>
                </dl>
                <button disabled={(form.isValid)?false:true} type="submit" className="btn btn-primary w-100">Register</button>
            </Form>
              }
            </Formik>
           </div>
        </div>
    )
}