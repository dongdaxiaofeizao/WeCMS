/**
 * Notes: 文章模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminProductService = require('../../service/admin/admin_product_service.js');

const timeUtil = require('../../../../framework/utils/time_util.js');
const ProductModel = require('../../model/product_model.js');

class AdminProductController extends BaseProjectAdminController { 


	/** 置顶与排序设定 */
	async sortProduct() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminProductService();
		await service.sortProduct(input.id, input.sort);
	}

	async vouchProduct() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			vouch: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminProductService();
		await service.vouchProduct(input.id, input.vouch);
	} 

	/** 状态修改 */
	async statusProduct() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminProductService();
		await service.statusProduct(input.id, input.status);

	}

	/** 列表 */
	async getAdminProductList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminProductService();
		let result = await service.getAdminProductList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].PRODUCT_ADD_TIME = timeUtil.timestamp2Time(list[k].PRODUCT_ADD_TIME, 'Y-M-D h:m');
			list[k].PRODUCT_CATE_NAME = list[k].PRODUCT_CATE_NAME.join(' - '); 
		}
		result.list = list;

		return result;

	}



	/** 发布 */
	async insertProduct() {
		await this.isAdmin();

		// 数据校验 
		let rules = {
			title: 'must|string|min:2|max:50|name=标题',
			cateId: 'must|array|name=分类',
			cateName: 'must|array|name=分类',
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};


		// 取得数据
		let input = this.validateData(rules);


		let service = new AdminProductService();
		let result = await service.insertProduct(input);

		this.logOther('添加了文章《' + input.title + '》');

		return result;

	}


	/** 获取文章信息用于编辑修改 */
	async getProductDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);


		let service = new AdminProductService();
		return await service.getProductDetail(input.id);

	}

	/** 编辑文章 */
	async editProduct() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			title: 'must|string|min:2|max:50|name=标题',
			cateId: 'must|array|name=分类',
			cateName: 'must|array|name=分类',
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};

		// 取得数据
		let input = this.validateData(rules);


		let service = new AdminProductService();
		let result = service.editProduct(input);

		this.logOther('修改了文章《' + input.title + '》');

		return result;
	}

	/** 删除文章 */
	async delProduct() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let title = await ProductModel.getOneField(input.id, 'PRODUCT_TITLE');

		let service = new AdminProductService();
		await service.delProduct(input.id);

		if (title)
			this.logOther('删除了文章《' + title + '》');

	}


	/** 更新图片信息 */
	async updateProductForms() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);


		let service = new AdminProductService();
		return await service.updateProductForms(input);
	}

}

module.exports = AdminProductController;