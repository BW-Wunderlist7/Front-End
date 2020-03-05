import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Controls from "./Controls";
import TaskCard from "./TaskCard";

//One day in milliseconds
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const MAX_EPOCH_TIME = 9999999999999;

// Style
const TasksContainer = styled.div`
   padding: 20px 30px;
   width: 100%;

   border-radius: 0 0 10px 10px;

   background: ${({ theme }) => theme.colors.background};
`;

// Filter tasks by time range
const filterTasks = (
   tasks,
   startTimeUnix,
   endTimeUnix,
   dueTimeRequired = false
) => {
   return tasks.filter(task => {
      if (task.due && task.due >= startTimeUnix && task.due <= endTimeUnix) {
         return task;
      } else if (!task.due && !dueTimeRequired) {
         return task;
      }
   });
};

const TasksList = ({ tasks, taskFunctions, all }) => {
   //Need a dynamic title if we are showing a time specific task list
   const [title, setTitle] = useState("");
   const { dayCount } = useParams();
   // If the day count (parameter in url) is updated, update title and reload
   useEffect(() => {
      if (dayCount) {
         if (dayCount === "1") {
            setTitle("Today's Tasks");
         } else {
            setTitle(`Next ${dayCount} days`);
         }
      } else {
         setTitle("All Tasks");
      }
   }, [dayCount]);

   if (all) {
      const TasksToday = filterTasks(tasks, 0, Date.now() + ONE_DAY_MS).map(
         task => {
            return (
               <TaskCard
                  taskFunctions={taskFunctions}
                  key={task.id}
                  task={task}
               />
            );
         }
      );

      const OtherTasks = filterTasks(
         tasks,
         Date.now() + ONE_DAY_MS + 1,
         MAX_EPOCH_TIME,
         true
      ).map(task => {
         return (
            <TaskCard taskFunctions={taskFunctions} key={task.id} task={task} />
         );
      });

      return (
         <TasksContainer>
            <Controls taskFunctions={taskFunctions} title={"Today's Tasks"} />
            {TasksToday}
            <Controls taskFunctions={taskFunctions} title={"After Today"} />
            {OtherTasks}
         </TasksContainer>
      );
   } else {
      // Calculate the Unix Epoch time (MS) for the amount of days out
      const endTimeUnix = Date.now() + dayCount * ONE_DAY_MS;
      const Tasks = filterTasks(tasks, 0, endTimeUnix).map(task => {
         return (
            <TaskCard taskFunctions={taskFunctions} key={task.id} task={task} />
         );
      });

      return (
         <TasksContainer>
            <Controls taskFunctions={taskFunctions} title={title} />
            {Tasks}
         </TasksContainer>
      );
   }
};

export default TasksList;
