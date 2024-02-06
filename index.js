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
const leaderHistory = [historyEntry(randomMood())];
setInterval(() => leader.history.push(historyEntry(randomMood())), 600_000);

const currentMood = () => leaderHistory[leaderHistory.length - 1];

// ----- ------------- -----




app.get('/api/v1/current-mood', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.json({data: currentMood()});
});

app.get('/api/v1/mood-history', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.json({data: leaderHistory});
});

app.post('/api/v1/adore', async (req, res) => {
  currentMood().adorations++;
  res.json({data: {
    message: 'Adoration received!',
    data: currentMood()
  }});
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});