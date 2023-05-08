/* eslint-disable import/no-extraneous-dependencies */
import express from "express";
import cors from "cors";

const app = express();
const port = 3003;

app.options("*", cors());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let items = [
  {
    type: "Task",
    title: "Позвонить в страховую",
    status: "Backlog",
    priority: "high",
    creator: {
      name: "demoth",
      id: "645576069832b555e087b69c",
    },
    assignee: {
      name: "demoth",
      id: "645576069832b555e087b69c",
    },
    parent: null,
    description: "Не знаю ещё зачем",
    statusOrder: 0,
    updated: "2023-05-05T21:32:54.271+00:00",
    dueDate: null,
    created: "2023-05-05T21:32:54.271+00:00",
    id: "645576069832b555e087b69f",
  },
  {
    type: "Task",
    title: "Пополнить баланс",
    status: "Todo",
    priority: "medium",
    creator: {
      name: "demoth",
      id: "645576069832b555e087b69c",
    },
    assignee: null,
    parent: null,
    description: null,
    statusOrder: 0,
    updated: "2023-05-05T21:32:54.283+00:00",
    dueDate: null,
    created: "2023-05-05T21:32:54.283+00:00",
    id: "645576069832b555e087b6a0",
  },
  {
    type: "Task",
    title: "Помыть кухню",
    status: "Backlog",
    priority: "medium",
    creator: {
      name: "denolia",
      id: "645576069832b555e087b69e",
    },
    assignee: null,
    parent: null,
    description: null,
    statusOrder: 0,
    updated: "2023-05-05T21:32:54.284+00:00",
    dueDate: null,
    created: "2023-05-05T21:32:54.284+00:00",
    id: "645576069832b555e087b6a1",
  },
  {
    type: "Task",
    title: "Поиграть в PoE",
    status: "Backlog",
    priority: "high",
    creator: {
      name: "denolia",
      id: "645576069832b555e087b69e",
    },
    assignee: null,
    parent: null,
    description: null,
    statusOrder: 0,
    updated: "2023-05-05T21:32:54.285+00:00",
    dueDate: null,
    created: "2023-05-05T21:32:54.285+00:00",
    id: "645576069832b555e087b6a2",
  },
  {
    type: "Epic",
    title: "Написать свой ноушен",
    status: "InProgress",
    priority: "high",
    creator: {
      name: "demoth",
      id: "645576069832b555e087b69c",
    },
    assignee: {
      name: "denolia",
      id: "645576069832b555e087b69e",
    },
    parent: null,
    description: null,
    statusOrder: 0,
    updated: "2023-05-05T21:32:54.286+00:00",
    dueDate: null,
    created: "2023-05-05T21:32:54.286+00:00",
    id: "645576069832b555e087b6a3",
  },
  {
    type: "Task",
    title: "Сходить в магазин",
    status: "Done",
    priority: "low",
    creator: {
      name: "demoth",
      id: "645576069832b555e087b69c",
    },
    assignee: null,
    parent: null,
    description: null,
    statusOrder: 0,
    updated: "2023-05-05T21:32:54.287+00:00",
    dueDate: null,
    created: "2023-05-05T21:32:54.287+00:00",
    id: "645576069832b555e087b6a4",
  },
];

app.get("/item/all", (req, res) => {
  res.send(items);
});

app.get("/item", (req, res) => {
  const { id } = req.query;
  res.send(items.find((book) => book.id === id));
});

app.post("/item/", (req, res) => {
  console.log(req.body);

  items = [...items.filter((item) => item.id !== req.body.id), req.body];

  res.json(req.body);
});

app.delete("/item/:itemId", (req, res) => {
  console.log("Removing item ", req.params.itemId);
  items.filter((item) => item.id !== req.params.itemId);
  res.send("DELETE Request Called");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ username: "test", jwt: "testToken123" });
});

app.listen(port, () => {
  console.log(`Mocked memoria backend app listening on port ${port}`);
});
