module.exports = { //CMS
	PROJECT_COLOR: '#0181FE',
	NAV_COLOR: '#000000',
	NAV_BG: '#ffffff',


	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
		{ title: '联系我们', key: 'SETUP_CONTENT_CONTACT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'trade', title: '行业领域', type: 'text', must: true },
		{ mark: 'city', title: '所在地区', type: 'text', must: false },
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=昵称',
		mobile: 'formMobile|must|mobile|name=手机',
		forms: 'formForms|array'
	},


	PRODUCT_NAME: '文章',
	PRODUCT_CATE: [
		{ id: 1, title: '文章', style: 'leftbig1' },

	],
	PRODUCT_FIELDS: [
		{ mark: 'star', title: '推荐星级', type: 'select', selectOptions: ['0', '1', '2', '3', '4', '5'], def: 0, must: true },
		{ mark: 'content', title: '详细内容', type: 'content', must: true },
		{ mark: 'cover', title: '封面图', type: 'image', min: 1, max: 1, must: true },
	],

	CATE_NAME: '分类',
	CATE1_FIELDS: [  // 一级分类
		{ mark: 'cover', title: '封面图', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'haslevel', title: '是否有二级分类', type: 'switch', must: true },
		{ mark: 'desc', title: '简介', max: 35, type: 'textarea', must: true },
	],

	CATE2_FIELDS: [ // 二级分类
	 
	],
 

	COMMENT_NAME: '评论',
	COMMENT_FIELDS: [
		{ mark: 'content', title: '评论内容', type: 'textarea', must: true },
		{ mark: 'img', title: '图片', type: 'image', min: 0, max: 8, must: false },

	],


}