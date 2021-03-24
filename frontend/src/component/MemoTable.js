import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { connect, useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import moment from "moment";
import { showModal } from "../action/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  title: {
    margin: "auto",
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
  },
});

export function TranxReport({ props, setTabDetail, setisEdit, setNames }) {
  const memo = useSelector((state) => state.memo.memo);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const [values, setValues] = useState({
    offset: 0,
    tableData: [],
    orgtableData: [],
    perPage: 5,
    currentPage: 0,
    // pageCount:
  });

  const { offset, tableData, orgtableData, perPage, currentPage } = values;

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  const loadMoreData = () => {
    const data = orgtableData;

    const slice = data.slice(offset, offset + perPage);
    this.setState({
      pageCount: Math.ceil(data.length / perPage),
      tableData: slice,
    });
  };

  // componentDidMount() {
  //   this.getData();
  // }
  useEffect(() => {
    getData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (localStorage.getItem("modalValues") === undefined) {
      return;
    }
    dispatch(showModal());
  };

  const getData = () => {
    setTimeout(() => {
      return memo === null
        ? ""
        : setValues({
            pageCount: Math.ceil(memo.length / perPage),
            orgtableData: memo,
            tableData: memo.slice(offset, offset + perPage),
          });
    }, 2000);
  };

  return (
    <div>
      <div className="responsive-container">
        <table>
          <thead>
            <tr>
              <th>M/No</th>
              <th>Title</th>
              <th>From</th>
              <th>To</th>
              <th>date</th>
              <th>Logged Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((tdata, index) => (
              <tr key={index}>
                <td data-title="M/No">{index + 1}</td>
                <td data-title="Title">{tdata.memoTitle}</td>
                <td data-title="From">{tdata.memoFrom}</td>
                <td data-title="To">{tdata.memoTo}</td>
                <td data-title="Logged date">
                  {moment(tdata.createdAt).format("DD MMM, YYYY")}
                </td>
                <td data-title="Date of Arrival">{tdata.LoggedDate}</td>
                <td data-title="Status">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#FF0000", color: "#fff" }}
                  >
                    pending
                  </Button>
                </td>
                <td data-title="Pending">
                  <Button
                    onClick={(e) => {
                      if (localStorage.token) {
                        handleClick(e);
                        localStorage.setItem("modalValues", "view");
                      }
                    }}
                  >
                    <span>
                      <FontAwesomeIcon icon={["far", "eye"]} color="#1976D2" />
                    </span>
                  </Button>
                  <Button
                    onClick={() => {
                      setTabDetail(1);
                      setNames("EDIT");
                      setisEdit(true);
                    }}
                  >
                    <span className="iconTag">
                      <FontAwesomeIcon icon={["far", "edit"]} color="#1976D2" />
                    </span>
                  </Button>
                  <Button
                    onClick={(e) => {
                      if (localStorage.token) {
                        handleClick(e);
                        localStorage.setItem("modalValues", "paperclip");
                      }
                    }}
                  >
                    <span className="iconTag">
                      <FontAwesomeIcon
                        icon={["fas", "paperclip"]}
                        color="#1976D2"
                      />
                    </span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          // pageCount={pageCount}
          pageCount={perPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  memo: state.memo.memo,
  auth: state.auth.isAuthenticated,
});

export default connect(null, { showModal })(withStyles(styles)(TranxReport));
