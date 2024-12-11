"use client";

import { Container } from "@/components/creem/landing/container";
import { Hero } from "@/components/creem/landing/hero";
import { NavBar } from "@/components/creem/landing/navbar";

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden ">
        <NavBar />
        <main>
          <Container className="">
            <Hero />
          </Container>
          <div className="relative"></div>
        </main>
      </div>
    </>
  );
}
