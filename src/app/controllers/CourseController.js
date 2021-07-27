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
    formData._id = 1;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
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
  //[DELETE] /course/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next);
   
  }

    //[DELETE] /course/:id/force
    forceDestroy(req, res, next) {
      Course.deleteOne({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
     
    }

  //[PATH] /course/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[POST] /course/handle-form-actions
  handleFormActions(req, res, next) {
    console.log(req.body.actions)
    switch(req.body.actions) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds}})
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action invalid'})
    }
  }
}

module.exports = new CourseController();
