import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { connect, useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from "@material-ui/core";
import moment from "moment";
import { showModal } from "../action/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MemoTable = (props) => {

  const [offset, setOffset] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [eachDetails, setEachDetails] = useState([]);
  const [orgtableData, setOrgTableData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);  

  const dispatch = useDispatch();

  
  function handlePageClick (e) {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(offset);

  };

  useEffect(() => {
    loadMoreData()
  }, [currentPage, offset])

  function loadMoreData() {
    const data = orgtableData;

    const slice = data.slice(
      offset,
      offset + perPage
    );

    setPageCount(Math.ceil(data.length / perPage))
    setTableData(slice)

    
  }

  useEffect(()=>{
    getData();
  },[])

  function getData() {
    setTimeout(() => {
      const data = props.memo.memo === null ? "" : props.memo.memo;
      // console.log(data);
      var slice = data.slice(
        offset,
        offset + perPage
      );

      setPageCount(Math.ceil(data.length / perPage));
      setOrgTableData(props.memo.memo);
      setTableData(slice);

    }, 2000);
  }

  function handleClick(e, data) {
    e.preventDefault();

    if (localStorage.getItem("modalValues") === undefined) {
      return "";
    } else if (localStorage.getItem("modalValues") === "view") {
      // dispatch(showModal(data));
      props.showModal();
      // console.log("view");
      // return <View />;
    } else if (localStorage.getItem("modalValues") === "paperclip") {
      // dispatch(showModal());
      // props.showModal();
    }
  };

  function handleClicks(id) {

    // console.log(props);
    if (localStorage.getItem("modalValues") === undefined) {
      return "";
    } else if (localStorage.getItem("modalValues") === "view") {
      // dispatch(showModal());
      props.showModal();
      // console.log("view");
      // return <View />;
      const token = props.authUser.token;

      // console.log(token);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // if token, add to header
      if (token) {
        config.headers["x-auth-token"] = token;
      }

      const queryId = id
      console.log(queryId);

      axios
        .post(
          `${process.env.REACT_APP_API}/api/newMemo/queryMemo`,
          queryId,
          config
        )
        .then((res) => {
          setEachDetails(res.data);
          
          console.log(eachDetails);
        })
        .catch((err) => console.log(err));

    }
  };

    // console.log(eachDetails);

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
            {tableData.map((tdata, index) => (
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
                  <Tooltip title="View details" placement="left-start" arrow interactive>
                    <Button
                      // data={tdata}
                      onClick={(e) => {
                        if (localStorage.token) {
                          handleClicks(tdata._id);
                          // this.handleClicks({ id: tdata._id, data: tdata });
                          localStorage.setItem("modalValues", "view");
                          // localStorage.setItem("modalData", tdata);
                        }
                      }}

                    >
                      <span>
                        <FontAwesomeIcon icon={["far", "eye"]} color="#1976D2" />
                      </span>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Edit memo" placement="left-start" arrow interactive>
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
                  </Tooltip>
                  <Tooltip title="Show attached file" placement="left-start" arrow interactive>
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
                  </Tooltip>
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
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>

    );
  
}

const mapStateToProps = (state) => ({
  memo: state.memo,
  authUser: state.auth,
  // userData: this.state.eachDetails,
});

export default connect(mapStateToProps, { showModal })(MemoTable);


