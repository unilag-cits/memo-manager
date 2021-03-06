import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton'
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showModal, hideModal } from "../../action/modal";


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
    // position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '58px',
    margin: 'auto',
    top: '100px',
    background: '#F2F2F2',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  tables: {
    // position: 'absolute',
    // top: '170px',
    // border: '3px solid #000',
    margin: 'auto',
    width: '95%',
    borderSpacing: "0",
    borderCollapse: "collapse"
  },

  spaces: {
    width: '95%',
    height: '75px',
    margin: 'auto', 
    border: '1px solid red',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionBtn: {
    display: "flex",
    paddint: "5px 20px ",
    justifyContent: "space-evenly"
  }
});

export default function Treat(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>???</span>;

  function handleClick(props) {
    props.showModal();
  }

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function changeStatus () {
    //this function should change the status of the memo and show the changes in the status button
  }

  return (
    <div className={classes.default}>
      <Card className={classes.root}>
        <CardContent>

          <CloseIcon onClick={props.onClose} className={classes.closeImg} />
          <PrintIcon className={classes.closeImg}/>

          <div className={classes.heading}>
            TREAT MEMO
          </div>

          <div className={classes.spaces}>
            <span>Logged date:   <strong>Date</strong></span>
            <span>
              Status:   
              <Button
                variant="contained"
                style={{ backgroundColor: "#FF0000", color: "#fff" }}
              >
                pending
              </Button>
            </span>
          </div>

          <div className="responsive-container">
            <table className={classes.tables}>
              <tbody>
                <tr>
                  <td>M/No: </td>
                  <td></td>
                  <td>Title: </td>
                  <td colSpan='3'>{}</td>
                </tr>
                <tr>
                  <td className="double">Add remark </td>
                  <td className="double" colSpan="5">
                  <TextField
                    id="standard-multiline-flexible"
                    label="Remarks"
                    multiline
                    rowsMax={4}
                    value={value}
                    onChange={handleChange}
                  />
                  </td>
                </tr>
              </tbody>
            </table>

            <Button
              variant="contained"
              style={{ backgroundColor: "#2E87A9", color: "#fff" }}
              onClick={changeStatus}
            >
              Re-assign
            </Button>
          </div>

        </CardContent>  
      </Card>
    </div>
  );
}