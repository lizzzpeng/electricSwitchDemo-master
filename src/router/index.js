// 该文件专门用于创建整个应用的路由器
import axios from 'axios'
import VueRouter from 'vue-router'
//引入组件
// import MainContain from '../components/MainContain'
// import DeviceRecord from '../pages/DeviceRecord'
// import DeviceStatus from '../pages/DeviceStatus'


//创建并暴露一个路由器



const router = new VueRouter({

	routes: [
		{
			path: '/LoginBegin',
			name: 'LoginBegin',
			meta:{isRouterAuth:true},
			component: () => import('../components/LoginBegin.vue')
		},
		{
			path: '/',
			name: 'PageContainer',
			meta:{isRouterAuth:true},
			component: () => import('../components/PageContainer'),
			children: [

				{
					name: 'MainContain',
					path: '/MainContain',
					meta:{isRouterAuth:true},
					component: () => import('../components/MainContain.vue'),
				},
				{
					name: "MainContain2",
					path: '/MainContain2',
					meta:{isRouterAuth:true},
					component: () => import('../components/MainContain2.vue'),
				}
			]

		},
		{
			path: '/InforError',
			name: 'InforError',
			meta:{isRouterAuth:true},
			component: () => import('../components/InforError.vue'),
		}
	]

}

)
router.beforeEach((to, from, next) => {
	console.log("这里是路由")
	if (to.path.startsWith('/LoginBegin')) {
		// 如果是开始
		window.localStorage.removeItem('access-admin')
		next()
	} else {
		let admin = JSON.parse(window.localStorage.getItem('access-admin'))
		// console.log(admin)
		if (!admin) {
			if (to.path == '/LoginBegin'){  //关键所在：如果要跳转的路径是/tip才放行
				next()
			}else{
				next({ path: '/LoginBegin'})
			}
		} else {
			//校验token合法性
			// console.log("查询接口")
			// console.log(admin)
			axios({
				url: 'http://localhost:8088/user/api/v1/checkToken',
				method: 'get',
				headers: {
					token: admin.data.token
				}
			}).then((response) => {
				if (response.data.data==false) {
					console.log('校验失败')
					if (to.path == '/InforError'){  //关键所在：如果要跳转的路径是/tip才放行
						next()
					}else{
						next({ path: '/InforError'})
					}
				}
			})
			next()
		}
	}
})
export default router