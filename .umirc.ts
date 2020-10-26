import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/chessboard', component: '@/pages/chessboard' },
    { path: '/nestCard', component: '@/pages/nestCard' },
    { path: '/demo', component: '@/pages/demo' },
    { path: '/dragNotInside', component: '@/pages/dragNotInside' },
  ],
});
