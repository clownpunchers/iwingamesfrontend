import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Row, Col, Image, Button } from "react-bootstrap";
import { Api } from "../../utils/api";
import { Notify } from "../../utils/notification";
import { API_URL } from "../../utils/constants";

export default function Rewards() {
  const [itemOffset, setItemOffset] = useState(0);
  const [prizes, setPrizes] = useState([]);

  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = prizes.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(prizes.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % prizes.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    Api("/user/getPrizes", {}, (res) => {
      const { success, data } = res;
      if (!success) Notify("error", "server error");
      setPrizes(data);
    });
  }, []);
  return (
    <div className="paginate-container">
      <Row className="px-2">
        {currentItems.map((ele, i) => (
          <Col md={3} key={i} className="mb-3 px-0">
            <div className="thumbnail">
              <Image
                src={`${API_URL}/images/${ele.img}`}
                className="hover-img"
                alt="prize-image"
                fluid
              />
              <Button className={"mt-2 play-btn"} variant="danger">
                {ele.title}
              </Button>
              <div className="tip">{ele.summary}</div>
            </div>
          </Col>
        ))}
      </Row>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<i className="bi bi-chevron-double-right"></i>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        className="paginate"
        pageCount={pageCount}
        previousLabel={<i className="bi bi-chevron-double-left"></i>}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
