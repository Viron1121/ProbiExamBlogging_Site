import React from 'react';
import axios, { AxiosError } from "axios";
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import axiosClient from '@/axios';

function EditModal( { ReFetch, rowValue, ...props }) {
  return (
   <>
    <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
    >
        <Formik
            initialValues={{
                title: rowValue.title, 
                description: rowValue.description,
                content: rowValue.content,
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
                description: Yup.string().required('Required'),
                content: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { resetForm }) => {
                Swal.fire({
                    title: 'Are you sure you want to procced?',
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'No, Cancel',
                    confirmButtonText: 'Yes, Proceed!',
                    reverseButtons: true,
                    customClass: {
                        confirmButton: "btn fw-bold btn-primary border border-2 border-primary",
                        cancelButton: "btn fw-bold border border-2 border-primary text-primary bg-transparent",
                    },
                    allowOutsideClick: false
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const result = await axios.put(axiosClient.defaults.baseURL+'/blogs/'+rowValue.id, values);
                            console.log('testing',result);
                            Swal.fire({
                                buttonsStyling: false,
                                title: 'Success!',
                                icon: 'success',
                                iconColor: '#0066C8',
                                confirmButtonText: 'Okay, got it!',
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                },
                                allowOutsideClick: false
                            });
                            ReFetch(); // To refetch the data
                            props.onHide(); // To close the modal
                        } catch (error) {
                            Swal.fire({
                                title: 'Error!',
                                text: error.error.message,
                                icon: 'error',
                                iconColor: '#FF0000',
                                confirmButtonText: 'Okay, got it!',
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                },
                                allowOutsideClick: false
                            });
                            Refetch(); // To refetch the data
                            props.onHide(); // To close the modal
                        }
                    }
                });
            }}
            enableReinitialize
        >
            {({ errors, touched, values }) => (
            <Form placeholder="">
                <Modal.Header closeButton className="bg-light border-0 text-center w-100"> 
                    <h3 className='text-primary'>Edit Blog Data</h3>
                </Modal.Header>
                <Modal.Body className='bg-muted'>
                     {/* First Name Field */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label required">Title</label>
                        <Field type="text" name="title" className="form-control" />
                        <ErrorMessage name="title" component="div" className="text-danger" />
                    </div>
    
                    {/* Last Name Field */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <Field type="text" name="description" className="form-control" />
                        <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>
    
                    {/* Email Address Field */}
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <Field type="text" name="content" className="form-control" />
                        <ErrorMessage name="content" component="div" className="text-danger" />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Update</Button>
                </Modal.Footer>
            </Form>
            )}
        </Formik>

    </Modal>
   </>
  )
}

export default EditModal