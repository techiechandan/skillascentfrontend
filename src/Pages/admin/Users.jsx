import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import axios from 'axios'
import { State, City } from 'country-state-city'
import BaseUrl from '../../helper/urlHelper'

// icons
import { FaAlignJustify } from 'react-icons/fa'
// components
import Sidebar from '../../Components/admin/Sidebar'



const Users = () => {
  const [users, setUsers] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);

  // getting users list from db
  const getUsers = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/admin/users/api`);
      setUsers([...response.data.usersList]);
    } catch (error) {
      console.log(error);
    }
  }

  // updating user's details
  const [StateList, setStateList] = useState([]);
  const [CityList, setCityList] = useState([]);

  // Course List
  const options = [
    { value: "BCA", label: "BCA" },
    { value: "BBA", label: "BBA" },
    { value: "BJMC", label: "BJMC" },
    { value: "B.COM", label: "B.COM" },
    { value: "B.TECH", label: "B.TECH" },
  ]
  // State List 
  const stateOptions = StateList.map((item) => {
    return { value: item.name, label: item.name }
  });

  // User Roles List
  const RolesList = [
    { value: "user", label: "user" },
    { value: "admin", label: "admin" },
    { value: "super_admin", label: "super_admin" }
  ]


  const getEdituser = (index) => {
    // Populating cities list
    const isoCode = StateList.find(item => item.name === users[index].state).isoCode;
    setCityList(City.getCitiesOfState("IN", isoCode).map((item) => {
      return { value: item.name, label: item.name }
    }));

    setName(users[index].name);
    setEmail(users[index].email);
    setCourse(users[index].course);
    setState(users[index].state);
    setCity(users[index].city);
    setRoles(users[index].roles);
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [roles, setRoles] = useState([]);

  const updateHandler = () => {
    try {
      alert(`Name${name},Email:${email},Course:${course},State:${state},City:${city}`)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    setStateList(State.getStatesOfCountry("IN"));
    getUsers();
  }, []);


  const [openState, setOpenState] = useState(true);
  return (
    <div className="d-flex p-0">
      <Sidebar openState={openState} setOpenState={setOpenState} />
      <div className="container-fluid vh-100 m-0 px-0 " style={{ backgroundColor: '#ececec' }}>
        <div className="container-fluid d-flex py-2 align-items-center">
          <Button className="p-2 pt-0 me-2 fs-4 bg-transparent text-danger border-0 " onClick={() => { setOpenState(!openState) }}>
            <FaAlignJustify />
          </Button>
          <h5>Users</h5>
        </div>
        <div className=" p-4 pt-2">
          <Table responsive striped bordered hover variant='success'>
            <thead>
              <tr>
                <th className="text-center">SN</th>
                <th className="text-center">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item._id}</td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.email}</td>
                    <td className="text-center">{item.roles.includes("super_admin")?"Super Admin":item.roles.includes("admin")?"Admin":"User"}</td>
                    <td className="text-center">
                      <Button variant="success me-md-2 mb-md-0 mb-1" onClick={() => { setModalStatus(!modalStatus); getEdituser(index) }}>Edit</Button>
                      <Button variant="danger">Delete</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          {/* Modal */}

          {
            <Modal show={modalStatus} onHide={() => { setModalStatus(false) }}
              size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="fs-md-5">
                  Update user details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="border  p-4  rounded" >
                  <div className="row">
                    <div className="col-md-5 col-12">
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" value={name} onChange={(event) => { setName(event.target.value) }} />
                      </Form.Group>
                    </div>
                    <div className="col-md-7 col-12">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-md-4 col-12 m-0 p-0 me-md-1">
                      <Form.Group className="mb-3" controlId="">
                        <Form.Label>Course</Form.Label>
                        <Select
                          value={options.value}
                          options={options}
                          defaultValue={{ value: course, label: course }}
                          onChange={(option) => { setCourse(option.value) }}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-7 col-12 m-0 p-0">
                      <div className="row p-0 m-0">
                        <div className="col-6 p-0">
                          <Form.Label>State</Form.Label>
                          <Select
                            value={stateOptions.value}
                            options={stateOptions}
                            defaultValue={{ value: state, label: state }}
                            onChange={(option) => { setState(option.value) }}
                          />
                        </div>
                        <div className="col-6 ps-1">
                          <Form.Label>City</Form.Label>
                          <Select
                            value={CityList.value}
                            options={CityList}
                            defaultValue={{ value: city, label: city }}
                            onChange={(option) => { setCity(option.value) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 md-12 m-0 p-0 ps-3">
                      <Form.Label>Role</Form.Label>
                      <Select
                        value={RolesList.value}
                        options={RolesList}
                        defaultValue={{ value: roles, label: roles }}
                        onChange={(option) => { setRoles(option.value) }}
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => { setModalStatus(false) }}>Close</Button>
                <Button onClick={() => { updateHandler() }} >Update</Button>
              </Modal.Footer>
            </Modal>
          }
        </div>
      </div>
    </div>
  )
}

export default Users