import React from "react";
import { render } from "@testing-library/react";
import TaskForm from "../TaskForm";
import { userData, boardData } from "./testData";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../reducers/root";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));
const boardId = boardData.id;
const list = boardData.lists[0];
const listId = list.id;
const card = list.cards[0];

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <TaskForm
          isOpen={false}
          boardId={boardId}
          listTaskId={listId}
          task={card}
        />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <TaskForm
          isOpen={false}
          boardId={boardId}
          listTaskId={listId}
          task={card}
        />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("is open ", function () {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <TaskForm
          isOpen={true}
          boardId={boardId}
          listTaskId={listId}
          task={card}
        />
      </BrowserRouter>
    </Provider>
  );
  expect(component.getByText("Edit task")).toBeInTheDocument();
  expect(component.getByText("Cancel")).toBeInTheDocument();
  expect(component.getByText("update")).toBeInTheDocument();
});
