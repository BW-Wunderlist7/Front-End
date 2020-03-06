import styled from "styled-components";
import {
   Input as SmoothInput,
   Button,
   Textarea as SmoothTextarea
} from "@smooth-ui/core-sc";

export const Form = styled.form`
   width: 650px;
   padding: 30px 50px;

   border: 2px solid ${({ theme }) => theme.colors.secondary};
   background: ${({ theme }) => theme.colors.primary};

   border-radius: 15px;
`;

export const Input = styled(SmoothInput)`
   width: 100%;
   border: 1px solid ${({ theme }) => theme.colors.secondary};
   background-color: white;

   &:focus {
      border-color: ${({ theme }) => theme.colors.secondary};
   }
`;

export const TextArea = styled(SmoothTextarea)`
   width: 100%;
   border: 1px solid ${({ theme }) => theme.colors.secondary};
   background-color: white;
   height: 40px;

   &:focus {
      border-color: ${({ theme }) => theme.colors.secondary};
   }
`;

export const CalendarInput = styled(Input)`
   color: grey;
`;

export const InputDiv = styled.div`
   margin: 10px 0;
   width: 100%;
`;

export const ButtonBox = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`;

export const FormButton = styled(Button)`
   width: ${props => props.width || "100%"};
   border: 1px solid;

   border-color: ${props =>
      props.borderColor
         ? `${props.borderColor}`
         : `${props.theme.colors.secondary}`};

   font-weight: 700;
   font-size: 1.2rem;

   margin: 15px 0;
`;

export const FormHeader = styled.h2`
   margin: 5px 0 20px;
`;
