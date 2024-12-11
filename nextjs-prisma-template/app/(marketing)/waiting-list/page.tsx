import { cn } from "@/lib/utils";
import { ContactForm } from "@/components/creem/waiting-list/contact";
import { NavBar } from "@/components/creem/landing/navbar";

export default function WaitingListPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0 px-4 md:px-20 bg-gray-50 dark:bg-black">
      <NavBar />
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
        <ContactForm />
        <div className="relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-900 overflow-hidden bg-gray-50 dark:bg-black items-center justify-center">
          <div className="max-w-sm mx-auto">
            <p
              className={cn(
                "font-semibold text-xl text-center text-muted-dark ",
              )}
            >
              Join the waiting list
            </p>
            <p
              className={cn(
                "font-normal text-base text-center text-neutral-500 dark:text-neutral-200 mt-8",
              )}
            >
              Get early access to My Awesome Startup and be the first to know
              when we launch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
