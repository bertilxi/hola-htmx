import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Html } from "./html.tsx";
import { todoService } from "./database.ts";

const app = new Hono();

app.get("/", (c) => {
  const todos = todoService.getTodos();

  return c.html(
    <Html>
      <div>hola htmx</div>

      <form hx-post="/todo" hx-target="#todo" hx-swap="beforebegin">
        <input name="name" type="text" required />
        <button>Crear</button>
      </form>

      <div>
        {todos.map((todo) => (
          <p hx-delete={`/todo/${todo.id}`} hx-swap="outerHTML">
            {todo.name}
            <button>borrar</button>
          </p>
        ))}
      </div>

      <div id="todo" />
    </Html>
  );
});

app.post("/todo", async (c) => {
  const { name } = await c.req.parseBody();

  const todo = todoService.createTodo({
    id: (Math.random() * 10000).toFixed(),
    name: name as string,
  });

  return c.html(
    <p hx-delete={`/todo/${todo.id}`} hx-swap="outerHTML">
      {todo.name}
      <button>borrar</button>
    </p>
  );
});

app.delete("/todo/:id", async (c) => {
  const id = c.req.param("id");

  todoService.deleteTodo(id);

  return c.body(null, 200);
});

serve({
  hostname: "0.0.0.0",
  port: 3000,
  fetch: app.fetch,
});

console.log("🚀 http://localhost:3000");
