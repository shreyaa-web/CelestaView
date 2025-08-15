import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";
import SideAuthCta from "@/components/SideAuthCta";
import Starfield from "@/components/Starfield";

export default function Home() {
  //react fragment "<>"
  return (
    <>
      <Head>
        <title>CelestaView</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Starfield count={300} />
      <div className="starry-background" id="stars"></div>
      <main>
        <h1 className="fancy-title">CelestaView</h1>

        <p>
          Let’s fly from the Moon to Mars. Your cosmic adventure starts here!
        </p>
      </main>
      <SideAuthCta />
    </>
  );
}
