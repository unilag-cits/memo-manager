import React, {useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Memolist from "./Tabs/Memolist";
import AddNew from "./Tabs/AddNew";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: "#e5e5e5",
    color: "#000",
  },
  tabPanel: {
    marginTop: "5px",
  },
  pad: {
    paddingTop: "30px",
  },
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState("ADD NEW");
  const [isEdit, setisEdit] = useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.tabs} position="static">
        <Container>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab className={classes.pad} label="Arrivals" {...a11yProps(0)} />
            <Tab className={classes.pad} label="Add New" {...a11yProps(1)} />
            <Tab
              className={classes.pad}
              label="Re-assigned"
              {...a11yProps(2)}
            />
            <Tab className={classes.pad} label="Resolved" {...a11yProps(3)} />
          </Tabs>
        </Container>
      </AppBar>
      <Container className={classes.pad}>
        <TabPanel className={classes.tabPanel} value={value} index={0}>
          <Memolist setTab={setValue} setNames={setName} setisEdit={setisEdit} />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={1}>
          {/* {localStorage.setItem("add", "ADD NEW MEMO")} */}
          <AddNew name={name} isEdit={isEdit} />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={3}>
          Item Four
        </TabPanel>
      </Container>
    </div>
  );
}

export default SimpleTabs;
