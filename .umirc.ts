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
    { path: '/sortable', component: '@/pages/sortable' },
    { path: '/simpleSortable', component: '@/pages/simpleSortable' },
    { path: '/v1', component: '@/pages/v1' },
  ],
});
