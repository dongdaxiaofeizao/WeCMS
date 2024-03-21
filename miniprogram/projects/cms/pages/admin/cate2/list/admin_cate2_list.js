const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		search: '',
		cate1Id: '',

		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		if (!options || !options.id) return;

		this.setData({
			cate1Id: options.id,
			_params: { cate1Id: options.id },
			isLoad: true,
		});

		if (options && options.title) {
			wx.setNavigationBarTitle({
				title: options.title + '-二级分类管理',
			});
			this.setData({ title: options.title });
		}

		this._getSearchMenu();

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

	myCommListListener: function (e) {
		pageHelper.commListListener(this, e);
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

	_setStatus: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');
		let status = pageHelper.dataset(e, 'status');
		let params = {
			id,
			status
		}

		try {
			await cloudHelper.callCloudSumbit('admin/cate2_status', params).then(res => {
				pageHelper.modifyListNode(id, this.data.dataList.list, 'CATE2_STATUS', status, '_id');
				this.setData({
					dataList: this.data.dataList
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (e) {
			console.log(e);
		}
	},

	bindStatusMoreTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let itemList = ['启用', '停用 (不可见)', '删除'];
		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: { //启用
						e.currentTarget.dataset['status'] = 1;
						await this._setStatus(e);
						break;
					}
					case 1: { //停止 
						e.currentTarget.dataset['status'] = 0;
						await this._setStatus(e);
						break;
					}
					case 2: { //删除
						await this._del(e);
						break;
					}

				}


			},
			fail: function (res) { }
		})
	},

	_del: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;

		let id = e.currentTarget.dataset.id;
		if (!id) return;

		let params = {
			id,
		}

		let callback = async () => {
			try {
				await cloudHelper.callCloudSumbit('admin/cate2_del', params).then(res => {
					pageHelper.delListNode(id, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});

			} catch (e) {
				console.log(e);
			}
		}

		pageHelper.showConfirm('确认删除？删除不可恢复', callback);
	},

	bindMoreTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let idx = pageHelper.dataset(e, 'idx');

		let order = this.data.dataList.list[idx].CATE2_ORDER;
		let orderDesc = (order == 0) ? '取消置顶' : '置顶';


		let itemList = [orderDesc];

		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: { //置顶 
						let sort = (order == 0) ? 9999 : 0;
						e.currentTarget.dataset['sort'] = sort;
						await this._setSort(e);
						break;
					}
				}


			},
			fail: function (res) { }
		})
	},

	_setSort: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = e.currentTarget.dataset.id;
		let sort = e.currentTarget.dataset.sort;
		if (!id) return;

		let params = {
			id,
			sort
		}

		try {
			await cloudHelper.callCloudSumbit('admin/cate2_sort', params).then(res => {
				pageHelper.modifyListNode(id, this.data.dataList.list, 'CATE2_ORDER', sort);
				this.setData({
					dataList: this.data.dataList
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (e) {
			console.log(e);
		}
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {

		wx.stopPullDownRefresh();
	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	_getSearchMenu: async function () {

		let sortItems = [];
		let sortMenus = [{
			label: '全部',
			type: '',
			value: ''
		}, {
			label: '启用',
			type: 'status',
			value: 1
		},
		{
			label: '停用',
			type: 'status',
			value: 0
		},

		]
		this.setData({
			sortItems,
			sortMenus
		})


	}
})