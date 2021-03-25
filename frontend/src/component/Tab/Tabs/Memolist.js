import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import Search from "../../Search/Search";
import MemoTable from "../../MemoTable";
import Grid from "@material-ui/core/Grid";

const Memolist = ({ setTab, setNames, setisEdit }) => {
<<<<<<< HEAD
  return (
    // <Container>
=======
  function testPage(i) {
    setTab(i)
  }

  return (
    <Container>
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
      <Grid item xs={12}>
        <Grid container justify="space-between" spacing={4}>
          <h2>ARRIVALS</h2>
          <Button
            onClick={() => {
              setTab(1);
              setNames("ADD NEW");
            }}
          >
            Add New Memo
          </Button>
        </Grid>
        <hr />
        <div style={{ position: "absolute", right: 100 }}>
          <Search />
        </div>
        <div>
          <MemoTable
            setNames={setNames}
            setisEdit={setisEdit}
<<<<<<< HEAD
            setTabDetail={setTab}
          />
        </div>
      </Grid>
    // </Container>
=======
            setTabDetail={testPage}
          />
        </div>
      </Grid>
    </Container>
>>>>>>> ac83e25b82d9567c0a54311523b551a7f1a92e3f
  );
};

export default Memolist;
