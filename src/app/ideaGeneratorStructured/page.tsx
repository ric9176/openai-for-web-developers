'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Image,
  Input,
  Button,
  Spinner,
  Spacer,
  HStack,
} from '@chakra-ui/react';

interface GenerationData {
  idea: string;
  mission: string;
  unique_selling_points: string[];
}

export default function IdeaGenerator() {
  const [idea, setIdea] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completion, setCompletion] = useState<GenerationData | undefined>(
    undefined
  );

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  async function handleOnGenerateText(e: React.SyntheticEvent) {
    e.preventDefault();

    setIsLoading(true);
    setIdea('');
    setCompletion(undefined);

    const { data } = await fetch('/api/generateData', {
      method: 'POST',
      body: JSON.stringify({
        prompt: idea,
      }),
    }).then((r) => r.json());

    setCompletion(data);

    const { image } = await fetch('/api/generateImage', {
      method: 'POST',
      body: JSON.stringify({
        prompt: idea,
      }),
    }).then((r) => r.json());
    setImageSrc(image);

    setIsLoading(false);
  }

  return (
    <Container maxW='container.lg' pb={10}>
      <VStack spacing={6} alignItems='center' py={12}>
        <HStack spacing={2} w='60%' as='form' alignItems='center'>
          <Input
            placeholder="What industry do you want to disrupt? e.g: 'travel'"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            maxW='lg'
            width='100%'
          />
          <Spacer />
          <Button
            type='submit'
            colorScheme='teal'
            onClick={handleOnGenerateText}
            isLoading={isLoading}
            px={8}
          >
            Generate Idea
          </Button>
        </HStack>
      </VStack>

      {isLoading && (
        <Box
          bg='whiteAlpha.600'
          color='black'
          borderRadius='lg'
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          display='flex'
          justifyContent='space-between'
        >
          <Heading fontWeight={400}>Generating awesome idea...</Heading>
          <br />
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='black'
            size='xl'
          />
        </Box>
      )}

      {!isLoading && completion && imageSrc && (
        <VStack
          bg='whiteAlpha.800'
          color='black'
          borderRadius='lg'
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ base: 4, sm: 5, md: 5, lg: 16 }}
          alignItems='center'
          spacing={6}
        >
          <Image alt='idea image' src={imageSrc} />
          <Text>
            <b>Product:</b> {completion && completion.idea}
          </Text>
          <Text>
            <b>Idea:</b> {completion && completion.idea}
          </Text>
          <Text>
            <b>Mission:</b> {completion && completion.mission}
          </Text>
          <b>What makes us unique?</b>
          {completion &&
            completion.unique_selling_points.map((usp, k) => (
              <Text key-={k}>{usp}</Text>
            ))}
        </VStack>
      )}
    </Container>
  );
}
