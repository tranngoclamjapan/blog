const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongooes");
class SiteController {
  //[GET] /news
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", { courses: mutipleMongooseToObject(courses) });
      })
      .catch(next);
    // res.render("home");
  }
  //[GET] /news/:slug
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
