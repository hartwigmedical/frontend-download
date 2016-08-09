import {
  Store,
  EntityStore,
  SortableStore,
  FilterableStore,
  PaginatableStore
} from 'anglue/anglue';

@Store()
@EntityStore()
@SortableStore()
@FilterableStore()
@PaginatableStore({
  initialLimit: 10
})
export class RunsStore {}

export default RunsStore;
