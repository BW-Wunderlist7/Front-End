import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { BASE_API_URL } from "../../utils/Constants";

import styled from "styled-components";
import { Button } from "@smooth-ui/core-sc";
import { FaUserCircle } from "react-icons/fa";

import Modal from "react-modal";
import ModalStyle from "../../styles/ModalStyle";
import NewAvatarForm from "./NewAvatarForm";

const AvatarInfo = styled.section`
   display: flex;
`;

const DefaultAvatar = styled(FaUserCircle)`
   fill: ${({ theme }) => theme.colors.secondary};
   font-size: 8.5rem;
   margin: 0 20px;
`;

const AvatarButtons = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`;

const AvatarImage = styled.img`
   width: 145px;
   height: auto;
   margin: -5px 15px;
   border-radius: 50%;
`;

const Avatar = () => {
   const [avatarURL, setAvatarURL] = useState(null);
   const [modalIsOpen, setIsOpen] = useState(false);

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }

   const uploadAvatar = () => {
      axiosWithAuth()
         .post(BASE_API_URL + "/avatar")
         .then(res => {
            console.log("Created profile:", res.data);
            setAvatarURL(res.data);
         })
         .catch(err => {
            console.log("Avatar post error:", err);
         });
   };

   const changeAvatar = () => {
      axiosWithAuth()
         .put(BASE_API_URL + "/avatar")
         .then(res => {
            console.log("Changed Avatar :", res.data);
            setAvatarURL(res.data);
         })
         .catch(err => {
            console.log("Avatar change error:", err);
         });
   };

   const deleteAvatar = () => {
      axiosWithAuth()
         .delete(BASE_API_URL + "/avatar")
         .then(res => {
            console.log("Deleted Avatar:", res.data);
            setAvatarURL(null);
         })
         .catch(err => {
            console.log("Avatar delete error", err);
         });
   };

   return (
      <>
         <AvatarInfo>
            {avatarURL && (
               <AvatarImage src={avatarURL} alt={"User's avatar image"} />
            )}
            {!avatarURL && <DefaultAvatar />}
            <AvatarButtons>
               <Button onClick={openModal} outline variant="secondary">
                  Upload Avatar
               </Button>
               <Button onClick={changeAvatar} outline variant="secondary">
                  Change Avatar
               </Button>
               <Button onClick={deleteAvatar} outline variant="warning">
                  Delete Avatar
               </Button>
            </AvatarButtons>
         </AvatarInfo>

         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={ModalStyle}
         >
            <NewAvatarForm />
         </Modal>
      </>
   );
};

export default Avatar;
