// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable
"use strict";
// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators we need for THIS app.
// Statics
require('./node_modules/rxjs//add/observable/throw');
// Operators
require('./node_modules/rxjs/add/operator/catch');
require('./node_modules/rxjs//add/operator/debounceTime');
require('./node_modules/rxjs//add/operator/distinctUntilChanged');
require('./node_modules/rxjs//add/operator/map');
require('./node_modules/rxjs//add/operator/switchMap');
require('./node_modules/rxjs//add/operator/toPromise');
//# sourceMappingURL=rxjs-operators.js.map