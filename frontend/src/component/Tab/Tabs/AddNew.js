import React, { useState } from "react";
import Form from "./Form";
import { Button, Grid } from "@material-ui/core";

const AddNew = ({ name, isEdit }) => {
  return (
    <Grid item xs={12}>
      <Grid container justify="space-between" spacing={4}>
        <h2 className="text-uppercase">{name}</h2>
        <Button>Memo List</Button>
      </Grid>
      <div>
        <Form nameState={name} />
      </div>
    </Grid>
  );
};

export default AddNew;
