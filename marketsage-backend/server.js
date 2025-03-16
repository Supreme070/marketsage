const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample campaign data
const campaigns = [
  {
    id: 1,
    name: "Spring Sale",
    platform: "SMS",
    status: "Active",
    reach: 15000,
    openRate: 0.38,
    revenue: 3200000,
    startDate: "2025-03-01"
  },
  {
    id: 2,
    name: "Winter Promo",
    platform: "Email",
    status: "Completed",
    reach: 22000,
    openRate: 0.45,
    revenue: 2100000,
    startDate: "2024-12-15"
  },
  {
    id: 3,
    name: "WhatsApp Blitz",
    platform: "WhatsApp",
    status: "Pending",
    reach: 8000,
    openRate: 0.0,
    revenue: 0,
    startDate: "2025-03-20"
  }
];

// Routes
app.get('/api/campaigns', (req, res) => {
  try {
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/campaigns/:id', (req, res) => {
  try {
    const campaign = campaigns.find(c => c.id === parseInt(req.params.id));
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/campaigns', (req, res) => {
  try {
    const { name, platform, reach } = req.body;
    if (!name || !platform || !reach) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newCampaign = {
      id: campaigns.length + 1,
      name,
      platform,
      status: 'Pending',
      reach,
      openRate: 0.0,
      revenue: 0,
      startDate: new Date().toISOString().split('T')[0]
    };
    campaigns.push(newCampaign);
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing