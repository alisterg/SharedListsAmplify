import { ListItem } from "./index";

export class AllListsResponse {
  id?: string;
  name?: string;
  childItems?: AllListsResponseChildItems;
  createdAt?: string;
  updatedAt?: string;
}

export class AllListsResponseChildItems {
  items: (ListItem | null)[] = [];
}
