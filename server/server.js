const express = require("express");
const cors = require("cors");

const UserRouter = require("./routes/user");
const TagRouter = require("./routes/tag");

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

app.use("/users", UserRouter);
app.use("/tags", TagRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
