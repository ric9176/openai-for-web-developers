'use client'
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

export default function SloganGenerator() {

  const [idea, setIdea] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [generation, setGeneration] = useState(undefined)
  const [imageSrc, setImageSrc] = useState(undefined)

  async function handleOnGenerateText(e: any) {
    e.preventDefault();

    const prompt = e.target.value
    setIsLoading(true);
    setIdea('');
    setGeneration(undefined)

    const { data } = await fetch('/api/generateData', {
      method: 'POST',
      body: JSON.stringify({
        prompt
      })
    }).then(r => r.json());

    setGeneration(data);

    const { image } = await fetch('/api/generateImage', {
      method: 'POST',
      body: JSON.stringify({
        prompt
      })
    }).then(r => r.json());
    setImageSrc(image)

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
        </Button>

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

        {imageSrc && <Image alt='idea image' src={imageSrc} />}
        {!isLoading && generation && < Box
          bg="white"
          color="black"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ base: 4, sm: 5, md: 5, lg: 16 }}
          textAlign="center"
        >
          <Text><b>Product:</b> {generation && generation.idea}</Text>
          <Text><b>Idea:</b> {generation && generation.idea}</Text>
          <Text><b>Mission:</b> {generation && generation.mission}</Text>
          {
            generation && generation.uniqueSellingPoints && generation.uniqueSellingPoints.map((usp => <Text>{usp}</Text>))
          }
        </Box>}
      </HStack>
    </Container >
  );
}