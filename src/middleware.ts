//Enables auth on all pages
export { default } from "next-auth/middleware";

//Enables auth on specified pages
export const config = { matcher: ["/gyms", "/progress", "/community"] };
