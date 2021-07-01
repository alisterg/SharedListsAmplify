import React, {useEffect} from "react";
import { List, ListItem } from "../models";
import CategoryItem from "./CategoryItem";
import {IonLoading} from "@ionic/react";

interface Props {
  // TODO:
  // either type this as any
  // or find a better way to do the whole data flow
  // because I probably shouldn't update ListListsQuery
  // in API.ts because it may be overwritten
  list: List;
}

const CategoryDropdown: React.FC<Props> = ({ list }) => {
  // const buttonClickHandler = async () => {
  //   await API.graphql(
  //     graphqlOperation(createListItem, {
  //       input: {
  //         title: "Testing 123",
  //         listID: "6ebf9f19-9499-4389-8d9c-c6161c881f4e",
  //       },
  //     })
  //   );
  // };
  
  useEffect(() => {
    console.log("LSIT :", list)
  }, [])
  if (!list) return <IonLoading isOpen={true} />;

  return (
    <div className="container">
      <strong>Hello world</strong>

      {list.childItems?.items.map((item: ListItem | null) => {
        return <CategoryItem item={item} />;
      })}
    </div>
  );
};

export default CategoryDropdown;
