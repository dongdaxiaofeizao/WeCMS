/**
 * Notes: 测试模块控制器
 * Date: 2021-03-15 19:20:00 
 */

const BaseController = require('../../controller/base_project_controller.js');
const fakerLib = require('../../../../framework/lib/faker_lib.js');
const dataUtil = require('../../../../framework/utils/data_util.js');

const UserModel = require('../../model/user_model.js');
const CommentModel = require('../../model/comment_model.js');
const ProductModel = require('../../model/product_model.js');
const CommentService = require('../../service/comment_service');

class TestController extends BaseController {

	async test() {
		console.log('TEST>>>>>>>');
		global.PID = 'cms';

		//this.mockUser();
		//this.mockComment()
		this.mockData()
	}

	async mockUser() {
		console.log('mockUser >>>>>>> Begin....');

		console.log('>>>>delete');
		let delCnt = await UserModel.del({});
		console.log('>>>>delete=' + delCnt);

		for (let k = 1; k <= 50; k++) {
			console.log('>>>>insert >' + k);

			let user = {};
			user.USER_MINI_OPENID = global.PID + '_' + k;
			user.USER_NAME = fakerLib.getName();
			user.USER_MOBILE = fakerLib.getMobile();
			await UserModel.insert(user);

		}

		console.log('mockUse <<<< END');
	}

	async mockComment() {
		console.log('mockComment >>>>>>> Begin....');
		let svr = new CommentService();

		let list = await ProductModel.getAll({});
		for (let k in list) {
			console.log(k)
			let node = list[k];

			let x = fakerLib.getIntBetween(1, 9);
			for (let j = 0; j < x; j++) {
				let data = {
					COMMENT_TYPE: 'product',
					COMMENT_OID: node._id,
					COMMENT_USER_ID: global.PID + '_' + fakerLib.getIntBetween(1, 48),
					COMMENT_OBJ: { content: fakerLib.getComment() }
				};
				await CommentModel.insert(data);
			}

			await svr.statComment(node._id);

		}

		console.log('mockComment >>>>>>> END');
	}

	async mockData() {
		console.log('mockData >>>>>>> Begin....');


		let list = await ProductModel.getAll({});
		for (let k in list) {
			console.log(k)
			let node = list[k];

			let data = {
				PRODUCT_VIEW_CNT: fakerLib.getIntBetween(1, 48),
				PRODUCT_FAV_CNT: fakerLib.getIntBetween(1, 48),
				PRODUCT_LIKE_CNT: fakerLib.getIntBetween(1, 48),
			}
			await ProductModel.edit(node._id, data);

		}

		console.log('mockData >>>>>>> END');
	}

}

module.exports = TestController;