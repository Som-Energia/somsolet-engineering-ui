import { useSelector } from "react-redux";
import CampaignCard from "../components/CampaignCard";
import styled from "styled-components";

const StyledList = styled.ul`
  display: grid;
  margin-top: ${({ theme }) => theme.spacings.small2};
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: ${({ theme }) => theme.spacings.small3};
`;
const StyledListItem = styled.li`
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(224, 224, 224, 1);
`;

const Campaigns = () => {
  const { campaigns, isLoading } = useSelector((state) => state.campaigns);

  return (
    !isLoading &&
    campaigns && (
      <StyledList>
        {campaigns.map((data) => (
          <StyledListItem key={data.campaignId}>
            <CampaignCard data={data} />
          </StyledListItem>
        ))}
      </StyledList>
    )
  );
};

export default Campaigns;
