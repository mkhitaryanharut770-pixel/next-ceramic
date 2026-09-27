import { Home } from "@/components/home";
import { prisma } from "@/prisma/prisma-client";
import { unstable_cache } from "next/cache";
// ISR
// export const revalidate = 3600;

const cachedData = unstable_cache(
  async () =>
    await Promise.all([prisma.product.findMany(), prisma.homeHero.findFirst()]),
  ["home"],
  { revalidate: 3600 },
);

// const data = async () => {
//   const res = await fetch("url");
//   const data = await res.json();
// };

export default async function HomePage() {
  const [products, hero] = await cachedData();

  return <Home products={products} hero={hero} />;
}
