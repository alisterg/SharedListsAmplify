/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
      childItems {
        items {
          id
          title
          isComplete
          listID
          indexInList
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
      childItems {
        items {
          id
          title
          isComplete
          listID
          indexInList
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
      childItems {
        items {
          id
          title
          isComplete
          listID
          indexInList
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const createListItem = /* GraphQL */ `
  mutation CreateListItem(
    $input: CreateListItemInput!
    $condition: ModelListItemConditionInput
  ) {
    createListItem(input: $input, condition: $condition) {
      id
      title
      isComplete
      listID
      indexInList
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      parentList {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        childItems {
          nextToken
          startedAt
        }
      }
      owner
    }
  }
`;
export const updateListItem = /* GraphQL */ `
  mutation UpdateListItem(
    $input: UpdateListItemInput!
    $condition: ModelListItemConditionInput
  ) {
    updateListItem(input: $input, condition: $condition) {
      id
      title
      isComplete
      listID
      indexInList
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      parentList {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        childItems {
          nextToken
          startedAt
        }
      }
      owner
    }
  }
`;
export const deleteListItem = /* GraphQL */ `
  mutation DeleteListItem(
    $input: DeleteListItemInput!
    $condition: ModelListItemConditionInput
  ) {
    deleteListItem(input: $input, condition: $condition) {
      id
      title
      isComplete
      listID
      indexInList
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      parentList {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        childItems {
          nextToken
          startedAt
        }
      }
      owner
    }
  }
`;
