import loadable from '@loadable/component';

const Home = loadable(() =>
    import(
        /* webpackChunkName: 'HomeController' */ '../src/controllers/HomeController'
    )
);

export const routes = [
    {
        path: '/',
        component: Home,
        // loadData: () => getSomeData()
    },
    // etc.
];
