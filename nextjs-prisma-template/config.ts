const config = {
  // REQUIRED
  appName: "Creem Placeholder",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "The NextJS boilerplate includes everything you need to build your SaaS, AI tool, or any other web app, taking you from idea to production in just 5 minutes.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "creem.io",
  creem: {
    url: process.env.CREEM_URL,
    apiKey: process.env.CREEM_API_KEY,
    pricingTableId: process.env.CREEM_PRICING_TABLE_ID,
  },
  // stripe: {
  //   // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
  //   plans: [
  //     {
  //       // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
  //       priceId:
  //         process.env.NODE_ENV === "development"
  //           ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
  //           : "price_456",
  //       //  REQUIRED - Name of the plan, displayed on the pricing page
  //       name: "Starter",
  //       // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
  //       description: "Perfect for small projects",
  //       // The price you want to display, the one user will be charged on Stripe.
  //       price: 99,
  //       // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
  //       priceAnchor: 149,
  //       features: [
  //         {
  //           name: "NextJS boilerplate",
  //         },
  //         { name: "User oauth" },
  //         { name: "Database" },
  //         { name: "Emails" },
  //       ],
  //     },
  //     {
  //       priceId:
  //         process.env.NODE_ENV === "development"
  //           ? "price_1O5KtcAxyNprDp7iftKnrrpw"
  //           : "price_456",
  //       // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
  //       isFeatured: true,
  //       name: "Advanced",
  //       description: "You need more power",
  //       price: 149,
  //       priceAnchor: 299,
  //       features: [
  //         {
  //           name: "NextJS boilerplate",
  //         },
  //         { name: "User oauth" },
  //         { name: "Database" },
  //         { name: "Emails" },
  //         { name: "1 year of updates" },
  //         { name: "24/7 support" },
  //       ],
  //     },
  //   ],
  // },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Creem <noreply@creem-placeholder.io>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Gabriel <admin@creem-placeholder.io>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@creem-placeholder.io",
  },
};

export default config;
