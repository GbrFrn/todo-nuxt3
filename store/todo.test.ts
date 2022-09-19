import { setActivePinia, createPinia } from "pinia";
import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
} from "vitest";
import { useTodoStore } from "./todo";

// Set up encapsulation for Pinia env

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useTodoStore", () => {
  let store: ReturnType<typeof useTodoStore>;

  beforeEach(() => {
    store = useTodoStore();
  });

  // Makes sure there are no old items for testing purposes
  afterEach(() => {
    store.$reset();
  });

  // Tests store creation
  test("creates a store", () => {
    expect(store).toBeDefined();
  });

  test("initializes with empty items", () => {
    expect(store.items).toEqual([]);
  });

  // Tests Todo creation and etc
  test("creates a todo", () => {
    store.add({ title: "Test my code!" });

    expect(store.items[0]).toBeDefined();
    expect(store.items[0].title).toBe("Test my code!");
  });

  test("gets by id", () => {
    store.add({ title: "Test" });

    const item = store.items[0];
    const todo = store.getById(item.id);

    expect(todo).toStrictEqual(item);
  });

  test("gets ordered todos without mutating state", () => {
    const items = [
      {
        createdAt: new Date(2020, 9, 19),
      },
      {
        createdAt: new Date(2021, 3, 29),
      },
      {
        createdAt: new Date(2022, 9, 19),
      },
    ];

    // @ts-ignore
    store.items = items;

    const orderedTodos = store.getOrderedTodos;

    expect(orderedTodos[0].createdAt.getFullYear()).toBe(2020);
    expect(orderedTodos[1].createdAt.getFullYear()).toBe(2021);
    expect(orderedTodos[2].createdAt.getFullYear()).toBe(2022);
    expect(store.items[0].createdAt.getFullYear()).toBe(2020);
  });
  
  test("removes a todo", () => {
    store.add({ title: "test" });

    const todo = store.items[0];
    store.remove(todo.id);

    expect(store.items).toStrictEqual([]);
  });

  test('updates a todo' , () => {
    store.add({ title: 'test' })

    const todo = store.items[0]
    store.update(todo.id, { done: true })

    expect(store.items[0].done).toBe(true)
  })
});
