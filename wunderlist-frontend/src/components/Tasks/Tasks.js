import React from "react";
import { Route, Switch } from "react-router-dom";

import TasksList from "./TasksList";
import DateButtons from "./DateButtons";

const dummyTasks = [
   {
      completed: false,
      creationTime: Date.now() - 2,
      taskName: "Go to work and do this yadadada, after that do this",
      taskExtra: "English & Math class",
      tags: [
         {
            genre: "School",
            color: "Red"
         }
      ]
   },
   {
      completed: false,
      creationTime: Date.now() + 10,
      taskName: "Do Homework",
      dueEpoch: Date.now(),
      taskExtra: "English & Math class",
      tags: [
         {
            genre: "School",
            color: "Red"
         }
      ]
   },
   {
      completed: false,
      creationTime: Date.now() - 1,
      taskName: "Do Homework",
      taskExtra: "English & Math class",
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
      taskName: "Do Homework",
      dueEpoch: Date.now() + 1,
      taskExtra: "English & Math class",
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

const filterByTimeRange = () => {};

const Tasks = () => {
   return (
      <>
         <DateButtons />
         <Switch>
            <Route path="/tasks/days/:dayCount">
               <TasksList tasks={dummyTasks} />
            </Route>
         </Switch>
      </>
   );
};

export default Tasks;
