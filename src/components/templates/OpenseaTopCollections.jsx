import SectionLayout from "@components/molecules/SectionLayout";
import SectionTop from "@components/molecules/SectionTop";
import styled from "styled-components";
import * as colors from "@styles/colors";

const CollectionList = styled.ul`
  margin-top: 16px;
`;

const CollectionItem = styled.li`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.borderSecondary};
`;

export default function OpenseaTopCollections() {
  return (
    <SectionLayout>
      <SectionTop title="많이 거래된 컬렉션" showAll="오픈씨 데이터 기준" />
      <CollectionList>
        <CollectionItem />
        <CollectionItem />
      </CollectionList>
    </SectionLayout>
  );
}
