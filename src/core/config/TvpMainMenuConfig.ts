export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "User & Roles",
    route: "/user",
    pages: [
      {
        sectionTitle: "User Accounts",
        route: "/account",
        keenthemesIcon: "profile-circle",
        bootstrapIcon: "bi-person",
        sub: [
          {
            heading: "Account List",
            route: "/user/account/list",
          },
          {
            heading: "Account Unlock",
            route: "/crafted/account/unlock",
          },
        ],
      },
      {
        sectionTitle: "Roles",
        route: "/role",
        keenthemesIcon: "profile-circle",
        bootstrapIcon: "bi-person",
        sub: [
          {
            heading: "Permission List",
            route: "/user/role/permissions",
          },
          {
            heading: "Application List",
            route: "/user/role/applications",
          },
          {
            heading: "Group List",
            route: "/user/role/groups",
          },
          {
            heading: "Role List",
            route: "/user/role/roles",
          },
          {
            heading: "User Role List",
            route: "/user/role/userroles",
          },
          {
            heading: "Branch List",
            route: "/user/role/branchs",
          },
        ],
      },
    ]
  }
];

export default MainMenuConfig;
