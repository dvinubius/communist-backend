const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());


// ----- THE MOODY LEADER -----

const MOODS = [
  '😡', '😃', '😁', '😆', '😊', '😇', '😌', '🤨', '🧐', '🤔' 
];
const randomMood = () => MOODS[Math.floor(Math.random() * MOODS.length)];
const historyEntry = (mood) => ({
  mood, 
  time: new Date().toISOString(),
  adorations: 0
});
const initialMood = randomMood();
const leader = {
  mood: initialMood,
  history: [historyEntry(initialMood)]
}
setInterval(() => {
  const mood = randomMood();
  leader.mood = mood;
  leader.history.push(historyEntry(mood));
}, 30_000);

// ----- ------------- -----




app.get('/api/v1/current-mood', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.json({data: leader.history[leader.history.length - 1]});
});

app.get('/api/v1/mood-history', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.json({data: leader.history});
});

app.post('/api/v1/adore', async (req, res) => {
  leader.mood.adorations++;
  res.json({data: 'Adoration received!'});
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});