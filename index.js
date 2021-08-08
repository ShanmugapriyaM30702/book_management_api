const express = require("express");       //Express
var bodyParser = require("body-parser");  //BodyParser
const database = require("./database");   //Database

//Initialize express and bodyParser
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

/*
= = = = = GET = = = = GET = = = = = GET = = = = = GET = = = = = GET = = = = =

|===========================================|
|             CREATE - BOOK                 |
|===========================================|
| Route        |  /is                       |
| Description  |  Get specific book on ISBN |
| Access       |  PUBLIC                    |
| Parameter    |  ISBN                      |
| Methods      |  GET                       |
|===========================================|
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if (getSpecificBook.length === 0) {
        return res.json({error: `No Book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});



/*
|===============================================|
|                CREATE - BOOK                  |
|===============================================|
| Route        |  /c                            |
| Description  |  Get specific book on category |
| Access       |  PUBLIC                        |
| Parameter    |  category                      |
| Methods      |  GET                           |
|===============================================|
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if (getSpecificBook.length === 0) {
        return res.json({error: `Nook Book found with category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});



/*
|===============================================|
|                CREATE - BOOK                  |
|===============================================|
| Route        |  /lang                         |
| Description  |  Get specific book on language |
| Access       |  PUBLIC                        |
| Parameter    |  language                      |
| Methods      |  GET                           |
|===============================================|
*/
booky.get("/lang/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );

    if (getSpecificBook.length === 0) {
        return res.json({error: `No such book found with language of ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});



/*
|=================================|
|        CREATE - AUTHOR          |
|=================================|
| Route        |  /authors        |
| Description  |  Get all authors |
| Access       |  PUBLIC          |
| Parameter    |  NONE            |
| Methods      |  GET             |
|=================================|
*/
booky.get("/authors", (req, res) => {
    return res.json({authors: database.author});
});



/*
|=================================================|
|                CREATE - AUTHOR                  |
|=================================================|
| Route        |  /author                         |
| Description  |  Get specific author based on id |
| Access       |  PUBLIC                          |
| Parameter    |  id                              |
| Methods      |  GET                             |
|=================================================|
*/
booky.get("/author/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );

    if (getSpecificAuthor.length === 0) {
        return res.json({error: `No such author found with id ${req.params.id}`});
    }
    return res.json({author: getSpecificAuthor});
});



/*
|================================================|
|               CREATE - AUTHOR                  |
|================================================|
| Route        |  /author/book                   |
| Description  |  Get all authors based on books |
| Access       |  PUBLIC                         |
| Parameter    |  ISBN                           |
| Methods      |  GET                            |
|================================================|
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if (getSpecificAuthor.length === 0) {
        return res.json({error: `No author found for the book with isbn ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
});



/*
|======================================|
|         CREATE - PUBLICATION         |
|======================================|
| Route        |  /publications        |
| Description  |  Get all publications |
| Access       |  PUBLIC               |
| Parameter    |  NONE                 |
| Methods      |  GET                  |
|======================================|
*/
booky.get("/publications", (req, res) => {
    return res.json({publications: database.publication});
});



/*
|=========================================================|
|                  CREATE - PUBLICATION                   |
|=========================================================|
| Route        |   /publication                           |
| Description  |  Get specific publication based on name  |
| Access       |  PUBLIC                                  |
| Parameter    |  name                                    |
| Methods      |  GET                                     |
|=========================================================|
*/
booky.get("/publication/:name", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.name.includes(req.params.name)
    );

    if (getSpecificPublication.length === 0) {
        return res.json({error: `No such publication found for name ${req.params.name}`});    
    }
    return res.json({publication: getSpecificPublication});
});



/*
|=========================================================|
|                 CREATE - PUBLICATION                    |
|=========================================================|
| Route        |  /publication/book                       |
| Description  |  Get specific publication based on isbn  |
| Access       |  PUBLIC                                  |
| Parameter    |  ISBN                                    |
| Methods      |  GET                                     |
|=========================================================|
*/
booky.get("/publication/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if (getSpecificPublication.length === 0) {
        return res.json({error: `No such publication found for isbn ${req.params.isbn}`});    
    }
    return res.json({publication: getSpecificPublication});
});



/*
= = = = = POST = = = = POST = = = = = POST = = = = = POST = = = = = POST = = = = =

|==============================|
|             ADD              |
|==============================|
| Route        |  /book/new    |
| Description  |  Add new book |
| Access       |  PUBLIC       |
| Parameter    |  NONE         |
| Methods      |  POST         |
|==============================|
*/
booky.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});



/*
|================================|
|              ADD               |
|================================|
| Route        |  /author/new    |
| Description  |  Add new author |
| Access       |  PUBLIC         |
| Parameter    |  NONE           |
| Methods      |  POST           |
|================================|
*/
booky.post("/author/new", (req, res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json(database.author);
});



/*
|=====================================|
|                ADD                  |
|=====================================|
| Route        |  /publication/new    |
| Description  |  Add new publication |
| Access       |  PUBLIC              |
| Parameter    |  NONE                |
| Methods      |  POST                |
|=====================================|
*/
booky.post("/publication/new", (req, res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json(database.publication);
});



/*
= = = = = PUT = = = = = PUT = = = = = PUT = = = = = PUT = = = = = PUT = = = = =

|==============================================|
|                  UPDATE                      |
|==============================================|
| Route       |  /publication/update/book      |
| Description |  Update / Add new publication  |
| Access      |  PUBLIC                        |
| Parameter   |  ISBN                          |
| Methods     |  PUT                           |
|==============================================|
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
    //Update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn);
        }
    });

    //Update the book database
    database.book.forEach((book) => {
        if (book.isbn === req.params.isbn) {
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json({
        books: database.books,
        publications: database.publication,
        message: "Successfully updated publications"
    });
});



/*
= = = = = DELETE = = = = = DELETE = = = = = DELETE = = = = = DELETE = = = = = DELETE = = = = =

|===============================|
|            DELETE             |
|===============================|
| Route       |  /book/delete   |
| Description |  Delete a book  |
| Access      |  PUBLIC         |
| Parameter   |  ISBN           |
| Methods     |  DELETE         |
|===============================|
*/
booky.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter(
       (book) => book.ISBN !== req.params.isbn
    );
    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});



/*
|===============================|
|            DELETE             |
|===============================|
| Route       |  /author/delete |
| Description |  Delete author  |
| Access      |  PUBLIC         |
| Parameter   |  ISBN           |
| Methods     |  DELETE         |
|===============================|
*/
booky.delete("/author/delete/:id", (req, res) => {
    const updatedAuthorDatabase = database.author.filter(
        (author) => author.id !== parseInt(req.params.id)
    );
    database.author = updatedAuthorDatabase;
    return res.json({author: database.author});
});



/*
|=======================================================|
|                       DELETE                          |
|=======================================================|
| Route       |  /book/delete/author                    |
| Description |  Delete author from book and vice versa |
| Access      |  PUBLIC                                 |
| Parameter   |  ISBN, authorId                         |
| Methods     |  DELETE                                 |
|=======================================================|
*/
booky.delete("/book/author/delete/:isbn/:authorId", (req, res) => {
    //Update book database
    database.books.forEach((book) => {
            if (book.ISBN === req.params.isbn) {
                const newAuthorList = book.author.filter(
                    (eachAuthor) => {
                        eachAuthor !== parseInt(req.params.authorId)
                    }
                );
                book.author = newAuthorList;
                return;
            }
    });

    //Update Author database
    database.author.forEach((eachAuthor) => {
        if (eachAuthor.id === parseInt(req.params.authorId)) {
            const newBookList = eachAuthor.books.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthor.books = newBookList;
            return;
        }
    });

    return res.json({
        book: database.books,
        author: database.author,
        message: "Author was delete !!!"
    });
});

booky.get("/", (req, res) => {
    return res.json({books: database.books});       
});

booky.listen(3000, () => {
    console.log("Server is up & running");
});