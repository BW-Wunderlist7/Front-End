import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

import Container from "../../styles/Container";
import { Button } from "@smooth-ui/core-sc";

import { FaUserCircle } from "react-icons/fa";

// Main divs
const StyledNav = styled.nav`
   background: white;
   border-radius: 0 0 7px 7px;
   box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

   overflow: hidden;

   background-color: ${({ theme }) => theme.colors.background};

   position: fixed; /* Set the navbar to fixed position */
   z-index: 1000;
   top: 0; /* Position the navbar at the top of the page */

   width: 100%; /* Full width */

   display: flex;
   justify-content: center;
`;

const NavContainer = styled(Container)`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;

   justify-content: space-between;
   align-items: center;

   height: 65px;
`;

// Logo (on left)
const LogoLink = styled(NavLink)`
   width: 20%;
   display: flex;
   align-items: center;
   justify-content: flex-start;

   text-decoration: none;

   letter-spacing: 0.08rem;
   font-size: 1.1rem;

   * {
      margin: 0;
   }

   h2 {
      color: ${({ theme }) => theme.colors.secondary};
   }

   span {
      color: ${({ theme }) => theme.colors.dark};
   }
`;

// Account buttons, login/register (on right)
const UserProfile = styled.div`
   display: flex;
   justify-content: flex-end;
   align-items: center;
`;

const ProfileIcon = styled(FaUserCircle)`
   font-size: 2.5rem;
   color: ${({ theme }) => theme.colors.secondary};

   &:hover {
      cursor: pointer;
   }
`;

const LogOutButton = styled(Button)`
   margin: 0 10px;
   padding: 0 1rem;
   height: 35px;

   border: none;
`;

const NavBar = () => {
   const logOut = () => {
      localStorage.removeItem("AUTH_TOKEN");
      window.location.replace("https://wunderlist7.netlify.com/");
   };

   return (
      <StyledNav>
         <NavContainer>
            <LogoLink to="/tasks">
               <h2>
                  Wunderlist<span>7</span>
               </h2>
            </LogoLink>
            <UserProfile>
               <LogOutButton outline variant="secondary" onClick={logOut}>
                  Log Out
               </LogOutButton>
               <Link to="/profile">
                  <ProfileIcon />
               </Link>
            </UserProfile>
         </NavContainer>
      </StyledNav>
   );
};

export default NavBar;
