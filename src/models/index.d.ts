import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class List {
  readonly id: string;
  readonly name: string;
  readonly childItems?: (ListItem | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<List>);
  static copyOf(source: List, mutator: (draft: MutableModel<List>) => MutableModel<List> | void): List;
}

export declare class ListItem {
  readonly id: string;
  readonly title: string;
  readonly isComplete?: boolean;
  readonly listID?: string;
  readonly parentList?: List;
  readonly indexInList?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ListItem>);
  static copyOf(source: ListItem, mutator: (draft: MutableModel<ListItem>) => MutableModel<ListItem> | void): ListItem;
}