/**
 * Notes: 活动后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-23 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const util = require('../../../../framework/utils/util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const Cate1Model = require('../../model/cate1_model.js');
const Cate2Model = require('../../model/cate2_model.js');
const ProductModel = require('../../model/product_model.js');

class AdminCateService extends BaseProjectAdminService {

	/************** 分类1 BEGIN ********************* */
	async vouchCate1(id, vouch) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async sortCate1(id, sort) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async statusCate1(id, status) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async getAdminCate1List({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'CATE1_ORDER': 'asc',
			'CATE1_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [{
				CATE1_TITLE: ['like', search]
			},];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status':
					// 按类型
					where.and.CATE1_STATUS = Number(sortVal);
					break;
				case 'vouch': {
					where.and.CATE1_VOUCH = 1;
					break;
				}
			}
		}

		return await Cate1Model.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async delCate1(id) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async insertCate1({
		title,
		order,
		forms
	}) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async getCate1Detail(id) {
		let fields = '*';

		let cate1 = await Cate1Model.getOne(id, fields);
		if (!cate1) return null;

		return cate1;
	}

	async editCate1({
		id,
		title,
		order,
		forms }) {

		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async updateCate1Forms({
		id,
		hasImageForms
	}) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}
	/************** 分类1 END ********************* */


	/************** 分类2 BEGIN ********************* */
	async sortCate2(id, sort) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async statusCate2(id, status) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async getAdminCate2List({
		cate1Id,
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'CATE2_ORDER': 'asc',
			'CATE2_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			CATE2_CATE1_ID: cate1Id
		};

		if (util.isDefined(search) && search) {
			where.or = [{
				CATE2_TITLE: ['like', search]
			},];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status':
					// 按类型
					where.and.CATE2_STATUS = Number(sortVal);
					break;
			}
		}

		return await Cate2Model.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async delCate2(id) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async insertCate2({
		title,
		cate1Id,
		order,
		forms
	}) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async getCate2Detail(id) {
		let fields = '*';

		let cate2 = await Cate2Model.getOne(id, fields);
		if (!cate2) return null;

		return cate2;
	}

	async editCate2({
		id,
		title,
		order,
		forms
	}) {

		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async updateCate2Forms({
		id,
		hasImageForms
	}) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}
	/************** 分类2 END ********************* */

}

module.exports = AdminCateService;