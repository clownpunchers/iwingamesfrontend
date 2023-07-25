import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Api } from "../../utils/api";
import { Notify } from "../../utils/notification";

function Contact() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    Api(
      "/admin/newFeedback",
      {
        from: "aaa",
        ...data,
      },
      (res) => {
        const { success } = res;
        if (success) Notify("success", "Sent");
      }
    );
  };

  return (
    <>
      <div id="auth-page">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-center auth-form"
        >
          <div className="form-header">
            <h4 className="form-title">Contact Us</h4>
          </div>

          <div className="form-body p-5 text-center ">
            <InputGroup className="">
              <Form.Control
                type="email"
                className="rounded-0"
                aria-label="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </InputGroup>
            <InputGroup className="mt-3">
              <Form.Control
                type="title"
                className="rounded-0"
                aria-label="title"
                placeholder="Title"
                {...register("title", { required: true })}
              />
            </InputGroup>

            <textarea
              className="mt-3"
              rows={5}
              placeholder="Write subscribe"
              {...register("context", { required: true })}
            />
            <button className="rounded-btn mt-3" type="submit">
              Submit Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
