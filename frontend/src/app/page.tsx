"use client";
import QuestSection from "@/components/QuestSection";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [hideoutItems, setHideoutItems] = useState("");
  const [questItems, setQuestItems] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        setHideoutItems(JSON.stringify(data.data.hideoutStations));
        setQuestItems(data.data.tasks)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-col z-10 max-w-7xl w-full items-center justify-between font-mono text-sm lg:flex">
        <QuestSection questItems={questItems}/>
      </div>
    </main>
  )
}
