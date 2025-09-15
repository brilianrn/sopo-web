"use client";

import { Button } from "@/components/atoms";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Link href="/apps" className="w-fit">
        <Button size="3xl" variant="primary">
          Ke Apps
        </Button>
      </Link>
    </div>
  );
};

export default Home;
