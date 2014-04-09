// This model stores a question of a survey

var mongoose = require('mongoose'),
  _ = require('underscore'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var Step = new Schema({
  survey: {type: ObjectId},
  order: {type: Number},
  title: {type: String},
  description: {type: String},
  name: {type: String}
});

Step.virtual('id').get(function(){
  return this._id.toHexString();
});

Step.methods.expose = function(){
  return _.pick(this, 'title', 'description', 'name', 'id', 'order');
};

module.exports = function(){
  mongoose.model('Step', Step);
  console.log('Step model loaded');
}