import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/drag', component: '@/pages/drag' },
    { path: '/dragSource', component: '@/pages/dragSource' },
    { path: '/payroll', component: '@/pages/payroll' },
    { path: '/demo', component: '@/pages/demo' },
    { path: '/demoVersion1', component: '@/pages/demoVersion1' },
    { path: '/demoVersion2', component: '@/pages/demoVersion2' },
  ],
});
