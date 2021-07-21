import React, { useEffect, useState } from "react";
import { List, ListItem } from "../models";
import { DataStore } from "@aws-amplify/datastore";
import DropdownList from "./DropdownList";
import DropdownListItem from "./DropdownListItem";
import AddListSection from "./AddListSection";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const MainPageContent: React.FC = () => {
  const [lists, setLists] = useState<List[]>();
  const [items, setItems] = useState<ListItem[]>();

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
  };

  const filterItemsForList = (listId: string) =>
    items!.filter((i) => i.listID === listId);
  // await DataStore.query(ListItem, (c) => c.listID("eq", listId));

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return; // dropped outside the list
    }

    // TODO
    // const itemOrderClone = [...itemOrder];
    // const [removed] = itemOrderClone.splice(result.source.index, 1);
    // itemOrderClone.splice(result.destination.index, 0, removed);
    //
    // firebase.firestore().collection("items").doc("itemOrder").set({
    //   itemOrder: itemOrderClone,
    // });
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
                {filterItemsForList(list.id).map(
                  (item: ListItem, idx: number) => (
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
                  )
                )}
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
