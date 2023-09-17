import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/esm/Button';
import * as yup from 'yup';
import axios from 'axios';
import { API } from '../Apiroute';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


export const EditDetails = () => {

  const Navigate = useNavigate();
  const { id } = useParams();





   const [edit,setEdit] = useState();
   const [age, setAge] = useState();

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
 

   const calculateAge = (dob) => {
     const currentDate = new Date();
     const birthDate = new Date(dob);
     const ageInMilliseconds = currentDate - birthDate;
     const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
     setAge(Math.floor(ageInYears));
   };
 
   const isAtLeast14YearsOld = (value) => {
     const currentDate = new Date();
     const birthDate = new Date(value);
     const minDate = new Date().setFullYear(currentDate.getFullYear() - 14);
 
     return birthDate <= minDate;
   };

    
    const validate = yup.object({
        firstname: yup.string().min(6, 'Must be 6 characters or above').max(10,'Should not be more than 12 Characters').required('Firstname is required'),
        lastname: yup.string().min(6, 'Must be 6 characters or above').max(10,'Should not be more than 12 Characters').required('Lastname is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        dob: yup.date()
        .max(new Date(), 'Date of Birth cannot be in the future')
        .test('is-at-least-14-years-old', 'Must be at least 14 years old', isAtLeast14YearsOld)
        .required('Date of Birth is required'),
       age: yup.number().required('Age is required.').positive('Age must be a positive number'),
        gender: yup.string().required('Gender is required.Please Select one'),
        mobile_number: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid Mobile Number").required('Mobile Number is required'),
        city:yup.string().min(3, 'Must be 3 characters or above').max(20,'Should not be more than 20 Characters').required('City is required'),
        state:yup.string().min(6, 'Must be 6 characters or above').max(20,'Should not be more than 20 Characters').required('State is required'),
    });

 
    const fetchDetails = async(id)=>{
        try{
            if(id){
                let response = await axios.get(`${API}/api/details/view-details/${id}`,{
                    headers: {
                        authorization: window.localStorage.getItem('token'),
                    },
                });
                console.log(response.data);
                let date  = formateDate(response.data.data.dob);
                response.data.data.dob = date;
                setEdit(response.data.data);
                
            }
            

        }
        catch(err){
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please check it.',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK',
            });

        }
      
    }

    useEffect(()=>{
        fetchDetails(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    const SubmitHandler = (data) => {
        axios.put(`${API}/api/details/edit-details/${id}`, data, {
          headers: {
            authorization:window.localStorage.getItem('token'),
          },
        })
          .then((response) => {
            console.log(response.data);
            if(response.data.status){
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.data.message,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  }).then(() => {
                    console.log(response.data);
                    console.log(response.data.data._id)
                    Navigate(`/view-details/${id}`);
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

    
    
 

 



    

  





  return (
    <>
        <Container fluid className='bg-success'>    
            <Row>
                <h1 className='text-white text-center mt-4'> EDIT DETAILS</h1>
            </Row>
            <Row>
                <Col>
                    <div className='bg-white box-value m-4 p-4'>
                        {edit &&(
                            <Formik
                                initialValues={{
                                    
                                    firstname:edit?.firstname,
                                    lastname:edit?.lastname,
                                    email:edit?.email,
                                    dob:edit?.dob,
                                    
                                    age:edit?.age,
                                    gender:edit?.gender,
                                    mobile_number:edit?.mobile_number,
                                    city:edit?.city,
                                    state:edit?.state
                                }}
                                validationSchema={validate}
                                onSubmit={(values) => {
                                    console.log(values);
                                    let data = {
                                    
                                        firstname: values.firstname,
                                        lastname: values.lastname,
                                        email: values.email,
                                        age:values.age,
                                        dob:values.dob,
                                        gender:values.gender,
                                        mobile_number:values.mobile_number,
                                        city:values.city,
                                        state:values.state
                                    };
                                    SubmitHandler(data);
                                
                                    
                                }}
                            >
                                {({errors,touched,setFieldValue}) =>(
                                    <Form >
                                    <Row>
                                        <Col>
                                        
                                            <label className="form-label">FirstName</label>
                                            <Field
                                                name="firstname"
                                                className={`form-control ${errors.firstname && touched.firstname ? 'is-invalid' : ''}`}
                                                type="text"
                                                placeholder="Enter the FirstName"
                                                required
                                            />
                                            {errors.firstname && touched.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                                        
                                        </Col>
                                        <Col>
                                        
                                        <label className="form-label">LastName</label>
                                        <Field
                                            name="lastname"
                                            className={`form-control ${errors.lastname && touched.lastname ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder="Enter the LastName"
                                            required
                                        />
                                        {errors.lastname && touched.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                                    
                                        </Col>
                                    </Row>
                                    
                                    <Row>
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
                                    
                                     {console.log(edit?.dob)};
                                    <Row>
                                       <Col>
                                        <label className="form-label">Date Of Birth</label>
                                        <Field
                                            name="dob"
                                            className={`form-control ${errors.dob && touched.dob ? 'is-invalid' : ''}`}
                                            type="date"
                                            required
                                            
                                            onChange={(e) => {
                                                setFieldValue('dob', e.target.value);
                                                calculateAge(e.target.value);
                                                setFieldValue('age', age); // Update the age field
                                            }}
                                        />
                                        {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
                                        </Col>
                                        <Col>
                                            <label className="form-label">Age</label>
                                            <Field
                                                name="age"
                                                type="text"
                                                className={`form-control ${errors.age && touched.age ? 'is-invalid' : ''}`}
                                                placeholder="Age will be calculated automatically"
                                                required
                                                readonly
                                            />
                                            {errors.age && touched.age && <div className="invalid-feedback">{errors.age}</div>}
                                        </Col>
                                    </Row>
                                    
                                    <Row >
                                        <Col>
                                            <label className="form-label">Gender</label>
                                            <Field  name="gender" as="select"  className={`form-control  ${errors.gender && touched.gender ? 'is-invalid' : ''}`} required>
                                                <option>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Field>
                                            {errors.gender && touched.gender && <div className="invalid-feedback">{errors.gender}</div>}
                                     
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label className="form-label">Mobile Number</label>
                                            <Field
                                                name="mobile_number"
                                                type="text"
                                                className={`form-control ${errors.mobile_number && touched.mobile_number? 'is-invalid' : ''}`}
                                                placeholder="Enter the Mobile Number"
                                                required
                                            />
                                            {errors.mobile_number && touched.mobile_number && <div className="invalid-feedback">{errors.mobile_number}</div>}
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col>
                                            <label className="form-label">City</label>
                                            <Field
                                                name="city"
                                                type="text"
                                                className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                                                placeholder="Enter the City"
                                                required
                                            />
                                            {errors.city && touched.city && <div className="invalid-feedback">{errors.city}</div>}
                                        </Col>
                                        <Col>
                                            <label className="form-label">State</label>
                                            <Field
                                                name="state"
                                                type="text"
                                                className={`form-control ${errors.state && touched.state ? 'is-invalid' : ''}`}
                                                placeholder="Enter the State"
                                                required
                                            />
                                            {errors.state && touched.state && <div className="invalid-feedback">{errors.state}</div>}
                                        </Col>
                                    </Row>
    
                                    <Row>
                                        <div className="text-center mt-3">
                                        
                                        <Button variant="primary" type='submit' className='m-1'>Update</Button>
                                        <Button variant='danger' type='reset' className='m-1'>Reset</Button>
                                        </div>
    
                                    </Row>
                                    
                                    
                                    
                                
                                    
    
                                </Form>
                                )}
                                
                            </Formik>

                        )}
                        
                    
                    </div>
                </Col>
            

            </Row>
            

            
        </Container>

    </>
  )
}