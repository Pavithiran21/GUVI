import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/esm/Button';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../Apiroute';
import Swal from 'sweetalert2';


export const Reset = () => {
    const validate = yup.object({
        password: yup.string().min(6, 'Password must be at least 6 characters').max(12,'Password should not be  more than 12 characters.Enter valid Password').required('Password is required'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Password does not  match')
          .required('Confirm password is required'),       
    });

    const { resetToken } = useParams();
    const Navigate = useNavigate();
  const SubmitHandler = async (data) => {
    try {
      // Replace the empty string with your API endpoint to send the form data
      let response = await axios.put(`${API}/api/users/reset/${resetToken}`, data);
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
                <h1 className='text-white text-center mt-4'>RESET PASSWORD</h1>
            </Row>
            <Row>
                <Col>
                    <div className='bg-white box-value m-5 p-3'>
                        <Formik
                        initialValues={{                         
                            password: '',
                            confirmPassword:'',                     
                        }}
                        validationSchema={validate}
                        onSubmit={(values) => {
                            console.log(values);
                            let data = {
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
