const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');

//get and show posts
async function showPosts() {

    try {
        const res =await fetch('http://localhost:8000/api/posts');
        if(!res.ok){
            throw new Error('Failed to fetch posts');
        }

        const posts = await res.json();
        output.innerHTML = '';

        posts.forEach((posts) => {
            const postEl = document.createElement('div');
            postEl.textContent = posts.title;
            output.appendChild(postEl);
        })
    } catch (error) {
        console.log('Error fetching posts: ' , error);
    }
 
        };

async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8000/api/posts',{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title}),
        })

        if(!res.ok){
            throw new Error('Failed to Add post');
        }

        const newPost = await res.json();

        const postEl = document.createElement('div');
        postEl.textContent = newPost.title;
        output.appendChild(postEl);
        showPosts();
        
    } catch (error) {
        console.error("this is an error lasr");
    }
    
}


        button.addEventListener('click',showPosts);
        form.addEventListener('submit',addPost);
