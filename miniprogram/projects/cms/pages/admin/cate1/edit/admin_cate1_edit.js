const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const dataHelper = require('../../../../../../helper/data_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminCateBiz = require('../../../../biz/admin_cate_biz.js');
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isEdit: true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();
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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	model: function (e) {
		pageHelper.model(this, e);
	},

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let id = this.data.id;
		if (!id) return;

		if (!this.data.isLoad) this.setData(await AdminCateBiz.initCate1FormData(id)); // 初始化表单数据

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let cate1 = await cloudHelper.callCloudData('admin/cate1_detail', params, opt);
		if (!cate1) {
			this.setData({
				isLoad: null
			})
			return;
		};

		this.setData({
			isLoad: true,


			// 表单数据    
			formOrder: cate1.CATE1_ORDER,

			formTitle: cate1.CATE1_TITLE,
			formForms: cate1.CATE1_FORMS,

		}, () => {


		});
	},


	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		// 数据校验
		let data = this.data;

		data = validate.check(data, AdminCateBiz.CATE1_CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		try {
			let cate1Id = this.data.id;
			data.id = cate1Id;

			// 先修改，再上传 
			await cloudHelper.callCloudSumbit('admin/cate1_edit', data);

			await cloudHelper.transFormsTempPics(forms, 'cate1/', cate1Id, 'admin/cate1_update_forms');

			let callback = async () => {

				// 更新列表页面数据
				let node = {
					'CATE1_TITLE': data.title,
					'CATE1_ORDER': data.order,
					'CATE1_OBJ': {
						'haslevel': dataHelper.getDataByKey(data.forms, 'mark', 'haslevel').val, 
					}
				}
				pageHelper.modifyPrevPageListNodeObject(cate1Id, node);

				wx.navigateBack();

			}
			pageHelper.showSuccToast('修改成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},

	url: function (e) {
		pageHelper.url(e, this);
	}

})