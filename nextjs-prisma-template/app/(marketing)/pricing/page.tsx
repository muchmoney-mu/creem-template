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

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Container className="flex flex-col items-center justify-between  pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Configure ProductID on .env</Heading>
          <Subheading className="text-center">
            Copy the .env.example to .env and configure Product ID and API Key{" "}
            <br />
            After payment, all webhooks will be logged in the console
            <br />
            Use Stripe test card (4242 4242 4242 4242) to test the payment
          </Subheading>
        </div>
        <Button
          className=""
          variant="default"
          onClick={() => {
            fetchCheckoutSessionUrl();
          }}
        >
          Buy Awesome Product
        </Button>
      </Container>
    </div>
  );
};

export default PricingPage;
