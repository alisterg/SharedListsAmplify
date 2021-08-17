import React, { useEffect } from "react";
import { List, ListItem } from "../../../models";
import { DataStore } from "@aws-amplify/datastore";
import DropdownList from "./DropdownList";
import DropdownListItem from "./DropdownListItem";
import AddListSection from "./AddListSection";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddItemSection from "./AddItemSection";
import styles from "../styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectShowingComplete } from "../../../store/settings";
import {
  editItemAsync,
  editListAsync,
  fetchItemsAsync,
  fetchListsAsync,
  reorderItemAsync,
  selectItems,
  selectLists,
  toggleItemCompleteAsync,
} from "../../../store/items";
import { lightHaptic, mediumHaptic } from "../../../helpers/capacitorHelpers";

const ListViewContent: React.FC = () => {
  const lists = useSelector(selectLists);
  const sortedItems = useSelector(selectItems);
  const showingCompleteState = useSelector(selectShowingComplete);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListsAsync());
    dispatch(fetchItemsAsync());

    const listsSubscription = DataStore.observe(List).subscribe(() => {
      dispatch(fetchListsAsync());
    });

    const itemsSubscription = DataStore.observe(ListItem).subscribe(() => {
      dispatch(fetchItemsAsync());
    });

    return () => {
      listsSubscription.unsubscribe();
      itemsSubscription.unsubscribe();
    };
  }, []);

  const handleEditItem = async (item: ListItem, newTitle: string) => {
    dispatch(editItemAsync(item, newTitle));
  };

  const handleToggleItemComplete = async (item: ListItem) => {
    mediumHaptic();
    dispatch(toggleItemCompleteAsync(item));
  };

  const handleEditList = async (list: List, newTitle: string) => {
    dispatch(editListAsync(list, newTitle));
  };

  const handleDragStart = async () => {
    lightHaptic();
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const sourceListId = result.source.droppableId.replace("drop-", "");
    const destListId = result.destination.droppableId.replace("drop-", "");
    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;

    dispatch(reorderItemAsync(sourceIdx, destIdx, sourceListId, destListId));
  };

  /**
   * NOTE:
   * This fixes the issue where item renders in the wrong position while dragging
   * https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/reparenting.md
   */
  const getRenderItem =
    (listId: string) => (provided: any, snapshot: any, rubric: any) => {
      const itemsForList = sortedItems![listId];
      const item = itemsForList[rubric.source.index];

      return (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          className={snapshot.isDragging ? styles.dragging : ""}
        >
          <DropdownListItem
            key={item.id}
            item={item}
            onEditItem={() => null}
            onToggleItemComplete={() => null}
          />
        </div>
      );
    };

  const renderListChildren = (list: List) => {
    if (!sortedItems || !sortedItems[list.id]) return <></>;

    return sortedItems[list.id].map((item: ListItem, idx: number) => (
      <Draggable key={item.id} draggableId={"drag-" + item.id} index={idx}>
        {(providedItem) => (
          <div
            ref={providedItem.innerRef}
            {...providedItem.draggableProps}
            {...providedItem.dragHandleProps}
          >
            {!showingCompleteState && item.isComplete ? (
              <></>
            ) : (
              <DropdownListItem
                key={idx}
                item={item}
                onEditItem={(newTitle: string) =>
                  handleEditItem(item, newTitle)
                }
                onToggleItemComplete={() => handleToggleItemComplete(item)}
              />
            )}
          </div>
        )}
      </Draggable>
    ));
  };

  if (!lists || !sortedItems) return <div>TODO: Show empty state</div>;

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {lists.map((list: List) => (
        <Droppable
          droppableId={"drop-" + list.id}
          key={list.id}
          renderClone={getRenderItem(list.id)}
        >
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
