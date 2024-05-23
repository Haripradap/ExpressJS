import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/post.js'
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/Notfound.js';
const PORT = process.env.PORT || 8000;


//get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

//logger middleware
app.use(logger);



//setup static folder
app.use(express.static(path.join(__dirname, 'public' )));

//routes
app.use('/api/posts',posts);




// error handler middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));






















//easy routing
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public' , 'index.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public' , 'about.html'));
// });