import React, { useContext } from "react";
import { API_URL } from "../../utils/constants";
import { Api, upload } from "../../utils/api";
import { Notify } from "../../utils/notification";
import { Row, Col } from "react-bootstrap";
import { UserContext } from '../../utils/contexts'


const data = [
  {
    label: "USER NAME",
    className: "form-control",
    type: "text",
    name: "username",
    editable: true,
  },
  {
    label: "E-MAIL",
    className: "form-control",
    type: "email",
    name: "email",
  },
  {
    label: "FIRST NAME",
    className: "form-control",
    type: "text",
    name: "firstname",
    editable: true,
  },
  {
    label: "LAST NAME",
    className: "form-control",
    type: "text",
    name: "lastname",
    editable: true,
  },
  {
    label: "ACHIEVEMENTS",
    className: "form-control",
    name: "achieves",
  },
  {
    label: "REWARDS",
    className: "form-control",
    name: "rewards",
  },
  {
    label: "LINKED WITH",
    className: "form-control",
    name: "linked",
  },
  {
    label: "FRIENDS",
    className: "form-control",
    name: "friends",
    editable: true,
  },
];

export default function Profile() {
  const userInfo = useContext(UserContext)


  const uploadImg = async (e) => {
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

  const update = async (e, field) => {
    if (e.keyCode === 13) {
      if (e.target.value.length > 4) {
        changeinfo(field, e.target.value);
      } else {
        Notify("warning", "Must be longer than 4 characters");
      }
    }
  };

  const changeinfo = (f, val) => {
    let id = userInfo.id;
    Api("/user/updateProfile", { f, val, id }, (res) => {
      const { success } = res;

      if (success) {
        Api("/user/getUserInfo", { id }, (res) => {
          const { success, data } = res;
          if (success) {
          }
        });
      }
    });
  };

  return (
    <Row className="row mt-5 mb-5">
      <Col md={12}>
        <div className="card bg-iwin">
          <h5 className="card-header p-3">
            <span className="text-uppercase">{userInfo.username}</span>'s
            Profile
          </h5>
          <hr className="my-0" />
          <div className="card-body">
            <Row className="row mb-3">
              <Col md={3}>
                <img
                  src={
                    userInfo.avatar !== ""
                      ? `${API_URL}/images/${userInfo.avatar}`
                      : "../assets/img/icons/avatar.png"
                  }
                  alt="user-avatar"
                  className="d-block rounded mb-3 w-100 uploaded_image"
                />
                <label className="rounded-btn mb-4 w-100">
                  <span
                    className="d-none d-sm-block"
                    style={{
                      height: "40px",
                      paddingTop: "7px",
                    }}
                  >
                    Upload New Avatar
                  </span>
                  <input
                    type="file"
                    onChange={(e) => uploadImg(e)}
                    accept="image/png, image/jpeg"
                    hidden
                  />
                </label>
              </Col>
              <Col md={9} className="row">
                {data.map((ele, i) => (
                  <Col key={i} md={6}>
                    <small className="text-light fw-semibold">
                      {ele.label}
                    </small>
                    {ele.editable ? (
                      <div className="input-group input-group-merge">
                        <input
                          type="text"
                          className="no-border"
                          defaultValue={userInfo[ele.name]}
                        // onKeyDown={(e) => update(e, ele.name)}
                        />
                        <span
                          className="no-border"
                          id="basic-addon-search31"
                        >
                          <i className="bx bx-edit"></i>
                        </span>
                      </div>
                    ) : (
                      <p>{userInfo[ele.name]}</p>
                    )}
                    <p>{userInfo[ele.name]}</p>
                  </Col>
                ))}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
}
