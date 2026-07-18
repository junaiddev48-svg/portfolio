const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable not set in Vercel' });
  }

  const systemPrompt = `You are Ali Junaid's portfolio assistant. Answer questions about Ali based on the following information. Be helpful, friendly, and concise.

ABOUT ALI:
- Name: Ali Junaid
- Email: junaiddev48@gmail.com
- Phone: +92-335-0400721
- Location: Lahore, Pakistan
- Degree: BS Computer Science
- Languages: Urdu, English

SKILLS:
- Programming: Python, JavaScript, C++
- Web: HTML5, CSS3, Responsive Design, Flask
- Databases: MySQL
- Tools: Git, GitHub, VS Code, Railway, Vercel
- Learning: Pandas, NumPy, Matplotlib, Seaborn, Jupyter, Excel, IBM Cognos, SQL (IBM Data Analyst Professional)
- Soft Skills: Problem Solving, Team Collaboration, Analytical Thinking, Quick Learner

EXPERIENCE:
1. Full-Stack Developer Intern at Subtle Marketing (Apr 2025 - Aug 2025): customized/maintained client websites, built a service-based accounting platform, developed backend APIs and responsive frontend interfaces, worked on hifsakhansalon.com
2. Academic & Self-Driven Projects (2022 - 2026)

PROJECTS:
1. Crop Disease Detection Dashboard - Python, TensorFlow, MobileNetV2, Flask
2. Smart Home Automation System - Arduino, C++, IoT
3. Crypto Price Tracker & Prediction Bot - JavaScript, Discord.js, CoinGecko API, Finnhub API, Railway, Vercel
4. Website Customization for Hifsa Khan Salon

CERTIFICATIONS:
1. Foundations: Data, Data, Everywhere (Google/Coursera)
2. Ask Questions to Make Data-Driven Decisions (Google/Coursera)
3. Lead Generation Messenger Chatbot (Coursera)

Keep responses under 3 sentences. If asked something not covered here, say you don't have that information.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemPrompt + '\n\nUser question: ' + message }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data.error?.message || `HTTP ${response.status}`;
      throw new Error(errMsg);
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
