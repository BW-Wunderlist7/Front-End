import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import styled from "styled-components";
import { Alert } from "@smooth-ui/core-sc";
import {
   Form,
   Input,
   InputDiv as InputContainer,
   ButtonBox,
   FormButton,
   FormHeader
} from "../../styles/Forms";
import { FaEdit, FaCalendarCheck } from "react-icons/fa";

// Styles
const InputSection = styled.section`
   display: flex;
   width: 100%;
   flex-direction: row;
   align-items: center;
`;

const DescriptionIcon = styled(FaEdit)`
   fill: ${({ theme }) => theme.colors.secondary};
   font-size: 2.3rem;
   margin: 0 1.25rem 0 0.75rem;
`;

const CalendarIcon = styled(FaCalendarCheck)`
   fill: ${({ theme }) => theme.colors.secondary};
   font-size: 1.9rem;
   margin: 0 1.55rem 0 0.75rem;
`;

const CalendarInput = styled(Input)`
   color: grey;
`;

// Yup form validation
const FormSchema = yup.object().shape({
   name: yup.string().required("Please enter a name for your task."),
   description: yup.string("Description should be a string.")
});

const NewTaskForm = ({ taskFunctions, closeModal }) => {
   const { register, handleSubmit, errors } = useForm({
      validationSchema: FormSchema
   });

   const onSubmit = data => {
      taskFunctions.addNewTask(data);
      closeModal();
   };

   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormHeader>What's the task?</FormHeader>
         <InputContainer>
            <Input
               placeholder="Name of the task"
               type="text"
               name="name"
               ref={register}
            />
            {
               <Alert variant="secondary">
                  Only a name is required for your task, all other inputs are
                  optional.
               </Alert>
            }
            {errors.name && (
               <Alert variant="danger">{errors.name.message}</Alert>
            )}
         </InputContainer>

         <InputSection>
            <DescriptionIcon />
            <InputContainer>
               <Input
                  placeholder="Description"
                  type="text"
                  name="description"
                  ref={register}
               />
               {errors.description && (
                  <Alert variant="danger">{errors.description.message}</Alert>
               )}
            </InputContainer>
         </InputSection>

         <InputSection>
            <CalendarIcon />
            <InputContainer>
               <CalendarInput type="date" name="due_date" ref={register} />
            </InputContainer>
         </InputSection>

         <ButtonBox>
            <FormButton variant="secondary" type="submit">
               Add Task
            </FormButton>
         </ButtonBox>
      </Form>
   );
};

export default NewTaskForm;
