// This model stores the answers a user made to a survey

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var Answer = new Schema({
  survey: {type: ObjectId},
  token: {type: String},
  createdAt: {type: Date, default: Date.now},
  duration: {type: Number},
  answers: [{
    name: {type: String},
    value: {type: Schema.Types.Mixed},
    duration: {type: Number},
  }]
});

Answer.virtual('id').get(function(){
  return this._id.toHexString();
});

module.exports = function(){
  mongoose.model('Answer', Answer);
  console.log('Answer model loaded');
}