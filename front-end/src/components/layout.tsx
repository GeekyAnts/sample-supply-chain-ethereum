import { VStack } from "native-base";
import React from "react";
import Fab from "./fab";
import { Footer } from "./footer";
import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <VStack maxW="100vw" minH="100vh" bg="violet.50">
      <Header />
      <VStack
        w="100%"
        minH="85vh"
        justifyContent={"center"}
        alignItems="center"
        p="2"
      >
        {children}
      </VStack>
      <Fab />
      <Footer />
    </VStack>
  );
}
