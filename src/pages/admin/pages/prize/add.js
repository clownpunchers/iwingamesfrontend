import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { Notify } from "../../../../utils/notification";
import { Api, upload } from "../../../../utils/api";

export default function AddPrize({ show }) {

  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState("");

  const uploadImg = (e) => {
    upload(e, "image", (res) => {
      setImage(res);
    });
  };

  const savePrize = (data) => {
    if (image === "") {
      // showInfo("warning", 3, "Notification", "Not found image!");
    } else {
      Api(
        "/admin/addNewPrize",
        {
          ...data,
          image: image,
        },
        (res) => {
          const { success } = res;
          if (success) {
            // showInfo("info", 3, "Notification", "New prize Created!");
          }
        }
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(savePrize)}>
        <div className="card">
          <h5 className="card-header">Add New Prize</h5>
          <hr className="my-0" />
          <div className="card-body">
            <div className="row">
              <div className="mb-3 col-md-4">
                <img
                  src="../assets/img/select.jpg"
                  alt="user-avatar"
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
              <div className="mb-3 col-md-8">
                <div className="mb-3">
                  <label className="form-label">title</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="The name or description of the prize."
                    autoFocus
                    {...register("title", { required: true })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">value</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="The monetary value of the prize."
                    {...register("value", { required: true })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">quantity</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="The number of prizes available."
                    {...register("quantity", { required: true })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Expiration</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="The date when the prize will expire or become unavailable."
                    {...register("expire", { required: true })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Summary</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    {...register("summary", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3" style={{ float: "right" }}>
              <button type="submit" className="btn btn-primary me-2">
                Save
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
