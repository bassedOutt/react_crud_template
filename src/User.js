import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import $ from 'jquery';
import { Button, Form } from 'react-bootstrap';


export default function User() {
  const [arr, setArr] = useState([]);
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    $.ajax({
      url: 'https://localhost:5001/User',
      type: "GET",
      data: {},
      datatype: 'json',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origins': '*' },
      success: result => {
        console.log(result)
        if (result)
          setArr(result)
      },
      error: err => {
        console.log(err.statusText);
      }
    });
  }, [trigger]);

  const [acc, setAcc] = useState({
    "id": 0,
    "name": "string",
    "surname": "string",
    "number": "string",
    "dob": "string"
  }, [arr])


  function getAccount(id) {
    $.ajax({
      url: 'https://localhost:5001/User/' + id,
      type: "GET",
      data: {},
      datatype: 'json',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origins': '*' },
      success: result => {
        if (result) {
          setAcc(result)
          $('#name').val(result.name.trim())
          $('#surname').val(result.surname.trim())
          $('#number').val(result.number.trim())
          $('#dob').val(Date.parse(result.dob))
        }

      },
      error: err => {
        console.log(err.statusText);
      }
    });
  };

  function deleteAcc(id) {
    if (window.confirm('Are you sure?')) {
      $.ajax({
        url: 'https://localhost:5001/User/' + id,
        type: "DELETE",
        data: {},
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origins': '*' },
        success: result => {
          console.log(result)
          setTrigger(Math.random() * 100000)
        },
        error: err => {
          console.log(err.statusText);
        }
      });
    }
  }

  function editAcc() {

    acc.name = $('#name').val()
    acc.surname = $('#surname').val()
    acc.number = $('#number').val()
    acc.dob = $('#dob').val()
    console.log(JSON.stringify(acc))

    $.ajax({
      url: 'https://localhost:5001/User/',
      type: "PUT",
      data: JSON.stringify(acc),
      headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Access-Control-Allow-Origins': '*' },
      success: () => {
        setTrigger(Math.random * 100000)
        console.log("Updated succesfully")
      },
      error: err => {
        setTrigger(Math.random() * 100000)
        console.log(err.statusText);
      }
    });

  }

  function createAcc() {

    acc.name = $('#name').val()
    acc.surname = $('#surname').val()
    acc.number = $('#number').val()
    acc.dob = $('#dob').val()
    console.log(JSON.stringify(acc))


    $.ajax({
      url: 'https://localhost:5001/User/',
      type: "POST",
      data: JSON.stringify(acc),
      headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Access-Control-Allow-Origins': '*' },
      success: () => {
        setTrigger(Math.random() * 100000)
        console.log("Created succesfully")
      },
      error: err => {
        setTrigger(Math.random() * 100000)
        console.log(err.statusText);
      }
    });

  }


  return (
    <div>
      <div className="container mt-3">
        <h3>User id:{acc.id}</h3>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control id="name" type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Surname</Form.Label>
          <Form.Control id="surname" type="text" placeholder="Enter surname" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Students number</Form.Label>
          <Form.Control id="number" type="text" placeholder="Enter student #" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control id="dob" type="date" placeholder="Enter date of birth" />
        </Form.Group>

        <Button variant="primary" type="submit"
          onClick={() => editAcc()}>
          Submit Edit
        </Button>

        <Button class="mx-4 btn btn-primary" type="submit"
          onClick={() => createAcc()}>
          Create
        </Button>
      </div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Number</th>
            <th>Date of birth</th>
          </tr>
        </thead>
        <tbody>
          {arr.map(acc =>
            <tr key={acc.id}>
              <td>{acc.id}</td>
              <td>{acc.name}</td>
              <td>{acc.surname}</td>
              <td>{acc.number}</td>
              <td>{acc.dob}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button className="d-inline mx-2 p-2 btn btn-primary text-white"
                    onClick={() => { getAccount(acc.id) }}>
                    Edit
                  </button>
                  <button className="d-inline p-2 btn btn-danger text-white" to="/accounts"
                    onClick={() => { deleteAcc(acc.id) }}>
                    Delete
                  </button>
                </div>
              </td>

            </tr>)}
        </tbody>

      </Table>
    </div>
  )
}

