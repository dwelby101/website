
export class App {

    configureRouter(config, router) {

        config.title = 'Aurelia Router Test';

        config.map([
            {   route: ['','welcome'],
                name: 'welcome',
                moduleId: './welcome',
                nav: true,
                title:'Welcome'
            },
            {   route: ['chart'],
                name: 'chart',
                moduleId: './chart',
                nav: true,
                title:'Chart'
            }
        ]);

        this.router = router;
    }
}