import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select, Button, Typography, Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const TriviaApp = () => {
  const [category, setCategory] = useState('');
  const [trivia, setTrivia] = useState(null);
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
    setShowAnswer(false); // Reset showAnswer when category changes
  };

  const fetchTrivia = async () => {
    try {
      if (!category) return; // Return if category is empty
      const response = await axios.get(`https://api.api-ninjas.com/v1/trivia?category=${category}`, {
        headers: {
          'X-Api-Key': 'TwBqMEpJ57NJsOil94499w==Natjj0ssjnbeQb5x' // Replace 'YOUR_API_KEY_HERE' with your actual API key
        }
      });
      const data = response.data;
      setTrivia(data[0]); // Assuming the response is an array with a single object
      setShowAnswer(false); // Reset showAnswer when new trivia is fetched
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTrivia();

    // Clean up any ongoing requests if component unmounts
    return () => {};
  }, [category]);

  useEffect(() => {
    let timer;
    if (showAnswer) {
      // Set a timer to show the answer after 10 seconds
      timer = setTimeout(() => {
        setShowAnswer(false);
      }, 10000);
    }

    // Clean up the timer when component unmounts or when showAnswer changes
    return () => {
      clearTimeout(timer);
    };
  }, [showAnswer]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleRefresh = () => {
    fetchTrivia();
  };

  // Define a custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Blue color for primary elements
      },
      secondary: {
        main: '#ff6f00', // Orange color for secondary elements
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#1976d2' }}>Random Trivia</Typography>
        <FormControl style={{ marginBottom: '20px' }}>
          <InputLabel id="category-label" style={{ color: '#1976d2' }}>Select a category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={handleChange}
            style={{ minWidth: '200px' }}
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="artliterature">Art & Literature</MenuItem>
            <MenuItem value="language">Language</MenuItem>
            <MenuItem value="sciencenature">Science & Nature</MenuItem>
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="fooddrink">Food & Drink</MenuItem>
            <MenuItem value="peopleplaces">People & Places</MenuItem>
            <MenuItem value="geography">Geography</MenuItem>
            <MenuItem value="historyholidays">History & Holidays</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
            <MenuItem value="toysgames">Toys & Games</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="mathematics">Mathematics</MenuItem>
            <MenuItem value="religionmythology">Religion & Mythology</MenuItem>
            <MenuItem value="sportsleisure">Sports & Leisure</MenuItem>
          </Select>
        </FormControl>
        {error && <Typography variant="body1" color="error" gutterBottom>Error: {error}</Typography>}
        {trivia && (
          <Card variant="outlined" style={{ maxWidth: '400px', backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5" style={{ color: '#1976d2' }}>Category: {trivia.category}</Typography>
              <Typography variant="body1" gutterBottom>Question: {trivia.question}</Typography>
              {!showAnswer && <Button variant="contained" color="primary" onClick={handleShowAnswer}>Show Answer</Button>}
              {showAnswer && <Typography variant="body1" gutterBottom>Answer: {trivia.answer}</Typography>}
            </CardContent>
          </Card>
        )}
        <Button variant="contained" color="secondary" onClick={handleRefresh} style={{ marginTop: '20px' }}>Refresh</Button>
      </div>
    </ThemeProvider>
  );
};

export default TriviaApp;
