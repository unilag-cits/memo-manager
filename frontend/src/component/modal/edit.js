import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: `translate(-50%, -50%)`,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Edit() {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: "",
    from: "",
    to: "",
    dateofArrival: "",
  });

  const { title, from, to, dateofArrival } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleClick = (e) => {
    console.log(values);
  };

  return (
    <div className={classes.default}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Edit Document
          </Typography>
          <div className="emails">
            <TextField
              id="filled-basic"
              // value={title || ""}
              onChange={handleChange("title")}
              label="Title"
              variant="filled"
            />
          </div>
          <div className="emails">
            <TextField
              id="filled-basic"
              // value={from || ""}
              onChange={handleChange("from")}
              label="From"
              variant="filled"
            />
          </div>
          <div className="emails">
            <TextField
              id="filled-basic"
              // value={to || ""}
              onChange={handleChange("to")}
              label="To"
              variant="filled"
            />
          </div>
          <div className="emails">
            <TextField
              id="filled-basic"
              // value={dateofArrival || ""}
              onChange={handleChange("dateofArrival")}
              label="DateOfArrival"
              variant="filled"
            />
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={handleClick} size="small">
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
