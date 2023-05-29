const Book = require("../modals/bookModel");
const { Op } = require("sequelize");
const textConstants = require("../constants/textConstants.js");
const urlConstants = require("../constants/urlConstants.js");

class BookController {
  async addBook(req, res, imageName) {
    try{
    const data = await Book.create({ ...req.body, image: imageName });
    // console.log(data);
    if (data) res.json(data);
    else
      res.json({
        sucess: false,
        message: "Book not added!!!Error during adding the book.",
      });
    }catch{
       res.json({success:false, message: "Error while querying in database!!!"});
    }
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

    try{
    if (limit) {
      const data = await Book.findAll({
        limit: parseInt(limit),
        raw: true, 
      });
      // data ? res.json(data) : res.json([]);
      // console.log(data);
      for (let d of data) {
        // console.log(d);
        // console.log(d.dataValues);
        // d.dataValues='abc'+d.dataValues;
        // d.dataValues.image='http://localhost:9000/uploads/' + d.dataValues.image;
        // d.dataValues.image=urlConstants.IMG_PATH_URL + d.dataValues.image;
        d.image=urlConstants.IMG_PATH_URL + d.image;//work of dataValues is done by raw:true
        // console.log(d.dataValues.image);
      }
      res.json(data);
    } else {
      res.json({ success: false, message: "Book list is empty" });
    }
  }catch(err){
    return res.json({ success: false, message: err.message});
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
          raw: true
        });
        // console.log(data);
        for (let d of data) {
          d.image = urlConstants.IMG_PATH_URL + d.image; 
        }
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
      res.json({ sucess: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
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
      res.json({ sucess: false, message: textConstants.BOOK_ID_NOT_PROVIDED  });
    }
  }
}

module.exports = BookController;
