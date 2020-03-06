import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import moment from "moment";

import styled from "styled-components";
import { Alert } from "@smooth-ui/core-sc";
import {
   Form,
   Input,
   CalendarInput,
   TextArea,
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
   task: yup.string().required("Please enter a name for your task."),
   description: yup.string("Description should be a string.")
});

const formatEpoch = dueDate => {
   if (dueDate) {
      return moment.unix(dueDate / 1000).format("YYYY-MM-DD");
   }
   return null;
};

const EditTask = ({ task, taskFunctions, closeModal }) => {
   const { register, handleSubmit, errors } = useForm({
      validationSchema: FormSchema,
      defaultValues: {
         task: task.task || "",
         description: task.description || "",
         due_date: formatEpoch(task.due_date)
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
               name="task"
               ref={register}
            />
            {errors.task && (
               <Alert variant="danger">{errors.task.message}</Alert>
            )}
         </InputContainer>

         <InputSection>
            <DescriptionIcon />
            <InputContainer>
               <TextArea
                  placeholder="Description"
                  type="textarea"
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
               Submit
            </FormButton>
         </ButtonBox>
      </Form>
   );
};

export default EditTask;
