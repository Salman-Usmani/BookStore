// import mongoose from 'mongoose'
import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

// const Book = model('Book', bookSchema)
export default Book;
