import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ModalProps } from "../../util/types";

const DayModal: React.FC<ModalProps> = ({ open, close, name, children }) => {
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
    <ModalStyle $isMobile={isMobile}>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleOverlayClick}
      >
        {open ? (
          <section>
            <div className="topButton">
              <button className="close" onClick={closeModal}>
                &times;
              </button>
            </div>
            {children}
          </section>
        ) : null}
      </div>
    </ModalStyle>
  );
};

export default DayModal;
const ModalStyle = styled.div<{ $isMobile: boolean }>`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal > section {
    width: ${(props) => (props.$isMobile ? "80%" : "500px")};
    height: ${(props) => (props.$isMobile ? "90%" : "700px;")};
    background-color: white;
    flex-direction: column;
    overflow: scroll;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .topButton {
    display: flex;
    flex-direction: row-reverse;
  }

  .modal > section .topButton button {
    width: 50px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: black;
    margin: 10px;
    left: 950px;
    top: 30px;
    position: absolute;
    background-color: transparent;
    z-index: 1;
  }

  .modal.openModal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
