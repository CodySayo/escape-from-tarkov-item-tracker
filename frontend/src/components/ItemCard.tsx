import React, { useState, useEffect } from "react";
import Image from 'next/image'

interface ItemCardProps {
  item: any;
}

export default function ItemCard({item}: ItemCardProps) {
  console.log(item)
  let {count, name, shortName, imageLink, wikiLink} = item
  return (
    <div className="border-2 border-white rounded flex min-h-min flex-row items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>{count}</p>
        <p>{name}</p>
        <p>{shortName}</p>
        <img src={imageLink} alt={name} height={"100px"} width={"auto"}/>
        <a href={wikiLink} target="_blank">Wiki</a>
      </div>
    </div>
  )
}
