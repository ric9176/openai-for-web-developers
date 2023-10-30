'use client';
import { makeStreamingJsonRequest } from 'http-streaming-request';
import { useState } from 'react';
import {
  Container,
  Text,
  Input,
  Button,
  Spacer,
  HStack,
  VStack,
  Image,
} from '@chakra-ui/react';

interface GenerationData {
  product: string;
  mission: string;
  idea: string;
  unique_selling_points: string[];
}

export default function StartGenerator() {
  const [data, setdata] = useState<GenerationData | undefined>(undefined);
  const [input, setInput] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    for await (const partialData of makeStreamingJsonRequest({
      url: '/api/completionData',
      method: 'POST',
      payload: { prompt: input },
    })) {
      setdata(partialData);
    }

    const { image } = await fetch('/api/generateImage', {
      method: 'POST',
      body: JSON.stringify({
        prompt: input,
      }),
    }).then((r) => r.json());
    setImageSrc(image);
  };

  return (
    <Container maxW='container.lg' pb={10}>
      <VStack spacing={6} alignItems='center' py={12}>
        <HStack
          spacing={2}
          w='60%'
          alignItems='center'
          as='form'
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="What industry do you want to disrupt? e.g: 'travel'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxW='lg'
            width='100%'
          />
          <Spacer />
          <Button
            type='submit'
            colorScheme='teal'
            px={8}
            onClick={handleSubmit}
          >
            Generate Idea
          </Button>
        </HStack>
      </VStack>

      <VStack
        bg='whiteAlpha.800'
        color='black'
        borderRadius='lg'
        m={{ sm: 4, md: 16, lg: 10 }}
        p={{ base: 4, sm: 5, md: 5, lg: 16 }}
        alignItems='center'
        spacing={6}
      >
        {imageSrc && <Image alt='idea image' src={imageSrc} />}
        <Text>Product: {data && data.product}</Text>
        <Text>Mission: {data && data.mission}</Text>
        <Text>Idea: {data && data.idea}</Text>
        <VStack display='flex' alignItems='flex-start'>
          {data &&
            data.unique_selling_points &&
            data.unique_selling_points.length > 1 &&
            data.unique_selling_points.map((usp, k) => (
              <Text key-={k}>{usp}</Text>
            ))}
        </VStack>
      </VStack>
    </Container>
  );
}
