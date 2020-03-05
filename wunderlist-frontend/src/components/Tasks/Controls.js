import React, { useState } from "react";
import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";

import Modal from "react-modal";
import ModalStyle from "../../styles/ModalStyle";
import NewTaskForm from "../TaskForms/NewTask";

const ControlsContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;

   h2 {
      color: ${({ theme }) => theme.colors.secondary};
      margin: 0;
      font-size: 1.8rem;
   }
`;

const NewTaskIcon = styled(FaPlusCircle)`
   font-size: 2.5rem;
   margin: 0.4rem;
   fill: ${({ theme }) => theme.colors.secondary};

   transition: 0.2s all;

   &:hover {
      cursor: pointer;

      font-size: 2.9rem;
      margin: 0.2rem;
   }
`;

Modal.setAppElement("#root");

const Controls = props => {
   const [modalIsOpen, setIsOpen] = useState(false);
   console.log(props);

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }

   return (
      <ControlsContainer>
         <h2>{props.title}</h2>
         <NewTaskIcon onClick={openModal} />

         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={ModalStyle}
         >
            <NewTaskForm
               taskFunctions={props.taskFunctions}
               closeModal={closeModal}
            />
         </Modal>
      </ControlsContainer>
   );
};

export default Controls;
