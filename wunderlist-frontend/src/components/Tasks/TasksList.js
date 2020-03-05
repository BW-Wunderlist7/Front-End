import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { Alert } from "@smooth-ui/core-sc";

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

   h2 {
      font-size: 1.8rem;
      padding: 10px 0;
   }
`;

// Filter tasks by time range
const filterTasks = (
   tasks,
   startTimeUnix,
   endTimeUnix,
   dueTimeRequired = false,
   showCompleted = false
) => {
   return tasks.filter(task => {
      if (task.completed <= showCompleted) {
         if (
            task.due_date &&
            task.due_date >= startTimeUnix &&
            task.due_date <= endTimeUnix
         ) {
            return task;
         } else if (!task.due_date && !dueTimeRequired) {
            return task;
         }
      }
   });
};

const getTasksToday = (tasks, showCompleted) => {
   return filterTasks(tasks, 0, Date.now() + ONE_DAY_MS, false, showCompleted);
};

const getTasksAfterToday = (tasks, showCompleted) => {
   return filterTasks(
      tasks,
      Date.now() + ONE_DAY_MS + 1,
      MAX_EPOCH_TIME,
      true,
      showCompleted
   );
};

const AllTasks = ({
   tasks,
   taskFunctions,
   showCompleted,
   setShowCompleted
}) => {
   const TasksToday = getTasksToday(tasks, showCompleted).map(task => (
      <TaskCard taskFunctions={taskFunctions} key={task.id} task={task} />
   ));

   const OtherTasks = getTasksAfterToday(tasks, showCompleted).map(task => (
      <TaskCard taskFunctions={taskFunctions} key={task.id} task={task} />
   ));

   return (
      <TasksContainer>
         <Controls
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            taskFunctions={taskFunctions}
            title={"Today's Tasks"}
         />
         {TasksToday}
         {TasksToday.length === 0 && (
            <Alert variant="secondary">No tasks for today! Wohoo!</Alert>
         )}
         <h2>After Today</h2>
         {OtherTasks}
         {OtherTasks.length === 0 && (
            <Alert variant="secondary">
               No tasks after today, time to start planning!
            </Alert>
         )}
      </TasksContainer>
   );
};

const TasksFilteredByDueDate = ({
   taskFunctions,
   tasks,
   showCompleted,
   setShowCompleted
}) => {
   const [title, setTitle] = useState("");
   const { daysOut } = useParams();

   useEffect(() => {
      if (daysOut) {
         if (daysOut === "1") {
            setTitle("Today's Tasks");
         } else {
            setTitle(`Next ${daysOut} days`);
         }
      } else {
         setTitle("All Tasks");
      }
   }, [daysOut]);

   // Calculate the Unix Epoch time (MS) for the amount of days out
   const maxTime = Date.now() + daysOut * ONE_DAY_MS;
   const Tasks = filterTasks(tasks, 0, maxTime, false, showCompleted).map(
      task => {
         return (
            <TaskCard
               taskFunctions={taskFunctions}
               showCompleted={showCompleted}
               key={task.id}
               task={task}
            />
         );
      }
   );

   return (
      <TasksContainer>
         <Controls
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            taskFunctions={taskFunctions}
            title={title}
         />
         {Tasks}
         {Tasks.length === 0 && (
            <Alert variant="secondary">
               No tasks for this time period. Click 'View All' to view all
               tasks.
            </Alert>
         )}
      </TasksContainer>
   );
};

const TasksList = ({ tasks, taskFunctions, all }) => {
   const [showCompleted, setShowCompleted] = useState(false);
   if (all)
      return (
         <AllTasks
            tasks={tasks}
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            taskFunctions={taskFunctions}
         />
      );
   return (
      <TasksFilteredByDueDate
         tasks={tasks}
         showCompleted={showCompleted}
         setShowCompleted={setShowCompleted}
         taskFunctions={taskFunctions}
      />
   );
};

export default TasksList;
