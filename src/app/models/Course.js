const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require('mongoose-delete');



const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
);

// Custim query helpers
CourseSchema.query.sortable = function (req) {
  if(req.query.hasOwnProperty('_sort')) {
    const isValidtype = ['asc', 'desc'].includes(req.query.type);
    
    return this.sort({
      [req.query.column]: isValidtype ? req.query.type : 'desc',
    });
  }
  return this;
}

//Add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, { 
  deletedAt : true,
  overrideMethods: 'all', 
  });


module.exports = mongoose.model("Course", CourseSchema);
