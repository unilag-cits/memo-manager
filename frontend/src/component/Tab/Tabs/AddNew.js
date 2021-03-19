import React, { useState } from "react";
import Form from "./Form";
import { Button } from "@material-ui/core";

const AddNew = () => {
  return (
    <div>
      <div className="new">
        <h2>NEW MEMO</h2>
        <Button
          onClick={(e) => this.handleClick(e)}
          style={{ position: "absolute", right: 100, top: 250 }}
        >
          Memo List
        </Button>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default AddNew;
