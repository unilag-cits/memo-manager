import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton'
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
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
    display: "inline-block",
    paddint: "5px 20px ",
    margin: "5px 50px 5px 5px"
  }
});

export default function View({viewData, onClose}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>???</span>;

  // console.log(viewData);

  function handleClick() {
    if (localStorage.getItem("modalValues") === undefined) {
      return "";
    } else if (localStorage.getItem("modalValues") === "treat") {

    }
  }

  return (
    <div className={classes.default}>
      <Card className={classes.root}>
        <CardContent>

          <Tooltip title="Close" placement="left-start" arrow interactive>
            <Button 
              onClick={onClose} 
              className={classes.closeImg}
              startIcon={<CloseIcon />}
            >
            </Button>
          </Tooltip>
          <Tooltip title="Close" placement="left-start" arrow interactive>
            <Button 
              disabled 
              className={classes.closeImg}
              startIcon={<PrintIcon />}
            >
            </Button>
          </Tooltip>

          <div className={classes.heading}>
            MEMO DETAILS
          </div>

          <div className={classes.spaces}>
            <span>Logged date: <strong>Date</strong></span>
            <span>
              Status:   
              <Button
                variant="contained"
                style={{ backgroundColor: "#FF0000", color: "#fff", marginLeft: "20px" }}
              >
                Pending
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
                  <td>From: </td>
                  <td></td>
                  <td>To: </td>
                  <td></td>
                  <td>Date: </td>
                  <td></td>
                </tr>
                <tr>
                  <td className="double">Details: </td>
                  <td className="double" colSpan="5"></td>
                </tr>
                <tr>
                  <td>Actions: </td>
                  <td colSpan="5">
                    <div className={classes.actionBtn}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#2E87A9", color: "#fff" }}
                        onClick={(e) => {
                          if (localStorage.token) {
                            handleClick();
                            localStorage.setItem("modalValues", "treat");
                          }
                        }}
                      >
                        Treat
                      </Button>
                    </div>
                    <div className={classes.actionBtn}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#2E87A9", color: "#fff" }}
                      >
                        Re-assign
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </CardContent>  
      </Card>
    </div>
  );
}