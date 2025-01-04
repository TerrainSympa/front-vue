import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GQL_API
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })
  
//export default apolloClient;
//export default apolloProvider;


/*
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { split } from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'

// Apollo //
const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:4000',
})

/*
// Create the subscription websocket link
const wsLink = new WebSocketLink({
uri: 'ws://localhost:4000/subscriptions',
options: {
    reconnect: true,
},
})
// 

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
// split based on operation type
({ query }) => {
    const mainDef = getMainDefinition(query)
    return mainDef.kind === 'OperationDefinition' &&
    mainDef.operation === 'subscription'
},
httpLink, // wsLink
httpLink
)

// Create the apollo client
export const apolloClient = new ApolloClient({
link,
cache: new InMemoryCache(),
connectToDevTools: true,
})


// Create a provider
export const apolloProvider = createApolloProvider({
defaultClient: apolloClient,
})
*/