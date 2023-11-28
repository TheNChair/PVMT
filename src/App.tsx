import { useState } from 'react';
import { styled } from 'styled-components';
import '@/App.css';

import ReactSvgZoomMap from '@/components/ReactSvgZoomMap/index.jsx';

const Wrapper = styled.div`
    position: relative;
`;

function App() {
    const [area, setArea] = useState(['', '', '']);
    const [county, town, village] = area;
    const [hoverArea, setHoverArea] = useState(['', '', '']);

    return (
        <Wrapper>
            <ReactSvgZoomMap
                countyJsonSrc='topojsons/taiwan-county.json'
                townJsonSrc='topojsons/taiwan-town.json'
                villageJsonSrc='topojsons/taiwan-village.json'
                county={county}
                town={town}
                village={village}
                hoverArea={hoverArea.filter((item) => item)}
                onAreaClick={(newArea: string[]) => {
                    setArea(newArea);
                }}
                onAreaHover={(newHoverArea: string[]) => setHoverArea(newHoverArea)}
                onAreaLeave={() => setHoverArea([])}
            />
        </Wrapper>
    );
}

export default App;
