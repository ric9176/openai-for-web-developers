import { Providers } from "./providers";
import { Box } from "@chakra-ui/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            minW="100vw"
            minH="100Vh"
            bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
          >
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}