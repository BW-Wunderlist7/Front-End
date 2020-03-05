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

// Yup form validation
const FormSchema = yup.object().shape({
   name: yup.string().required("Please enter a name for your task."),
   description: yup.string("Description should be a string.")
});

const EditTask = ({ task, taskFunctions, closeModal }) => {
   const { register, handleSubmit, errors } = useForm({
      validationSchema: FormSchema,
      defaultValues: {
         name: task.name || "",
         description: task.description || ""
      }
   });

   const onSubmit = data => {
      taskFunctions.editTask(data, task.id);
      closeModal();
   };

   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormHeader>Edit Task</FormHeader>
         <InputContainer>
            <Input
               placeholder="Name of the task"
               type="text"
               name="name"
               ref={register}
            />
            {errors.email && (
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
               {errors.password && (
                  <Alert variant="danger">{errors.description.message}</Alert>
               )}
            </InputContainer>
         </InputSection>

         <InputSection>
            <CalendarIcon />
            <InputContainer>
               <Input type="date" name="due" ref={register} />
            </InputContainer>
         </InputSection>

         <ButtonBox>
            <FormButton
               outline
               width="29.5%"
               variant="warning"
               borderColor="#DC143C"
               onClick={() => taskFunctions.deleteTask(task.id)}
            >
               Delete Task
            </FormButton>
            <FormButton width="69.5%" variant="secondary" type="submit">
               Add Task
            </FormButton>
         </ButtonBox>
      </Form>
   );
};

export default EditTask;
