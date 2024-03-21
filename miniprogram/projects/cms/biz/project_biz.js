/**
 * Notes: 项目通用业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-05-22 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const projectSetting = require('../public/project_setting.js');
const PubilcBiz = require('../../../comm/biz/public_biz.js');
const cloudHelper = require('../../../helper/cloud_helper.js');
const SearchBiz = require('../../../comm/biz/search_biz.js');

class ProjectBiz extends BaseBiz {

	/**
	 * 页面初始化    
	 * @param {*} that  
	 */
	static initPage(that, { isSetNavColor = true } = {}) {

		let skin = {};
		skin.NAV_BG = projectSetting.NAV_BG;
		skin.NAV_COLOR = projectSetting.NAV_COLOR;
		skin.PROJECT_COLOR = projectSetting.PROJECT_COLOR;

		PubilcBiz.initPageBase(that, { skin, isSetNavColor });
	}

	static bindSearchConfirm(that) {
		let query = that.data.query.trim();
		if (!query) return wx.showToast({
			icon: 'none',
			title: '请输入搜索关键字',
		});
		SearchBiz.addHistory('SERACH_HIS_product-list', query);
		wx.navigateTo({
			url: '../../product/index/product_index?search=' + query,
		})
	}

	static async getSetup(key, hint = 'bar') {
		let params = {
			key
		}

		let opts = {
			title: hint
		}

		let ret = await cloudHelper.callCloudData('home/setup_get', params, opts);
		return ret;
	}

}

module.exports = ProjectBiz;