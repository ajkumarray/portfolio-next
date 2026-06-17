import Portfolio from "@/components/Portfolio";

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return <Portfolio />;
}
