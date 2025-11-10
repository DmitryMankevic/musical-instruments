const axios = require('axios');

class OllamaService {
  static async ask(prompt) {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'deepseek-coder',
      prompt,
      stream: false,
    });

    return response.data.response;
  }
}

module.exports = OllamaService;
