/**
 * Notes: 内容检测控制器
 * Date: 2021-03-15 19:20:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */
const  CateService = require('../service/cate_service.js');
const BaseProjectController = require('./base_project_controller.js');

class CateController extends BaseProjectController {
	async getAllCateOptions() { 
		let service = new CateService();
		return await service.getAllCateOptions();

	}

}

module.exports = CateController;