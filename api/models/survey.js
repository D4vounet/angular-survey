// This model stores a survey definition, with questions, and aggregated results

var mongoose = require('mongoose'),
  _ = require('underscore'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var Survey = new Schema({
  name: {type: String},
  description: {type: String},
  thanks: {type: String},
  available: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  lastFilledAt: {type: Date},
  stats: {
    viewed: {type: Number, default: 0},
    filled: {type: Number, default: 0}
  }
});

Survey.virtual('id').get(function(){
  return this._id.toHexString();
});

Survey.methods.addStep = function(step){
  if(this.steps.indexOf(step.id) != -1)
    return false;
  else
    this.steps.push(step.id);
};

Survey.methods.expose = function(){
  return _.pick(this, 'name', 'description', 'thanks', 'id');
};

module.exports = function(){
  mongoose.model('Survey', Survey);
  console.log('Survey model loaded');
}