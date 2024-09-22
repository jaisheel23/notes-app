import express from "express";

const app = express();
const port = 3000;

let notes = [];

app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { notes: notes });
});

app.get("/add-note", (req, res) => {
  res.render("note-form.ejs");
});

app.post("/save-note", (req, res) => {
  let note = {
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(note);
  res.redirect("/");
});

app.get("/:requestedAction/:requestedTitle", (req, res) => {
  let requestedAction = req.params.requestedAction;
  let requestedTitle = req.params.requestedTitle;

  switch (requestedAction) {
    case "read-more":
      notes.forEach((note) => {
        if (note.title === requestedTitle) {
          res.render("note.ejs", { note: note });
        }
      });
      break;

    case "delete-note":
      notes = notes.filter((note) => note.title !== requestedTitle);
      res.redirect("/");
      break;

    case "edit-note":
      notes.forEach((note) => {
        if (note.title === requestedTitle) {
          res.render("note-form.ejs", { note: note });
        }
      });
      notes = notes.filter((note) => note.title !== requestedTitle);
      break;

    default:
      redirect("/");
      break;
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
