let posts = [
    {id: 1, title:"post1"},
    {id: 2, title:"post2"},
    {id: 3, title:"post3"},
    {id: 4, title:"post4"}
];



// get all posts
//route GET/api/post
export const getPosts =  (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit));
    } else {
        res.status(200).json(posts);
    }
}

//get single post
//route GET /api/post/:id
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
       const post = posts.find((post) => post.id === id);


if(!post) {
    const error = new Error(` A post with id of ${id} was not found`);
    return next(error);
} else {
    res.status(200).json(post);
}
};

//create a new post
//route POST /api/posts

export const createPost = (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title : req.body.title,
    };

    if (!newPost.title) {
        return res.status(400).json({message: 'Please include a title'})
    }
        
    posts.push(newPost);
    res.status(201).json(posts);
};


//update post
//route PUT /api/posts/:id
export const updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if(!post){
        return res.status(404).json({message: `A post with id of ${id} was not found`});
    }
    post.title = req.body.title;
    res.status(200).json(posts);
}


//delete post
//route DELETE /api/post/:id

export const deletePost =  (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if(!post){
        return res.status(404).json({message: `A post with id of ${id} was not found`});
    }
    posts = posts.filter((post) => post.id != id);
    res.status(200).json(posts);
};