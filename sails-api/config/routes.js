/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  'get /students': 'StudentController.getAll',
  
  'get /gettopics/:company_id': 'TopicController.getAllTopic',
  'get /gettopic/:topic_id': 'TopicController.getTopic',
  'get /delete/:topic_id': 'TopicController.removeTopic',
  'post /savetopic': 'TopicController.saveTopic',
  
  'post /company':'CompanyController.saveCompany',
   'get /getCompanies': 'CompanyController.getAllCompanies',
   'get /getCompanyById/:company_id': 'CompanyController.getCompanyByID',

  'get /questionSet/:company_id': 'QuestionSetController.getQuestionSets',
  'get /questionSet/:company_id/:question_set_id': 'QuestionSetController.getQuestionSet',
  'post /saveQuestionSet': 'QuestionSetController.saveQuestionSet',

  'post /question':'QuestionController.saveQuestion',
  'get /questions/:company_id': 'QuestionController.getQuestions',
  'get /question/:topic_id': 'QuestionController.getQuestionsByTopic',
  'get /questionoptions/:question_id': 'QuestionOptionController.getQuestionOptions',
  'post /file/upload' :'FileController.upload',
  'get /questionbyid/:question_id': 'QuestionController.getQuestionByQuestionID',
  'post /login': 'AuthController.login',

  '/logout': 'AuthController.logout'
  


};
