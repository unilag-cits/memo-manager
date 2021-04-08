import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button, Container } from "@material-ui/core";
import UploadButton from "../../Uploadbtn";
import { makeStyles } from "@material-ui/core/styles";
import { memo } from "../../../action/newMemoForm";
import MenuItem from "@material-ui/core/MenuItem";

function Form(props) {
  const [values, setValues] = useState({
    memoFrom: "",
    memoTo: "",
    memoTitle: "",
    memoRemark: "",
    date: "",
    loggedDate: "",
    file: "",
    select: "",
    imageFile: [],
  });

  const {
    memoFrom,
    memoTo,
    memoTitle,
    memoRemark,
    date,
    loggedDate,
    file,
    select,
    imageFile,
  } = values;
  // <<<<<<< HEAD
  //   // constructor(props) {
  //   //   super(props);

  //   //   this.state = {
  //   //     memoFrom: "",
  //   //     memoTo: "",
  //   //     memoTitle: "",
  //   //     memoRemark: "",
  //   //     date: "",
  //   //     loggedDate: "",
  //   //     file: "",
  //   //     imageFile: [],
  //   //   };
  //   // }
  // =======
  // >>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleImageChange = (e) => {
    const blob = new Blob([e.target.files[0]]);
    const blobUrl = URL.createObjectURL(blob);
    const name = e.target.files[0].name;
    const type = e.target.files[0].type;
    // <<<<<<< HEAD
    //     setValues({ ...values,
    //       file: blobUrl,
    //     });
    // =======
    setValues({ ...values, file: blobUrl });
    // >>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f

    var newFile = new File(
      [blobUrl],
      { name },
      { type },
      { lastModified: 1534584790000 }
    );
    // <<<<<<< HEAD
    //     setValues({...values,
    //       file: e.target.files[0],
    //     });
    // =======
    setValues({ ...values, file: e.target.files[0] });
    // >>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // <<<<<<< HEAD
    //     // const {
    //     //   memoFrom,
    //     //   memoTo,
    //     //   memoTitle,
    //     //   memoRemark,
    //     //   date,
    //     //   file,
    //     //   loggedDate,
    //     // } = this.state;
    // =======
    const {
      memoFrom,
      memoTo,
      memoTitle,
      memoRemark,
      date,
      loggedDate,
      file,
      select,
      imageFile,
    } = values;
    // >>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f

    let formData = new FormData();
    formData.append("memoFrom", memoFrom);
    formData.append("memoTo", memoTo);
    formData.append("memoTitle", memoTitle);
    formData.append("memoRemark", memoRemark);
    formData.append("date", date);
    formData.append("loggedDate", loggedDate);
    formData.append("file", file);

    const newMemo = {
      memoFrom,
      memoTo,
      memoTitle,
      memoRemark,
      date,
      formData,
      loggedDate,
    };

    // console.log(newMemo);

    props.memo(formData);
  };

  return (
    <Container>
      <div className="formUpdate" style={{ paddingTop: "50px" }}>
        <div style={{ paddingTop: "20px" }}>
          <TextField
            id="date"
            label="Date"
            variant="filled"
            className="formDate"
            type="date"
            defaultValue="2017-05-24"
            name="date"
            onChange={(e) => handleChange(e)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <TextField
            id="date"
            label="Logged Date"
            variant="filled"
            className="formDate"
            type="date"
            defaultValue="2017-05-24"
            name="loggedDate"
            onChange={(e) => handleChange(e)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <TextField
            id="outlined-basic"
            label="From"
            name="memoFrom"
            className="formText"
            onChange={(e) => handleChange(e)}
            value={memoFrom}
            variant="filled"
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <TextField
            id="outlined-basic"
            name="memoTo"
            label="To"
            className="formText"
            onChange={(e) => handleChange(e)}
            value={memoTo}
            variant="filled"
          />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <TextField
            id="outlined-basic"
            name="memoTitle"
            label="Title"
            className="formText"
            onChange={(e) => handleChange(e)}
            value={memoTitle}
            multiline
            rows={6}
            variant="filled"
          />
        </div>

        <div style={{ paddingTop: "20px" }}>
          <TextField
            // style={{ width: "50%" }}
            id="outlined-basic"
            name="memoRemark"
            label="Remark"
            className="formText"
            onChange={(e) => handleChange(e)}
            value={memoRemark}
            multiline
            rows={6}
            variant="filled"
          />
        </div>
        {/* <<<<<<< HEAD
        <div >
======= */}
        <div>
          {/* >>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f */}
          <div style={{ paddingTop: "30px" }}>
            <div>
              <input
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                id="contained-button-file"
                single="true"
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload file
                </Button>
              </label>
            </div>
          </div>
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            value={select}
            onChange={handleChange}
            helperText="Please select memo status"
          >
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="URGENT">URGENT</MenuItem>
          </TextField>
        </div>
        <div className="" style={{ paddingTop: "30px" }}>
          <Button variant="contained" onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default connect(null, { memo })(Form);
