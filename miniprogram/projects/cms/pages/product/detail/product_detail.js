const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		canvasId: 'canvasId',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();

	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let product = await cloudHelper.callCloudData('product/view', params, opt);
		if (!product) {
			this.setData({
				isLoad: null
			})
			return;
		}

		this.setData({
			isLoad: true,
			product,
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	onPageScroll: function (e) {
		// 回页首按钮
		pageHelper.showTopBtn(e, this);

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		return {
			title: this.data.product.PRODUCT_TITLE,
			imageUrl: this.data.product.PRODUCT_OBJ.cover[0]
		}
	},

	bindLikeTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		try {

			let params = {
				id: this.data.id
			}
			let options = {
				title: this.data.product.like ? '取消中' : '点赞中'
			}
			await cloudHelper.callCloudSumbit('product/like', params, options).then(res => {
				let product = this.data.product;
				if (res.data === true) {
					product.like = true;
					product.PRODUCT_LIKE_CNT++;
					this.setData({ product });
					pageHelper.showSuccToast('点赞成功');
				}
				else {
					product.like = false;
					product.PRODUCT_LIKE_CNT--;
					if (product.PRODUCT_LIKE_CNT < 0) product.PRODUCT_LIKE_CNT = 0;
					this.setData({ product });
					pageHelper.showSuccToast('已取消');
				}

			});
		}
		catch (err) {
			console.error(err);
		}
	}

})