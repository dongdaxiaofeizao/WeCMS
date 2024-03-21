/**
 * Notes: 资讯实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2020-10-28 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class ProductModel extends BaseProjectModel {

}

// 集合名
ProductModel.CL = BaseProjectModel.C('product');

ProductModel.DB_STRUCTURE = {
	_pid: 'string|true',
	PRODUCT_ID: 'string|true',

	PRODUCT_TITLE: 'string|false|comment=标题',
	PRODUCT_STATUS: 'int|true|default=1|comment=状态 0/1',

	PRODUCT_CATE_ID: 'array|true|comment=分类编号',
	PRODUCT_CATE_NAME: 'array|true|comment=分类冗余',

	PRODUCT_ORDER: 'int|true|default=9999',
	PRODUCT_VOUCH: 'int|true|default=0',

	PRODUCT_COMMENT_CNT: 'int|true|default=0',

	PRODUCT_QR: 'string|false',
	PRODUCT_VIEW_CNT: 'int|true|default=0|comment=访问次数',

	PRODUCT_COMMENT_CNT: 'int|true|default=0|comment=评论数',
	PRODUCT_FAV_CNT: 'int|true|default=0|comment=收藏数',
	
	PRODUCT_LIKE_CNT: 'int|true|default=0|comment=点赞数',
	PRODUCT_LIKE_LIST: 'array|true|default=[]|comment=点赞记录',

	PRODUCT_FORMS: 'array|true|default=[]',
	PRODUCT_OBJ: 'object|true|default={}',

	PRODUCT_ADD_TIME: 'int|true',
	PRODUCT_EDIT_TIME: 'int|true',
	PRODUCT_ADD_IP: 'string|false',
	PRODUCT_EDIT_IP: 'string|false',
};

// 字段前缀
ProductModel.FIELD_PREFIX = "PRODUCT_";


module.exports = ProductModel;