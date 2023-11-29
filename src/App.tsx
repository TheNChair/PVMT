import { useState, Suspense, lazy } from 'react';
import { styled, keyframes } from 'styled-components';
import '@/App.css';

import Loading from '@/assets/loading.png';

const Wrapper = styled.div`
    position: relative;
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.img`
    animation: ${rotate} 2s linear infinite;
`;

// 使用 lazy 加載 ReactSvgZoomMap 組件
const ReactSvgZoomMap = lazy(() => import('@/components/ReactSvgZoomMap/index.jsx'));

function App() {
    const [area, setArea] = useState<{ [key: string]: string }>({});
    const { COUNTYNAME: county, TOWNNAME: town, VILLNAME: village } = area;
    const [hoverArea, setHoverArea] = useState<{ [key: string]: string }>({});

    return (
        <Wrapper>
            <Suspense
                fallback={
                    <LoadingWrapper>
                        <LoadingIcon src={Loading} alt='loading' />
                    </LoadingWrapper>
                }>
                <ReactSvgZoomMap
                    countyJsonSrc='topojsons/taiwan-county.json'
                    townJsonSrc='topojsons/taiwan-town.json'
                    villageJsonSrc='topojsons/taiwan-village.json'
                    county={county}
                    town={town}
                    village={village}
                    clickArea={area}
                    hoverArea={hoverArea}
                    onAreaClick={(newArea: { [key: string]: string }) => {
                        setArea(newArea);
                    }}
                    onAreaHover={(newHoverArea: { [key: string]: string }) => setHoverArea(newHoverArea)}
                    onAreaLeave={() => setHoverArea({})}
                />
            </Suspense>
        </Wrapper>
    );
}

export default App;
