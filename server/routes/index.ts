import { yoga } from '../yoga'

export default defineEventHandler(event => yoga.handle(event.node.req, event.node.res))
