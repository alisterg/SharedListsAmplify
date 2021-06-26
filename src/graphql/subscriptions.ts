/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateList = /* GraphQL */ `
  subscription OnCreateList {
    onCreateList {
      id
      name
      items {
        items {
          id
          title
          isComplete
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList {
    onUpdateList {
      id
      name
      items {
        items {
          id
          title
          isComplete
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList {
    onDeleteList {
      id
      name
      items {
        items {
          id
          title
          isComplete
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
      list {
        id
        name
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
      list {
        id
        name
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
      list {
        id
        name
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
