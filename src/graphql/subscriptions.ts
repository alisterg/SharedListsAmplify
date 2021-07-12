/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($owner: String) {
    onCreateList(owner: $owner) {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($owner: String) {
    onUpdateList(owner: $owner) {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($owner: String) {
    onDeleteList(owner: $owner) {
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
export const onCreateListItem = /* GraphQL */ `
  subscription OnCreateListItem($owner: String) {
    onCreateListItem(owner: $owner) {
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
export const onUpdateListItem = /* GraphQL */ `
  subscription OnUpdateListItem($owner: String) {
    onUpdateListItem(owner: $owner) {
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
export const onDeleteListItem = /* GraphQL */ `
  subscription OnDeleteListItem($owner: String) {
    onDeleteListItem(owner: $owner) {
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
