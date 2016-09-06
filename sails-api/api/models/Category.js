/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt:false,
  autoUpdatedAt:false,
  autoPK: false,
  attributes: {
    CategoryID:{
      type:"integer",
      unique: true,
      index: true,
      primaryKey: true
    },
    Name:{
      type:"string",
      required:true
    },
    CreatedBy:{
      type:"string"
    },
    CreatedDate:{
      type:"datetime"
    },
    ModifiedBy:{
      type:"string"
    },
    ModifiedDate:{
      type:"datetime"
    }
  }
};

