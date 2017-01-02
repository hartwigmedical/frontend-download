import {
  Binding,
  Component
} from 'anglue/anglue';

@Component({
  templateUrl: '/src/components/runs-list/faq/faq.html'
})
export class FaqComponent {
  @Binding() showFaq;
}

