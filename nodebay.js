// https://developer.ebay.com/devzone/finding/Concepts/SiteIDToGlobalID.html

import RequestHelper from './request-helper';

export default class Ebay {

    /**
     * Ebay API Client
     * @param {string} token - Private token
     */
    constructor(token) {
    	this.token = token;
        this.requestHelper = new RequestHelper(token);
    }
    
    getVersion(callback){
	    let actionPath = '/item/search';
        let params = {
	        'OPERATION-NAME': 'getVersion',
	        'RESPONSE-DATA-FORMAT': 'json',
			'SERVICE-VERSION': '1.2.0'			
        };

        this.requestHelper.get(actionPath, params, function(err, response, body) {
            callback(err, response, body);
        });
    }
    
    findItemsByKeywords(q, options){
		return new Promise((resolve, reject) => {    	
		/*
		   http://svcs.ebay.com/services/search/FindingService/v1?
		   OPERATION-NAME=findItemsByKeywords&
		   SERVICE-VERSION=1.0.0&
		   SECURITY-APPNAME=YourAppID&
		   RESPONSE-DATA-FORMAT=XML&
		   REST-PAYLOAD&
		   keywords=harry%20potter%20phoenix&
		   paginationInput.entriesPerPage=2
		
		*/
    
	    let actionPath = '/item/search';
        let params = {
        	'OPERATION-NAME': 'findItemsByKeywords',
	        'RESPONSE-DATA-FORMAT': 'json',
			'SERVICE-VERSION': '1.13.0',
            'keywords': q,
            'outputSelector': 'PictureURLSuperSize',
            filter: options.filter,
            limit: options.limit || 5,
            offset: options.offset || 0,
            'paginationInput.entriesPerPage': options.entriesPerPage || 1
        };

        this.requestHelper.get(actionPath, params, function(err, response, body) {
            () => resolve(err);
            () => reject(body);
        });
		});
    }
    
findItemsAdvanced(q, options) {
  return new Promise((resolve, reject) => {
    let actionPath = '/item/search';
        let params = {
        	'OPERATION-NAME': 'findItemsAdvanced',
	        'RESPONSE-DATA-FORMAT': 'json',
			'SERVICE-VERSION': '1.13.0',
            'keywords': q,
            'outputSelector': options.outputSelector || '',
            'filter': options.filter,
            'limit': options.limit || 5,
            'offset': options.offset || 0,
            'paginationInput.entriesPerPage': options.paginationInput.entriesPerPage || 1
        };

        this.requestHelper.get(actionPath, params, function(err, response, body) {
            resolve(body);
            reject(err);
        });

  });
}

    itemSearch(q, options, callback) {
        let actionPath = '/item/search';
        let params = {
            q: q,
            filter: options.filter,
            limit: options.limit || 50,
            offset: options.offset || 0,
            'RESPONSE-DATA-FORMAT': 'json'
        };

        this.requestHelper.get(actionPath, params, function(err, response, body) {
            callback(err, response, body);
        });
    }

    itemGetItem(itemId, callback) {
        let actionPath = '/item/' + itemId;

        this.requestHelper.get(actionPath, {}, function (err, response, body) {
            callback(err, response, body);
        })
    }

    itemGetItemGroup(itemGroupId, callback) {
        let actionPath = '/item_group/' + itemGroupId;

        this.requestHelper.get(actionPath, {}, function(err, response, body) {
            callback(err, response, body);
        });
    }

    sessionCreateCheckoutSession(params, callback) {
        let actionPath = '/session';

        this.requestHelper.post(actionPath, params, function(err, response, body) {
            callback(err, response, body);
        });

    }
}