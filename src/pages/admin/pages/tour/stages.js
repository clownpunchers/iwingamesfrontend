import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../../../utils/api";
import { stage_menu, prize_menu } from "../../../../utils/maps";
import { refresh } from "../../../../utils/api";
import { Notify } from "../../../../utils/notification";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";

export default function Stages({ tourInfo }) {
  const { register, handleSubmit } = useForm();
  const [no, setNo] = useState(1);
  const [prizes, setPrizes] = useState(prize_menu);
  const [rewards, setRewards] = useState([]);
  const [stageIds, setStageIds] = useState([]);

  const handleAdvanceChange = (i) => {
    const newRows = [...prizes];
    newRows[i].advance = !newRows[i].advance;
    setPrizes(newRows);
  };

  const handlePrizeTypeChange = (i, value) => {
    const newRows = [...prizes];
    newRows[i].prizeType = value;
    setPrizes(newRows);
  };

  const handlePrizeChange = (i, value) => {
    const newRows = [...prizes];
    newRows[i].value = value;
    setPrizes(newRows);
  };

  const submit = (data) => {
    let advances = prizes.filter((ele) => ele.advance === true).length;
    let values = prizes.filter((ele) => ele.value !== "").length;

    if (advances === 0) {
      let msg =
        no === 1
          ? "Are you creating a single level tournament?"
          : "This is final stage?";
      if (window.confirm(msg)) {
        if (values === 0) {
          Notify("warning", "please select the prizes");
          return;
        }
        saveStage(data);
      }
    } else {
      setNo(no + 1);
      saveStage(data);
    }
  };

  const saveStage = (data) => {
    Api("/admin/addStage", { ...data, no, prizes }, (res) => {
      const { success, insertId } = res;
      if (success) {
        Notify("success", "New stage have been created");
        setStageIds([...stageIds, insertId]);
        setPrizes(prize_menu);
        refresh();
      }
    });
  };

  useEffect(() => {
    Api("/user/getPrizes", null, (res) => {
      const { success, data } = res;
      if (success) setRewards(data);
    });
  }, []);

  return (
    <Form
      className="card"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Card.Body className="mb-4">
        <Row>
          <Col md={4}>
            <h5 className="card-header">Stage: {no}</h5>
            {stage_menu.map((ele, j) => (
              <Form.Group key={j} className="mt-3">
                <Form.Label>{ele.label}</Form.Label>
                <Form.Control
                  autoFocus={ele.autoFoucs ? true : false}
                  name={ele.name}
                  type={ele.type}
                  label={ele.label}
                  placeholder={ele.placeholder}
                  {...register(ele.name, { required: true })}
                />
              </Form.Group>
            ))}
          </Col>
          <Col md={8}>
            <h5 className="card-header">Prizes on stage: {no}</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Advance</th>
                  <th>Prize Type</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                {prizes.map((row, i) => (
                  <tr key={i}>
                    <td>{row.place}</td>
                    <td>
                      <Form.Check
                        type="checkbox"
                        onChange={() => handleAdvanceChange(i)}
                        name={`player-${row.place}-advance`}
                        className="form-check-input"
                      />
                    </td>
                    <td>
                      <Form.Select
                        onChange={(event) =>
                          handlePrizeTypeChange(i, event.target.value)
                        }
                        name={`player-${row.place}-prize-type`}
                        className="form-select"
                      >
                        <option value="">No Rewards</option>
                        <option value="coin">Coin</option>
                        <option value="voucher">Voucher</option>
                      </Form.Select>
                    </td>
                    <td>
                      {row.prizeType === "coin" ? (
                        <InputGroup>
                          <FormControl
                            type="number"
                            onChange={(event) =>
                              handlePrizeChange(i, event.target.value)
                            }
                            name={`player-${row.place}-prize`}
                          />
                          <InputGroup.Text>Coin(s)</InputGroup.Text>
                        </InputGroup>
                      ) : row.prizeType === "voucher" ? (
                        <Form.Select
                          onChange={(event) =>
                            handlePrizeChange(i, event.target.value)
                          }
                          className="form-select"
                          name={`player-${row.place}-prize`}
                        >
                          <option value="">Select Voucher</option>
                          {rewards.map((ele, j) => (
                            <option key={j} value={ele.id}>
                              {ele.title}
                            </option>
                          ))}
                        </Form.Select>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
      <Row className="justify-content-end">
        <Col md={4} className="d-flex justify-content-end">
          <Button
            type="submit"
            className="btn btn-primary  me-2"
            onClick={handleSubmit(submit)}
          >
            Save Stage
          </Button>
          <Button className="btn btn-warning" onClick={() => refresh()}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
