const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.use("/posts", require("./routes/posts"));


app.listen(3000, () => {
    console.log(`Server is starting on port 3000`);
});
