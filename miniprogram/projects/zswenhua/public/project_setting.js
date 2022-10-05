module.exports = { //zswenhua 文化馆
	PROJECT_COLOR: '#9F1709',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#9F1709',


	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'birth', title: '生日', type: 'date', must: true },
		{ mark: 'address', title: '住址', type: 'text', must: false },
	],

	NEWS_NAME: '资讯',
	NEWS_CATE: [
		{ id: 1, title: '公告通知', style: 'leftbig1' },
		{ id: 2, title: '本馆介绍', style: 'leftbig1' },
		{ id: 3, title: '非遗之窗', style: 'leftbig1' },
		{ id: 4, title: '培训风采', style: 'flow' },

	],
	NEWS_FIELDS: [
	],


	ENROLL_NAME: '报名',
	ENROLL_CATE: [ 
		{ id: 1, title: '青少年培训' },
		{ id: 2, title: '成人培训' },
		{ id: 3, title: '老年人培训' }, 
		{ id: 4, title: '文艺团队招募' },
	],
	ENROLL_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', len: 1, must: true }, 
		{ mark: 'desc', title: '简介', type: 'textarea', max: 300, must: true },
		{ mark: 'intro', title: '详细介绍', type: 'content', must: true },

	],
	ENROLL_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '姓名', must: true, max: 30, edit: false },
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true, edit: false },
		{ mark: 'birth', type: 'date', title: '出生日期', must: true, edit: true },
		{ mark: 'phone', type: 'mobile', title: '电话号码', must: true, edit: true },
		{ mark: 'address', type: 'textarea', title: '家庭住址', must: true },
	],

}