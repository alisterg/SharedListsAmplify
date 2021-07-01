/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateList = /* GraphQL */ `
  subscription OnCreateList {
    onCreateList {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList {
    onUpdateList {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList {
    onDeleteList {
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
export const onCreateListItem = /* GraphQL */ `
  subscription OnCreateListItem {
    onCreateListItem {
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
export const onUpdateListItem = /* GraphQL */ `
  subscription OnUpdateListItem {
    onUpdateListItem {
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
export const onDeleteListItem = /* GraphQL */ `
  subscription OnDeleteListItem {
    onDeleteListItem {
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
