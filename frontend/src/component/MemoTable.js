import React, { PureComponent } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { connect, useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import moment from "moment";
import { showModal } from "../action/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import View from "./modal/view";

export class MemoTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      eachDetails: {},
      orgtableData: [],
      perPage: 5,
      currentPage: 0,
    };
    // this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

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
      return "";
    } else if (localStorage.getItem("modalValues") === "view") {
      // dispatch(showModal());
      this.props.showModal();
      // console.log("view");
      // return <View />;
    } else if (localStorage.getItem("modalValues") === "paperclip") {
      // dispatch(showModal());
      this.props.showModal();
    }
  };

  handleClicks = (props) => {
    // console.log(props.id);
    const id = props.id;
    const token = this.props.authUser.token;

    console.log(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // if token, add to header
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const queryId = {
      id,
    };

    axios
      .post(
        `${process.env.REACT_APP_API}/api/newMemo/queryMemo`,
        queryId,
        config
      )
      .then((res) => this.setState({ eachDetails: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.eachDetails);
    return (
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
            {this.state.tableData.map((tdata, index) => (
              // console.log(tdata)
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
                    // data={tdata}
                    onClick={(e) => {
                      if (localStorage.token) {
                        this.handleClicks({ id: tdata._id });
                        localStorage.setItem("modalValues", "view");
                        // localStorage.setItem("modalData", tdata);
                      }
                    }}
                  >
                    <span>
                      <FontAwesomeIcon icon={["far", "eye"]} color="#1976D2" />
                    </span>
                  </Button>
                  <Button
                    onClick={() => {
                      this.props.setTabDetail(1);
                      this.props.setNames("EDIT");
                      this.props.setisEdit(true);
                    }}
                  >
                    <span className="iconTag">
                      <FontAwesomeIcon icon={["far", "edit"]} color="#1976D2" />
                    </span>
                  </Button>
                  <Button
                    onClick={(e) => {
                      if (localStorage.token) {
                        this.handleClick(e);
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
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  memo: state.memo,
  authUser: state.auth,
});

export default connect(mapStateToProps, { showModal })(MemoTable);
