import {
  Container,
  Heading,
  Link,
  Spacer,
  HStack,
  VStack,
} from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Container maxW='container.lg' pb={10}>
      <VStack spacing={6} alignItems='center' py={12}>
        <Heading as='h1' size='2xl'>
          Welcome to{' '}
          <i>Working With OpenAI and Prompt Engineering for React Developers</i>
        </Heading>
        <HStack spacing={2}>
          <Spacer />
          <Link
            href='https://github.com/ric9176/openai-for-web-developers/'
            isExternal
          >
            To get started, click here to head over to the GitHub repository
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
}
