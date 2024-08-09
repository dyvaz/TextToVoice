import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { put } from '@vercel/blob';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { text, voiceId } = req.body;

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found' });
  }

  try {
    // Solicitar o áudio do ElevenLabs
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      { text },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Fazer o upload do buffer de dados usando o @vercel/blob
    const fileName = `audios/${Date.now()}.mp3`;
    const { url } = await put(fileName, response.data, {
      access: 'public', // Tornar o arquivo acessível publicamente
    });

    res.status(200).json({ filePath: url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate audio', details: error });
  }
};

export default handler;
