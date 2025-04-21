import React from 'react';
import axios, { AxiosError } from "axios";
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import axiosClient from '@/axios';

function CreateModal({ ReFetch, RowValue, ...props }) {

    
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
            title: '',  
            description: '',
            content: '',
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            content: Yup.string().required('Required'),
          
          })}
          onSubmit={async (values, { resetForm }) => {
            Swal.fire({
                title: 'Are you sure you want to proceed?',
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
                        const result = await axios.post(axiosClient.defaults.baseURL + '/blogs', values);
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
                        props.onHide(); // Close the modal
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            Swal.fire({
                                text: error.response?.data.message,
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                },
                                allowOutsideClick: false
                            });
                        }
                    }
                }
            });
        }}
        >
          {({ values }) => (
            <Form>
              <Modal.Header closeButton>
                <h3 className='text-primary'>Add Blog</h3>
              </Modal.Header>
              <Modal.Body className="bg-muted">
                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label required">Title</label>
                  <Field type="text" name="title" className="form-control" />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>

                {/* Email Address Field */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <Field type="text" name="description" className="form-control" />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </div>

                {/* Date of Birth Field */}
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <Field type="text" name="content" className="form-control" />
                  <ErrorMessage name="content" component="div" className="text-danger" />
                </div>

              </Modal.Body>
              <Modal.Footer>
                <button
                    data-bs-dismiss="modal"
                    type="submit"
                    className="btn btn-sm btn-primary border border-2 border-primary"
                >
                    Submit
                </button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default CreateModal;
