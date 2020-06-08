import React, { useContext } from "react";
import styled, { ThemeContext, css } from "styled-components";
import { useNavigate } from "@reach/router";
import { Plus } from "@styled-icons/icomoon";
import { Context } from "../state";
import Todo from "../components/Todo";
import TodoMobile from "../components/TodoMobile";

const Home = () => {
  const { fontSizes } = useContext(ThemeContext);
  const [{ todos, isMobile }] = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <WrapperAddButton data-testid="add-todo" onClick={() => navigate("add")}>
        <AddTodo size={fontSizes.xxlarge} />
      </WrapperAddButton>
      {isMobile ? (
        <>
          <List>
            {todos.map(({ name, description, isDone, id }) => (
              <div key={id} onClick={() => navigate(`detail/${id}`)}>
                <TodoMobile
                  id={id}
                  name={name}
                  isDone={isDone}
                  description={description}
                ></TodoMobile>
              </div>
            ))}
          </List>
        </>
      ) : (
        <>
          <List>
            {todos.map(({ name, description, isDone, id }) => (
              <Todo
                key={id}
                id={id}
                name={name}
                isDone={isDone}
                description={description}
              ></Todo>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default Home;

const List = styled.section`
  overflow: hidden;
  overflow-y: scroll;
  height: 84vh;
`;

const AddTodo = styled(Plus)`
  cursor: pointer;
  border: 5px solid;
  padding: 0.5vw;
  border-radius: 50px;
  ${(props) => css`
    color: ${props.theme.colors.primaryLight};
    &:hover {
      color: ${props.theme.colors.primaryDark};
    }
  `}
`;

const WrapperAddButton = styled.div`
  margin-left: 17vw;
  ${(props) => css`
    @media (max-width: ${props.theme.breakpoints.m}px) {
      margin-left: 3vw;
      z-index: 1;
    }
  `}
`;
