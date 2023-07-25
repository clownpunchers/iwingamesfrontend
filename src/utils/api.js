import { API_URL } from "../utils/constants";
import $ from "jquery";

const upload = function (e, type, callback) {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append(type, file);

  $.ajax({
    type: "post",
    url: `${API_URL}/upload`,
    data: formData,
    processData: false,
    contentType: false,
    success: (results) => {
      let { res } = results;
      if (type === "image") {
        $(".uploaded_image").attr("src", `${API_URL}/images/${res}`);
      }
      callback(res);
    },
    error: (xhr, status, err) => {
      console.error(err);
    },
  });
};

const Api = (url, data, callback) => {
  $.ajax({
    type: "POST",
    url: `${API_URL + url}`,
    data: data,
    success: (res) => {
      callback(res);
    },
    error: (xhr, status, err) => {
      console.error(err);
    },
  });

  refresh();
};

function refresh() {
  // $(".uploaded_image").attr("src", "../assets/img/select.jpg");
  $('input:not([type="hidden"], [type="submit"], [type="reset"])').each(
    function () {
      const $el = $(this);
      if ($el.attr("type") === "file") {
        $el.wrap("<form>").closest("form").get(0).reset();
        $el.unwrap();
        return;
      }
      $el.val("");
    }
  );

  selectElement("select");
  selectElement("textarea");
}

function selectElement(tag) {
  let element = document.getElementsByTagName(tag);
  element.value = "";
}

export { upload, Api, refresh };
