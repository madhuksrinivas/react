import React, { use, useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import "../styles/AlertModal.css";

function AlertModal({ alert, onClose }) {
  useEffect(() => {
    if (alert && alert.type === "SUCCESS") {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert, onClose]);
  return createPortal(
    <div className={classNames("alert-modal", alert.type)}>
      <p>{alert.msg}</p>
      <button onClick={onClose}>Close</button>
    </div>,
    document.getElementById("alert-modal-root"),
  );
}

export default AlertModal;
