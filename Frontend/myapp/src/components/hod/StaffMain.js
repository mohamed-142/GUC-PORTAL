import '../../App.css';
import React , {useState,useEffect} from 'react'
import * as ReactBootStrap from 'react-bootstrap'
import './StaffMain.css';
import {Link} from 'react-router-dom'
import axios from 'axios'
const StaffMain = () =>{
  const [staff , setStaff] = useState([]);
  const [value, setValue] = useState('');
  const handleSelect=(e)=>{
    console.log(value)
    setValue(value)
    sessionStorage.setItem("course",value)
  }
  useEffect(()=>{
     axios({
      method : 'GET',
      url : 'http://localhost:1000/hod/viewStaff'
    }).then(res=>{
      setStaff(res.data)
    })
    .catch((err)=>{
      console.log(err.message);
    })
  },[])
  return(
    
  <div className = "mainsm">
        <ReactBootStrap.Table  class = "w3-table-all w3-centered" responsive striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>ID</th>
      <th>Email</th>
      <th>Username</th>
      <th>Role</th>
      <th>Dayoff</th>
      <th>Office Location </th>
    </tr>
  </thead>
  <tbody>
    {staff.map(staffmembers=>(
    <tr>
      <td></td>
      <td>{staffmembers.id}</td>
      <td>{staffmembers.email}</td>
      <td>{staffmembers.displayName }</td>
      <td>{staffmembers.role }</td>
      <td>{staffmembers.DayOff}</td>
      <td>{staffmembers.officeLocation}</td>
    </tr>
  ))} 
  </tbody>
  </ReactBootStrap.Table>
  <ReactBootStrap.DropdownButton class = "dropbtn" id="dropdown-item-button" title="Choose Course">
<ReactBootStrap.FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type Course Name..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        
    <ReactBootStrap.Dropdown.Item class = "dropdown-content "  > 
      <Link to = '/hod/viewStaffPerCourse'>
    <ReactBootStrap.Button class = "staff-btn" variant="outline-dark" onClick = {handleSelect} >SEND </ReactBootStrap.Button> 
    </Link>
    </ReactBootStrap.Dropdown.Item>
    </ReactBootStrap.DropdownButton>
    
    <Link to = '/hod/viewStaffDayOff'>
                <ReactBootStrap.Button class = "staff-btn" variant="outline-dark">Staff Day Offs </ReactBootStrap.Button>
                </Link>
  </div>
  )
}

export default StaffMain

