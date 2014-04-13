// This model stores the answers a user made to a survey

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var Answer = new Schema({
  survey: {type: ObjectId},
  createdAt: {type: Date, default: Date.now},
  steps: [{
    id: {type: ObjectId},
    questions: [{
      id: {type: ObjectId},
      value: {type: Schema.Types.Mixed},
      _id: false
    }],
    _id: false
  }]
});

Answer.virtual('id').get(function(){
  return this._id.toHexString();
});

module.exports = function(){
  mongoose.model('Answer', Answer);
  console.log('Answer model loaded');
}