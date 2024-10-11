import { createReadStream, createWriteStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { once } from 'node:events'
import { type GeoCountry } from './src/geo-country.js'

const source = createWriteStream('src/countries.ts', { flags: 'w' })
source.write('import { type GeoCountry } from "./geo-country.js";\n')
source.write('export { type GeoCountry } from "./geo-country.js";\n')
source.write('export const countries: GeoCountry[] = [\n')

const tsv = createInterface({
  input: createReadStream('countryInfo.txt'),
  crlfDelay: Number.POSITIVE_INFINITY,
})

tsv.on('line', (line) => {
  if (line.length > 0 && !line.startsWith('#')) {
    const data = line.split('\t')
    const country: GeoCountry = {
      'ISO': data[0],
      'ISO3': data[1],
      'ISO-Numeric': data[2],
      'Country': data[4],
      'tld': data[9],
      'neighbours': (data[17].length > 0 && data[17].split(',')) || [],
    }
    source.write('\t' + JSON.stringify(country) + ',\n')
  }
})

await once(tsv, 'close')

source.write('];\n')
source.end()
