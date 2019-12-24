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

client.request(createQuery, createVariables)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
