'use client'
import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Image,
  Input,
  Button,
  Spinner,
  Spacer,
  HStack,
} from '@chakra-ui/react';

export default function SloganGenerator() {

  const [idea, setIdea] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [generation, setGeneration] = useState(undefined)

  async function handleOnGenerateText(e: any) {
    e.preventDefault();

    const prompt = e.target.value
    setIsLoading(true);
    setIdea('');
    setGeneration(undefined)

    const { data } = await fetch('/api/generateText', {
      method: 'POST',
      body: JSON.stringify({
        prompt
      })
    }).then(r => r.json());

    setGeneration(data);

    // const { image } = await fetch('/api/image', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     prompt: `
    //       ${data.title}.
    //       stylized as a watercolor painting.
    //       the primary color should be green.
    //     `
    //   })
    // }).then(r => r.json());

    // setIdea(prev => {
    //   return {
    //     ...prev,
    //     image
    //   }
    // })

    setIsLoading(false);
  }

  return (
    <Container maxW="container.lg" pb={10}>
      <HStack spacing={2} w="60%">
        <Input
          placeholder="What industry do you want to disrupt? e.g: 'travel'"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          maxW="lg"
          width="100%"
        />
        <Spacer />
        <Button
          colorScheme="teal"
          onClick={handleOnGenerateText}
          disabled={!idea || isLoading}
          px={8}
        >
          Generate Idea
          {generation}
        </Button>
      </HStack>
    </Container>
  );
}