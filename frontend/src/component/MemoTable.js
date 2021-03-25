<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { PureComponent } from "react";
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
import axios from "axios";
import ReactPaginate from "react-paginate";
import { connect, useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import moment from "moment";
import { showModal } from "../action/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import View from "./modal/view";

<<<<<<< HEAD
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
=======
export class MemoTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,
    };
    // this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
<<<<<<< HEAD
        loadMoreData();
=======
        this.loadMoreData();
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
      }
    );
  };

<<<<<<< HEAD
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

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (localStorage.getItem("modalValues") === undefined) {
  //     return;
  //   }
  //   dispatch(showModal());
  // };

  const handleClick = (e) => {
    e.preventDefault();
    if (localStorage.getItem("modalValues") === undefined) {
      return;
    }
    else if (localStorage.getItem("modalValues") === "view") {
      dispatch(showModal());
      return (
        <View />
      )
    }

    else if (localStorage.getItem("modalValues") === "paperclip") {
      dispatch(showModal());
    }
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
=======
  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    setTimeout(() => {
      const data = this.props.memo.memo === null ? "" : this.props.memo.memo;
      // console.log(data);
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: this.props.memo.memo,
        tableData: slice,
      });
    }, 2000);
  }

  handleClick = (e) => {
    e.preventDefault();
    if (localStorage.getItem("modalValues") === undefined) {
      return;
    } else if (localStorage.getItem("modalValues") === "view") {
      // dispatch(showModal());
      this.props.showModal();
      console.log("view");
      // return <View />;
    } else if (localStorage.getItem("modalValues") === "paperclip") {
      // dispatch(showModal());
      this.props.showModal();
    }
  };

  render() {
    return (
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
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
<<<<<<< HEAD
            {tableData.map((tdata, index) => (
=======
            {this.state.tableData.map((tdata, index) => (
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
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
<<<<<<< HEAD
                        handleClick(e);
=======
                        this.handleClick(e);
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
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
<<<<<<< HEAD
                      setTabDetail(1);
                      setNames("EDIT");
                      setisEdit(true);
=======
                      this.props.setTabDetail(1);
                      this.props.setNames("EDIT");
                      this.props.setisEdit(true);
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
                    }}
                  >
                    <span className="iconTag">
                      <FontAwesomeIcon icon={["far", "edit"]} color="#1976D2" />
                    </span>
                  </Button>
                  <Button
                    onClick={(e) => {
                      if (localStorage.token) {
<<<<<<< HEAD
                        handleClick(e);
=======
                        this.handleClick(e);
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
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
<<<<<<< HEAD
=======

>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
<<<<<<< HEAD
          // pageCount={pageCount}
          pageCount={perPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
=======
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
<<<<<<< HEAD
    </div>
  );
}

const mapStateToProps = (state) => ({
  memo: state.memo.memo,
  auth: state.auth.isAuthenticated,
});

export default connect(null, { showModal })(withStyles(styles)(TranxReport));
=======
    );
  }
}

const mapStateToProps = (state) => ({
  memo: state.memo,
});

export default connect(mapStateToProps, { showModal })(MemoTable);
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
