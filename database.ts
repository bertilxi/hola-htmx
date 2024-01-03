interface Todo {
  id: string;
  name: string;
}

let todos: Todo[] = [];

function getTodos() {
  return todos;
}

function createTodo(todo: Todo) {
  todos.push(todo);

  return todo;
}

function deleteTodo(id: string) {
  todos = todos.filter((todo) => todo.id !== id);
}

export const todoService = {
  createTodo,
  getTodos,
  deleteTodo,
};
