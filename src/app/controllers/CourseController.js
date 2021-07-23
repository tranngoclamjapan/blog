const Course = require("../models/Course");
const { mongoosetoObject } = require("../../util/mongooes");
const { $where } = require("../models/Course");

class CourseController {
  //[GET] /news/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongoosetoObject(course) });
      })
      .catch(next);
  }

  //[GET] /news/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image =
      "https://img.youtube.com/vi/" + `${req.body.videoId}` + "/sddefault.jpg";

    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
  //[GET] /news/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongoosetoObject(course),
        })
      )
      .catch(next);
  }

  //[PUT] /course/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id}, req.body)
    .then(() => res.redirect("/me/stored/courses"))
    .catch(next);
   
  }
}

module.exports = new CourseController();
