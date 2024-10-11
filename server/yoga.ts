import { createYoga } from 'graphql-yoga'
import { buildSchema } from '@bicou/countries-server-schema'
import { version } from './package.json'

const schema = buildSchema(version)

// Create a Yoga instance with a GraphQL schema.
export const yoga = createYoga({
  schema,
  graphqlEndpoint: '/',
})
