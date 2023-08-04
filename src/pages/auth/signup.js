import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Api } from "../../utils/api";
import { Row } from "react-bootstrap";
import Layout from "../../layout/auth";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const thisYear = new Date().getFullYear();
const minYear = thisYear - 80;
const maxYear = thisYear - 18;
const years = Array.from(
  { length: maxYear - minYear + 1 },
  (_, index) => maxYear - index
);

export default function Signup({ invitedBy }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {

    Api(
      "/auth/register",
      {
        ...data,
        affiliate: invitedBy ? id : "",
      },
      (res) => {
        const { success } = res;
        if (success) {
          navigate("/practice");
        }
      }
    );
  };

  return (
    <Layout>
      <div id="auth-page">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-center auth-form"
        >
          <div className="form-header">
            <h4 className="form-title">Don’t Have an account yet?</h4>
          </div>

          <div className="form-body px-3 pt-3">
            <InputGroup className="mt-2">
              <Form.Control
                type="text"
                className="mx-2 rounded-0"
                aria-label="firstname"
                placeholder="First Name"
                {...register("firstname", { required: true })}
              />
              <Form.Control
                type="text"
                className="mx-2 rounded-0"
                aria-label="lastname"
                placeholder="Last Name"
                {...register("lastname", { required: true })}
              />
            </InputGroup>
            <InputGroup className="mt-2">
              <Form.Control
                type="email"
                className="mx-2 rounded-0"
                aria-label="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </InputGroup>
            <InputGroup className="mt-2">
              <Form.Control
                type="password"
                className="mx-2 rounded-0"
                aria-label="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <Form.Control
                type="password"
                className="mx-2 rounded-0"
                aria-label="password"
                placeholder="Re-enter Password"
                {...register("re_password", { required: true })}
              />
            </InputGroup>
            <InputGroup className="mt-2">
              <Form.Control
                type="text"
                className="mx-2 rounded-0"
                aria-label="username"
                placeholder="User Name"
                {...register("username", { required: true })}
              />
            </InputGroup>
            <InputGroup className="mt-2">
              <Form.Select
                className="mx-2 rounded-0"
                aria-label="month"
                placeholder="Month"
                {...register("month", { required: true })}
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                className="mx-2 rounded-0"
                aria-label="day"
                placeholder="Day"
                {...register("day", { required: true })}
              >
                {days.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                className="mx-2 rounded-0"
                aria-label="year"
                placeholder="Year"
                {...register("year", { required: true })}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>

            <button className="topnav-btn mt-3" type="submit">
              Sign Up
            </button>

            <Row className="pb-5 pt-3">
              <Link to="/">
                You have already account? &nbsp;{" "}
                <span className="color-acitve">Sign In</span>
              </Link>
            </Row>
          </div>
        </form>
      </div>
    </Layout>
  );
}
