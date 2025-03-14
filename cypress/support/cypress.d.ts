

import './commands';
declare global {
   namespace Cypress {
     interface Chainable {
       clickElement(name: string): void;
     }
   }
 }
