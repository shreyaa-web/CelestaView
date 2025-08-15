import Head from "next/head";
import Starfield from "@/components/Starfield";

export default function About() {
  return (
    <>
      <Head>
        <title>About - CelestaView</title>
        <meta
          name="description"
          content="Learn more about CelestaView, the 3D space journey visualizer created by Shreya Upadhyaya."
        />
      </Head>
      <Starfield count={300} />

      <main
        style={{
          padding: "4rem 5%",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "Michroma, sans-serif",
          lineHeight: 1.8,
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            marginBottom: "1rem",
            color: "rgba(202, 236, 252, 1)",
          }}
        >
          About CelestaView
        </h1>

        <p>
          <strong>CelestaView</strong> is an immersive 3D web application that
          allows users to explore our solar system like never before. Featuring
          realistic planetary models, animated starfields, and clickable
          celestial bodies, the project brings outer space to life in an
          interactive and educational format.
        </p>

        <h2 style={{ marginTop: "2rem", color: "rgba(202, 236, 252, 1)" }}>
          Features
        </h2>
        <ul>
          <li>
            3D models of planets, moons, asteroids, and satellites (.glb format)
          </li>
          <li>Click-to-zoom interaction on planets</li>
          <li>
            Floating stars, shooting stars, and nebula background animation
          </li>
          <li>
            Fact popups and dedicated information pages for each celestial body
          </li>
          <li>Responsive design for desktop and mobile</li>
        </ul>

        <h2 style={{ marginTop: "2rem", color: "rgba(202, 236, 252, 1)" }}>
          Technologies Used
        </h2>
        <ul>
          <li>
            <strong>Next.js</strong> for framework and routing
          </li>
          <li>
            <strong>React Three Fiber</strong> and <strong>Three.js</strong> for
            3D rendering
          </li>
          <li>
            <strong>GLTF</strong> and <strong>.glb</strong> models for celestial
            bodies
          </li>
          <li>Custom CSS for animated stars and visual effects</li>
        </ul>

        <h2 style={{ marginTop: "2rem", color: "rgba(202, 236, 252, 1)" }}>
          Future Scope
        </h2>
        <ul>
          <li>
            Enable dynamic space travel simulation (user selects source and
            destination)
          </li>
          <li>Add orbit animations and travel paths between planets/moons</li>
          <li>
            Integrate NASA’s APIs for live data, media, and discovery info
          </li>
          <li>Introduce audio narration</li>
          <li>
            Expand into a learning platform with quizzes and visual missions
          </li>
          <li>Add comment sections for each body, login page and more.</li>
        </ul>

        <h2 style={{ marginTop: "2rem", color: "rgba(202, 236, 252, 1)" }}>
          Creator
        </h2>
        <p>
          Hey Guys! This project was designed and developed by me,{" "}
          <strong>Shreya Upadhyaya</strong>, I am an aspiring developer and I
          love to blend creativity and technology. Do let me know what you feel
          about this! Bye! Here are my socials-
        </p>
        <p>
          Contact:{" "}
          <a
            href="mailto:shxeyaa@gmail.com"
            style={{ color: "rgba(202, 236, 252, 1)" }}
          >
            shxeyaa@gmail.com
          </a>
          <br />
          GitHub:{" "}
          <a
            href="https://github.com/shreyaa-web"
            target="_blank"
            rel="noreferrer"
            style={{ color: "rgba(202, 236, 252, 1)" }}
          >
            @shreyaa-web
          </a>
        </p>
      </main>
    </>
  );
}
