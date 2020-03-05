import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import moment from "moment";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

import TasksList from "./TasksList";
import DateButtons from "./DateButtons";

import Container from "../../styles/Container";
import LoadingAnimation from "../Animations/Loading";
import NoTasksAnimation from "../Animations/NoTasks";

const parseDateString = date => {
   let parsed = moment(date, "YYYY/MM/DD");
   if (parsed.isValid()) {
      return parsed
         .add(1, "d")
         .subtract(1, "s")
         .valueOf();
   } else {
      return null;
   }
};

const Tasks = () => {
   const [tasks, setTasks] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setLoading(true);
      setTasks([]);
      axiosWithAuth()
         .get("/tasks")
         .then(res => {
            res.data.task.map(task => {
               const newTask = {
                  task: task.task,
                  description: task.description,
                  completed: task.completed,
                  id: task.id,
                  creationTime: task.timestamp,
                  due_date: task.due_date,
                  tags: task.tags || []
               };
               setTasks(tasks => [...tasks, newTask]);
            });
         })
         .catch(err => {
            console.log("Failed getting user tasks:", err);
         })
         .then(() => {
            setTimeout(() => {
               setLoading(false);
            }, 1200);
         });
   }, []);

   const addNewTask = data => {
      axiosWithAuth()
         .post("/tasks", {
            task: data.task,
            description: data.description,
            due_date: parseDateString(data.due_date),
            timestamp: Date.now(),
            completed: false,
            tags: []
         })
         .then(res => {
            const newTask = {
               ...res.data.newTask,
               id: res.data.task[0]
            };
            console.log("NEW TASK", newTask);
            setTasks(tasks => [...tasks, newTask]);
         })
         .catch(err => {
            console.log("Post Error:", err.response);
         });
   };

   const deleteTask = taskID => {
      axiosWithAuth()
         .delete("/task/" + taskID)
         .then(res => {
            console.log("Deleted task", res.data);
            setTasks(tasks => tasks.filter(task => task.id !== taskID));
         })
         .catch(err => {
            console.log("Error:", err.response);
         });
   };

   const toggleCompleted = (taskData, taskID) => {
      taskData.completed = !taskData.completed;
      editTask(taskData, taskID);
   };

   const editTask = (formData, taskID) => {
      console.log(taskID);
      axiosWithAuth()
         .put("/tasks/" + taskID, {
            task: formData.task || "",
            description: formData.description || "",
            timestamp: Date.now(),
            completed: formData.completed || false,
            due_date: parseDateString(formData.due_date)
         })
         .then(res => {
            setTasks(tasks =>
               tasks.map(task => {
                  if (task.id === taskID) {
                     return {
                        ...task,
                        ...res.data.update
                     };
                  } else {
                     return { ...task };
                  }
               })
            );
            console.log("Edited task", res.data);
         })
         .catch(err => {
            console.log("Error while editing:", err.response);
         });
   };

   const taskFunctions = {
      addNewTask: addNewTask,
      deleteTask: deleteTask,
      editTask: editTask,
      toggleCompleted: toggleCompleted
   };

   console.log(tasks);
   return (
      <Container flexDirection="column">
         <DateButtons />
         {loading && <LoadingAnimation />}
         {tasks.length === 0 && !loading && (
            <NoTasksAnimation taskFunctions={taskFunctions} />
         )}
         {tasks.length > 0 && !loading && (
            <Switch>
               <Route path="/tasks/days/:daysOut">
                  <TasksList taskFunctions={taskFunctions} tasks={tasks} />
               </Route>
               <Route path="/">
                  <TasksList
                     taskFunctions={taskFunctions}
                     tasks={tasks}
                     all="true"
                  />
               </Route>
            </Switch>
         )}
      </Container>
   );
};

export default Tasks;
