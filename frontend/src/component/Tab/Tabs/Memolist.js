import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import Search from "../../Search/Search";
import MemoTable from "../../MemoTable";
import Grid from "@material-ui/core/Grid";

const Memolist = ({ setTab, setNames, setisEdit }) => {
  function testPage(i) {
    setTab(i)
  }

  return (
    <Container>
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
            setTabDetail={testPage}
          />
        </div>
      </Grid>
    </Container>
  );
};

export default Memolist;
