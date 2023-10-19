"use client";
import React, { useState, useEffect } from "react";

export default function Home() {

  const [joke, setJoke] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        setJoke(JSON.stringify(data));
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {joke && <p>{joke}</p>}
      </div>
    </main>
  )
}
