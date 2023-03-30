import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/todos`;

export async function getAllTodos() {
  const response = await axios.get(API_URL);

  return response.data;
}

export async function createTodo(todo) {
  const response = await axios.post(API_URL, todo);

  return response.data;
}

export async function updateTodo(id, todo) {
  const response = await axios.put(`${API_URL}/${id}`, todo);

  return response.data;
}

export async function deleteTodo(id) {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
}
