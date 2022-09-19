import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

//Typescript interfaces and types

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoState {
  items: Todo[] | undefined[];
}

export interface TodoAdd {
  title: string;
}

export interface TodoUpdate {
  title?: string;
  done?: boolean;
}

//States

function state(): TodoState {
  return {
    items: [],
  };
}

const getters = {
  getById: (state: TodoState) => (id: string) => {
    return state.items.find((item: Todo) => item.id === id);
  },
  getOrderedTodos: (state: TodoState) =>
    [...state.items].sort(
      (a: Todo, b: Todo) =>
        a.createdAt.getTime() - b.createdAt.getTime()
    ),
};

const actions = {
  add(partialTodo: TodoAdd) {
    const todo: Todo = {
      id: uuid(),
      ...partialTodo,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(todo);
  },
  remove(id: string) {
    this.items = this.items.filter((todo: Todo) => todo.id !== id);
  },
  update(id: string, update: TodoUpdate) {
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, ...update, updatedAt: new Date() } : item
    );
  },
};

export const useTodoStore = defineStore("todoStore", {
  state,
  getters,
  actions,
});
