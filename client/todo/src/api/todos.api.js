import { axiosInstance } from "../consts/axios-instance";

const TODOS_API_URL = `/todos`;

export async function getAllTodos() {
  const response = await axiosInstance.get(TODOS_API_URL);

  return response.data;
}

export async function createTodo(todo) {
  const response = await axiosInstance.post(TODOS_API_URL, todo);

  return response.data;
}

export async function updateTodo(id, todo) {
  const response = await axiosInstance.patch(`${TODOS_API_URL}/${id}`, todo);

  return response.data;
}

export async function deleteTodo(id) {
  const response = await axiosInstance.delete(`${TODOS_API_URL}/${id}`);

  return response.data;
}
