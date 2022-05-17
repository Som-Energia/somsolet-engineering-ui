import { useSelector } from "react-redux";
import CampaignCard from "../components/CampaignCard";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Loading from "../components/Loading";

const StyledList = styled.ul`
  display: grid;
  margin-top: ${({ theme }) => theme.spacings.small2};
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: ${({ theme }) => theme.spacings.small3};
`;
const StyledListItem = styled.li`
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledHeader = styled.h2`
  font-weight: normal;
`;

const Campaigns = () => {
  const { t } = useTranslation();

  const { campaigns, isLoading } = useSelector((state) => state.campaigns);

  return !isLoading && campaigns ? (
    <>
      <StyledHeader>{t("CAMPAIGNS_TITLE")}</StyledHeader>
      <StyledList>
        {campaigns.map((data) => (
          <StyledListItem key={data.campaignId}>
            <CampaignCard data={data} />
          </StyledListItem>
        ))}
      </StyledList>
    </>
  ) : (
    <Loading />
  );
};

export default Campaigns;
