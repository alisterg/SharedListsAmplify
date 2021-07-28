import React, { useEffect, useState } from "react";
import { List, ListItem } from "../models";
import { DataStore } from "@aws-amplify/datastore";
import DropdownList from "./DropdownList";
import DropdownListItem from "./DropdownListItem";
import AddListSection from "./AddListSection";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import cloneDeep from "lodash/cloneDeep";

type sortedItemsType = { [listId: string]: ListItem[] };

const MainPageContent: React.FC = () => {
  const [lists, setLists] = useState<List[]>();
  const [items, setItems] = useState<ListItem[]>();

  const [sortedItems, setSortedItems] = useState<sortedItemsType>();

  useEffect(() => {
    fetchLists();
    fetchItems();

    const listsSubscription = DataStore.observe(List).subscribe(() => {
      fetchLists();
    });

    const itemsSubscription = DataStore.observe(ListItem).subscribe(() => {
      fetchItems();
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
    setItems(itemsResult);
    setSortedItems(getSortedItems(itemsResult));
  };

  const getSortedItems = (allItems: ListItem[]): sortedItemsType => {
    let result: sortedItemsType = {};

    for (let i of allItems) {
      if (i.listID === undefined) continue;
      if (!result[i.listID]) result[i.listID] = [];

      const itemClone = cloneDeep(i);
      result[i.listID].push(itemClone);
    }

    for (let l in result) {
      result[l].sort((a, b) => (a.indexInList || 0) - (b.indexInList || 0));
    }

    return result;
  };

  const handleEditItem = async (item: ListItem, newTitle: string) => {
    await DataStore.save(
      ListItem.copyOf(item, (updated) => {
        updated.title = newTitle;
      })
    ); // Could play a saving animation here

    fetchItems();
  };

  const handleEditList = async (list: List, newTitle: string) => {
    await DataStore.save(
      List.copyOf(list, (updated) => {
        updated.name = newTitle;
      })
    ); // Could play a saving animation here

    fetchItems();
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) {
      return; // dropped outside the list
    }

    const itemDropping = items!.find(
      (i) => i.id === result.draggableId.replace("drag-", "")
    );

    console.log("saving to: ", result.destination.index);

    const destListId = result.destination.droppableId.replace("drop-", "");

    // reorder every item in list
    // const itemOrderClone = ;
    // const [removed] = itemOrderClone.splice(result.source.index, 1);
    // itemOrderClone.splice(result.destination.index, 0, removed);
    const itemsInList = cloneDeep(sortedItems![destListId]);
    // TODO: check whether the source and dest lists are the same
    // if so, only need to sort the current list
    // else, need to resort both lists
    // is there a more performant way to do it?

    await DataStore.save(
      ListItem.copyOf(itemDropping!, (updated) => {
        updated.listID = destListId || itemDropping!.listID;
        updated.indexInList = result.destination.index;
      })
    );
  };

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "blue" : "",
  });

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",
    boxShadow: isDragging ? "0px 0px 6px 2px rgba(156,156,156,1)" : "none",
    borderRadius: isDragging ? "5px" : "none",
    ...draggableStyle,
  });

  if (!lists || !items) return <div>TODO: Show empty state</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {lists.map((list) => (
        <Droppable droppableId={"drop-" + list.id} key={list.id}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <DropdownList
                list={list}
                onEditName={(newName: string) => handleEditList(list, newName)}
              >
                {sortedItems![list.id].map((item: ListItem, idx: number) => (
                  <Draggable
                    key={item.id}
                    draggableId={"drag-" + item.id}
                    index={idx}
                  >
                    {(providedItem, snapshotItem) => (
                      <div
                        ref={providedItem.innerRef}
                        {...providedItem.draggableProps}
                        {...providedItem.dragHandleProps}
                        style={getItemStyle(
                          snapshotItem.isDragging,
                          providedItem.draggableProps.style
                        )}
                      >
                        <DropdownListItem
                          key={idx}
                          item={item}
                          onEditItem={(newTitle: string) =>
                            handleEditItem(item, newTitle)
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DropdownList>
            </div>
          )}
        </Droppable>
      ))}
      <AddListSection />
    </DragDropContext>
  );
};

export default MainPageContent;
