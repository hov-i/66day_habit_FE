import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ModalProps } from "../../util/types";

const Modal: React.FC<ModalProps> = ({
  open,
  close,
  name,
  height,
  children,
}) => {
  const { isMobile } = useViewport();

  const closeModal = () => {
    close(name);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalStyle isMobile={isMobile} height={height}>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleOverlayClick}
      >
        {open ? (
          <section>
            <div className="topButton">
              <button className="close" onClick={closeModal}></button>
            </div>
            {children}
          </section>
        ) : null}
      </div>
    </ModalStyle>
  );
};

export default Modal;
const ModalStyle = styled.div<{ isMobile: boolean; height: string }>`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal > section {
    width: ${(props) => (props.isMobile ? "100%" : "768px")};
    height: ${(props) => (props.height ? props.height : "500px")};
    background-color: white;
    flex-direction: column;

    animation: modal-show 0.3s;
    overflow: scroll;
  }

  .topButton {
    display: flex;
    flex-direction: row-reverse;
  }

  .modal > section .topButton button {
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

  .modal.openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.3s;
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-bottom: -100%;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
