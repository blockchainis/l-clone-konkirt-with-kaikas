import React from "react";
import styled from "styled-components";
import * as colors from "@styles/colors";
import Ether from "@components/atoms/Ether";
import { useState, useEffect } from "react";
import axios from "axios";

const CollectionList = styled.ul`
  margin-top: 16px;
`;

const CollectionItem = styled.li`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.borderSecondary};
`;

const CollectionInfo = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 24px;
`;

const RankText = styled.div`
  font-family: MarkPro-Heavy;
  font-size: 14px;
  color: ${colors.textYellow};
`;

const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-left: 24px;
  background-color: ${colors.bgSecondary};
  object-fit: contain;
`;

const CollectionName = styled.span`
  font-weight: 500;
  margin-left: 12px;
`;

const CollectionPriceInfo = styled.div`
  height: 60px;
  padding: 0px 28px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const NormalText = styled.span`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

const SpanDoubleWrapper = styled.div`
  grid-column: span 2;
`;

const PriceWrapper = styled.div`
  display: flex;
`;

const NumberText = styled(NormalText)`
  color: ${colors.textGreen};
`;

const PriceText = styled.span`
  font-family: MarkPro-Heavy;
  font-size: 14px;
  margin-left: 4px;
`;

export default function Collections() {
  const [collections, setCollections] = useState({ openseaCollections: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchCollections() {
      setIsLoading(true);
      setIsError(false);
      try {
        const results = await axios(
          "http://localhost:3000/api/opensea-top-collections"
        );
        setCollections(results.data);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchCollections();
  }, []);
  if (isLoading) {
    return <div>로딩</div>;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <CollectionList>
      {collections.openseaCollections.map((collection, index) => (
        <CollectionItem key={collection.id}>
          <CollectionInfo>
            <RankText>{index + 1}</RankText>
            <Thumbnail src={collection.imgUrl} alt={collection.name} />
            <CollectionName>{collection.name}</CollectionName>
          </CollectionInfo>
          <CollectionPriceInfo>
            <NormalText>최저가</NormalText>
            <SpanDoubleWrapper>
              <PriceWrapper>
                <Ether />
                <PriceText>{collection.floorPrice}</PriceText>
              </PriceWrapper>
            </SpanDoubleWrapper>
            <NormalText>24h 거래량</NormalText>
            <PriceWrapper>
              <Ether />
              <PriceText>{collection.oneDayVolume}</PriceText>
            </PriceWrapper>
            <NumberText>+{collection.oneDayVolumeChange}%</NumberText>
          </CollectionPriceInfo>
        </CollectionItem>
      ))}
    </CollectionList>
  );
}
