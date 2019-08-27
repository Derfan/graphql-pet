const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLSchema } = graphql;

const Movie = require('../models/movie');
const Director = require('../models/director');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    director: {
      type: DirectorType,
      resolve: (parent, args) => Director.findById(parent.directorId)
    }
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => Movie.find({ directorId: parent.id })
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: (parent, { name, age }) => {
        const director = new Director({ name, age });

        return director.save();
      }
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, { id, ...params }) => Director.findByIdAndUpdate(
        id,
        { $set: params },
        { new: true }
      )
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, { id }) => Director.findByIdAndRemove(id)
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve: (parent, { name, genre, directorId }) => {
        const movie = new Movie({ name, genre, directorId });

        return movie.save();
      }
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve: (parent, { id, ...params }) => Movie.findByIdAndUpdate(
        id,
        { $set: params },
        { new: true }
      )
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, { id }) => Movie.findByIdAndRemove(id)
    },
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Movie.findById(args.id)
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Director.findById(args.id)
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => Movie.find({})
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve: (parent, args) => Director.find({})
    }
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
