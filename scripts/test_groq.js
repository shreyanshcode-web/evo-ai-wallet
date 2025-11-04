const axios = require('axios');

(async () => {
  const key = process.env.VITE_GROQ_API_KEY || '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';
  console.log('Using key length:', key ? key.length : 'none');
  try {
    const res = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a test bot.' },
          { role: 'user', content: 'Hello' }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    console.log('STATUS', res.status);
    console.log('DATA', JSON.stringify(res.data, null, 2));
  } catch (e) {
    if (e.response) {
      console.error('ERR_RESPONSE', e.response.status, JSON.stringify(e.response.data, null, 2));
    } else {
      console.error('ERR', e.message);
    }
  }
})();
