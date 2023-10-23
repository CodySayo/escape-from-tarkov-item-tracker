import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";

interface QuestSectionProps {
  questItems: any[];
  userData: any;
}

export default function QuestSection({questItems, userData}: QuestSectionProps) {
  const [items, setItems] = useState<any[]>([]);
  console.log(userData)
  
  useEffect(() => {
    let map = new Map();
    questItems.forEach(quest => {
      quest.objectives.forEach((objective: any) => {
        if (objective.type && objective.type != "findItem" && objective.type != "useItem") {
          let itemName = objective.item.name

          if (map.has(itemName)) {
            map.get(itemName).count += objective.type == "buildWeapon" ? 1 : objective.count
          } else {
            map.set(itemName, 
              {
                count: objective.type == "buildWeapon" ? 1 : objective.count,
                name: itemName,
                shortName: objective.item.shortName,
                imageLink: objective.item.gridImageLink,
                wikiLink: objective.item.wikiLink
              })
          }
        }
      })
    });
    setItems(Array.from(map.values()))
  }, [questItems]);

  return (
    <>
      <h2>Task Items</h2>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {items.map((item) => <ItemCard key={item.name} item={item} numFound={userData[item.shortName + "T"] ?? "0"} isTaskItem/>)}
        </div>
      </div>
    </>
  )
}
