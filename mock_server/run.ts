/* eslint-disable import/no-extraneous-dependencies */
import express from "express";
import cors from "cors";

const app = express();
const port = 3003;

app.options("*", cors());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "asdf",
    progress: "20",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "asdf",
    progress: "30",
  },
  {
    id: "3",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    description: "asdf",
    progress: "90",
  },
];

app.get("/item/all", (req, res) => {
  res.send(books);
});

app.get("/item", (req, res) => {
  const { id } = req.query;
  res.send(books.find((book) => book.id === id));
});

app.post("/item", (req, res) => {
  console.log(req.body);
  res.json(req.body);
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
