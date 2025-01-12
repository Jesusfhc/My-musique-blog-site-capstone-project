import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const __dirnname = dirname(fileURLToPath(import.meta.url));

class Post {
    constructor(id, title, author, date, content) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.date = date;
        this.content = content;
    }
}

function deletePost(id) {
    posts.splice(id , 1);
}


let posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", (req, res) => {

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);


    let newPost = new Post(
        posts.length + 1,
        req.body.title,
        req.body.author,
        hoy.toDateString(),
        req.body.content
    )
    posts.push(newPost);

    res.render("index.ejs", {publicaciones: posts});
})

app.put("/edit_post", (req, res) => {
    let id = req.body.id;
    res.render("edit_post.ejs", {post: posts[id]});
})

app.delete("/", (req, res) => {
    deletePost(req.body.id);
    res.render("index.ejs", {publicaciones: posts});
})

app.post("/create_post", (req, res) => {
    res.render("create_post.ejs");
})



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})