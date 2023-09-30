import { pool } from "./database.js";
import "./dotenv.js";
import pokemonData from "../data/pokemon.js";

const createPokemonTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS pokemon;

        CREATE TABLE IF NOT EXISTS pokemon (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            region VARCHAR(255) NOT NULL,
            weaknesses VARCHAR(255) NOT NULL,
            yearIntroduced VARCHAR(10) NOT NULL
        )
    `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 pokemon table created successfully");
  } catch (err) {
    console.error("⚠️ error creating pokemon table", err);
  }
};

const seedPokemonTable = async () => {
  await createPokemonTable();

  pokemonData.forEach((pokemon) => {
    const insertQuery = {
      text: "INSERT INTO pokemon (name, type, image, description, region, weaknesses, yearIntroduced) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };

    const values = [
      pokemon.name,
      pokemon.type,
      pokemon.image,
      pokemon.description,
      pokemon.region,
      pokemon.weaknesses,
      pokemon.yearIntroduced,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting pokemon", err);
        return;
      }

      console.log(`✅ ${pokemon.name} added successfully`);
    });
  });
};

seedPokemonTable();
