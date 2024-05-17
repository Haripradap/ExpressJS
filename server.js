const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8000;


const app = express();


//setup static folder
// app.use(express.static(path.join(__dirname, 'public' )));

let posts = [
    {id: 1, title:"post1"},
    {id: 2, title:"post2"},
    {id: 3, title:"post3"},
    {id: 4, title:"post4"}
]


//get all posts
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit));
    } else {
        res.status(200).json(posts);
    }
});

//get single post
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
       const post = posts.find((post) => post.id === id);


if(!post) {
    res.status(404).json({msg : `A post with id of ${id} was not found`});
} else {
    res.status(200).json(post);
}
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));






















//easy routing
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public' , 'index.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public' , 'about.html'));
// });