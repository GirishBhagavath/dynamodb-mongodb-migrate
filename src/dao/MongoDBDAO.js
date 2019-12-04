'use strict';
const lodash = require('lodash');
const moment = require('moment');
const MongoDBConnector = require('./../connectors/MongoDBConnector');

class MongoDBDAO {
    constructor(tableName, databaseName,host,user,password) {
        this.tableName = tableName;
        this.databaseName = databaseName;
        this.host = host;
        this.user = user;
        this.password = password;
    }

    intertOrUpdateItems(items) {
        let collection = MongoDBConnector.getConnection(this.databaseName,this.host,this.user,this.password, this.tableName);
        let bulkWriteReqArray = lodash.map(items, (item) => {
            let new_item ={
                '_id': item.id,
                'log_message': item.log_message,
                'log_template': item.log_template,
                'log_by': item.log_by,
                'log_event': item.log_event,
                'log_generated_by': item.log_generated_by,
                'log_date': new Date(item.log_date),
                'organization': item.organization,
                'entity_id': item.entity_id,
                'entity_type': item.entity_type,
                'entity_payload': item.entity_payload,
                'parent_entity_id': item.parent_entity_id,
                'parent_entity_type': item.parent_entity_type,
                'application': item.application
              }
            return new_item
        });
        return collection.insertMany(bulkWriteReqArray, function(err, data){
            if(err){
                console.log(err)
                console.log("**********************")
                return {modifiedCount: 0, upsertedCount: 0}
            }else{
               console.log('********************************')
               return {modifiedCount: bulkWriteReqArray.length, upsertedCount: bulkWriteReqArray.length}
            }
        });
    }
}

module.exports = MongoDBDAO;