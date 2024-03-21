const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminCateBiz = require('../../../../biz/admin_cate_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options, 'cate1Id')) return;

		this.setData(await AdminCateBiz.initCate2FormData()); // 初始化表单数据
		this.setData({
			isLoad: true
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

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

	model: function (e) {
		pageHelper.model(this, e);
	},


	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;
		data = validate.check(data, AdminCateBiz.CATE2_CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;
		data.cate1Id = this.data.cate1Id;

		try {


			// 先创建，再上传 
			let result = await cloudHelper.callCloudSumbit('admin/cate2_insert', data);
			let cate2Id = result.data.id;


			await cloudHelper.transFormsTempPics(forms, 'cate2/', cate2Id, 'admin/cate2_update_forms');

			let callback = async function () {
				PublicBiz.removeCacheList('admin-cate2-list');
				PublicBiz.removeCacheList('cate2-list');
				wx.navigateBack();

			}
			pageHelper.showSuccToast('添加成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},


	url: function (e) {
		pageHelper.url(e, this);
	}
})