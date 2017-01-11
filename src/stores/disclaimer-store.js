import {
  Store,
  Handler
} from 'anglue/anglue';

@Store()
export class DisclaimerStore {
  showDisclaimer = false;

  @Handler()
  onDisclaimerActivateDisclaimer() {
    this.showDisclaimer = true;
  }

  @Handler()
  onDisclaimerHideDisclaimer() {
    this.showDisclaimer = false;
  }
}

export default DisclaimerStore;
