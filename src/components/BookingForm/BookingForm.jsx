import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./BookingForm.module.css";

const BookingForm = () => {
  const [notification, setNotification] = useState(null);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (!values.bookingRange || values.bookingRange.length !== 2) {
      setNotification("Please select a valid booking period.");
      setSubmitting(false);
      return;
    }

    setTimeout(() => {
      setNotification(
        "Booking successful! Thank you for choosing our service."
      );
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={s.bookingFormContainer}>
      <h2>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you.</p>

      <Formik
        initialValues={{
          name: "",
          email: "",
          bookingRange: [null, null],
          comment: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) errors.name = "Name is required";
          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (
            !values.bookingRange ||
            values.bookingRange.length !== 2 ||
            !values.bookingRange[0] ||
            !values.bookingRange[1]
          ) {
            errors.bookingRange = "Booking period is required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className={s.bookingForm}>
            <div className={s.formGroup}>
              <label htmlFor="name" className={s.inputLabel}>
                Name*
              </label>
              <Field type="text" name="name" className={s.input} />
              <ErrorMessage name="name" component="div" className={s.error} />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="email" className={s.inputLabel}>
                Email*
              </label>
              <Field type="email" name="email" className={s.input} />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="bookingRange" className={s.inputLabel}>
                Booking period*
              </label>
              <DatePicker
                selected={values.bookingRange[0]}
                onChange={(dates) => setFieldValue("bookingRange", dates)}
                startDate={values.bookingRange[0]}
                endDate={values.bookingRange[1]}
                selectsRange
                placeholderText="Select booking period"
                className={s.datePicker}
              />
              <ErrorMessage
                name="bookingRange"
                component="div"
                className={s.error}
              />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="comment" className={s.inputLabel}>
                Comment
              </label>
              <Field
                as="textarea"
                name="comment"
                className={s.textarea}
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={s.submitButton}
            >
              Send
            </button>

            {notification && <p className={s.notification}>{notification}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
