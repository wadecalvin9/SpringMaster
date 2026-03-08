import Navigation from "./components/navigation";
import Link from "next/link";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
    </div>
  );
}