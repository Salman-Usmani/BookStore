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
      data: book,
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
    const book = await Book.findByIdAndUpdate(id, req.body);

    return res.status(200).send({
      success: true,
      message: "book updated successfully",
      books: book,
    });
  } catch (error) {
    return res.send(error);
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
