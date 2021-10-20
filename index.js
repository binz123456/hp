const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const books = [
        
        {  id:1, title : "harry potter" ,  author : "Rowling"} ,
        {  id:2, title : "half girlfriend" ,  author : "chetan"  },
        {  id:3, title : "the great indian" ,  author : "ashtilor"},
        {  id:4, title : "the pen book" ,  author : "william"}
 
 ];


app.get('/api/books', (req, res) => {
  res.send(books);
});

app.post('/api/books', (req, res) => {
//   const { error } = validateBooks(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author:req.body.author
  };
  books.push(book);
  res.send(book);
});

app.put('/api/books/:id', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('The book with the given ID was not found.');

//   const { error } = validateBooks(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
  
  book.title = req.body.title; 
  book.author = req.body.author; 
  res.send(book);
});

app.delete('/api/books/:id', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('The book with the given ID was not found.');

  const index = books.indexOf(book);
  books.splice(index, 1);

  res.send(book);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('The book with the given ID was not found.');
  res.send(book);
});

function validateBooks(book) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate ( book, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));