/**
 * Created by asankanissanka on 9/29/16.
 */
'use strict';

let mongoose          = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

let client;

class MongoDBConnector {

  static getConnection(database,host,user,password, table_name) {
    try {
      if(client){
        return client;
      }else{

        let url = 'mongodb://'
        if(user && password){
          url = url + user + ':' + password + '@'
        }
        url = url + host + database;
        console.log(url)
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
        let db = mongoose.connection;
        db.on('error', function(){
          console.error('MongoDB connection error:');
        });

        db.on('success', function(){
          console.error('MongoDB connection success');
        });
        let Schema = mongoose.Schema;
        let logSchema = new Schema({
            _id: String,
            log_message: String,
            log_template: String,
            log_by: String,
            log_event: String,
            log_generated_by: String,
            log_date: Date,
            organization: String,
            entity_id: String,
            entity_type: String,
            entity_payload: Object,
            parent_entity_id: String,
            parent_entity_type: String,
            application: String
        });
        client = mongoose.model(table_name, logSchema);
        console.log(client)
        return client;
      }
    } catch (error) {
      console.error(error);
      return error
    }
  }
}

module.exports = MongoDBConnector;