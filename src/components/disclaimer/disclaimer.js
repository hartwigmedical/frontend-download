import {
  Component,
  Inject
} from 'anglue/anglue';

@Component({
  templateUrl: '/src/components/disclaimer/disclaimer.html'
})
export class DisclaimerComponent {
  @Inject() $cookies;
  @Inject() disclaimerStore;

  activate() {
    if (this.$cookies.get('disclaimer-accepted') !== 'true') {
      this.disclaimerStore.activateDisclaimer();
    }
  }

  acceptDisclaimer() {
    this.$cookies.put('disclaimer-accepted', 'true');
    this.disclaimerStore.hideDisclaimer();
  }
}

