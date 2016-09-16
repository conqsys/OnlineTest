/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },

        user_id :{
            type:"integer",
            required:true,
            unique: true,
            index: true,
            primaryKey: true
        },

        user_name :{
            type:"string",
            required:true
        },
        user_email :{
            type: 'email',
            required: true,
            unique: true
        } ,
        user_mobile_no :{
            type:"string"
        },

        user_address :{
            type:"string"
        },
        user_pwd :{
            type: "integer",
            minLength: 6,
            maxLength:15,
            required: true
        }, 
        is_active :{
            type:"boolean",
            required:true    
        },
        is_fresher:{
            type:"boolean"
        } ,
        user_exp_month:{
            type:"integer"
        }, 
        user_exp_year:{
            type:"integer"
        } ,
        role_id :{
            type:"integer"
        } ,
        created_by :{
            type:"string"
        } ,
        updated_by :{
            type:"string"
        }, 
        created_datetime:{
            type:"datetime"
        },
        updated_datetime :{
            type:"datetime"
        }
    }
};
