import React, { useEffect, useState } from "react";
import { List, ListItem } from "../../models";
import { DataStore } from "@aws-amplify/datastore";
import DropdownList from "./DropdownList";
import DropdownListItem from "./DropdownListItem";
import AddListSection from "./AddListSection";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import cloneDeep from "lodash/cloneDeep";
import AddItemSection from "./AddItemSection";
import styles from "../styles.module.css";

type sortedItemsType = { [listId: string]: ListItem[] };

const ListViewContent: React.FC = () => {
  const [lists, setLists] = useState<List[]>();
  const [sortedItems, setSortedItems] = useState<sortedItemsType>();

  useEffect(() => {
    fetchLists().then();
    fetchItems().then();

    const listsSubscription = DataStore.observe(List).subscribe(() => {
      fetchLists().then();
    });

    const itemsSubscription = DataStore.observe(ListItem).subscribe(() => {
      fetchItems().then();
    });

    return () => {
      listsSubscription.unsubscribe();
      itemsSubscription.unsubscribe();
    };
  }, []);

  const fetchLists = async () => {
    const listsResult = await DataStore.query(List);
    setLists(listsResult);
  };

  const fetchItems = async () => {
    const itemsResult = await DataStore.query(ListItem);

    let sortedItems: sortedItemsType = {};

    for (let i of itemsResult) {
      if (i.listID === undefined) continue;
      if (!sortedItems[i.listID]) sortedItems[i.listID] = [];

      const itemClone = cloneDeep(i);
      sortedItems[i.listID].push(itemClone);
    }

    for (let l in sortedItems) {
      sortedItems[l].sort(
        (a, b) => (a.indexInList || 0) - (b.indexInList || 0)
      );
    }

    setSortedItems(sortedItems);
  };

  const handleEditItem = async (item: ListItem, newTitle: string) => {
    await DataStore.save(
      ListItem.copyOf(item, (updated) => {
        updated.title = newTitle;
      })
    ); // Could play a saving animation here

    await fetchItems();
  };

  const handleEditList = async (list: List, newTitle: string) => {
    await DataStore.save(
      List.copyOf(list, (updated) => {
        updated.name = newTitle;
      })
    ); // Could play a saving animation here

    await fetchItems();
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const saveReorderedItems = (itemsInList: ListItem[], listId: string) => {
      itemsInList.forEach((i, idx) => {
        DataStore.save(
          ListItem.copyOf(i, (updated) => {
            updated.listID = listId;
            updated.indexInList = idx;
          })
        );
      });
    };

    const sourceListId = result.source.droppableId.replace("drop-", "");
    const destListId = result.destination.droppableId.replace("drop-", "");

    if (sourceListId === destListId) {
      const itemsInList = cloneDeep(sortedItems![destListId]);

      const [removed] = itemsInList.splice(result.source.index, 1);
      itemsInList.splice(result.destination.index, 0, removed);

      saveReorderedItems(itemsInList, destListId);
    } else {
      const itemsInSourceList = cloneDeep(sortedItems![sourceListId]);
      let itemsInDestList = cloneDeep(sortedItems![destListId]);

      if (!itemsInDestList) itemsInDestList = [];

      const [removed] = itemsInSourceList.splice(result.source.index, 1);
      itemsInDestList.splice(result.destination.index, 0, removed);

      saveReorderedItems(itemsInSourceList, sourceListId);
      saveReorderedItems(itemsInDestList, destListId);
    }
  };

  const renderListChildren = (list: List) => {
    if (!sortedItems || !sortedItems[list.id]) return <></>;

    return sortedItems[list.id].map((item: ListItem, idx: number) => (
      <Draggable key={item.id} draggableId={"drag-" + item.id} index={idx}>
        {(providedItem, snapshotItem) => (
          <div
            ref={providedItem.innerRef}
            {...providedItem.draggableProps}
            {...providedItem.dragHandleProps}
            style={providedItem.draggableProps.style}
            className={`${styles.item} ${
              snapshotItem.isDragging ? styles.dragging : ""
            }`}
          >
            <DropdownListItem
              key={idx}
              item={item}
              onEditItem={(newTitle: string) => handleEditItem(item, newTitle)}
            />
          </div>
        )}
      </Draggable>
    ));
  };

  if (!lists || !sortedItems) return <div>TODO: Show empty state</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {lists.map((list) => (
        <Droppable droppableId={"drop-" + list.id} key={list.id}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <DropdownList
                list={list}
                isDraggingOver={snapshot.isDraggingOver}
                onEditName={(newName: string) => handleEditList(list, newName)}
              >
                {renderListChildren(list)}
                {provided.placeholder}

                <AddItemSection
                  list={list}
                  itemCount={
                    sortedItems.hasOwnProperty(list.id)
                      ? sortedItems[list.id].length
                      : 0
                  }
                />
              </DropdownList>
            </div>
          )}
        </Droppable>
      ))}
      <AddListSection />
    </DragDropContext>
  );
};

export default ListViewContent;
