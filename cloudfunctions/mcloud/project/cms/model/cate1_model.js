/**
 * Notes: 一级分类
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-11-04 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class Cate1Model extends BaseProjectModel {

}

// 集合名
Cate1Model.CL = BaseProjectModel.C('cate1');

Cate1Model.DB_STRUCTURE = {
	_pid: 'string|true',
	CATE1_ID: 'string|true',

	CATE1_ORDER: 'int|true|default=9999',
	CATE1_VOUCH: 'int|true|default=0',

	CATE1_TITLE: 'string|false|comment=标题',
	CATE1_STATUS: 'int|true|default=1|comment=状态 0/1',

	CATE1_CNT: 'int|true|default=0',

	CATE1_FORMS: 'array|true|default=[]',
	CATE1_OBJ: 'object|true|default={}',

	CATE1_ADD_TIME: 'int|true',
	CATE1_EDIT_TIME: 'int|true',
	CATE1_ADD_IP: 'string|false',
	CATE1_EDIT_IP: 'string|false',
};

// 字段前缀
Cate1Model.FIELD_PREFIX = "CATE1_";


module.exports = Cate1Model;