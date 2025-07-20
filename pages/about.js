import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About - CelestaView</title>
      </Head>
      <main>
        <h1>About This Project</h1>
        <p>
          This application lets you visualize space travel between moons and
          planets using a 3D map. Data is sourced from real astronomical bodies.
        </p>
      </main>
    </>
  );
}
