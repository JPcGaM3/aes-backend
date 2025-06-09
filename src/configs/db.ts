import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL || ''
if (connectionString != '') console.log("Database is connected")
const sql = postgres(connectionString)

export default sql