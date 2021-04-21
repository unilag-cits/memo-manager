import React, {useEffect, useState} from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useSelector, connect } from "react-redux";
// import Login from "./Login";
// import { Button } from "@material-ui/core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";'
import Paperclip from "./paperClip";
import View from "./view";
import Edit from "./edit";
import { hideModal } from "../../action/modal";

function SimpleModal(props) {
  const modal = useSelector((state) => state.modal.autoModal);
  const [bigData, setBigData] = useState(null);

  useEffect(() => {
    const data = props.memo.memo === null ? "" : props.memo.memo;

    setBigData(data);
  }, [])

  // console.log(bigData);

  const body = (
    <div className="w-100">
      <div className="">
        {localStorage.getItem("modalValues") === "paperclip" ? (
          <Paperclip />
        ) : localStorage.getItem("modalValues") === "edit" ? (
          <Edit />
        ) : localStorage.getItem("modalValues") === "view" ? (
          // localStorage.getItem("modalData"), 
          <View viewData={bigData} onClose={props.hideModal}/>
        ) : (
          ""
        )}
        {/* <Login /> */}
      </div>
    </div>
  );

  if (!modal) return null;

  return (
    <div>
      <Modal
        open={modal}
        onClose={props.hideModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="pt-4 pb-4 d-flex align-item-center justify-content-center"
      >
        <>{body}</>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  memo: state.memo
})

export default connect(mapStateToProps, { hideModal })(SimpleModal);
