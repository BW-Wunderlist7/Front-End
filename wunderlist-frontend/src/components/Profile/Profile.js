import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Button } from "@smooth-ui/core-sc";
import Container from "../../styles/Container";

import LoadingAnimation from "../Animations/Loading";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

import Avatar from "./Avatar";
import ProfileForm from "./ProfileForm";

const StyledProfile = styled.section`
   background-color: ${({ theme }) => theme.colors.primary};
   border-radius: 0 0 10px 10px;

   width: 100%;
   padding: 30px;
`;

const CurrentInfo = styled.div`
   display: flex;
   width: 100%;
   justify-content: space-between;
   align-items: flex-start;

   h1 {
      margin: 0 0 10px 0;
   }

   p {
      margin: 0;
      font-size: 1.1rem;
   }
`;

const ProfileInfo = styled.section``;

const ProfileTab = styled.div`
   height: 54px;

   background: ${({ theme }) => theme.colors.secondary};

   border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
   border-radius: 5px 5px 0 0;

   display: flex;
   align-items: center;

   padding: 0 30px;

   span {
      font-size: 1.333rem;
      font-weight: 600;
      margin: 0;
      color: ${({ theme }) => theme.colors.primary};
   }
`;

const StyledNoProfile = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
`;

const DelButton = styled(Button)`
   margin: 12.5px 0;
`;

const ProfileSwitch = ({ profile, profileFunctions }) => {
   console.log("profile", profile);
   if (profile && Object.keys(profile).length >= 2) {
      return (
         <>
            <ProfileInfo>
               <h1>{`${profile.first_name} ${profile.last_name}`}</h1>
               {profile.occupation && <p>Occupation: {profile.occupation}</p>}
               {profile.age && <p>Age: {profile.age}</p>}
               <DelButton
                  onClick={profileFunctions.deleteProfile}
                  outline
                  variant="warning"
               >
                  Delete Profile Information
               </DelButton>
            </ProfileInfo>
            <Avatar />
         </>
      );
   } else {
      return (
         <StyledNoProfile>
            <ProfileForm createProfile={profileFunctions.createProfile} />
         </StyledNoProfile>
      );
   }
};

const Profile = () => {
   const [profile, setProfile] = useState({});
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      axiosWithAuth()
         .get("/profile")
         .then(res => {
            if (res.data.profile.length >= 0) {
               setProfile(res.data.profile[0]);
            }
            setTimeout(() => {
               setLoading(false);
            }, 1000);
         })
         .catch(err => {
            console.log(err);
         });
   }, []);

   const createProfile = user => {
      axiosWithAuth()
         .post("/profile", {
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            age: user.age || null,
            occupation: user.occupation || ""
         })
         .then(res => {
            console.log("Created profile:", res.data);
            setProfile(res.data.profile);
         })
         .catch(err => {
            console.log("Profile post error:", err);
         });
   };

   const editProfile = user => {
      axiosWithAuth()
         .put("/profile/" + profile.id, {
            ...profile,
            ...user
         })
         .then(res => {
            setProfile(profile => {
               const newProfile = {
                  ...profile,
                  ...res.data.newProfile
               };
               console.log("new", newProfile);
               return newProfile;
            });
         })
         .catch(err => {
            console.log("Profile put error:", err);
         });
   };

   const deleteProfile = () => {
      console.log(profile.id);
      axiosWithAuth()
         .delete("/profile/" + profile.id)
         .then(res => {
            console.log("Deleted profile:", res.data);
            setProfile({});
         })
         .catch(err => {
            console.log("Profile delete error", err);
         });
   };

   const profileFunctions = {
      createProfile: createProfile,
      editProfile: editProfile,
      deleteProfile: deleteProfile
   };

   return (
      <Container flexDirection="column">
         <ProfileTab>
            <span>Profile Information</span>
         </ProfileTab>
         {loading && <LoadingAnimation />}
         {!loading && (
            <StyledProfile>
               <CurrentInfo>
                  <ProfileSwitch
                     profile={profile}
                     profileFunctions={profileFunctions}
                  />
               </CurrentInfo>
            </StyledProfile>
         )}
      </Container>
   );
};

export default Profile;
