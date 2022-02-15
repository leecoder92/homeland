/* eslint-disable */
// import axios from 'axios';
import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import "./Notice.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import backEndUrl from "../setup/hld_url";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { Button, Pagination } from "@mui/material";

dayjs.locale("ko");

function Notice() {
  const history = useHistory();
  const BEUrl = backEndUrl;
  const token = localStorage.getItem("jwt");
  const [noticeItems, setNoticeItems] = useState([]);
  const [userAuthority, setUserAuthority] = useState("");
  const limit = 10;
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    if (noticeItems.length % 10 === 0) {
      setPageNum(parseInt(noticeItems.length / 10));
    } else {
      setPageNum(parseInt(noticeItems.length / 10) + 1);
    }
  }, [noticeItems.length]);

  const offset = (page - 1) * limit;
  // 페이지네이션

  const onChangePage = (event, page) => {
    event.preventDefault();
    setPage(page);
  };

  const getNoticeItems = () => {
    axios({
      url: `${BEUrl}/api/v1/notice`,
      method: "get",
    })
      .then((res) => {
        setNoticeItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setToken = () => {
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const getAuthority = () => {
    if (token) {
      axios({
        url: `${BEUrl}/api/v1/users/check-authority`,
        method: "get",
        headers: setToken(),
      }).then((res) => {
        setUserAuthority(res.data);
      });
    }
  };

  const goToNoticeForm = (event) => {
    event.preventDefault();
    history.push("/notice-form");
  };

  useEffect(getNoticeItems, []);
  useEffect(getAuthority, []);
  return (
    <div className="notice">
      <h1>공지사항</h1>
      <Container className="mt-3">
        <Table striped hover>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>#</th>
              <th style={{ width: "60%" }}>제목</th>
              <th style={{ width: "30%" }}>작성시간</th>
            </tr>
          </thead>
          <tbody>
            {noticeItems.slice(offset, offset + limit).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + offset}</td>
                  <td>
                    <Link
                      className="text-decoration-none text-black"
                      to={`/notice-detail/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td>{dayjs(item.updatedAt).format("YYYY. MM. DD")}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {userAuthority === "admin" ? (
          <div className="text-end me-3">
            <Button variant="contained" onClick={goToNoticeForm}>
              글 작성
            </Button>
          </div>
        ) : null}
      </Container>

      <div className="d-flex justify-content-center mb-3">
        <Pagination count={pageNum} shape="rounded" onChange={onChangePage} />
      </div>
    </div>
  );
}

export default Notice;
