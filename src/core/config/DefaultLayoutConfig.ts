import type LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

const config: LayoutConfigTypes = {
  "general": {
    "mode": "light",
    "primaryColor": "#50CD89",
    "pageWidth": "default",
    "layout": "light-sidebar",
    "iconsType": "solid"
  },
  "header": {
    "display": true,
    "default": {
      "container": "fluid",
      "fixed": {
        "desktop": false,
        "mobile": false
      },
      "menu": {
        "display": true,
        "iconType": "keenthemes"
      }
    }
  },
  "sidebar": {
    "display": true,
    "default": {
      "minimize": {
        "desktop": {
          "enabled": true,
          "default": false,
          "hoverable": true
        }
      },
      "menu": {
        "iconType": "keenthemes"
      }
    }
  },
  "toolbar": {
    "display": true,
    "container": "fluid",
    "fixed": {
      "desktop": false,
      "mobile": false
    }
  },
  "pageTitle": {
    "display": true,
    "breadcrumb": true,
    "direction": "column"
  },
  "content": {
    "container": "fluid"
  },
  "footer": {
    "display": true,
    "container": "fluid",
    "fixed": {
      "desktop": false,
      "mobile": false
    }
  },
  "illustrations": {
    "set": "sketchy-1"
  },
  "scrolltop": {
    "display": true
  }
};

export default config;
