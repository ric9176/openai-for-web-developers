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
  product: string;
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

  // First check the data you are recieving in this component: console.log('completion', completion)
  // Then finish the implementation from line 121

  async function handleOnGenerateText(e: React.SyntheticEvent) {
    // This is an example implementation for calling the endpoints, feel free to modify!
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
          {/* Use the headings bellow to list out the Product, Idea and Mission */}
          <Text>
            <b>Product:</b>
          </Text>
          <Text>
            <b>Idea:</b>
          </Text>
          <Text>
            <b>Mission:</b>
          </Text>
          <b>What makes us unique?</b>
          {/* Here you can map over the array of unique selling points in unique_selling_points */}
        </VStack>
      )}
    </Container>
  );
}
