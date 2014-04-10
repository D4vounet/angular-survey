// This model stores a question of a survey

var mongoose = require('mongoose'),
  _ = require('underscore'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var Question = new Schema({
  step: {type: ObjectId},
  order: {type: Number},
  type: {type: String, enum:['check', 'radio', 'fields', 'open', 'checkGrid', 'textGrid'], default: 'text'},
  title: {type: String},
  description: {type: String},
  name: {type: String},
  required: {type: Boolean},
  hasComments: {type: Boolean},
  items: [{type: Schema.Types.Mixed}]
});

Question.virtual('id').get(function(){
  return this._id.toHexString();
});

Question.methods.expose = function(){
  return _.pick(this, 'type', 'description', 'title', 'name', 'required', 'hasComments', 'items', 'id', 'order');
};

module.exports = function(){
  mongoose.model('Question', Question);
  console.log('Question model loaded');
}