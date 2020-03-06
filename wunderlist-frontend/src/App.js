import React, { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Normalize } from "@smooth-ui/core-sc";
import { Route, Redirect } from "react-router-dom";

import { PrivateRoute } from "./utils/PrivateRoute";

import Profile from "./components/Profile/Profile";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import Tasks from "./components/Tasks/Tasks";
import ThemePicker from "./components/ThemePicker/ThemePicker";
import NavBar from "./components/Navbar/Navbar";
import { TestUser } from "./components/TestUser/TestUser";

// Global style that is applied to the whole project
const GlobalStyle = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css?family=Raleway:400,500,600,700');
   * {
      font-family: 'Raleway', sans-serif;
      box-sizing: border-box;
   }



   h1,h2,h3,h4,h5,h6{
      letter-spacing: 0.6px;
      color: ${({ theme }) => theme.colors.secondary}
   }

   body {
      padding: 0;
      margin: 0;
      font-family: 'Open Sans', sans-serif;
      background: white;
      height: 100vh;

      background: #0f0c29;  
      background: ${({ theme }) =>
         `linear-gradient(to right, ${theme.colors.secondary}, #e9e4f0)`};

      &::-webkit-scrollbar {
         display: none;
      }
   }

   button {
      z-index: 0 !important;
   }
`;

const AppContainer = styled.div`
   padding-top: 100px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

function App() {
   const [theme, setTheme] = useState({
      colors: {
         primary: "white",
         secondary: localStorage.getItem("THEME_COLOR") || "#502E88",

         background: "white",
         contrast: "black",

         light: "white",
         dark: "#363754",

         info: "#757F9A",
         warning: "#FF0000"
      },

      fonts: {
         base: "'Open Sans', "
      }
   });

   const setColorTheme = colorCode => {
      let newTheme = { ...theme };
      newTheme.colors.secondary = colorCode;
      localStorage.setItem("THEME_COLOR", colorCode);
      setTheme(newTheme);
   };

   return (
      <ThemeProvider theme={theme}>
         <Normalize />
         <GlobalStyle />

         <AppContainer>
            <NavBar />

            <PrivateRoute path="/tasks" component={Tasks} />
            <Route path="/tasks">
               <ThemePicker setColorTheme={setColorTheme} />
            </Route>

            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/profile">
               <ThemePicker setColorTheme={setColorTheme} />
            </Route>

            <Route path="/login">
               <LoginForm />
            </Route>

            <Route path="/register">
               <RegisterForm />
            </Route>

            <Route path="/testUser" component={TestUser} />

            <Route exact path="/">
               <Redirect to="/tasks" />
            </Route>
         </AppContainer>
      </ThemeProvider>
   );
}

export default App;
