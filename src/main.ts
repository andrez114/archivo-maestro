import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrModule } from '@angularclass/hmr';

if (environment.production) {
  enableProdMode();
}

// //const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

function bootstrap() {
  return platformBrowserDynamic().bootstrapModule(AppModule, { preserveWhitespaces: true });
}

if (environment.hmr) {
  if (module['hot']) {
    bootstrap()
      .then((ngModuleRef) => {
        return hmrModule(ngModuleRef, module);
      })
      .catch((err) => console.warn(err));
  } else {
    console.warn('HMR is not enabled for webpack-dev-server!');
    console.warn('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}
