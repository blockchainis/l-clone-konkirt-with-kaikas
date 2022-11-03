import React from "react";
import styled from "styled-components";

import useData from "@hooks/useData";
import Collection from "@components/molecules/Collection";
import LoadingSpinner from "@components/atoms/LoadingSpinner";

const CollectionList = styled.ul`
  margin-top: 16px;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 1604px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Collections() {
  const { data, isLoading, isError } = useData(
    { openseaCollections: [] },
    "http://localhost:3000/api/opensea-top-collections"
  );

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
