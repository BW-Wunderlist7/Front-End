import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { TimeFilteredTasks, AllTasks } from "./TasksList";
import DateButtons from "./DateButtons";

import Container from "../../styles/Container";

const dummyTasks = [
   {
      completed: false,
      creationTime: Date.now(),
      name:
         "This is a task without a due date. Always appears in 'Today's Tasks'",
      description: "Dummy task",
      tags: [
         {
            genre: "School",
            color: "Red"
         }
      ]
   },
   {
      completed: false,
      creationTime: Date.now(),
      name: "This is a task for sometime today.",
      description: "Dummy task",
      due: Date.now() + 82400000,
      tags: [
         {
            genre: "School",
            color: "Red"
         }
      ]
   },
   {
      completed: false,
      creationTime: Date.now(),
      name: "This is for sometime this week (5 days out).",
      description: "Dummy task",
      due: Date.now() + 86400000 * 5,
      tags: [
         {
            genre: "School",
            color: "Red"
         },
         {
            genre: "Work",
            color: "Blue"
         },
         {
            genre: "Home",
            color: "Orange"
         }
      ]
   },
   {
      completed: false,
      creationTime: Date.now(),
      name: "This is a task for 3 weeks out.",
      description: "Dummy task",
      due: Date.now() + 86400000 * 21,
      tags: [
         {
            genre: "School",
            color: "Red"
         },
         {
            genre: "Work",
            color: "Blue"
         },
         {
            genre: "Home",
            color: "Orange"
         }
      ]
   },
   {
      completed: false,
      creationTime: Date.now(),
      name:
         "This is a task for 2 months out. Should only be listed in View All tab.",
      description: "Dummy task",
      due: Date.now() + 86400000 * 60,
      tags: [
         {
            genre: "School",
            color: "Red"
         },
         {
            genre: "Work",
            color: "Blue"
         },
         {
            genre: "Home",
            color: "Orange"
         }
      ]
   }
];

const TasksContainer = styled(Container)`
   display: flex;
   flex-direction: column;
`;

const Tasks = () => {
   return (
      <TasksContainer>
         <DateButtons />
         <Switch>
            <Route path="/tasks/days/:dayCount">
               <TimeFilteredTasks tasks={dummyTasks} />
            </Route>
            <Route path="/">
               <AllTasks tasks={dummyTasks} />
            </Route>
         </Switch>
      </TasksContainer>
   );
};

export default Tasks;
