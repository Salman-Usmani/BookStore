import Book from "../models/bookModel.js";

export const createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(422).send({
        success: false,
        message: "fields required: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    res.status(201).send({
      success: true,
      message: "book created successfully",
      books: book,
    });
  } catch (error) {
    return res.send(error);
  }
};
export const getAllBooks = async (req, res) => {
  try {
    const book = await Book.find({});
    return res.status(200).send({
      success: true,
      message: "books found successfully",
      books: book,
    });
  } catch (error) {
    return res.send(error);
  }
};
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res
      .status(200)
      .send({ success: true, message: "book found successfully", books: book });
  } catch (error) {
    return res.send(error);
  }
};
export const updateBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(422).send({
        success: false,
        message: "fields required: title, author, publishYear",
      });
    }

    const { id } = req.params;

    // Find the existing book and update it atomically
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Book updated successfully",
      books: updatedBook, // Return the updated book object
    });
  } catch (error) {
    return res.send(error.message);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res
        .status(404)
        .send({ success: true, message: "book not found", books: book });
    }
    return res.status(200).send({
      success: true,
      message: "book deleted successfully",
      books: book,
    });
  } catch (error) {
    return res.send(error);
  }
};
