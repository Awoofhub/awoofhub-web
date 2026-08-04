/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://www.awoofhub.ng/',
  generateRobotsTxt: true,
  exclude: [
    "/login",
    "/signup",
    "/forgot-password",
    "/forgot-password/*",
    "/reset-password",
    "/reset-password/*",
    "/verify-email",
    "/verify-email/*",
    "/notifications",
    "/wishlist",
    "/my-offers",
    "/offers/create",
    "/profile/*",
  ],
}