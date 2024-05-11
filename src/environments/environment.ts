// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// Values Inhouse [true, true], means inHouse + Huella

export const environment = {
  production: true,
  hmr: false,
  inHouse: [false, false],
  configFile: 'assets/settings.json',
  SSO: 'https://sso.coppel.io:50061/api',
  localSSO: 'http://localhost:3200',

  menuSorm: 'http://10.28.114.59/sorm_tester/menusorm/core/back-end/mcr/controltiendasytransito/formaciondearchivomaestro/',

  STATIC: {
    webbridge: 'http://localhost:20542/api/huella',
    hojaAzul: 'http://10.44.15.147/hojaazul/fotos/',
    redirect: 'http://developers.coppel.com/#/servicios/testlogin',
  },
  haveMenu: false,
  appLogo: 'assets/img/app-logo.png',
};
