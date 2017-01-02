import {
  Component,
  Inject
} from 'anglue/anglue';

@Component({
  templateUrl: '/src/components/disclaimer/disclaimer.html'
})
export class DisclaimerComponent {
  @Inject() $cookies;

  activate() {
    if (this.$cookies.get('disclaimer-accepted') !== 'true') {
      this.showDisclaimer = true;
    }
  }

  acceptDisclaimer() {
    this.$cookies.put('disclaimer-accepted', 'true');
    this.showDisclaimer = false;
  }
}

