import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {

  return (
    <div>
      <h2>Browsewipe Web</h2>
      <p>
        Login / Register to accesss the Browsewipe service.
      </p>
      <br />
      <Link href="/dashboard" className="text-blue-400">
        <Button variant="outline">Dashboard Route</Button>
      </Link>
      <br /><br />
      <h3>How to use Browsewipe</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, repellendus suscipit commodi laboriosam nihil nobis unde voluptatem perspiciatis perferendis eaque praesentium nulla alias mollitia asperiores quo eligendi quisquam expedita repudiandae.</p>
    </div>
  );
}
