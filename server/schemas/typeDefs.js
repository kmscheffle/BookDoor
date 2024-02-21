const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Book {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    books: [Book]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }



  type Auth {
    token: ID
    user: User
  }

  input BookInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    books(category: ID, name: String): [Book]
    book(_id: ID!): Book
    user: User
    order(_id: ID!): Order
    checkout(books: [BookInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addBook(books: [ID]!): Book
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateBook(_id: ID!, quantity: Int!): Book
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
