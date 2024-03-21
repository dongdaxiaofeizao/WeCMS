/**
 * Notes: 资讯后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const util = require('../../../../framework/utils/util.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const ProductModel = require('../../model/product_model.js');
const Cate1Model = require('../../model/cate1_model.js');
const Cate2Model = require('../../model/cate2_model.js');

class AdminProductService extends BaseProjectAdminService {



	async statCate1Cnt(id) {
		if (!id) return;
		let cnt = await ProductModel.count({ PRODUCT_CATE_ID: id });
		await Cate1Model.edit(id, { CATE1_CNT: cnt });
	}

	async statCate2Cnt(id) {
		if (!id) return;
		let cnt = await ProductModel.count({ PRODUCT_CATE_ID: id });
		await Cate2Model.edit(id, { CATE2_CNT: cnt });
	}

	/**添加文章*/
	async insertProduct({
		title,
		cateId, //分类 
		cateName,
		order,
		forms
	}) {

		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**删除资讯数据 */
	async delProduct(id) {

		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**获取资讯信息 */
	async getProductDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let product = await ProductModel.getOne(where, fields);
		if (!product) return null;

		return product;
	}

	// 更新forms信息
	async updateProductForms({
		id,
		hasImageForms
	}) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**更新资讯数据 */
	async editProduct({
		id,
		title,
		cateId, //分类 
		cateName,
		order,
		forms
	}) {

		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**取得资讯分页列表 */
	async getAdminProductList({
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
			'PRODUCT_ORDER': 'asc',
			'PRODUCT_ADD_TIME': 'desc'
		};
		let fields = 'PRODUCT_VIEW_CNT,PRODUCT_LIKE_CNT,PRODUCT_FAV_CNT,PRODUCT_COMMENT_CNT,PRODUCT_CATE_NAME,PRODUCT_TITLE,PRODUCT_CATE_ID,PRODUCT_CATE_NAME,PRODUCT_EDIT_TIME,PRODUCT_ADD_TIME,PRODUCT_ORDER,PRODUCT_STATUS,PRODUCT_CATE2_NAME,PRODUCT_VOUCH,PRODUCT_QR,PRODUCT_OBJ.cover,PRODUCT_OBJ.star';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ PRODUCT_TITLE: ['like', search] },
				{ PRODUCT_CATE_NAME: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.PRODUCT_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.PRODUCT_STATUS = Number(sortVal);
					break;
				}
				case 'vouch': {
					where.and.PRODUCT_VOUCH = 1;
					break;
				}
				case 'top': {
					where.and.PRODUCT_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'PRODUCT_ADD_TIME');
					break;
				}

			}
		}

		let ret = await ProductModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		const CateService = require('../cate_service.js');
		let cateService = new CateService();
		ret.cateList = await cateService.getAllCateOptions();

		return ret;
	}

	/**修改资讯状态 */
	async statusProduct(id, status) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**置顶与排序设定 */
	async sortProduct(id, sort) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async vouchProduct(id, vouch) {
		this.AppError('[CMS]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}
}

module.exports = AdminProductService;