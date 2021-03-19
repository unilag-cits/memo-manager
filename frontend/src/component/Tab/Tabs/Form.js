import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import UploadButton from "../../Uploadbtn";
import { makeStyles } from "@material-ui/core/styles";
import { memo } from "../../../action/newMemoForm";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: "none",
//   },
// }));

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memoFrom: "",
      memoTo: "",
      memoTitle: "",
      memoRemark: "",
      date: "",
      file: "",
      imageFile: [],
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  handleImageChange = (e) => {
    const blob = new Blob([e.target.files[0]]);
    const blobUrl = URL.createObjectURL(blob);
    const name = e.target.files[0].name;
    const type = e.target.files[0].type;
    this.setState({
      file: blobUrl,
    });

    var newFile = new File(
      [blobUrl],
      { name },
      { type },
      { lastModified: 1534584790000 }
    );
    this.setState({
      file: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { memoFrom, memoTo, memoTitle, memoRemark, date, file } = this.state;

    // if (file !== "") {
    //   this.setState({ redirect: true });
    // }

    let formData = new FormData();
    formData.append("memoFrom", memoFrom);
    formData.append("memoTo", memoTo);
    formData.append("memoTitle", memoTitle);
    formData.append("memoRemark", memoRemark);
    formData.append("date", date);
    formData.append("file", file);

    const newMemo = {
      memoFrom,
      memoTo,
      memoTitle,
      memoRemark,
      date,
      formData,
    };

    // console.log(formData);

    this.props.memo(formData);
  };

  render() {
    return (
      <div style={{ paddingTop: "50px" }}>
        <div style={{ paddingTop: "20px" }}>
          <label style={{ paddingRight: "35px" }}>From: </label>
          <TextField
            style={{ width: "80%" }}
            id="outlined-basic"
            name="memoFrom"
            onChange={(e) => this.handleChange(e)}
            value={this.state.memoFrom || ""}
            variant="outlined"
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <label style={{ paddingRight: "50px" }}>To: </label>
          <TextField
            style={{ width: "80%" }}
            id="outlined-basic"
            name="memoTo"
            onChange={(e) => this.handleChange(e)}
            value={this.state.memoTo || ""}
            variant="outlined"
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <label style={{ paddingRight: "40px" }}>Title: </label>
          <TextField
            style={{ width: "80%" }}
            id="outlined-basic"
            name="memoTitle"
            onChange={(e) => this.handleChange(e)}
            value={this.state.memoTitle || ""}
            variant="outlined"
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <label style={{ paddingRight: "40px" }}>Date: </label>
          <TextField
            style={{ width: "80%" }}
            id="outlined-basic"
            name="date"
            onChange={(e) => this.handleChange(e)}
            value={this.state.date || ""}
            variant="outlined"
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <label style={{ paddingRight: "23px" }}>Remark: </label>
          <TextField
            style={{ width: "80%" }}
            id="outlined-basic"
            name="memoRemark"
            onChange={(e) => this.handleChange(e)}
            value={this.state.memoRemark || ""}
            multiline
            rows={3}
            variant="outlined"
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          {/* <UploadButton /> */}
          {/* <div className={classes.root}> */}
          <div>
            <input
              accept="image/*"
              // className={classes.input}
              style={{ display: "none" }}
              onChange={this.handleImageChange}
              id="contained-button-file"
              single="true"
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload file
              </Button>
            </label>
            {/* <input
              type="file"
              name="audio"
              className="inputfile"
              onChange={this.handleImageChange}
            /> */}
          </div>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <Button variant="contained" onClick={(e) => this.handleSubmit(e)}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { memo })(Form);
