/**
 * Notes: 分类后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-11-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js'); 
const projectSetting = require('../public/project_setting.js'); 

class AdminCateBiz extends BaseBiz { 

	/** 表单初始化相关数据 */
	static async initCate1FormData(id = '') {
		return {
			id,

			fields: projectSetting.CATE1_FIELDS,

			// 表单数据  
			formOrder: 9999,
			formTitle: '',
			formForms: [],
		}

	}

	static async initCate2FormData(id = '') {
		return {
			id,

			fields: projectSetting.CATE2_FIELDS,

			// 表单数据  
			formOrder: 9999,
			formTitle: '',
			formForms: [],
		}

	}


}

/** 表单校验  本地 */
AdminCateBiz.CATE1_CHECK_FORM = {
	title: 'formTitle|must|string|name=分类名称',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	forms: 'formForms|array',
};

AdminCateBiz.CATE2_CHECK_FORM = {
	title: 'formTitle|must|string|name=分类名称',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	forms: 'formForms|array',
};



module.exports = AdminCateBiz;