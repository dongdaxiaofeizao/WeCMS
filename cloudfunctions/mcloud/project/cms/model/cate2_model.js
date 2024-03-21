/**
 * Notes: 二级分类
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-11-04 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class Cate2Model extends BaseProjectModel {

}

// 集合名
Cate2Model.CL = BaseProjectModel.C('cate2');

Cate2Model.DB_STRUCTURE = {
	_pid: 'string|true',
	CATE2_ID: 'string|true',

	CATE2_ORDER: 'int|true|default=9999',

	CATE2_CATE1_ID: 'string|true',
	CATE2_TITLE: 'string|false|comment=标题',
	CATE2_STATUS: 'int|true|default=1|comment=状态 0/1',

	CATE2_CNT: 'int|true|default=0',

	CATE2_FORMS: 'array|true|default=[]',
	CATE2_OBJ: 'object|true|default={}',

	CATE2_ADD_TIME: 'int|true',
	CATE2_EDIT_TIME: 'int|true',
	CATE2_ADD_IP: 'string|false',
	CATE2_EDIT_IP: 'string|false',
};

// 字段前缀
Cate2Model.FIELD_PREFIX = "CATE2_";


module.exports = Cate2Model;