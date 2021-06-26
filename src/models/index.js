// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { List, ListItem } = initSchema(schema);

export {
  List,
  ListItem
};