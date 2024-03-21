const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const helper = require('../../../../../../helper/helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../../biz/project_biz.js');
const CateBiz = require('../../../../biz/cate_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		curIdx: '',
		formItem: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		if (!AdminBiz.isAdmin(this)) return;

		this._loadDetail();
	},

	_loadDetail: async function (e) {
		let formItem = await ProjectBiz.getSetup('swiper');
		let cateList = await CateBiz.getAllCateOptions();

		this.setData({
			isLoad: true,
			cateList,
			formItem: formItem || []
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},

	model: function (e) {
		pageHelper.model(this, e);
	},

	bindCate1Tap: function (e) {
		this.setData({
			curCate1Id: pageHelper.dataset(e, 'id'),
			curCate1Title: pageHelper.dataset(e, 'title'),
			curCate1Cover: pageHelper.dataset(e, 'cover')
		});
	},

	bindCate2Tap: function (e) {
		let curCate1Id = this.data.curCate1Id;
		let curCate1Title = this.data.curCate1Title;
		let curCate1Cover = this.data.curCate1Cover;
		let curCate2Id = pageHelper.dataset(e, 'id');
		let curCate2Title = pageHelper.dataset(e, 'title');
		let curCate2Cover = pageHelper.dataset(e, 'cover');

		let formItem = this.data.formItem;
		formItem[this.data.curIdx].url = curCate2Id || curCate1Id;
		formItem[this.data.curIdx].desc = curCate2Title ? curCate1Title + '-' + curCate2Title : curCate1Title;
		formItem[this.data.curIdx].img = [curCate2Cover || curCate1Cover];
		this.setData({
			curCate1Id: '',
			curCate1Title: '',
			curCate1Cover: '',

			formItem,

		});
	},

	bindItemBlurUrl: function (e) {
		let idx = pageHelper.dataset(e, 'idx');
		let val = e.detail.value.trim();
		let formItem = this.data.formItem;
		formItem[idx].url = val;
	},

	bindItemBlurDesc: function (e) {
		let idx = pageHelper.dataset(e, 'idx');
		let val = e.detail.value.trim();
		let formItem = this.data.formItem;
		formItem[idx].desc = val;
	},

	bindRadioSelect: function (e) {
		let idx = pageHelper.dataset(e, 'idx');
		let val = e.detail.trim();
		let formItem = this.data.formItem;
		formItem[idx].type = val;
		this.setData({ formItem, curIdx: idx });
	},

	bindImgUploadCmpt: async function (e) {
		let idx = pageHelper.dataset(e, 'idx');
		let val = e.detail;
		let formItem = this.data.formItem;

		wx.showLoading({
			title: '上传中',
		});

		val = await cloudHelper.transTempPics(val, 'swiper', '', '');

		formItem[idx].img = val;
		wx.hideLoading();
	},


	bindDelItemTap: function (e) {
		let formItem = this.data.formItem;


		let callback = () => {
			let idx = pageHelper.dataset(e, 'idx');
			formItem.splice(idx, 1);
			this.setData({
				formItem
			});
		}

		pageHelper.showConfirm('确定删除该项吗？', callback);
	},

	bindAddItemTap: function (e) {
		let formItem = this.data.formItem || [];
		if (formItem.length >= 100) return pageHelper.showModal('最多可以添加100个');

		formItem.push({ desc: '', url: '', type: '文章', img: [] });
		this.setData({
			formItem
		});
	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this, true)) return;

		// 清除焦点
		let item = this.data.formItem;
		for (let k = 0; k < item.length; k++) {
			if (helper.isDefined(item[k].focus)) delete item[k].focus;
		}
		this.setData({
			formItem: item
		});


		for (let k = 0; k < item.length; k++) {
			if (item[k].type.length <= 0 || item[k].url.length <= 0 || item[k].desc.length <= 0 || item[k].img.length <= 0) {
				let mark = '';
				if (item[k].type.length <= 0) mark = '类型';
				else if (item[k].url.length <= 0) mark = '链接';
				else if (item[k].desc.length <= 0) mark = '备注';
				else if (item[k].img.length <= 0) mark = '图片';

				item[k].focus = '第' + (Number(k) + 1) + '项「「' + mark + '」不能为空';
				this.setData({ formItem: item });
				pageHelper.anchor('item_' + k, this);
				return pageHelper.showModal('第' + (Number(k) + 1) + '项「' + mark + '」不能为空');
			}

		}


		try {
			let params = {
				key: 'swiper',
				content: this.data.formItem
			}

			await cloudHelper.callCloudSumbit('admin/setup_set', params).then(res => {
				let cb = () => {
					wx.navigateBack()
				}
				pageHelper.showSuccToast('设置成功', 1500, cb);
			});


		} catch (err) {
			console.log(err);
		}

	},

})