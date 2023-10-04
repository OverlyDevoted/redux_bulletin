
const { sub } = require("date-fns");
const { nanoid } = require("nanoid");

const express = require("express");
const cors = require("cors");

const app = express();

//Backend server code, api 
const PORT = process.env.PORT || 3001;
const startingReactions = [
    { id: '❤', count: 0 },
    { id: '😎', count: 0 },
    { id: '😂', count: 0 },
    { id: '😥', count: 0 },
    { id: '🎉', count: 0 },
    { id: '👀', count: 0 }
]
const posts = [{
    id: '1', title: 'Learning redux toolkit', description: "Once the store is created, we can make it available to our React components by putting a React-Redux <Provider> around our application in src/index.js. Import the Redux store we just created, put a <Provider> around your <App>, and pass the store as a prop:",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: startingReactions
},
{
    id: '2', title: 'Slices', description: "Add a new file named src/features/counter/counterSlice.js. In that file, import the createSlice API from Redux Toolkit.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: startingReactions
}]
app.use(cors());
app.use(express.json());
app.get('/api/posts', (req, res) => {
    return res.json(posts);
})
app.post('/api/posts/add', (req, res) => {
    console.log("logging")
    console.log(req.body);
    const newPost = {
        id: nanoid(),
        ...req.body,
        date: new Date().toISOString(),
        reactions: startingReactions
    }
    posts.push(newPost);
    return res.json(newPost);
})
// app.use(express.static(path.join(__dirname, '..', '..', 'crypto_front', 'dist')));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
