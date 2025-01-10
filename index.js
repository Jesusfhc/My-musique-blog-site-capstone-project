import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const __dirnname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/create_post", (req, res) => {
    res.render("create_post.ejs");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})