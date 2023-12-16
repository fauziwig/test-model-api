const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Dummy data for restaurants
const restaurants = [
  {
    id: '1',
    nama_restoran: 'Gudeg Yujum',
    description: 'Warung gudeg',
    jam_buka: '9.00-10.00',
    rating: 4.5,
    lokasi: 'Jogja',
  },
  {
    id: '2',
    nama_restoran: 'Warung Burger Pak Bu',
    description: 'Warung terkenal',
    jam_buka: '7.30-19.00',
    rating: 5.0,
    lokasi: 'Jakarta',
  },
  {
    id: '3',
    nama_restoran: 'Warung Padang Mahal',
    description: 'Menyediakan makanan ga murah',
    jam_buka: '8.00-20.00',
    rating: 4.0,
    lokasi: 'Bandung',
  },
];

app.use(bodyParser.json());


app.get('/', (req, res) => {
  console.log(req.body)
  res.send("ini adalah halaman utama ")
  
});

// 1. Melihat daftar rekomendasi restoran
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

// 2. Mencari restoran berdasarkan nama restoran
app.post('/api/restaurants/:nama_restoran', (req, res) => {
  const nama_restoran = req.params.nama_restoran;
  console.log(nama_restoran);
 
  const foundRestaurant = restaurants.find(
    (restaurant) => restaurant.nama_restoran.toLowerCase() === nama_restoran.toLowerCase()
  );
 
  if (foundRestaurant) {
    res.json(foundRestaurant);
  } else {
    res.status(404).json({ message: 'Name Restaurant not found' });
  }
});


// 4. Mencari restoran berdasarkan karakter input pengguna
app.post('/api/restaurants/nama/search', (req, res) => {
  const searchTerm = req.body?.searchTerm?.toLowerCase() || '';

  const results = data.filter(item => item.includes(searchTerm));

  if (results.length > 0) {
    res.json({ results });
  } else {
    res.status(404).json({ message: 'No matching results found' });
  }
});


// 3. Mencari restoran berdasarkan lokasi
app.post('/api/restaurants/lokasi/:lokasi', (req, res) => {
  const lokasi  = req.params.lokasi;

  const filteredRestaurants = restaurants.find(
    (restaurant) => restaurant.lokasi.toLowerCase() === lokasi.toLowerCase()
  );

  if (filteredRestaurants) {
    res.json(filteredRestaurants);
  } else {
    res.status(404).json({ message: 'Location Restaurant not found'})
    res.send("tidak ada")
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
