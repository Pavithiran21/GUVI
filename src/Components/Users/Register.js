import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/esm/Button';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { API } from '../Apiroute';

export const Register = () => {
    const validate = yup.object({
        username: yup.string().min(4, 'Must be 5 characters or above').max(8,'Should not be more than 8 Characters').required('Username is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').max(12,'Password should not be  more than 12 characters.Enter valid Password').required('Password is required'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Password does not  match')
          .required('Confirm password is required'),
    });


    const Navigate = useNavigate();


    const SubmitHandler = async (data) => {
        try {
          
          let response = await axios.post(`${API}/api/users/register`, data);
      
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
                <h1 className='text-white text-center mt-4'>SIGNUP</h1>
            </Row>
            <Row>
                <Col>
                    <div className='bg-white box-value m-4 p-3'>
                        <Formik
                        initialValues={{
                            
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validate}
                        onSubmit={(values) => {
                            console.log(values);
                            let data = {
                                username: values.username,
                                email: values.email,
                                password: values.password,
                                confirmPassword: values.confirmPassword,
                            };
                            SubmitHandler(data);
                        
                            
                        }}
                        >
                            {({errors,touched}) =>(
                                <Form >
                                <Row>
                                    <Col>
                                    
                                        <label className="form-label">UserName</label>
                                        <Field
                                            name="username"
                                            className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder="Enter the User Name"
                                            required
                                        />
                                        {errors.username && touched.username && <div className="invalid-feedback">{errors.username}</div>}
                                    
                                    </Col>
                                </Row>
                                
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
                                
                                
                                <Row>
                                <Col>
                                    <label className="form-label">Password</label>
                                    <Field
                                        name="password"
                                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                        type="password"
                                        placeholder="Enter the Password"
                                        required
                                    />
                                    {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </Col>
                                </Row>
                                <Row >
                                    <Col>
                                    <label className="form-label">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                                        placeholder="Enter the Confirm-Password"
                                        required
                                    />
                                        {errors.confirmPassword && touched.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="text-center">
                                    
                                    <Button variant="primary" type='submit' className='m-1'>Submit</Button>
                                    <Button variant='danger' type='reset' className='m-1'>Reset</Button>
                                    </div>

                                </Row>
                                
                                
                                
                            
                                
                                <Row>
                                    <p>Already Registered ? <a href="/" className="success" style={{textDecoration:"none"}}>Click here to Login</a></p>
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
