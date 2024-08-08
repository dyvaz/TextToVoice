import { useEffect, useState } from 'react';

type Voice = {
  voice_id: string;
  name: string;
  category: string;
  labels: {
    description: string;
    gender: string;
    age: string;
    accent: string;
    use_case: string;
  };
  preview_url: string;
};

const Home = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoices = async () => {
      const response = await fetch('/api/voices');
      const data = await response.json();
      setVoices(data.voices);
    };

    fetchVoices();
  }, []);

  const handlePlayPause = (voice: Voice) => {
    if (playing === voice.voice_id) {
      setPlaying(null);
    } else {
      setPlaying(voice.voice_id);
    }
  };

  return (
    <div>
      <h1>List of Voices</h1>
      <ul>
        {voices.map((voice) => (
          <li key={voice.voice_id}>
            <h2>{voice.name}</h2>
            <p>Category: {voice.category}</p>
            <p>Labels: {JSON.stringify(voice.labels)}</p>
            {voice.preview_url && (
              <button onClick={() => handlePlayPause(voice)}>
                {playing === voice.voice_id ? 'Pause' : 'Play'}
              </button>
            )}
            {playing === voice.voice_id && (
              <audio controls autoPlay>
                <source src={voice.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
