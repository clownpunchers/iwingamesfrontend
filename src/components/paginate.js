import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { API_URL } from "../utils/constants";
import { Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const itemsPerPage = 8;

function PaginatedItems({ items }) {
  const navigator = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItemOffset(0);
  }, [items]);

  return (
    <>
      {currentItems.map((ele, i) => (
        <Col md={3} key={i} className="mb-3 px-0">
          <div className="thumbnail">
            <Image
              src={`${API_URL}/images/${ele.image}`}
              className="hover-img"
              alt="game-image"
              fluid
            />
            <Button
              className={"mt-2 play-btn"}
              variant="danger"
              onClick={() => {
                localStorage.setItem(
                  "selected_game",
                  JSON.stringify({
                    url: ele.url,
                    name: ele.name,
                  })
                );
                navigator("/gameplay");
              }}
            >
              {ele.name || ele.title}
            </Button>
            <div className="tip">{ele.summary}</div>
          </div>
        </Col>
      ))}
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
    </>
  );
}

export default PaginatedItems;
