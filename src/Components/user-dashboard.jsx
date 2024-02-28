import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

export function UserDashboard(){

    const [cookies, setcookie, removecookie] = useCookies('userid');

    const [Appointments, SetAppointments] = useState([{Appointment_Id:0, Title:'', Description:'', Date:''}]);

    const [EditTasks, SetEditTask] = useState([{Appointment_Id:0, Title:'', Description: '', Date: ''}]);

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:7000/appointments/${cookies['userid']}`)
        .then(response=>{
           SetAppointments(response.data);
        })
    },[])

    function handleSignout(){
        removecookie('userid');
        navigate('/login');
        window.location.reload();  
    }
 
    function handleDelete(e){
        axios.delete(`http://127.0.0.1:7000/delete-task/${e.target.value}`)
        .then(()=>{
            alert("Appointment Deleted");
        });
        window.location.reload();
    }

    const formik = useFormik({
      initialValues: {
        Appointment_Id: 0,
        Title: '',
        Description: '',
        Date:'',
        UserId: cookies['userid']
      },
      onSubmit: (task) =>{
        axios.post('http://127.0.0.1:7000/add-task',task);
        alert("Appointment Added");
        window.location.reload();
      }
    })
    
    function handleEditClick(id){
        axios.get(`http://127.0.0.1:7000/get-task/${id}`)
        .then(response=>{
            SetEditTask(response.data);
        })
    }

    const editFormik = useFormik({
        initialValues: {
            Appointment_Id: EditTasks[0].Appointment_Id,
            Title: EditTasks[0].Title,
            Description: EditTasks[0].Description,
            Date: formatDate(EditTasks[0].Date),
            UserId: EditTasks[0].UserId
        },
        onSubmit: (edit) =>{
           axios.put(`http://127.0.0.1:7000/edit-task/${edit.Appointment_Id}`, edit);
           alert("Appointment Edited");
           window.location.reload();
        },
        enableReinitialize:true
    })
    function formatDate(dateString) {
        // Assuming dateString is in format "MM/dd/yyyy"
        var parts = dateString.split('/');
        if (parts.length === 3) {
            // parts[0] is the month, parts[1] is the day, and parts[2] is the year
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        } else {
            // Return the original string if it doesn't match the expected format
            return dateString;
        }
    }

    return(
        <div className="bg-dark text-white p-3 mt-2" style={{width:'100%'}}>
            <div className="d-flex justify-content-between" >
            <h2>Your Appointments </h2>
            <div className="d-flex">
               <div className=" text-primary fs-4">
                {
                    cookies['userid'].toUpperCase()
                }
               </div>
              <div>
              <button className="btn btn-danger ms-2" onClick={handleSignout}>SignOut</button>
              </div>
            </div>
            </div>
            <hr />
            <div className="bg-light text-dark mb-3 rounded rounded-3">
              <div className="p-2">
              <button data-bs-target="#addTask" data-bs-toggle="modal" className="btn btn-primary bi bi-calendar-check"> Add Appointment</button>
              </div>
              <div className="modal fade" id="addTask">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                           <h2 className="text-primary">Add Appointment</h2>
                           <button className="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <dl>
                                    <dt>Appointment Id</dt>
                                    <dd><input type="text" name="Appointment_Id" onChange={formik.handleChange} /></dd>
                                    <dt>Title</dt>
                                    <dd><input type="text" name="Title" onChange={formik.handleChange} /></dd>
                                    <dt>Description</dt>
                                    <dd>
                                        <textarea name="Description"  cols="40" rows="5" onChange={formik.handleChange}></textarea>
                                    </dd>
                                    <dt>Date</dt>
                                    <dd>
                                        <input type="date" name="Date" onChange={formik.handleChange} />
                                    </dd>
                                </dl>
                                <button type="submit" className="btn btn-success">Add Appointment</button>
                            </form>
                        </div>
                    </div>
                </div>

              </div>
              
              {/* appointment loader section */}
             <div className="p-2">
             {
               Appointments.map(appointment=>
                <div key={appointment.Appointment_Id} className="alert alert-success alert-dismissible">
                     <button value={appointment.Appointment_Id} onClick={handleDelete} className="btn btn-close" data-bs-dismiss="alert"></button>
                     <h2>{appointment.Title}</h2>
                     <p>{appointment.Description}</p>
                     <p>{appointment.Date}</p>
                     <button onClick={()=> handleEditClick(appointment.Appointment_Id)}data-bs-target="#editTask" data-bs-toggle="modal" value={appointment.Appointment_Id} className="btn btn-warning bi bi-pen-fill" >Edit</button>
                </div>
                )
              }
             </div>

             {/* Edit Appointment section */}

             <div className="modal fade" id="editTask">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                           <h2 className="text-danger">Edit Appointment</h2>
                           <button className="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editFormik.handleSubmit}>
                                <dl>
                                    <dt>Title</dt>
                                    <dd><input type="text" value={editFormik.values.Title} onChange={editFormik.handleChange} name="Title" /></dd>
                                    <dt>Description</dt>
                                    <dd>
                                        <textarea name="Description" id="" cols="40" rows="5" value={editFormik.values.Description} onChange={editFormik.handleChange}></textarea>
                                    </dd>
                                    <dt>Date</dt>
                                    <dd>
                                        <input type="date" name="Date" value={editFormik.values.Date} onChange={editFormik.handleChange} />
                                    </dd>
                                </dl>
                                <button type="submit" className="btn btn-success">Save</button>
                            </form>
                        </div>
                    </div>
                </div>

             </div>



            </div>
        </div>
    )
}