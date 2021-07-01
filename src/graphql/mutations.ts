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
      childItems {
        items {
          id
          title
          isComplete
          listID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
      childItems {
        items {
          id
          title
          isComplete
          listID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
      childItems {
        items {
          id
          title
          isComplete
          listID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
        childItems {
          nextToken
          startedAt
        }
      }
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
        childItems {
          nextToken
          startedAt
        }
      }
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
        childItems {
          nextToken
          startedAt
        }
      }
    }
  }
`;