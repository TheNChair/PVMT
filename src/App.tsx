import { useState } from 'react';
import { styled } from 'styled-components';
import '@/App.css';

import ReactSvgZoomMap from '@/components/ReactSvgZoomMap/index.jsx';

const Wrapper = styled.div`
    height: 100vh;
    position: relative;
`;

function App() {
    const [area, setArea] = useState(['', '', '']);
    const [county, town, village] = area;

    return (
        <Wrapper>
            <ReactSvgZoomMap
                countyJsonSrc='public/topojsons/taiwan-county.json'
                townJsonSrc='public/topojsons/taiwan-town.json'
                villageJsonSrc='public/topojsons/taiwan-village.json'
                county={county}
                town={town}
                village={village}
                onAreaClick={(newArea: string[]) => {
                    setArea(newArea);
                }}
            />
        </Wrapper>
    );
}

export default App;
