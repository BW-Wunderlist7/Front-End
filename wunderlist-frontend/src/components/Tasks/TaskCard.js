import React from "react";
import styled from "styled-components";
import { Button } from "@smooth-ui/core-sc";

const StyledTaskCard = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;

   padding: 5px 20px;
   margin: 20px 0;

   border-radius: 10px;
   background: white;
`;

const TaskInfo = styled.div`
   margin: 0 30px;
`;

const Left = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
`;

const Right = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-end;
`;

const GenreTag = styled(Button)`
   margin: 0 5px;
`;

const TaskCard = ({ task }) => {
   const Tags = task.tags.map(tag => {
      return (
         <GenreTag outline variant={tag.color}>
            {tag.genre}
         </GenreTag>
      );
   });
   return (
      <StyledTaskCard>
         <Left>
            <input type="checkbox" value={task.complete} />
            <TaskInfo>
               <h3>{task.taskName}</h3>
               <p>{task.taskExtra}</p>
            </TaskInfo>
         </Left>
         <Right>{Tags}</Right>
      </StyledTaskCard>
   );
};

export default TaskCard;
