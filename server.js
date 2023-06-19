const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost/qna_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const questionSchema = new mongoose.Schema({
  question: String,
});

const Question = mongoose.model("Question", questionSchema);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const secretKey = "your-secret-key";

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
});

app.post("/questions", async (req, res) => {
  const { question } = req.body;

  try {
    const newQuestion = new Question({ question });
    await newQuestion.save();

    res
      .status(201)
      .json({ message: "Question created", question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Failed to create question" });
  }
});

app.get("/questions", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const questions = await Question.find().skip(skip).limit(limit);
    const totalQuestions = await Question.countDocuments();

    res.status(200).json({ questions, totalQuestions });
  } catch (error) {
    res.status(500).json({ message: "Failed to get questions" });
  }
});

app.get("/questions/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: "Failed to get the question" });
  }
});

app.put("/questions/:id", async (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res
      .status(200)
      .json({ message: "Question updated", question: updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Failed to update the question" });
  }
});

app.delete("/questions/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the question" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
