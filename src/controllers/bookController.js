const Book = require("../modals/bookModel");
const { Op } = require("sequelize");

class BookController {
  async addBook(req, res, imageName) {
    const data = await Book.create({ ...req.body, image: imageName });
    console.log(data);
    if (data) res.json(data);
    else
      res.json({
        sucess: false,
        message: "Book not added!!!Error during adding the book.",
      });
  }

  async getBook(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await Book.findByPk(id);
      data ? res.json(data) : res.json([]);
    } else {
      res.json({ success: false, message: "Book ID NOT provided" });
    }
  }

  async getBooks(req, res) {
    let { limit } = req.query;
    if (!limit) limit = 20;

    if (limit) {
      const data = await Book.findAll({
        limit: limit,
      });
      data ? res.json(data) : res.json([]);
    } else {
      res.json({ success: false, message: "Book list is empty" });
    }
  }

  async searchBook(req, res) {
    const { q } = req.query;

    if (q) {
      try {
        const data = await Book.findAll({
          where: {
            [Op.or]: {
              name: {
                [Op.like]: `%${q}%`,
              },
              // author: {
              //   [Op.like]: `%${q}%`,
              // },
            },
          },
        });
        console.log(data);
        res.json(data);
      } catch (error) {
        console.error(error);
        res.json([]);
      }
    } else {
      res.json({ success: false, message: "Empty Query Search String" });
    }
  }

  async updateBook(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await Book.update(req.body, {
        where: {
          id: id,
        },
      });
      data[0] === 1
        ? res.json({ success: true, message: "Updated Book" })
        : res.json({ success: false, message: "Coudn't Update Book" });
    } else {
      res.json({ sucess: false, message: "Book ID Not provided" });
    }
  }

  async deleteBook(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await Book.destroy({
        where: {
          id: id,
        },
      });
      console.log(data);
      data === 1
        ? res.json({ success: true, message: "Deleted Book" })
        : res.json({ success: false, message: "Coudn't Delete the Book" });
    } else {
      res.json({ sucess: false, message: "Book ID Not provided" });
    }
  }
}

module.exports = BookController;
