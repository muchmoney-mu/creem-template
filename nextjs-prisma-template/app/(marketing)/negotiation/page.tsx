"use client";
import { CheckoutSession } from "@/app/api/checkout/route";
import { Container } from "@/components/creem/landing/container";
import { Heading } from "@/components/creem/landing/heading";
import { NavBar } from "@/components/creem/landing/navbar";
import { Subheading } from "@/components/creem/landing/subheading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const PricingPage = () => {
  const router = useRouter();

  const fetchCheckoutSessionUrl = async () => {
    const { data } = await axios.get("/api/checkout");
    if (data.success) {
      const checkoutSession = data.checkout as CheckoutSession;
      router.push(checkoutSession.checkout_url);
    }
  };

  const fetchNegotiate = async () => {
    const { data } = await axios.get("/api/salesnip");
    if (data.success) {
      const checkoutSession = data.session;
      window.salesnip.open(checkoutSession.id, {
        theme: {
          mode: "dark",
        },
      });
    }
  };

  return (
    <div>
      <div className="relative overflow-hidden py-20 md:py-0">
        <NavBar />
        <Container className="flex flex-col items-center justify-between  pb-20">
          <div className="relative z-20 py-10 md:pt-40">
            <Heading as="h1">Buy Photo AI</Heading>
            <Subheading className="text-center">
              300 Pictures for $10
            </Subheading>
          </div>
          <Button
            className=""
            variant="default"
            onClick={() => {
              fetchNegotiate();
            }}
          >
            Buy Photo AI
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default PricingPage;
