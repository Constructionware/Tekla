import  { createRouter, createWebHistory } from 'vue-router'
import introPage from '../views/introPage.vue'

const routes = [
    {
        path: '/',
        id: 'p1',
        name: "home",
        component: introPage
    },
    {
        path: '/about',
        id: 'p2',
        name: "about",
        component: ()=> import('../views/about.vue')
        
    },
    {
        path: '/projects',
        id: 'p3',
        name: "projects",
        component: () => import('../views/projectManager.vue')
    },
    {
        path: '/project/:id',
        id: 'p31',
        name: "project",
        component: () => import('../views/projectView.vue'),
        props: true
    },
    {
        path: '/project_view/:id',
        id: 'p32',
        name: "projectView",
        component: () => import('../views/projectView.vue'),
        props: true
    },
    {
        path: '/workers',
        id: 'p4',
        name: "workers",
        component: () => import('../views/hrManager.vue')
    },
    {
        path: '/worker/:id',
        id: 'p41',
        name: "worker",
        component: () => import('../views/worker.vue'),
        props: true
    },
    {
        path: '/tasks',
        id: 'p5',
        name: "tasks",
        component: () => import('../views/taskManager.vue')
    },    
    {
        path: '/resources',
        id: 'p6',
        name: "resources",
        component: () => import('../views/resourceManager.vue')
    },
    
    {
        path: '/tools',
        id: 'p7',
        name: "tools",
        component: () => import('../views/toolManager.vue')
    },
    {
        path: '/supplier',
        id: 'p8',
        name: "supplier",
        component: () => import('../views/supplierManager.vue')
    },


];


const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})


export default router