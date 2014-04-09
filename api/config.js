
module.exports = {
  setHeaders: function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    if('OPTIONS' == req.method) res.send(200);
    else next();
  },

  getSurvey: function(req, res, next){

    var password = (req.method == 'POST')? req.body.password: req.query.password;

    if(!password)
      return res.json({status: 'no', message: 'password required'});
    else if(!req.params.surveyId)
      return res.json({status: 'no', message: 'missing survey'});

    db.models.Survey
    .findOne({_id: req.params.surveyId, password: password}).exec()
    .then(function(survey){
      req.survey = survey;
      next();
    });
  },

  getQuestion: function(req, res, next){
    db.models.Question
    .findOne({survey: req.survey._id, _id: req.params.questionId}).exec()
    .then(function(question){
      req.question = question;
      next();
    });
  }
};