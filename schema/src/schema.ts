import SchemaBuilder from '@pothos/core'
import { GraphQLSchema } from 'graphql'
import { countries, GeoCountry } from '@bicou/countries-server-data'

// build schema with pothos
const builder = new SchemaBuilder({})

// Country object reference
const Country = builder.objectRef<GeoCountry>('Country')

/**
 * Build graphql schema with pothos
 * @param version package version
 * @returns schema
 */
export function buildSchema(version: string): GraphQLSchema {
  builder.objectType(Country, {
    description: 'A country record',
    fields: t => ({
      code: t.exposeID('ISO', { nullable: false, description: 'ISO code' }),
      name: t.exposeString('Country', { nullable: false, description: 'Name of country' }),
      alpha3: t.exposeString('ISO3', { nullable: false, description: 'Alpha‑3 code' }),
      numeric: t.exposeString('ISO-Numeric', { nullable: false, description: 'Numeric' }),
      tld: t.exposeString('tld', { nullable: false, description: 'Top level domain' }),
      neighbours: t.field({
        type: [Country],
        nullable: false,
        description: 'Neighbours countries',
        resolve: (parent) => {
          return countries.filter(c => parent.neighbours.includes(c.ISO))
        },
      }),
    }),
  })

  builder.queryType({
    description: 'Queries',
    fields: t => ({
      version: t.string({
        nullable: false,
        description: 'Package version',
        resolve: () => version,
      }),
      countries: t.field({
        type: [Country],
        nullable: false,
        description: 'All countries',
        resolve: () => countries,
      }),
      country: t.field({
        type: Country,
        description: 'Country by code',
        nullable: true,
        args: {
          code: t.arg.id({
            required: true,
          }),
        },
        resolve: (_, { code }) => countries.find(c => c.ISO == code),
      }),
    }),
  })

  return builder.toSchema()
}
