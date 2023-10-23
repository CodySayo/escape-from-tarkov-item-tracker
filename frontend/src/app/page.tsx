"use client";
import QuestSection from "@/components/QuestSection";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function Home() {

  const [hideoutItems, setHideoutItems] = useState("");
  const [questItems, setQuestItems] = useState([]);
  const [userData, setUserData] = useState({});
  let session = useSession()

  useEffect(() => {
    if(session.status !== "loading"){
      fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: session.status === "authenticated" ? session.data.user?.email : ""
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setHideoutItems(JSON.stringify(data.data.hideoutStations));
        setQuestItems(data.data.tasks)
        setUserData(data.userdata)
      })
      .catch((error) => console.log(error));
    }
  }, [session]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-col z-10 max-w-7xl w-full items-center justify-between font-mono text-sm lg:flex">
        <QuestSection questItems={questItems} userData={userData}/>
      </div>
    </main>
  )
}
