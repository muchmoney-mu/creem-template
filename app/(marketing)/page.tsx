"use client";

import { Container } from "@/components/creem/landing/container";
import { Hero } from "@/components/creem/landing/hero";

export default function Home() {
  return (
    <main>
      <Container className="">
        <Hero />
      </Container>
      <div className="relative"></div>
    </main>
  );
} 