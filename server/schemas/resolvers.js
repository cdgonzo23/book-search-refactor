const { GraphQLError } = require('graphql');
const { User } = require('../models')
const { signToken, AuthenticationError } = require ('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user_id });
            }
            throw AuthenticationError;
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user }
        },
        saveBook: async (parent, { userId, bookData }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId},
                    { $addToSet: { savedBooks: bookData } },
                    { 
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },
        deleteBook: async (parent, { bookData }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookData } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;