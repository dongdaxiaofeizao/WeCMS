/**
 * Notes: 全局/首页模块业务逻辑
 * Date: 2021-03-15 04:00:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const setupUtil = require('../../../framework/utils/setup/setup_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const ProductModel = require('../model/product_model.js');
const Cate1Model = require('../model/cate1_model.js');

class HomeService extends BaseProjectService {

	async getSetup(key) {
		return await setupUtil.get(key);
	}

	/**首页列表 */
	async getHomeList() {


		let swiper = await this.getSetup('swiper');

		let where = {
			PRODUCT_STATUS: 1,
		};
		let orderBy = {
			'PRODUCT_VOUCH': 'desc',
			'PRODUCT_ORDER': 'asc',
			'PRODUCT_ADD_TIME': 'desc'
		}
		let fields = 'PRODUCT_TITLE,PRODUCT_CATE_NAME,PRODUCT_OBJ.cover';
		let vouchList = await ProductModel.getAll(where, fields, orderBy, 10);
		for (let k = 0; k < vouchList.length; k++) {
		}

		where = {
			PRODUCT_STATUS: 1,
		};
		orderBy = {
			'PRODUCT_VIEW_CNT': 'desc',
			'PRODUCT_ADD_TIME': 'desc'
		}
		fields = 'PRODUCT_ADD_TIME,PRODUCT_TITLE,PRODUCT_CATE_NAME,PRODUCT_FAV_CNT,PRODUCT_LIKE_CNT,PRODUCT_COMMENT_CNT,PRODUCT_VIEW_CNT,PRODUCT_OBJ.cover';
		let hotList = await ProductModel.getAll(where, fields, orderBy, 10);
		for (let k = 0; k < hotList.length; k++) {
			hotList[k].PRODUCT_ADD_TIME = timeUtil.timestamp2Time(hotList[k].PRODUCT_ADD_TIME, 'Y-M-D');
		}

		where = {
			CATE1_STATUS: 1,
		};
		orderBy = {
			'CATE1_VOUCH': 'desc',
			'CATE1_ORDER': 'asc',
			'CATE1_ADD_TIME': 'desc'
		}
		fields = 'CATE1_TITLE,CATE1_OBJ.cover';
		let cateList = await Cate1Model.getAll(where, fields, orderBy, 4);
		for (let k = 0; k < cateList.length; k++) {
			cateList[k].en = encodeURIComponent(cateList[k].CATE1_TITLE);
		}

		return { cateList, swiper, vouchList, hotList }

	}
}

module.exports = HomeService;