const express = require('express');
const path = require('path');

//Init
const app = express();
// PORT
const PORT = process.env.PORT || 5000;

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//Home Page Routes
// app.get('/', (req, res) => res.render('index', {
//     title: 'Member App',
//     members
// }));
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});



//Folders API Routes
app.use('/api/folders', require('./routes/api/foldersRoute'));


app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
