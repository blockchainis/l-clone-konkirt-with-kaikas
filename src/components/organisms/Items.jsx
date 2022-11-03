import React from "react";
import { useState, useEffect } from "react";

import HideScrollX from "@components/molecules/HideScrollX";
import axios from "axios";
import Item from "@components/molecules/Item";

export default function Items() {
  const [items, setItems] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true);
      setIsError(false);
      try {
        const results = await axios("http://localhost:3000/api/items");
        setItems(results.data);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <HideScrollX>
      {items.items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </HideScrollX>
  );
}
