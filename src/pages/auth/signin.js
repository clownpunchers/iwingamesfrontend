import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Row, Button } from "react-bootstrap";

import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

import { Api } from "../../utils/api";
import { Notify } from "../../utils/notification";

import Layout from "../../layout/auth";
import Divider from "../../components/divider";

export default function Signin() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    Api("/auth/login", data, (res) => {
      console.log(data);
      const { success, accessToken } = res;
      if (success) {
        localStorage.setItem("iwin-token", accessToken);
        navigate("/practice");
      } else {
        Notify("warning", "Username or Password is not correct");
      }
    });
  };

  const gLogin = useGoogleLogin({
    onSuccess: async (user) => {
      Api("/auth/google-login", { access_token: user.access_token }, (res) => {
        const { success } = res;
        if (success) {
          navigate("/practice");
        } else {
          navigate("/signup");
        }
      });
    },
  });

  const responseFacebook = (response) => {
    console.log(response);
    // // Login failed
    // if (response.status === "unknown") {
    //   alert("Login failed!");
    //   setLogin(false);
    //   return false;
    // }
    // setData(response);
    // setPicture(response.picture.data.url);
    // if (response.accessToken) {
    //   setLogin(true);
    // } else {
    //   setLogin(false);
    // }
  };

  const fLogin = (res) => {
    console.log(res);
  };

  return (
    <Layout>
      <div id="auth-page">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-center auth-form"
        >
          <div className="form-header">
            <h4 className="form-title">Log in with</h4>
          </div>
          <div className="form-body">
            <Row className="pb-3 pt-3">
              <Link className="col-sm-6 text-end pe-5" onClick={gLogin}>
                <img src="../assets/img/icons/google.png" alt="google" />
              </Link>

              {/* <FacebookLogin
                appId="569720507786195"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,email,user_friends"
                callback={responseFacebook}
                onClick={fLogin}
                icon="fa-facebook"
                className="col-sm-6 text-end pe-5"
              /> */}
            </Row>
            <Divider />
            <Row
              className="px-5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <input
                className="mt-2"
                type="text"
                placeholder="Enter Email"
                {...register("username", { required: true })}
              />
              <input
                className="mt-2"
                type="password"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              <Button
                className="topnav-btn mt-3"
                variant="danger"
                type="submit"
              >
                Sign in
              </Button>
            </Row>

            <Row className="pb-5 pt-3">
              <Link to="/signup">
                Dont have any account?&nbsp;
                <span className="color-acitve">Sign Up</span>
              </Link>
              <Link to="/forget_password">Forgot password?</Link>
            </Row>
          </div>
        </form>
      </div>
    </Layout>
  );
}
