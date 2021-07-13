import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import('@/views/App_Guest.vue'),

    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'result',
        name: 'Result',
        component: () => import('@/views/Result.vue')
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: () => import('@/views/Portfolio.vue')
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('@/views/Blog.vue')
      },
      {
        path: 'blog/:id',
        name: 'Blog Detay',
        component: () => import('@/views/BlogDetail.vue')
      },
      {
        path: 'contact',
        name: 'İletişim',
        component: () => import('@/views/Contact.vue')
      },
    ]
  },

  {
    path: '/iamboss46',
    component: () => import('@/views/App_Admin.vue'),

    children: [
      {
        path: "",
        
        beforeEnter: () => {
          window.location.href = 'dashboard';
        }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/AdminTemplate/Dashboard.vue')

      },
      {
        path: 'portfolio-categories',
        name: 'Portfolyo Kategorileri',
        component: () => import('@/views/AdminTemplate/PortfolioCategories.vue')

      },
      {
        path: 'add-portfolio-category',
        name: 'Portfolyo Kategorisi Ekle',
        component: () => import('@/views/AdminTemplate/AddPortfolioCategory.vue')

      },
      {
        path: 'add-portfolio',
        name: 'Portfolyo Ekle',
        component: () => import('@/views/AdminTemplate/AddPortfolio.vue')

      },
      {
        path: 'portfolio-edit/:id',
        name: 'Portfolyo Düzenle',
        component: () => import('@/views/AdminTemplate/EditPortfolio.vue')

      },
      
      {
        path: 'portfolios',
        name: 'Portfolyolar',
        component: () => import('@/views/AdminTemplate/Portfolios.vue')

      },
      {
        path: 'post-categories',
        name: 'Post Kategorileri',
        component: () => import('@/views/AdminTemplate/PostCategories.vue')

      },
      {
        path: 'add-post-category',
        name: 'Post Kategorisi Ekle',
        component: () => import('@/views/AdminTemplate/AddPostCategory.vue')

      },
      {
        path: 'post-edit/:id',
        name: 'Post Düzenle',
        component: () => import('@/views/AdminTemplate/EditPost.vue')

      },
      {
        path: 'add-post',
        name: 'Post Ekle',
        component: () => import('@/views/AdminTemplate/AddPost.vue')

      },
      {
        path: 'tags',
        name: 'Taglar',
        component: () => import('@/views/AdminTemplate/Tags.vue')

      },
      {
        path: 'posts',
        name: 'Postlar',
        component: () => import('@/views/AdminTemplate/Posts.vue')

      },
      {
        path: 'comments',
        name: 'Yorumlar',
        component: () => import('@/views/AdminTemplate/Comments.vue')

      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
