import React from "react";
import styled from "styled-components";
import Container from "../../styles/Container";

const Themes = styled.div`
   display: flex;
   width: 100%;
   justify-content: flex-end;
   align-items: center;

   padding: 20px 0;
`;

const ColorCircle = styled.div`
   width: 35px;
   height: 35px;

   background-color: ${props => props.color};
   border: 2px solid white;
   border-radius: 50%;

   margin-left: 10px;

   &:hover {
      cursor: pointer;
   }
`;

const colors = ["black", "#FF5722", "#4CAF50", "#C2185B", "#502E88"];

const ThemePicker = props => {
   const ColorCircles = colors.map((color, index) => {
      return (
         <ColorCircle
            key={index}
            onClick={() => props.setColorTheme(color)}
            color={color}
         />
      );
   });

   return (
      <Container>
         <Themes>{ColorCircles}</Themes>
      </Container>
   );
};

export default ThemePicker;
