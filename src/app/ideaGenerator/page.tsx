'use client'
import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Input,
  Button,
  Spinner,
  Spacer,
  HStack,
  VStack
} from '@chakra-ui/react';

export default function SloganGenerator() {

  const [idea, setIdea] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [generation, setGeneration] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)

  async function handleOnGenerateText(e: React.SyntheticEvent) {
    e.preventDefault();
    setGeneration(null)

    setIsLoading(true);

    const { data } = await fetch('/api/generateText', {
      method: 'POST',
      body: JSON.stringify({
        prompt: idea
      })
    }).then(r => r.json());

    setGeneration(data);

    const { image } = await fetch('/api/generateImage', {
      method: 'POST',
      body: JSON.stringify({
        prompt: idea
      })
    }).then(r => r.json());
    setImageSrc(image)

    setIsLoading(false);
  }

  return (
    <Container maxW="container.lg" pb={10}>
      <VStack
        spacing={6}
        alignItems="center"
        py={12}
      >
        <HStack spacing={2} w="60%" as="form" alignItems="center">
          <Input
            placeholder="What industry do you want to disrupt? e.g: 'travel'"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            maxW="lg"
            width="100%"
          />
          <Spacer />
          <Button
            type='submit'
            colorScheme="teal"
            onClick={handleOnGenerateText}
            disabled={!idea || isLoading}
            px={8}
          >
            Generate Idea
          </Button>
        </HStack>
      </VStack>

      {isLoading && (
        <Box
          bg="whiteAlpha.600"
          color="black"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          display="flex"
          justifyContent="space-between"
        >
          <Heading fontWeight={400}>Generating awesome idea...</Heading>
          <br />
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="black"
            size="xl"
          />
        </Box>
      )}

      {!isLoading && generation && imageSrc &&
        <Box
          bg="white"
          color="black"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ base: 4, sm: 5, md: 5, lg: 16 }}
          textAlign="center"
        >
          <Image alt='idea image' src={imageSrc} />
          <Text>{generation}</Text>
        </Box>
      }
    </Container>
  );
}