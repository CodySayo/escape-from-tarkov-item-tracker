import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface ItemCardProps {
  item: any;
  numFound: string;
}

export default function ItemCard({item, numFound}: ItemCardProps) {
  const [numItems, setNumItems] = useState(numFound);
  let {count, name, shortName, imageLink, wikiLink} = item
  return (
    <div className="w-full border-2 border-white rounded flex min-h-min flex-row items-center justify-between p-12 my-2">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-row">
          <input 
            className="rounded px-1 text-black text-center" 
            onChange={(e) => {
              console.log(e)
              if(parseInt(e.target.value) > count){
                e.target.value = count.toString()
              }
              if(parseInt(e.target.value) < 0){
                e.target.value = "0"
              }
              setNumItems(e.target.value)
              console.log(e.target.value)
              // if(useSession().status === "authenticated"){

              // }

            }}
            type="number" 
            value={numItems} 
            min={0} 
            max={count}>
          </input>
          <p className="px-3">/</p>
          <p className="px-1">{count}</p>
        </div>
        <p className="px-3">{name} [{shortName}]</p>
        <p className="px-3"></p>
        <div className="items-center flex h-28">
          <img className="px-3 max-h-28" src={imageLink} alt={name} height={"100px"} width={"auto"}/>
        </div>
        <a className="hover:underline" href={wikiLink} target="_blank">Wiki</a>
      </div>
    </div>
  )
}