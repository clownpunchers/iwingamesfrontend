import React, { useEffect, useState } from "react";
import { Api } from "../../../../utils/api";
// import { Notify } from "../../../utils/notification";
import $ from "jquery";

function AffConf() {
  const [formData, setFormData] = useState({});

  const inputs = [
    {
      name: "aff_shr",
      label: "Affiliate Revenue Share(%)",
    },
    {
      name: "sup_shr",
      label: "Super Affiliate's Share(%)",
    },
    {
      name: "sub_shr",
      label: "Sub Affiliate's Share(%)",
    },
  ];

  const handleInputChange = (e, key) => {
    const { value } = e.target;

    if (value > 100) {
      e.target.value = 0;
    }

    setFormData({ ...formData, [key]: value });

    switch (key) {
      case "aff_shr":
        $("#A1").html(value);
        break;
      case "sup_shr":
        $("#B1").html(value);
        $("#B2").html(formData.aff_shr - value);
        $("#A2").html(formData.aff_shr - value);
        break;
      case "sub_shr":
        $("#C1").html(value);
        $("#A3").html(formData.sup_shr - value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    Api("/admin/setAffShare", formData, (res) => {
      const { success } = res;
      if (success) {
        // showInfo("info", 3, "Warning", "Setting saved!");
      } else {
        // showInfo("warning", 3, "Warning", "Something is error!");
      }
    });
  };

  useEffect(() => {
    Api("/admin/getAffShare", null, (res) => {
      const { success, data } = res;
      if (success) {
        setFormData(data[0]);
      }
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-5">
        <div className="card mb-4">
          <h5 className="card-header">Affiliate Revenue Config</h5>
          <div className="card-body">
            {inputs.map((field, i) => (
              <div className="mb-3 row">
                <label className="col-md-6 col-form-label">{field.label}</label>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="number"
                    min={1}
                    max={50}
                    placeholder={formData[field.name]}
                    onChange={(e) => handleInputChange(e, field.name)}
                  />
                </div>
              </div>
            ))}

            <hr className="m-0" />
            <div className="table-responsive text-nowrap">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>aff_shr</th>
                    <th>sup_shr</th>
                    <th>sub_shr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id="A1">-</td>
                    <td id="A2">-</td>
                    <td id="A3">-</td>
                  </tr>
                  <tr>
                    <td id="B1">-</td>
                    <td id="B2">-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td id="C1">-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-primary mt-3"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AffConf;
