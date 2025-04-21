import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

function ShowModal({ rowValue, ...props }) {
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        className="custom-modal"
        size="xl"
      >
        <Modal.Header closeButton className="bg-light border-0">
          <h3 className="text-primary">Blog Details</h3>
        </Modal.Header>

        <Modal.Body
          className="p-0"
          style={{ maxHeight: '500px', overflow: 'hidden', position: 'relative' }}
        >
          {/* Scrollable content */}
          <div
            style={{ maxHeight: '430px', overflowY: 'auto', padding: '1.5rem' }}
          >
            <h5>Title: <span className="text-muted">{rowValue.title}</span></h5>
            <h5>Description: <span className="text-muted">{rowValue.description}</span></h5>
            <h5>Content: <span className="text-muted">{rowValue.content}</span></h5>

            <hr className="my-4" />

            {/* Comments Section */}
            <div className="comments-section mb-4">
              <h5 className="text-secondary mb-3">Comments</h5>
              {[...Array(10)].map((_, i) => (
                <div key={i} className="comment bg-light p-3 rounded mb-2">
                  <p className="mb-1">
                    <strong>User {i + 1}:</strong> <span className="text-muted">This is comment #{i + 1}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Comment Form */}
          <div
            className="p-3 bg-white border-top"
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1
            }}
          >
            <Formik
                initialValues={{ comment: '' }}
                onSubmit={(values, { resetForm }) => {
                    console.log('Submitted comment:', values.comment);
                    // You can replace this with an API call to save the comment
                    resetForm(); // clears the form
                }}
                >
                {({ isSubmitting }) => (
                    <Form className="comment-form">
                    <div className="form-group mb-2">
                        <label htmlFor="comment" className="form-label">Comment:</label>
                        <Field
                        as="textarea"
                        className="form-control"
                        id="comment"
                        name="comment"
                        rows="2"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    </Form>
                )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShowModal;
