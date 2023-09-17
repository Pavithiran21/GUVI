import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/esm/Button';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { API } from '../Apiroute';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Forgot = () => {
    const validate = yup.object({
        email: yup.string().email('Email is invalid').required('Email is required'),       
    });

    const Navigate = useNavigate();
    
    const SubmitHandler = async (data) => {
        try {
          // Replace the empty string with your API endpoint to send the form data
          let response = await axios.post(`${API}/api/users/reset`, data);
          console.log(response);
      
          if (response.data.status) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.data.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => {
              console.log(response.data)
              Navigate("/");
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.message,
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK',
            });
          }
        } 
        catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please check it.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
    };

  return (
    <>
        <Container fluid className='main'>    
            <Row>
                <h1 className='text-white text-center mt-4'>FORGOT PASSWORD</h1>
            </Row>
            <Row>
                <Col>
                    <div className='bg-white box-value m-5 p-3'>
                        <Formik
                        initialValues={{                         
                           
                            email: '',                   
                        }}
                        validationSchema={validate}
                        onSubmit={(values) => {
                            console.log(values);
                            let data = {
                            
                            
                             email: values.email,
        
                           
                            };
                            SubmitHandler(data);
                        
                            
                        }}
                        >
                            {({errors,touched}) =>(
                                <Form >
                                
                                
                                <Row >
                                    <Col>
                                    
                                    <label className="form-label">Email</label>
                                    <Field
                                        name="email"
                                        className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                        type="email"
                                        placeholder="Enter the Email"
                                        required
                                    />
                                    {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                                    
                                    
                                    </Col>
                                </Row>

                                <Row className='justify-content-center'>
                                    <Button variant="danger" type="submit" className='m-2 w-50'>
                                        Send Mail
                                    </Button>
                                

                                </Row>
                                
                                
                                
                               
                                
                                
                            
                                
                            </Form>
                            )}
                            
                        </Formik>
                    
                    </div>
                </Col>
            

            </Row>
            

            
        </Container>
    </>
  )
  
}
