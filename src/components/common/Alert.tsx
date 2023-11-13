import React from "react";
import styled from "styled-components";
import { AlertProps } from "../../util/types";

const Alert: React.FC<AlertProps> = ({ open, close, name, children }) => {
  const closeAlert = () => {
    close(name);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeAlert();
    }
  };

  return (
    <ModalStyle>
      <div
        className={open ? "openAlert alert" : "alert"}
        onClick={handleOverlayClick}
      >
        {open ? <section>{children}</section> : null}
      </div>
    </ModalStyle>
  );
};

export default Alert;
const ModalStyle = styled.div`
  .alert {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;

    background-color: rgba(0, 0, 0, 0.6);
  }

  .alert > section {
    margin: 0 auto;
    padding: 10px;
    background-color: white;
    border-radius: 15px;
    animation: modal-show 0.3s;
    overflow: scroll;
  }

  .topButton {
    display: flex;
    flex-direction: row-reverse;
  }

  .alert > section .topButton button {
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    margin: 10px;
    position: fixed;
    background-color: transparent;
    z-index: 1;
  }

  .alert.openAlert {
    display: flex;
    align-items: center;
    animation: alert-bg-show 0.3s;
  }

  @keyframes alert-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes alert-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
