// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The listNotification of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: 'AIzaSyCdZCDM62DHR9Wxk-C-HTAgYgHh3eAGB9E',
    authDomain: 'notification-a799c.firebaseapp.com',
    databaseURL: 'https://notification-a799c-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'notification-a799c',
    storageBucket: 'notification-a799c.appspot.com',
    messagingSenderId: '1034475190969',
    appId: '1:1034475190969:web:c0ca027d17e2a240a3b968',
    measurementId: 'G-FGKRX2J4PS'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
