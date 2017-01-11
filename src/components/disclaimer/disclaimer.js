import {
  Component,
  Inject
} from 'anglue/anglue';

@Component({
  templateUrl: '/src/components/disclaimer/disclaimer.html'
})
export class DisclaimerComponent {
  @Inject() $cookies;
  @Inject() disclaimerActions;
  @Inject() disclaimerStore;

  activate() {
    if (this.$cookies.get('disclaimer-accepted') !== 'true') {
      this.disclaimerActions.activateDisclaimer();
    }
  }

  acceptDisclaimer() {
    this.$cookies.put('disclaimer-accepted', 'true');
    this.disclaimerActions.hideDisclaimer();
  }
}

