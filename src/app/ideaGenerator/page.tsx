'use client';
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
  VStack,
} from '@chakra-ui/react';

export default function SloganGenerator() {
  const [industry, setIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [textCompletion, setTextCompletion] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  async function handleOnGenerateText(e: React.SyntheticEvent) {
    e.preventDefault();

    // In this handler function will send the input to the serverless function at /api/generateText. You will need to do a few things:

    // 1.  You'll need to have some state to store the result and also loading state and the input field, you can use the state above or create your own ;-)

    // 2.  Call the enpoint at /api/generateText using the fetch api (or other if you prefer), then set the data into component state.

    // 3. Ensure that it works end to end for idea generation, feel free to adapt the UX!

    // 4. Once you have the text generation working, you can do the same thing with the image. The end result should be that you have your startup idea completion text along with an image based on the same user input.
    // HINT: You can simply use the Chakra Image component to display the generated image via the returned url: <Image alt='idea image' src={imageSrc} />
  }

  return (
    <Container maxW='container.lg' pb={10}>
      <VStack spacing={6} alignItems='center' py={12}>
        <HStack spacing={2} w='60%' as='form' alignItems='center'>
          <Input
            placeholder="What industry do you want to disrupt? e.g: 'travel'"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            maxW='lg'
            width='100%'
          />
          <Spacer />
          <Button
            type='submit'
            isLoading={isLoading}
            colorScheme='teal'
            onClick={handleOnGenerateText}
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

      {!isLoading && textCompletion && (
        <VStack
          bg='whiteAlpha.800'
          color='black'
          borderRadius='lg'
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ base: 4, sm: 5, md: 5, lg: 16 }}
          alignItems='center'
          spacing={6}
        >
          <Text>{textCompletion}</Text>
        </VStack>
      )}
    </Container>
  );
}
