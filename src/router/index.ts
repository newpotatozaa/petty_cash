import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        // component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "/csh_withdrawal_request_sea",
        name: "csh_withdrawal_request_sea",
        children: [
          {
            path: "index",
            name: "csh_withdrawal_request_sea/index",
            component: () => import("@/views/apps/petty_cash/csh_withdrawal_request_sea.vue"),
            meta: {
              pageTitle: "รายการขอเบิก",
              breadcrumbs: ["เมนูเงินสดย่อย"],
            },
          },
          {
            path: "add",
            name: "add",
            component: () => import("@/views/apps/petty_cash/csh_withdrawal_request_sea_add.vue"),
            meta: {
              pageTitle: "เพิ่มรายการเบิก",
              breadcrumbs: ["เมนูเงินสดย่อย"],
            },
          },
          {
            path: "update/:id",
            name: "update",
            component: () => import("@/views/apps/petty_cash/csh_withdrawal_request_update.vue"),
            meta: {
              pageTitle: "อัพเดทสถานะรับเงิน",
              breadcrumbs: ["เมนูเงินสดย่อย"],
            },
          },
          {
            path: "edit/:id",
            name: "edit",
            component: () => import("@/views/apps/petty_cash/csh_withdrawal_request_sea_edit.vue"),
            meta: {
              pageTitle: "แก้ไขรายการขอเบิก",
              breadcrumbs: ["เมนูเงินสดย่อย"],
            },
          },
        ],
      },
      {
        path: "/csh_rule_sea",
        name: "csh_rule_sea",
        // redirect: "/dashboard",
        
        children: [
          {
            path: "index",
            name: "csh_rule_sea/index",
            component: () => import("@/views/apps/petty_cash/csh_rule_sea.vue"),
            meta: {
              pageTitle: "ตั้งค่าสิทธิ์",
              breadcrumbs: ["สิทธิ์ผู้ใช้งาน"],
            },
          },
          {
            path: "csh_rule_add",
            name: "csh_rule_add",
            component: () => import("@/views/apps/petty_cash/csh_rule_add.vue"),
            meta: {
              pageTitle: "เพิ่มตั้งค่าสิทธิ์",
              breadcrumbs: ["สิทธิ์ผู้ใช้งาน"],
            },
          },
          {
            path: "csh_rule_edit/:id",
            name: "csh_rule_edit",
            component: () => import("@/views/apps/petty_cash/csh_rule_edit.vue"),
            meta: {             
              pageTitle: "แก้ไขตั้งค่าสิทธิ์",
              breadcrumbs: ["สิทธิ์ผู้ใช้งาน"],
            },
          },
        ],
      },
      {
        path: "/csh_user_sea",
        name: "csh_user_sea",
        // redirect: "/dashboard",
        // component: () => import("@/layouts/main-layout/MainLayout.vue"),
        // meta: {
        //   middleware: "auth",
        // },
        children: [
          {
            path: "index",
            name: "csh_user_sea/index",
            component: () => import("@/views/apps/petty_cash/csh_user_sea.vue"),
            meta: {
              pageTitle: "ผู้ใช้งาน",
              breadcrumbs: ["สิทธิ์ผู้ใช้งาน"],
            },
          },
          {
            path: "csh_user_add",
            name: "csh_user_add",
            component: () => import("@/views/apps/petty_cash/csh_user_add.vue"),
            meta: {
              pageTitle: "เพิ่มตั้งค่าสิทธิ์",
              breadcrumbs: ["สิทธิ์ผู้ใช้งาน"],
            },
          },
          {
            path: "csh_user_edit/:id",
            name: "csh_user_edit",
            component: () => import("@/views/apps/petty_cash/csh_user_edit.vue"),
            meta: {
              // pageTitle: "Account Edit",
              pageTitle: "แก้ไขผู้ใช้งาน",
              breadcrumbs: ["สิทธิ์ผู้ใช้งาน"],
            },
          },
          {
            path: "test",
            name: "test",
            component: () => import("@/views/apps/petty_cash/test.vue"),
            meta: {
              pageTitle: "Test pageTitle",
              breadcrumbs: ["Test breadcrumbs"],
            },
          }
          
        ],
      },
    ],
  },
  //AuthLayout
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/pages/account/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },
  //SystemLayout
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        path: "/notPermission",
        name: "notPermission",
        component: () => import("@/views/pages/auth/notPermission.vue"),
        meta: {
          pageTitle: "Not Permission",
        },
      },
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/pages/auth/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/pages/auth/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
    ],
  },
  // {
  //   path: "/crafted/pages/profile/overview",
  //   name: "overview",
  //   // redirect: "/dashboard",
  //   component: () => import("@/layouts/main-layout/MainLayout.vue"),
  //   meta: {
  //     middleware: "auth",
  //   },
  //   children: [
  //     {
  //       path: "/crafted/pages/profile/overview",
  //       name: "overview",
  //       component: () => import("@/views/crafted/pages/profile/Overview.vue"),
  //       meta: {
  //         pageTitle: "Profile",
  //         breadcrumbs: ["Overview"],
  //       },
  //     },
  //   ],
  // },
  
  
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
