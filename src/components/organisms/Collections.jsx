import React from "react";
import styled from "styled-components";

import useData from "@hooks/useData";
import Collection from "@components/molecules/Collection";

const CollectionList = styled.ul`
  margin-top: 16px;
`;

export default function Collections() {
  const { data, isLoading, isError } = useData(
    { openseaCollections: [] },
    "http://localhost:3000/api/opensea-top-collections"
  );

  if (isLoading) {
    return <div>로딩</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <CollectionList>
      {data.openseaCollections.map((collection, index) => (
        <Collection
          collection={collection}
          rank={index + 1}
          key={collection.id}
        />
      ))}
    </CollectionList>
  );
}
