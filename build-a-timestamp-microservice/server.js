import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});


// ... keep your existing express setup, cors imports, and app.get('/') route at the top ...

// Handle empty date parameter (returns current time)
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Handle specific date queries (both timestamp strings and date formats)
app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  let inputDate;

  // 1. Check if the input is purely numeric (a Unix timestamp string)
  if (/^\d+$/.test(date)) {
    inputDate = new Date(parseInt(date));
  } else {
    // 2. Otherwise try parsing it as a standard date string
    inputDate = new Date(date);
  }

  // 3. If parsing failed and resulted in an Invalid Date, return the error object
  if (isNaN(inputDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // 4. Return the valid timestamp outputs
  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString()
  });
});

// ... keep your app.listen() code block at the bottom ...