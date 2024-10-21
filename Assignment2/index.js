const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const { resourceLimits } = require("worker_threads");

const app = express();
const PORT = process.env.PORT || 3000;
let db;
let cors = require('cors');

app.use(cors());

// Connect to SQLite database
(async () => {
  db = await open({ filename: "./Assignment2/database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();
//1
async function fetchAllGames() {
  const query = `SELECT * FROM games`;
  const response = await db.all(query, []);
  return { games: response };
}

async function fetchGameById(id) {
  const query = `SELECT * FROM games WHERE id = ?`;
  const response = await db.all(query, [id]);
  return { game: response };
}

async function fetchGamesByGenre(genre) {
  const query = `SELECT * FROM games WHERE genre = ?`;
  const response = await db.all(query, [genre]);
  return { games: response };
}

async function fetchGamesByPlatform(platform) {
  const query = `SELECT * FROM games WHERE platform = ?`;
  const response = await db.all(query, [platform]);
  return { games: response };
}

async function getGamesSortedByRating() {
  const query = `SELECT * FROM games ORDER BY rating DESC`;
  const response = await db.all(query, []);
  return { games: response };
}

async function fetchAllPlayers() {
  const query = `SELECT * FROM players`;
  const response = await db.all(query, []);
  return { players: response };
}

async function fetchPlayersByPlatform(platform) {
  const query = `SELECT * FROM players WHERE platform = ?`;
  const response = await db.all(query, [platform]);
  return { games: response };
}

async function fetchPlayerById(id) {
  const query = `SELECT * FROM players WHERE id = ?`;
  const response = await db.all(query, [id]);
  return { player: response };
}

async function getPlayersSortedByRating() {
  const query = `SELECT * FROM players ORDER BY rating DESC`;
  const response = await db.all(query, []);
  return { players: response };
}

async function fetchAllTournaments() {
  const query = `SELECT * FROM tournaments`;
  const response = await db.all(query, []);
  return { tournaments: response };
}

async function fetchTournamentsById(id) {
  const query = `SELECT * FROM tournaments WHERE id = ?`;
  const response = await db.all(query, [id]);
  return { tournament: response };
}

async function fetchAllTournamentsById(id) {
  const query = `SELECT * FROM tournaments WHERE id = ?`;
  const response = await db.all(query, [id]);
  return { tournaments: response };
}

async function fetchTournamentsSortedByPrizePool() {
  const query = `SELECT * FROM tournaments ORDER BY prizePool DESC`;
  const response = await db.all(query, []);
  return { tournaments: response };
}

app.get("/games", async (req, res) => {
  try {
    const result = await fetchAllGames();
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/games/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await fetchGameById(id);
    if (result.game.length === 0) {
      return res.status(404).json({ message: "No game found." });
    }
    return res.status(200).json({ game: result.game[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/games/genre/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;
    const result = await fetchGamesByGenre(genre);
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/games/platform/:platform", async (req, res) => {
  try {
    const platform = req.params.platform;
    const result = await fetchGamesByPlatform(platform);
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/games/sort-by-rating", async (req, res) => {
  try {
    const result = await getGamesSortedByRating();
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/players", async (req, res) => {
  try {
    const result = await fetchAllPlayers();
    if (result.players.length === 0) {
      return res.status(404).json({ message: "No players found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/players/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await fetchPlayerById(id);
    if (result.player.length === 0) {
      return res.status(404).json({ message: "No game found." });
    }
    return res.status(200).json({ player: result.player[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/players/platform/:platform", async (req, res) => {
  try {
    const platform = req.params.platform;
    const result = await fetchPlayersByPlatform(platform);
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No players found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/players/sort-by-rating", async (req, res) => {
  try {
    const result = await getPlayersSortedByRating();
    if (result.players.length === 0) {
      return res.status(404).json({ message: "No players found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/tournaments", async (req, res) => {
  try {
    const result = await fetchAllTournaments();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/tournaments/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await fetchTournamentsById(id);
    if (result.tournament.length === 0) {
      return res.status(404).json({ message: "No tournament found." });
    }
    return res.status(200).json({ tournament: result.tournament[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/tournaments/game/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await fetchAllTournamentsById(id);
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/tournaments/sort-by-prize-pool", async (req, res) => {
  try {
    const result = await fetchTournamentsSortedByPrizePool();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});