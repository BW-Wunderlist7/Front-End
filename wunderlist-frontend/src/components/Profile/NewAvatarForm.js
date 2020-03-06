import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import styled from "styled-components";

const StyledDropzone = styled.section`
   width: 40vw;
   height: 20vh;

   background: ${({ theme }) => theme.colors.secondary};
   border: 2px solid;
   border-color: ${({ theme }) => theme.colors.primary};
   border-radius: 15px;

   display: flex;
   justify-content: center;
   align-items: center;

   h2 {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 500;
   }
`;
function MyDropzone(props) {
   const onDrop = useCallback(acceptedFiles => {
      console.log(acceptedFiles[0]);
      props.uploadAvatar(acceptedFiles[0]);
   }, []);
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop
   });

   return (
      <StyledDropzone {...getRootProps()}>
         <input {...getInputProps()} />
         {isDragActive ? (
            <h2>Drop it here...</h2>
         ) : (
            <h2>Drag 'n' drop your avatar here, or click to select files.</h2>
         )}
      </StyledDropzone>
   );
}

export default MyDropzone;
