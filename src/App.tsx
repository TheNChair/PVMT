import { useState } from 'react';
import { styled } from 'styled-components';
import '@/App.css';

import ReactSvgZoomMap from '@/components/ReactSvgZoomMap/index.jsx';

const Wrapper = styled.div`
    position: relative;
`;

function App() {
    const [area, setArea] = useState<{ [key: string]: string }>({});
    const { COUNTYNAME: county, TOWNNAME: town, VILLNAME: village } = area;
    const [hoverArea, setHoverArea] = useState<{ [key: string]: string }>({});

    return (
        <Wrapper>
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
        </Wrapper>
    );
}

export default App;
