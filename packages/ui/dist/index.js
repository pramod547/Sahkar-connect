"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  colors: () => colors
});
module.exports = __toCommonJS(src_exports);

// src/colors.ts
var colors = {
  coopForestGreen: "#1B5E4B",
  coopSageGreen: "#7BA68D",
  coopTerracotta: "#C67B4C",
  coopWarmSand: "#F5ECD7",
  coopCreamWhite: "#FEFAF3",
  coopWarmAmber: "#D4A843",
  coopDeepCharcoal: "#2B2B2B",
  coopMutedGray: "#8A8A8A",
  // Backward compatibility alias keys
  coopTeal900: "#1B5E4B",
  coopTeal600: "#7BA68D",
  coopSaffron500: "#C67B4C",
  coopCream50: "#FEFAF3",
  coopCharcoal800: "#2B2B2B",
  coopSuccess600: "#1B5E4B",
  coopWarning500: "#C67B4C",
  coopDanger600: "#C0392B"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  colors
});
