'use client';
import React, { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import theme from '@/style/theme';
import styled from 'styled-components';
import { DATA } from './data';
import { ColumnContainer, SectionContainer } from '@/style';
import {
  LottieAnimation,
  ParagraphComponent,
  SectionTitle,
} from '@/reuseable-components';

import animationData1 from '../../public/lotties/Odigos-1st-animation.json';
import animationData2 from '../../public/lotties/Odigos-2nd-animation.json';
import animationData3 from '../../public/lotties/Odigos-3rd-animation.json';
import animationData4 from '../../public/lotties/Odigos-4th-animation.json';
import animationData5 from '../../public/lotties/Odigos-5th-animation.json';
import lines from '../../public/lotties/Odigos-bg-lines.json';
import lines2 from '../../public/lotties/Odigos-bg-lines-markers.json';

const LottieMap = {
  1: {
    animationData: animationData1,
    loop: true,
    autoplay: true,
    width: 432,
  },
  2: {
    animationData: animationData2,
    loop: true,
    autoplay: true,
    width: 382,
  },
  3: {
    animationData: animationData3,
    loop: true,
    autoplay: true,
    width: 413,
  },
  4: {
    animationData: animationData4,
    loop: true,
    autoplay: true,
    width: 600,
  },
  5: {
    animationData: animationData5,
    loop: true,
    autoplay: true,
    width: 661,
  },
};

const Container = styled(SectionContainer)`
  height: auto;
  padding: 160px 64px;

  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const PageBody = styled(ColumnContainer)``;

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 300px;
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media (max-width: 800px) {
    font-size: 28px;
  }
`;

const AnimationContainer = styled.div`
  position: relative;
  width: 660px;
  height: 3932px;
`;

const AnimatedIllustration = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 50%;
  transform: translateX(-50%);
`;

const HowItWorks = () => {
  const animationRefs = useRef<(any | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const lottieInstance = useRef<AnimationItem | null>(null);
  const [isLinesVisible, setIsLinesVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const animationDelay = 800; // Delay in milliseconds

  useEffect(() => {
    // Handle special case for 3rd animation
    const animation3 = animationRefs.current[2];
    if (animation3 && typeof animation3.addEventListener === 'function') {
      const handleComplete = () => {
        if (animation3 && typeof animation3.goToAndPlay === 'function') {
          animation3.goToAndPlay(5000);
        }
      };
      animation3.addEventListener('complete', handleComplete);

      return () => {
        if (
          animation3 &&
          typeof animation3.removeEventListener === 'function'
        ) {
          animation3.removeEventListener('complete', handleComplete);
        }
      };
    }

    // IntersectionObserver to detect when lines animation is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLinesVisible(true);
            observer.disconnect(); // Stop observing once it becomes visible
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (backgroundRef.current) {
      observer.observe(backgroundRef.current);
    }

    return () => {
      if (backgroundRef.current) {
        observer.unobserve(backgroundRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100); // Adjust timeout as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isLinesVisible && backgroundRef.current) {
      lottieInstance.current = lottie.loadAnimation({
        container: backgroundRef.current,
        animationData: lines,
        renderer: 'svg',
        loop: false,
        autoplay: false,
      });

      return () => {
        if (lottieInstance.current) {
          lottieInstance.current.destroy();
        }
      };
    }
  }, [isLinesVisible]);

  useEffect(() => {
    if (isLinesVisible && lottieInstance.current) {
      if (isScrolling) {
        setTimeout(() => {
          if (lottieInstance.current && isScrolling) {
            lottieInstance.current.play();
          }
        }, animationDelay);
      } else if (lottieInstance.current) {
        lottieInstance.current.pause();
      }
    }
  }, [isScrolling, isLinesVisible, animationDelay]);

  return (
    <Container
      justify={'flex-start'}
      alignments={'flex-start'}
      background={theme.colors.primary}
    >
      <PageBody>
        <SectionTitle
          headerInfo={{
            title: 'HOW IT WORKS',
            subtitle: '',
            description: '',
          }}
        />
        <TitleWrapper>
          <PageTitle>Observability made easy</PageTitle>
        </TitleWrapper>
        <AnimationContainer>
          <div style={{ position: 'absolute', top: -16 }} ref={backgroundRef} />
          {DATA.map((data, index) => (
            <AnimatedIllustration key={index} top={index * 900}>
              <LottieAnimation
                ref={(el) => (animationRefs.current[index] = el)}
                {...LottieMap[index + 1]}
              />
            </AnimatedIllustration>
          ))}
        </AnimationContainer>
      </PageBody>
    </Container>
  );
};

export default HowItWorks;
