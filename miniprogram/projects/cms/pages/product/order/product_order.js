const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const CateBiz = require('../../../biz/cate_biz.js')

Page({

	data: {
		showSearch: false,
		isLoad: false,

		sortMenus: [],
		sortItems: [],

	},

	/**
		* 生命周期函数--监听页面加载
		*/
	onLoad: function (options) {
		ProjectBiz.initPage(this);


		this._getSearchMenu();

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

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	_getSearchMenu: function () {

		let sortItem1 = [];

		sortItem1 = [
			{ label: '浏览数', type: 'sort', value: 'PRODUCT_VIEW_CNT|desc' },
			{ label: '评论数', type: 'sort', value: 'PRODUCT_COMMENT_CNT|desc' },
			{ label: '点赞数', type: 'sort', value: 'PRODUCT_LIKE_CNT|desc' },
			{ label: '收藏数', type: 'sort', value: 'PRODUCT_FAV_CNT|desc' },
		];


		let sortItems = [];
		let sortMenus = sortItem1;
		this.setData({
			sortItems,
			sortMenus,
			isLoad: true
		})

	}

})