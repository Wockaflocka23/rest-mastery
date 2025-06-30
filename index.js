const express = require("express");
const app = express();
const PORT = 3000;

let users = require("./data/users");

app.use(express.json());

// Create - POST
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read All - GET
app.get("/users", (req, res) => {
  res.json(users);
});

// Read One - GET
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).send("User not found");
});

// Update - PUT
app.put("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).send("User not found");
  }
});

// Delete - DELETE
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    const removedUser = users.splice(index, 1);
    res.json(removedUser);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
