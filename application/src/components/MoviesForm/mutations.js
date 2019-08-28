import { gql } from 'apollo-boost';

export const addMovieMutation = gql`
  mutation addMovie($name: String!, $genre: String!, $directorId: ID, $watched: Boolean!, $rate: Int) {
    addMovie(name: $name, genre: $genre, directorId: $directorId, watched: $watched, rate: $rate) {
      name
    }
  }
`;

export const updateMovieMutation = gql`
  mutation updateMovie($id: ID, $name: String!, $genre: String!, $directorId: ID, $watched: Boolean!, $rate: Int) {
    updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId, watched: $watched, rate: $rate) {
      name
    }
  }
`;
