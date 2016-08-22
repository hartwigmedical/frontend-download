import {
  Store,
  EntityStore,
  SortableStore,
  FilterableStore,
  PaginatableStore
} from 'anglue/anglue';

@Store()
@EntityStore()
@SortableStore({
  initial: '-createTime'
})
@FilterableStore()
@PaginatableStore({
  initialLimit: 10
})
export class RunsStore {}

export default RunsStore;
