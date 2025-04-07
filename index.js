import app from './src/app.js'

const PORT = 5000;

app.get('/', (req, res) => {
    return res.json({message: "just checking"})
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
