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

function updatePost(req) {

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    let post = posts[req.body.id - 1];
    post.title = req.body.title;
    post.author = req.body.author;
    post.date = hoy.toDateString();
    post.content = req.body.content;
    
}


let posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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

app.post("/edit_post", (req, res) => {
    console.log(req.body); 
    res.render("edit_post.ejs", {post: posts[req.body.id - 1]});
})

app.post("/update_post", (req, res) => {
    updatePost(req);
    res.render("index.ejs", {publicaciones: posts});
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