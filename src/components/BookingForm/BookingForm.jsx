import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import iziToast from "izitoast";

import "react-datepicker/dist/react-datepicker.css";
import "izitoast/dist/css/iziToast.min.css";

import s from "./BookingForm.module.css";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    bookingRange: Yup.array()
        .of(Yup.date().nullable())
        .test("bookingRange", "Booking period is required", (value) =>
            value && value[0] && value[1] ? true : false
        ),
    comment: Yup.string().max(300, "Comment can't exceed 300 characters"),
});

const initialValues = {
    name: "",
    email: "",
    bookingRange: [null, null],
    comment: "",
};

const showSuccessToast = () =>
    iziToast.success({
        title: "Success",
        message: "Your booking request has been sent!",
        position: "topRight",
    });

const BookingForm = () => {
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
            showSuccessToast();
            resetForm();
            setSubmitting(false);
        }, 1000);
    };

    return (
        <div className={s.bookingFormContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className={s.bookingForm}>
                        <header className={s.titleWrap}>
                            <h3 className={s.title}>Book your campervan now</h3>
                            <p className={s.text}>
                                Stay connected! We are always ready to help you.
                            </p>
                        </header>

                        {/* Name */}
                        <div className={s.formGroup}>
                            <Field
                                type="text"
                                name="name"
                                className={s.input}
                                placeholder="Name*"
                            />
                            <ErrorMessage name="name" component="div" className={s.error} />
                        </div>

                        {/* Email */}
                        <div className={s.formGroup}>
                            <Field
                                type="email"
                                name="email"
                                className={s.input}
                                placeholder="Email*"
                            />
                            <ErrorMessage name="email" component="div" className={s.error} />
                        </div>

                        {/* Date Range */}
                        <div className={s.formGroup}>
                            <DatePicker
                                selected={values.bookingRange[0]}
                                onChange={(dates) => setFieldValue("bookingRange", dates)}
                                startDate={values.bookingRange[0]}
                                endDate={values.bookingRange[1]}
                                selectsRange
                                placeholderText="Booking date*"
                                className={s.datePicker}
                                calendarClassName={s.customDatePicker}
                                dayClassName={(date) =>
                                    date.getDate() === values.bookingRange[0]?.getDate() ||
                                    date.getDate() === values.bookingRange[1]?.getDate()
                                        ? s.selectedDay
                                        : s.day
                                }
                                weekDayClassName={() => s.weekDay}
                                monthClassName={() => s.month}
                                yearClassName={() => s.year}
                            />
                            <ErrorMessage
                                name="bookingRange"
                                component="div"
                                className={s.error}
                            />
                        </div>

                        {/* Comment */}
                        <div className={s.formGroup}>
                            <Field
                                as="textarea"
                                name="comment"
                                className={s.textarea}
                                rows="4"
                                placeholder="Comment"
                            />
                            <ErrorMessage
                                name="comment"
                                component="div"
                                className={s.error}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={s.submitButton}
                        >
                            Send
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookingForm;