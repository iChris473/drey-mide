var express = require('express');
var router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dwsbh0v8b',
  api_key: '862537864394212',
  api_secret: 'mnJfa4xp0eUulkUuAYWWEVvY73U'
});

router.get('/get-images', (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization != process.env.API_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const { search, per_page, next_cursor } = req.query;
  const dir = search == "aef" || search == "afnis" || search == "london" ? "drey/conferences" : "drey";

  const searchOptions = {
    type: 'upload',
    prefix: `${dir}/${search}`,
    max_results: per_page ?? 5,
  };
  if (next_cursor != "null" && next_cursor != "undefined") {
    searchOptions.next_cursor = next_cursor;
  }
  cloudinary.api.resources(searchOptions, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error });
    } else {
      res.json({
        next_cursor: result.next_cursor,
        result: result.resources,
      });
    }
  });

});

module.exports = router;
