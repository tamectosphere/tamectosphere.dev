/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  tailwind: true,
  postcss: true,
  serverDependenciesToBundle: [
    'swiper',
    'swiper/react',
    'swiper/react/swiper-react.js',
    'ssr-window',
    'ssr-window/ssr-window.esm.js',
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
