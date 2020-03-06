import React, { useState } from "react";

import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "@smooth-ui/core-sc";

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

   .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      button {
         margin: 0 10px;
      }
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

const TasksButton = styled(Button)`
   position: relative;
`;

Modal.setAppElement("#root");

const Controls = props => {
   const [modalIsOpen, setIsOpen] = useState(false);

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }

   return (
      <ControlsContainer>
         <h2>{props.title}</h2>
         <div className="right">
            <TasksButton
               variant="secondary"
               onClick={() => props.setShowCompleted(show => !show)}
            >
               {!props.showCompleted && `Show Completed Tasks`}
               {props.showCompleted && `Hide Completed Tasks`}
            </TasksButton>
            <NewTaskIcon onClick={openModal} />
         </div>

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
