
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const CateBiz = require('../../../biz/cate_biz.js')


Page({
	data: {
		isLoad: false,

		query: ''
	},

	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		this._loadDetail();

	},

	_loadDetail: async function (e) {
		let cateList = await CateBiz.getAllCateOptions(); 
		this.setData({
			isLoad: true,
			cateList
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
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