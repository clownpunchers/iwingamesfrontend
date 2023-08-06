import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../../../utils/api";
import { status } from "../../../../utils/maps.js";
import Stages from "./stages.js";

export default function AddTour({ show }) {
  const { register, handleSubmit } = useForm();
  const [games, setGameList] = useState([]);
  const [showFlag, setShowFlag] = useState(false);
  const [tourInfo, setTourInfo] = useState({});

  const submit = (data) => {
    setTourInfo(data);
    setShowFlag(true);
  };

  useEffect(() => {
    Api("/user/getGames", null, (res) => {
      const { data } = res;
      setGameList(data);
    });
  }, []);

  if (showFlag) {
    return <Stages tourInfo={tourInfo} />;
  } else {
    return (
      <div className="card">
        <h5 className="card-header">Add New Tournament</h5>
        <hr className="my-0" />
        <div className="card-body">

    
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="row">
              <div className="col-md-4">
                <label className="mt-3">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  autoFocus
                  {...register("title", { required: true })}
                />
                <label className="mt-3">Game:</label>
                <select
                  className="form-select"
                  {...register("game", { required: true })}
                >
                  <option value="">Select A Game</option>
                  {games.map((ele, i) => (
                    <option key={i} className={ele.id}>
                      {ele.name}
                    </option>
                  ))}
                </select>
                <label className="mt-3">Status:</label>
                <select
                  className="form-select"
                  {...register("status", { required: true })}
                >
                  <option value="">Select Status</option>
                  {status.map((ele, i) => (
                    <option key={i} value={ele.value}>
                      {ele.label}
                    </option>
                  ))}
                </select>
                <textarea
                  className="form-control mt-3"
                  rows={4}
                  placeholder="Type summary about This tournament"
                  {...register("summary", { required: true })}
                ></textarea>
              </div>
            </div>

            <div className="row mt-3">
              <div className="btn-gorup">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit(submit)}
                >
                  Save
                </button>
                <button className="btn btn-default" onClick={() => show(true)}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
