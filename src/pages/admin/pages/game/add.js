import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Notify } from "../../../../utils/notification";
import { Api, upload } from "../../../../utils/api";

export default function AddGame({ show }) {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState("");
  const [game, setGame] = useState("");

  const uploadImg = (e) => {
    upload(e, "image", (res) => {
      setImage(res);
    });
  };
  
  const uploadGame = (e) => {
    upload(e, "game", (res) => {
      setGame(res);
    });
  };

  const saveGame = (data) => {
    if (image === "") {
      Notify("warning", "Not found Game Image!");
    } else if (game === "") {
      Notify("warning", "Not found Game flie!");
    } else {
      Api(
        "/admin/addNewGame",
        {
          ...data,
          filename: game,
          image: image,
        },
        (res) => {
          const { success } = res;
          if (success) {
            Notify("success", "New Game Created!");
          }
        }
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveGame)}>
        <div className="card">
          <h5 className="card-header">Add New Game</h5>
          <hr className="my-0" />
          <div className="card-body">
            <div className="row">
              <div className="mb-3 col-md-4">
                <div className="">
                  <img
                    src="../assets/img/backgrounds/Mark_001.jpg"
                    alt="game-avatar"
                    className="d-block rounded mb-3 w-100 uploaded_image"
                  />
                  <div className="">
                    <label className="btn btn-primary mb-4 w-100">
                      <span className="d-none d-sm-block">Upload Image</span>
                      <i className="bx bx-upload d-block d-sm-none"></i>
                      <input
                        type="file"
                        className="account-file-input"
                        accept="image/png, image/jpeg"
                        onChange={(e) => uploadImg(e)}
                        hidden
                      />
                    </label>
                    <p className="text-muted mb-0">
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-8">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    autoFocus
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Alias</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    {...register("alias", { required: true })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Source</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".rar,.zip"
                    onChange={(e) => uploadGame(e)}
                  />
                  <p className="text-muted mt-3">
                    Allowed RAR or ZIP. Max size of 500M
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Summary</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    {...register("summary", { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-3" style={{ float: "right" }}>
              <button type="submit" className="btn btn-primary me-2">
                Save changes
              </button>
              <button
                type="reset"
                className="btn btn-outline-secondary"
                onClick={() => show(true)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
