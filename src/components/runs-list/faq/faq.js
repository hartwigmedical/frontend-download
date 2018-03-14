import {
  Component,
  Inject
} from 'anglue/anglue';

@Component({
  templateUrl: '/src/components/runs-list/faq/faq.html'
})
export class FaqComponent {
  @Inject('faqService') faqService;
}

