import{a9 as d,J as r,aa as e,ab as a}from"./index.673a3d36.js";class i{static bodyStore;static configStore;static init(){this.bodyStore=d(),this.configStore=r(),i.emptyElementClassesAndAttributes(document.body),i.initLayoutSettings(),i.initToolbarSettings(),i.initWidthSettings(),i.initDefaultLayout(),i.initToolbar(),i.initSidebar(),i.initSidebarPanel(),i.initHeader(),i.initFooter()}static initLayoutSettings(){const o=e.get(a.value,"general.pageWidth"),t=e.get(a.value,"general.layout");this.bodyStore.addBodyAttribute({qualifiedName:"id",value:"kt_app_body"}),this.bodyStore.addBodyClassname("app-"+t),this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-layout",value:t}),t==="light-sidebar"&&(this.configStore.setLayoutConfigProperty("header.default.fixed.desktop",!1),this.configStore.setLayoutConfigProperty("header.default.fixed.mobile",!1)),(t==="light-sidebar"||t==="dark-sidebar")&&o==="default"&&(this.configStore.setLayoutConfigProperty("header.default.container","fluid"),this.configStore.setLayoutConfigProperty("toolbar.container","fluid"),this.configStore.setLayoutConfigProperty("content.container","fluid"),this.configStore.setLayoutConfigProperty("footer.container","fluid")),(t==="light-sidebar"||t==="dark-sidebar")&&this.configStore.setLayoutConfigProperty("sidebar.display",!0),(t==="light-header"||t==="dark-header")&&(this.configStore.setLayoutConfigProperty("sidebar.display",!1),o==="default"&&(this.configStore.setLayoutConfigProperty("header.default.container","fixed"),this.configStore.setLayoutConfigProperty("toolbar.container","fixed"),this.configStore.setLayoutConfigProperty("content.container","fixed"),this.configStore.setLayoutConfigProperty("footer.container","fixed")))}static initToolbarSettings(){e.get(a.value,"header.default.content")==="pageTitle"&&this.configStore.setLayoutConfigProperty("footer.container","fixed")}static initWidthSettings(){const o=e.get(a.value,"general.pageWidth");if(o!=="default"){const t=o==="fluid"?"fluid":"fixed";this.configStore.setLayoutConfigProperty("header.default.container",t),this.configStore.setLayoutConfigProperty("toolbar.container",t),this.configStore.setLayoutConfigProperty("content.container",t),this.configStore.setLayoutConfigProperty("footer.container",t)}}static initDefaultLayout(){e.get(a.value,"page.class")&&this.bodyStore.addClassname({position:"page",className:e.get(a.value,"page.class")}),e.get(a.value,"page.container")==="fixed"?this.bodyStore.addClassname({position:"page-container",className:"container-xxl"}):e.get(a.value,"page.container")==="fluid"&&this.bodyStore.addClassname({position:"page-container",className:"container-fluid"}),e.get(a.value,"page.containerClass")&&this.bodyStore.addClassname({position:"page-container",className:e.get(a.value,"page.containerClass")}),e.get(a.value,"wrapper.class")&&this.bodyStore.addClassname({position:"wrapper",className:e.get(a.value,"wrapper.class")}),e.get(a.value,"wrapper.container")==="fixed"?this.bodyStore.addClassname({position:"wrapper-container",className:"container-xxl"}):e.get(a.value,"wrapper.container")==="fluid"&&this.bodyStore.addClassname({position:"wrapper-container",className:"container-fluid"}),e.get(a.value,"wrapper.containerClass")&&this.bodyStore.addClassname({position:"wrapper-container",className:"container-fluid"})}static initToolbar(){this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-toolbar-enabled",value:"true"}),e.get(a.value,"toolbar.class")&&this.bodyStore.addClassname({position:"toolbar",className:e.get(a.value,"toolbar.class")}),e.get(a.value,"toolbar.container")==="fixed"?this.bodyStore.addClassname({position:"toolbar-container",className:"container-xxl"}):e.get(a.value,"toolbar.container")==="fluid"&&this.bodyStore.addClassname({position:"toolbar-container",className:"container-fluid"}),e.get(a.value,"toolbar.containerClass")&&this.bodyStore.addClassname({position:"toolbar-container",className:e.get(a.value,"toolbar.containerClass")}),e.get(a.value,"toolbar.fixed.desktop")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-toolbar-fixed",value:"true"}),e.get(a.value,"toolbar.fixed.mobile")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-toolbar-fixed-mobile",value:"true"})}static initSidebar(){!e.get(a.value,"sidebar.display")||(this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-enabled",value:"true"}),this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-fixed",value:"true"}),e.get(a.value,"sidebar.default.minimize.desktop.default")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-minimize",value:"on"}),e.get(a.value,"sidebar.default.minimize.desktop.hoverable")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-hoverable",value:"true"}),this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-push-header",value:"true"}),this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-push-toolbar",value:"true"}),this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-push-footer",value:"true"}),e.get(a.value,"sidebar.primary.minimize.desktop.enabled")&&(e.get(a.value,"sidebar.primary.minimize.desktop.default")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-primary-minimize",value:"on"}),e.get(a.value,"sidebar.primary.minimize.desktop.hoverable")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-primary-hoverable",value:"on"}),e.get(a.value,"sidebar.primary.minimize.mobile.enabled")&&(e.get(a.value,"sidebar.primary.minimize.desktop.default")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-primary-minimize-mobile",value:"on"}),e.get(a.value,"sidebar.primary.minimize.mobile.hoverable")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-primary-hoverable-mobile",value:"on"})),e.get(a.value,"sidebar.primary.collapse.desktop.enabled")&&e.get(a.value,"sidebar.primary.collapse.desktop.default")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-primary-collapse",value:"on"}),e.get(a.value,"sidebar.primary.collapse.mobile.enabled")&&e.get(a.value,"sidebar.primary.collapse.mobile.default")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-primary-collapse-mobile",value:"on"})))}static initSidebarPanel(){e.get(a.value,"sidebarPanel.class")&&this.bodyStore.addClassname({position:"sidebar-panel",className:e.get(a.value,"sidebarPanel.class")}),e.get(a.value,"sidebarPanel.fixed.desktop")?this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-panel-fixed",value:"true"}):this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-panel-fixed",value:"false"}),e.get(a.value,"sidebarPanel.minimize.desktop.enabled")&&(e.get(a.value,"sidebarPanel.minimize.desktop.default")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-panel-minimize",value:"on"}),e.get(a.value,"sidebarPanel.minimize.desktop.hoverable")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-panel-hoverable",value:"on"}),e.get(a.value,"sidebarPanel.minimize.mobile.enabled")&&e.get(a.value,"sidebarPanel.minimize.desktop.hoverable")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-sidebar-panel-hoverable",value:"on"}))}static initHeader(){!e.get(a.value,"header.display")||(e.get(a.value,"header.default.fixed.desktop")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-header-fixed",value:"true"}),e.get(a.value,"header.default.fixed.mobile")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-header-fixed-mobile",value:"true"}))}static initFooter(){e.get(a.value,"footer.fixed.desktop")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-footer-fixed",value:"true"}),e.get(a.value,"footer.fixed.mobile")&&this.bodyStore.addBodyAttribute({qualifiedName:"data-kt-app-footer-fixed-mobile",value:"true"})}static emptyElementClassesAndAttributes(o){o.className="";for(let t=o.attributes.length;t-- >0;)o.removeAttributeNode(o.attributes[t])}}const l=i;export{l as L};
