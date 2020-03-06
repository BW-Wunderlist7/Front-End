import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import styled from "styled-components";

const Dropzone = styled.section`
   background: ${({ theme }) => theme.colors.primary};
   height: 20vh;
   width: 40vw;

   display: flex;
   justify-content: center;
   align-items: center;

   border-radius: 10px;

   border: 1px solid;
   border-color: ${({ theme }) => theme.colors.secondary};
`;
const AvatarDropzone = ({ closeModal, uploadAvatar }) => {
   const onDrop = useCallback(acceptedFiles => {
      console.log(acceptedFiles);
   }, []);
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop
   });

   return (
      <Dropzone {...getRootProps()}>
         <input {...getInputProps()} />
         {isDragActive ? (
            <p>Drop the files here ...</p>
         ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
         )}
      </Dropzone>
   );
};

export default AvatarDropzone;
