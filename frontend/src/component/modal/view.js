import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';

const useStyles = makeStyles({
  root: {
    // width: "50%",
    // backgroundColor: "green",
    // display: "flex",
    // // alignItems: "center",
    // justifySelf: "center",
    // marigin: "10%",
    margin: 0,
    background: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    // marginRight: '-50%',
    width: '90%',
    height: '90vh',
    transform: `translate(-50%, -50%)`
  },
  closeImg: {
    cursor:'pointer', 
    float:'right', 
    margin: '20px 20px 20px 0', 
    width: '50px'
  },
  heading: {
    clear: 'both',
    position: 'absolute',
    width: '95%',
    height: '58px',
    margin: 'auto',
    top: '100px',
    background: '#F2F2F2',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
});

export default function View() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.default}>
      <Card className={classes.root}>
        <CardContent>
          <CloseIcon className={classes.closeImg}/>
          <PrintIcon className={classes.closeImg}/>

          <div className={classes.heading}>
            MEMO DETAILS
          </div>


        </CardContent>  
      </Card>
    </div>
  );
}