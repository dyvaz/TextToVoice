import { useEffect, useState } from 'react';
import { Container, Title, Text, Button, Group, Textarea, Loader, Card, Grid, Paper, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Play, Pause, VolumeUp, VolumeMute } from 'react-bootstrap-icons';

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
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);
  const [audioPreviewPlaying, setAudioPreviewPlaying] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchVoices = async () => {
      const response = await fetch('/api/voices');
      const data = await response.json();
      setVoices(data.voices);
    };

    fetchVoices();
  }, []);

  const handlePlayPause = (voice: Voice) => {
    if (audioPreviewPlaying === voice.voice_id) {
      setAudioPreviewPlaying(null);
    } else {
      setAudioPreviewPlaying(voice.voice_id);
    }
  };

  const handlePlayText = async (voice: Voice) => {
    if (!text) return;
    setLoading(true);
    setLoadingVoiceId(voice.voice_id);
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, voiceId: voice.voice_id }),
      });
      const data = await response.json();
      const audio = new Audio(data.filePath);
      audio.play();
      audio.onended = () => {
        setLoading(false);
        setLoadingVoiceId(null);
      };
    } catch (error) {
      console.error('Error generating audio:', error);
      setLoading(false);
    }
  };

  const handlePreviewEnded = () => {
    setAudioPreviewPlaying(null);
  };

  return (
    <Container>
      <Title align="center" mb="xl">Text-to-Voice Generator</Title>

      <Textarea
        placeholder="Digite seu texto aqui"
        value={text}
        onChange={(e) => setText(e.target.value)}
        mb="xl"
        autosize
        minRows={2}
        disabled={loading}
        style={{ width: '100%' }}
      />

      <Grid gutter="md">
        {voices.map((voice) => (
          <Grid.Col key={voice.voice_id} span={isMobile ? 12 : 6} lg={4}>
            <Card shadow="sm" padding="lg" style={{ borderRadius: '8px', marginBottom: '1rem', minHeight: '300px' }}>
              <Title order={4} mb="md">{voice.name}</Title>
              <Text mb="xs"><strong>Category:</strong> {voice.category}</Text>
              <Text mb="xs"><strong>Description:</strong> {voice.labels.description}</Text>
              <Text mb="xs"><strong>Gender:</strong> {voice.labels.gender}</Text>
              <Text mb="xs"><strong>Age:</strong> {voice.labels.age}</Text>
              <Text mb="xs"><strong>Accent:</strong> {voice.labels.accent}</Text>
              <Text mb="md"><strong>Use Case:</strong> {voice.labels.use_case}</Text>

              <Group spacing="xs" position="center" direction="column">
                {voice.preview_url && (
                  <Button
                    onClick={() => handlePlayPause(voice)}
                    disabled={loading || voice.voice_id === loadingVoiceId}
                    style={{ transition: 'background-color 0.3s ease', borderRadius: '8px', width: '100%' }}
                    variant="light"
                    leftIcon={audioPreviewPlaying === voice.voice_id ? <Pause /> : <Play />}
                  >
                    {audioPreviewPlaying === voice.voice_id ? 'Pause Preview' : 'Play Preview'}
                  </Button>
                )}

                {text && (
                  <Button
                    onClick={() => handlePlayText(voice)}
                    disabled={loading || voice.voice_id === loadingVoiceId}
                    style={{ transition: 'background-color 0.3s ease', borderRadius: '8px', width: '100%' }}
                    variant="light"
                    leftIcon={loading && voice.voice_id === loadingVoiceId ? <Loader size="xs" /> : <VolumeUp />}
                  >
                    {loading && voice.voice_id === loadingVoiceId ? 'Generating...' : 'Play Text'}
                  </Button>
                )}
              </Group>

              {audioPreviewPlaying === voice.voice_id && voice.preview_url && (
                <Paper shadow="xs" padding="md" style={{ marginTop: '1rem', borderRadius: '8px' }}>
                  <audio
                    controls
                    autoPlay
                    style={{ width: '100%', transition: 'opacity 0.3s ease-in-out' }}
                    onEnded={handlePreviewEnded}
                  >
                    <source src={voice.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </Paper>
              )}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
