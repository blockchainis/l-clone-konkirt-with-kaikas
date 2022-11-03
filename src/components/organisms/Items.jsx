import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import HideScrollX from "@components/molecules/HideScrollX";
import axios from "axios";
import Item from "@components/molecules/Item";
import LoadingSpinner from "@components/atoms/LoadingSpinner";

const LoadingWrapper = styled.div`
  height: 275px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    return (
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
    );
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
