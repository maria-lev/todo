import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the todo list app", () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/Todo List/i);
  expect(headingElement).toBeInTheDocument();
});

test("adds a new todo when the form is submitted", () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const inputElement = getByPlaceholderText(/Enter a new todo/i);
  const addButtonElement = getByText(/Add/i);

  // Type a new todo and submit the form
  const newTodoText = "Buy milk";
  inputElement.value = newTodoText;
  addButtonElement.click();

  // Check if the new todo is added to the list
  const newTodoElement = getByText(newTodoText);
  expect(newTodoElement).toBeInTheDocument();
});

test("marks a todo as completed when the checkbox is clicked", () => {
  const { getByText } = render(<App />);
  const todoElement = getByText(/Buy milk/i);
  const checkboxElement = todoElement.querySelector('input[type="checkbox"]');

  // Click the checkbox to mark the todo as completed
  checkboxElement.click();

  // Check if the todo is marked as completed
  expect(todoElement).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo when the delete button is clicked", () => {
  const { getByText, queryByText } = render(<App />);
  const todoElement = getByText(/Buy milk/i);
  const deleteButtonElement = todoElement.querySelector("button");

  // Click the delete button to delete the todo
  deleteButtonElement.click();

  // Check if the todo is deleted from the list
  const deletedTodoElement = queryByText(/Buy milk/i);
  expect(deletedTodoElement).not.toBeInTheDocument();
});
