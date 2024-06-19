'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import { DATA } from './data';
import { ColumnContainer, GridContainer, SectionContainer } from '@/style';
import { SectionTitle, Text, UnderlineText } from '@/reuseable-components';
import Image from 'next/image';

const Container = styled(SectionContainer)`
  height: auto;
  padding: 160px 64px;
  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const PageBody = styled(ColumnContainer)`
  max-width: fit-content;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 80px;
  margin-top: 40px;
  margin-bottom: 80px;
  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 3vw;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  max-width: 40vw;
  @media (max-width: 800px) {
    font-size: 24px;
    max-width: 100%;
  }
`;

const TeamContainer = styled.div`
  column-count: 3; /* Number of columns */
  column-gap: 24px; /* Gap between columns */
  @media (max-width: 1200px) {
    column-count: 2;
  }
  @media (max-width: 800px) {
    column-count: 1;
  }
`;

const TeamItem = styled.div`
  display: inline-block;
  padding: 40px;
  width: 100%;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  margin-bottom: 32px; /* Space between items */
  break-inside: avoid;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.32px;
  opacity: 0.8;
`;

const Divider = styled.div`
  border: 1px solid #f9f9f9;
  height: 1px;
  width: 100%;
  opacity: 0.4;
  background: #f9f9f9;
  margin: 16px 0;
`;

const TeamImage = styled.img`
  width: 100%;
  max-width: 50vw;
  object-fit: cover;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  @media (max-width: 800px) {
    max-width: 100%;
  }
`;

const LinkWrapper = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  text-decoration: none;
`;

const Teams = () => {
  return (
    <Container
      justify={'flex-start'}
      alignments={'flex-start'}
      background={theme.colors.secondary}
    >
      <PageBody>
        <SectionTitle
          headerInfo={{
            title: 'TEAM',
            subtitle: '',
            description: '',
          }}
        />
        <TitleWrapper>
          <PageTitle>
            The Odigos team is comprised of OpenTelemetry maintainers and
            developers who utilize EBPFto make implementing observability simple
            and instant.
          </PageTitle>
          <TeamImage alt="icon" src={'/images/team/team.jpg'} />
        </TitleWrapper>
        <TeamContainer>
          {DATA.map((data, index) => (
            <TeamItem key={index}>
              <TextWrapper>
                <Text fontFam={theme.font_family.secondary} size={24}>
                  {data.name}
                </Text>
                <Title>{data.title}</Title>
                <Divider />
                <Title style={{ opacity: 0.8 }}>{data.description}</Title>
                <LinkWrapper
                  href={data.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={'/icons/social/linkedin.svg'}
                    alt="linkedin"
                    width={18}
                    height={18}
                  />
                  <UnderlineText>LinkedIn</UnderlineText>
                </LinkWrapper>
              </TextWrapper>
            </TeamItem>
          ))}
        </TeamContainer>
      </PageBody>
    </Container>
  );
};

export default Teams;
