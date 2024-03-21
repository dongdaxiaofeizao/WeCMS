const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const CateBiz = require('../../../biz/cate_biz.js')

Page({

	data: {
		showSearch: true,
		isLoad: false,
		_params: null,

		sortMenus: [],
		sortItems: [],

		search: '',
	},

	/**
		* 生命周期函数--监听页面加载
		*/
	onLoad: function (options) {
		ProjectBiz.initPage(this);

		if (options && options.search) {
			// 单一搜索
			wx.setNavigationBarTitle({
				title: '搜索结果',
			});
			this.setData({
				search: options.search,
				isLoad: true,
			})

			return;
		}

		if (!pageHelper.getOptions(this, options, 'cateId')) return;

		if (options && options.cateId) {
			this.setData({
				_params: { cateId: options.cateId }
			});
		};

		if (options && options.title) {
			wx.setNavigationBarTitle({
				title: decodeURIComponent(options.title),
			});
		}

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

	_getSearchMenu: async function () {

		let cateList = await CateBiz.getAllCateOptions();
		let sortItem1 = [];

		sortItem1 = [{
			label: '全部',
			type: 'cateId',
			value: ''
		}];
		for (let k = 0; k < cateList.length; k++) {
			if (cateList[k].val === this.data.cateId && cateList[k].obj.haslevel) {
				for (let j = 0; j < cateList[k].children.length; j++) {
					sortItem1.push({
						label: cateList[k].children[j].label,
						type: 'cateId',
						value: cateList[k].children[j].val,
					})
				}
				break;
			}
		}


		let sortItems = [];
		let sortMenus = sortItem1.length == 1 ? [] : sortItem1;
		this.setData({
			sortItems,
			sortMenus,
			isLoad: true
		})

	}

})