const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const CateBiz = require('../../../biz/cate_biz.js')

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

		query: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		if (!pageHelper.getOptions(this, options, 'cate1')) return;

		if (options && options.title) {
			wx.setNavigationBarTitle({
				title: options.title,
			});
		}
	},

	_loadDetail: async function () {
		let cateList = await CateBiz.getAllCateOptions();

		let cate2List = [];
		// 提取二级分类

		for (let k = 0; k < cateList.length; k++) {
			if (cateList[k].level == 1 && cateList[k].val == this.data.cate1) {
				cate2List = cateList[k].children;
				break;
			}
		}

		this.setData({
			cate2List,
			isLoad: true
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		this._loadDetail();
	},

	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindSearchConfirm: function (e) {
		ProjectBiz.bindSearchConfirm(this);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
})