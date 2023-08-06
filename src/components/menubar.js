import React from "react";
import { Col, ListGroup, Row, Image } from "react-bootstrap";

const data = [
  {
    title: "sdfsa",
    name: "asdfas",
    info: ["SADfas", "asdfasfa"],
    img: "../assets/img/icons/avatar.png",
  },
  {
    title: "sdfsa",
    name: "asdfas",
    info: ["SADfas", "asdfasfa"],
    img: "../assets/img/icons/avatar.png",
  },
  {
    title: "sdfsa",
    name: "asdfas",
    info: ["SADfas", "asdfasfa"],
    img: "../assets/img/icons/avatar.png",
  },
  {
    title: "sdfsa",
    name: "asdfas",
    info: ["SADfas", "asdfasfa"],
    img: "../assets/img/icons/avatar.png",
  },
  {
    title: "sdfsa",
    name: "asdfas",
    info: ["SADfas", "asdfasfa"],
    img: "../assets/img/icons/avatar.png",
  },
  {
    title: "sdfsa",
    name: "asdfas",
    info: ["SADfas", "asdfasfa"],
    img: "../assets/img/icons/avatar.png",
  },
];

export default function MenuBar() {
  return (
    <div className="menubar mb-1">
      <video style={{ width: "100%", height: "25vh" }} controls autoPlay>
        <source src="../assets/movie.mp4" type="video/mp4" />
      </video>
      <ListGroup>
        {data.map((ele, i) => (
          <ListGroup.Item className="rounded-0 mb-1" key={i}>
            <Row>
              <Col sm={3} className="text-center">
                <Image
                  src="../assets/img/icons/avatar.png"
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-circle"
                />
                <small style={{ fontSize: "10px" }}>Active</small>
              </Col>
              <Col sm={9}>
                <p style={{ fontSize: "14px" }}>
                  True Winner <br /> Rewards: $10000
                </p>
                <small style={{ fontSize: "10px" }}>
                  Started 02/23/2023, Joined: 29883,
                </small>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
