import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold text-center relative top-32">
        Opps page is not found
      </h2>
      <div className="flex justify-center  ">
        <Image
          src="/error.gif"
          alt="Picture of the author"
          width={400}
          height={400}
        />
      </div>
      <h2 className="text-center text-2xl font-bold relative -top-28">
        Looks like you're lost
      </h2>
      <p className="text-center text-sm text-gray-500  relative -top-28">
        The page you are looking for is not available!
      </p>
      <div className="flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          <Home size={18} />
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
