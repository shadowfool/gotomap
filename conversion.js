const fs = require('fs');

fs.readFile('./countries.json', 'utf8', (err, data) => {
  let converted = JSON.parse(data);

  converted = converted.reduce((acc, item) => {
    acc[ item.name.common ] = {
      "latitude": item.latlng[0],
      "longitude": item.latlng[1]
    }
    return acc;
  }, {})

  fs.writeFile('./convertedCountries.json', JSON.stringify(converted), (err) => {
    if(err) throw err;
    console.log('saved converted file')
  })
})