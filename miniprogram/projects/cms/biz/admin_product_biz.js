/**
 * Notes: 资讯后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2020-11-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const PublicBiz = require('../../../comm/biz/public_biz.js');
const ProjectBiz = require('./project_biz.js');
const projectSetting = require('../public/project_setting.js');
const dataHelper = require('../../../helper/data_helper.js');
const md5Lib = require('../../../lib/tools/md5_lib.js');

class AdminProductBiz extends BaseBiz {

	// 提取简介
	static getDesc(forms) {
		let content = '';
		for (let j = 0; j < forms.length; j++) {
			if (forms[j].mark == 'content' && forms[j].val) {
				content = forms[j].val;
				break;
			}
		}

		for (let k = 0; k < forms.length; k++) {
			if (forms[k].mark == 'desc' && !forms[k].val) {
				forms[k].val = PublicBiz.getRichEditorDesc(forms[k].val, content);
				return;
			}
		}

	}


	/** 表单初始化相关数据 */
	static async initFormData(id = '') {

		let param = await ProjectBiz.getSetup('param');
		if (!param) param = [];

		let fields = dataHelper.deepClone(projectSetting.PRODUCT_FIELDS);
		for (let k = 0; k < param.length; k++) {
			fields.push({ mark: 'param' + md5Lib.md5(param[k].name), title: param[k].name, type: 'text', must: param[k].must });
		}
		return {
			id,
			// 分类
			cateName: '',

			fields,

			// 表单数据  
			formOrder: 9999,
			formTitle: '',
			formCateId: [],
			formForms: [],
		}

	}


}


/** 表单校验  本地 */
AdminProductBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:50|name=标题',
	cateId: 'formCateId|must|array|name=分类',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	forms: 'formForms|array',
};


module.exports = AdminProductBiz;