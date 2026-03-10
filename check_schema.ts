import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("No DATABASE_URL found.");
  process.exit(1);
}

const sql = postgres(connectionString, { max: 1 });

async function checkSchema() {
  console.log('Fetching schema for businesses table...');
  const cols = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'businesses';
  `;
  console.log(cols);
  process.exit(0);
}

checkSchema().catch(err => {
  console.error(err);
  process.exit(1);
});
