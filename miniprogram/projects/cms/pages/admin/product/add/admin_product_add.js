const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../../helper/cache_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminProductBiz = require('../../../../biz/admin_product_biz.js');
const CateBiz = require('../../../../biz/cate_biz.js');
const projectSetting = require('../../../../public/project_setting.js');


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

		wx.setNavigationBarTitle({
			title: projectSetting.PRODUCT_NAME + '-添加',
		});

		this.setData(await AdminProductBiz.initFormData()); // 初始化表单数据

		let cateIdOptions = await CateBiz.getAllCateOptions();

		let cateIdCache = cacheHelper.get('ADMIN_PRODUCT_ADD_CATE_ID');
		let cateName = cacheHelper.get('ADMIN_PRODUCT_ADD_CATE_NAME');
		if (cateName && cateIdCache && Array.isArray(cateIdCache) && cateIdCache.length > 0)
			this.setData({
				cateName,
				formCateId: cateIdCache
			});

		this.setData({
			cateIdOptions,
			isLoad: true
		});

	},

	bindCateIdCmpt: function (e) {
		let formCateId = e.detail;
		this.setData({
			formCateId,
			cateName: CateBiz.getCateNameArr(this.data.cateIdOptions, e.detail)
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

		if (this.data.cateIdOptions.length == 0 ) return pageHelper.showModal('暂无分类，请先添加分类~!');

		let data = this.data;
		data = validate.check(data, AdminProductBiz.CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;
		data.cateName = this.data.cateName; 

		try {


			// 先创建，再上传 
			let result = await cloudHelper.callCloudSumbit('admin/product_insert', data);
			let productId = result.data.id;


			await cloudHelper.transFormsTempPics(forms, 'product/', productId, 'admin/product_update_forms');

			let callback = async function () {
				PublicBiz.removeCacheList('admin-product-list');
				PublicBiz.removeCacheList('product-list');
				cacheHelper.set('ADMIN_PRODUCT_ADD_CATE_ID', data.cateId, 86400);
				cacheHelper.set('ADMIN_PRODUCT_ADD_CATE_NAME', data.cateName, 86400);
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