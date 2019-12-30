import { GraphQLClient } from 'graphql-request';

console.log('hello');

const baseUrl = '/api/entry/';

const client = new GraphQLClient(baseUrl);

const createQuery = `
  mutation createEntry($text: String!) {
      entry: createEntry(text: $text) {
        id
      }
    }
`;

const createVariables = {
  text: 'This is a test',
};

const getQuery = `
  query entry($id: String!) {
    entry(id: $id) {
      id
      text
    }
  }
`;

const listQuery = `
  query($first: Int) {
    entries(first: $first) {
      edges {
        id
        text
      }
    }
  }
`

const updateQuery = `
  mutation updateEntry($id: String!, $text: String!) {
      entry: updateEntry(id: $id, text: $text) {
        id,
        text
      }
    }
`;

client.request(createQuery, createVariables)
  .then(response => {
    console.log(response);
    // const getVariables = {
    //   id: response.entry.id
    // };
    // return client.request(getQuery, getVariables)
    // const getVariables = {
    //   first: 10,
    // };
    // return client.request(listQuery, getVariables);
    const updateVariables = {
      id: response.entry.id,
      text: 'updated!'
    };
    return client.request(updateQuery, updateVariables);
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
