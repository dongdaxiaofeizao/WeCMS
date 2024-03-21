/**
 * Notes: 资讯模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');
const AdminCateService = require('../../service/admin/admin_cate_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const Cate1Model = require('../../model/cate1_model.js');

class AdminCateController extends BaseProjectAdminController { 


	/************** 分类1 BEGIN ********************* */
	async vouchCate1() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			vouch: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		await service.vouchCate1(input.id, input.vouch);
	} 

	async sortCate1() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		await service.sortCate1(input.id, input.sort);
	} 

	async statusCate1() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		await service.statusCate1(input.id, input.status);

	}


	async delCate1() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let title = await Cate1Model.getOneField(input.id, 'CATE1_TITLE');

		let service = new AdminCateService();
		await service.delCate1(input.id);

		if (title)
			this.logOther('删除了分类《' + title + '》');

	}

	async getAdminCate1List() {
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

		let service = new AdminCateService();
		let result = await service.getAdminCate1List(input);

		// 数据格式化
		let list = result.list;
		for (let k in list) {

			list[k].CATE1_ADD_TIME = timeUtil.timestamp2Time(list[k].CATE1_ADD_TIME);

		}
		result.list = list;

		return result;
	}

	async insertCate1() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			title: 'must|string|name=名称',
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		let result = await service.insertCate1(input);

		this.logOther('添加了分类《' + input.title + '》');

		return result;
	}

	async editCate1() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id|name=id',
			title: 'must|string|name=名称',
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		let result = await service.editCate1(input);

		this.logOther('修改了分类《' + input.title + '》');

		return result;
	}

	async getCate1Detail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		return await service.getCate1Detail(input.id);

	}

	async updateCate1Forms() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		return await service.updateCate1Forms(input);
	}
	/************** 分类1 END ********************* */

	/************** 分类2 BEGIN ********************* */
	async sortCate2() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		await service.sortCate2(input.id, input.sort);
	} 

	async statusCate2() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		await service.statusCate2(input.id, input.status);

	}

	async delCate2() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);
		let service = new AdminCateService();
		await service.delCate2(input.id);

	}

	async getAdminCate2List() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			cate1Id: 'id|must',
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

		let service = new AdminCateService();
		let result = await service.getAdminCate2List(input);

		// 数据格式化
		let list = result.list;
		for (let k in list) {

			list[k].CATE2_ADD_TIME = timeUtil.timestamp2Time(list[k].CATE2_ADD_TIME);

		}
		result.list = list;

		return result;
	}

	async insertCate2() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			title: 'must|string|name=名称',
			cate1Id: 'must|id|name=父分类',
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		return await service.insertCate2(input);
	}

	async editCate2() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id|name=id',
			title: 'must|string|name=名称',
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		await service.editCate2(input);
	}

	async getCate2Detail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		return await service.getCate2Detail(input.id);

	}

	async updateCate2Forms() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminCateService();
		return await service.updateCate2Forms(input);
	}
	/************** 分类2 END ********************* */

}

module.exports = AdminCateController;