/**
 * Notes: 分类后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2023-11-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const cloudHelper = require('../../../helper/cloud_helper.js');

class CateBiz extends BaseBiz {

	//  取得所有分类 
	static async getAllCateOptions(title = 'bar') {
		return await cloudHelper.callCloudData('cate/all_options', {}, { title });
	}

	// 根据一级分类，获取名字
	static getCate1Name(allCateOptions, cate1Id) {
		for (let k = 0; k < allCateOptions.length; k++) {
			if (allCateOptions[k].val == cate1Id) return allCateOptions[k].label;
		}
		return '';
	}

	// 根据二级分类，获取名字
	static getCate2Name(allCateOptions, cate2Id) {
		for (let k = 0; k < allCateOptions.length; k++) {
			if (allCateOptions[k].children) {
				for (let j in allCateOptions[k].children)
					if (allCateOptions[k].children[j].val == cate2Id) return allCateOptions[k].children[j].label;
			}
		}
		return '';
	}

	// 根据分类ID获取文字描述数组
	static getCateNameArr(allCateOptions, cateId) {
		let cate1Id = cateId[0];
		let cate2Id = cateId[1];

		let cate1 = CateBiz.getCate1Name(allCateOptions, cate1Id);
		let cate2 = CateBiz.getCate2Name(allCateOptions, cate2Id);
		if (!cate2)
			return [cate1];
		else
			return [cate1, cate2];
	}
}

module.exports = CateBiz;