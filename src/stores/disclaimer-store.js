import {
  Store
} from 'anglue/anglue';

@Store()
export class DisclaimerStore {
  showDisclaimer = false;
  
  activateDisclaimer() {
    this.showDisclaimer = true;
  }
  
  hideDisclaimer() {
    this.showDisclaimer = false;
  }
}

export default DisclaimerStore;
