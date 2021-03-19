import React, { PureComponent } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
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

export class TranxReport extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
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

  handleClick = (e) => {
    e.preventDefault();
    if (localStorage.getItem("modalValues") === undefined) {
      return;
    }
    this.props.showModal();
  };

  handleClickView = (e) => {
    e.preventDefault();
    if (localStorage.getItem("modalValues") === undefined) {
      return;
    }
    this.props.showModal();
  };

  handleClickEdit = (e) => {
    e.preventDefault();
    if (localStorage.getItem("modalValues") === undefined) {
      return;
    }
    this.props.showModal();
  };

  getData = () => {
    console.log(this.props.memo);
    setTimeout(() => {
      return this.props.memo === null
        ? ""
        : this.setState({
            pageCount: Math.ceil(this.props.memo.length / this.state.perPage),
            orgtableData: this.props.memo,
            tableData: this.props.memo.slice(
              this.state.offset,
              this.state.offset + this.state.perPage
            ),
          });
    }, 2000);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <ReactPaginate
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
        /> */}
        <div className="responsive-container">
          <table>
            <thead>
              <tr>
                <th>M/No</th>
                <th>Title</th>
                <th>From</th>
                <th>To</th>
                <th>Date of Arrival</th>
                <th>date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.map((tdata, index) => (
                <tr key={index}>
                  <td data-title="M/No">{index + 1}</td>
                  <td data-title="Title">{tdata.memoTitle}</td>
                  <td data-title="From">{tdata.memoFrom}</td>
                  <td data-title="To">{tdata.memoTo}</td>
                  <td data-title="Date of Arrival">not yet done</td>
                  <td data-title="Logged date">
                    {moment(tdata.createdAt).format("DD MMM, YYYY")}
                  </td>
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
                          this.handleClick(e);
                          localStorage.setItem("modalValues", "view");
                        }
                      }}
                    >
                      <span>
                        <FontAwesomeIcon
                          icon={["far", "eye"]}
                          color="#1976D2"
                        />
                      </span>
                    </Button>
                    <Button
                      onClick={(e) => {
                        if (localStorage.token) {
                          this.handleClick(e);
                          localStorage.setItem("modalValues", "edit");
                        }
                      }}
                    >
                      <span className="iconTag">
                        <FontAwesomeIcon
                          icon={["far", "edit"]}
                          color="#1976D2"
                        />
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  memo: state.memo.memo,
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { showModal })(
  withStyles(styles)(TranxReport)
);
