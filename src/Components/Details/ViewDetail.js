/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../Apiroute';
import Swal from 'sweetalert2';


export const ViewDetail = () => {
  const { id } = useParams();
  const [Details, setDetails] = useState([]);

  const Navigate = useNavigate();

  const formateDate = (originalDate="") =>{
    if(originalDate){
        const date = new Date(originalDate);

        // Create a function to format the date as "YYYY-MM-DD"
        // const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
          

    }

    return ''
    
   }


  const DeleteDetails = (id) => {
    axios.delete(`${API}/api/details/delete-details/${id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    })
    .then((response) => {
      console.log(response);
      
   
      if(response.data.status){
          Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.data.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => {
              console.log(response.data);
              Navigate(`/add-details`);
          });
         
      }   
      else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.message,
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK',
          });
      }
      
      // Perform additional logic here if needed
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please check it.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
      });
    });
      
  };

  const Edit = (id) =>{
    Navigate(`/edit-details/${id}`)
    
  }
  const Close = () =>{
    Navigate('/'); 
  }

  

  useEffect(() => {
    ViewHandler(id);
  }, []);


  const ViewHandler = async() =>{
    axios.get(`${API}/api/details/view-details/${id}`,{
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    })
    .then((response) => {
      console.log(response.data);
      let date  = formateDate(response.data.data.dob);
      response.data.data.dob = date;
      
      if(response.data.status){
        setDetails(response.data)
          Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.data.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => {
              console.log(response.data);
          });
      }
      
      else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.message,
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK',
          });
      }
      
      // Perform additional logic here if needed
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please check it.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
      });
    });
  }


  return (
    <>
       {Details && Details.data &&(
        <Container fluid className='bg-success mains'>
        <Row className='justify-content-center'>
          <Col xs={12} sm={8} md={4} lg={3} className='m-4'>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>VIEW DETAILS</Card.Title>
                <Card.Text><strong>Firstname:</strong> {Details.data.firstname}</Card.Text>
                <Card.Text><strong>Lastname:</strong> {Details.data.lastname}</Card.Text>
                <Card.Text><strong>DOB:</strong> {Details.data.dob}</Card.Text>
                <Card.Text><strong>Age:</strong> {Details.data.age}</Card.Text>
                <Card.Text><strong>Gender:</strong> {Details.data.gender}</Card.Text>
                <Card.Text><strong>Email:</strong> {Details.data.email}</Card.Text>
                <Card.Text><strong>Phone Number:</strong> {Details.data.mobile_number}</Card.Text>
                <Card.Text><strong>City:</strong> {Details.data.city}</Card.Text>
                <Card.Text><strong>State:</strong> {Details.data.state}</Card.Text>
                <Card.Text className='d-flex justify-content-center '>
                  <FontAwesomeIcon className='text-success m-2' icon={faUserEdit}  onClick={() =>Edit(id)}/>
                  <FontAwesomeIcon className='text-primary m-2' icon={faTrash} onClick={() =>DeleteDetails(id)} /> 
                  <FontAwesomeIcon className='text-danger m-2' icon={faCircleXmark}  onClick={() => Close()}/>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       </Container>

      )}
    </>
    
    
  )
}

