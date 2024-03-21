const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const helper = require('../../../../../../helper/helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../../biz/project_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
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
		let formItem = await ProjectBiz.getSetup('param');
		this.setData({
			isLoad: true,
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

	bindItemBlurName: function (e) {
		let idx = pageHelper.dataset(e, 'idx');
		let val = e.detail.value.trim();
		let formItem = this.data.formItem;
		formItem[idx].name = val;
	},

	switchModel: function (e) {
		let idx = pageHelper.dataset(e, 'idx');
		let val = e.detail.value;
		let formItem = this.data.formItem;
		formItem[idx].must = val;
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

		formItem.push({ name: '', must: true });
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
			if (item[k].name.length <= 0) {
				let mark = '';
				if (item[k].name.length <= 0) mark = '字段名称';

				item[k].focus = '第' + (Number(k) + 1) + '项「「' + mark + '」不能为空';
				this.setData({ formItem: item });
				pageHelper.anchor('item_' + k, this);
				return pageHelper.showModal('第' + (Number(k) + 1) + '项「' + mark + '」不能为空');
			}

		}


		try {
			let params = {
				key: 'param',
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