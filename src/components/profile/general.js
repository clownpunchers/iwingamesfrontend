import React, { useState } from "react";
import { API_URL } from "../../utils/constants";
import { Api, upload } from "../../utils/api";
import { Row, Col, Table, Form } from "react-bootstrap";
import { Notify } from "../../utils/notification";
import { profile_fields } from "../../utils/maps";

export default function General({ userInfo, editPage }) {
  const unload_img = async (e) => {
    upload(e, "image", async (res) => {
      let table = "users";
      let field = "avatar";
      Api(
        "/admin/updateRow",
        { table, id: userInfo.id, field, val: res },
        (res) => {
          const { success } = res;
          if (success) {
            Notify("info", "Updated!");
          }
        }
      );
    });
  };

  const save = (f, val) => {
    let id = userInfo.id;
    Api("/user/updateProfile", { f, val, id }, (res) => {
      const { success } = res;

      if (success) {
        Api("/user/getUserInfo", { id }, (res) => {
          const { success } = res;
          if (success) {
            Notify("success", "Updated successfully");
          }
        });
      }
    });
  };

  return (
    <Row>
      <Col md={3}>
        <div className="avatar-container">
          <img
            className="uploaded_image rounded-circle"
            src={
              userInfo.avatar
                ? `${API_URL}/images/${userInfo.avatar}`
                : "../assets/img/icons/avatar.png"
            }
            alt="user-avatar"
          />
          <label className="input-icon">
            <i className="bi bi-camera"></i>
            <input
              type="file"
              onChange={(e) => unload_img(e)}
              accept="image/png, image/jpeg"
              hidden
            />
          </label>
        </div>
      </Col>
      <Col md={9}>
        {editPage ? (
          <Form className="profile-form">
            <Row>
              {profile_fields.map((ele, i) => (
                <Col md={6} key={i} className="mt-3">
                  <Form.Group controlId={"controlId" + i}>
                    <Form.Label>{ele.title}</Form.Label>
                    <Form.Control
                      type={ele.type}
                      defaultValue={userInfo[ele.index]}
                      placeholder={ele.title}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Form>
        ) : (
          <Table className="profile-table">
            <tbody>
              <tr>
                <td>
                  <label>First Name:</label>&nbsp; Tim
                </td>
                <td>
                  <label>First Name:</label>&nbsp; Tim
                </td>
              </tr>
              <tr>
                <td>
                  <label>First Name:</label>&nbsp; Tim
                </td>
                <td>
                  <label>First Name:</label>&nbsp; Tim
                </td>
              </tr>
              <tr>
                <td>
                  <label>First Name:</label>&nbsp; Tim
                </td>
                <td>
                  <label>First Name:</label>&nbsp; Tim
                </td>
              </tr>
              <tr>
                <td>
                  <label>First Name:</label>&nbsp; Tim
                </td>
                <td>
                  <label>First Name:</label>&nbsp; Tim
                </td>
              </tr>
            </tbody>
          </Table>
        )}
        {editPage ? null : (
          <Row className="profile-linked">
            <h3>Link Your Account With</h3>
            <Col>
              <div className="linked-card facebook">
                <i className="bi bi-facebook"></i>
                &nbsp; Facebook
              </div>
            </Col>
            <Col>
              <div className="linked-card google">
                <img src="../assets/img/icons/google.svg" alt="camera-icon" />
                &nbsp; Google
              </div>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
