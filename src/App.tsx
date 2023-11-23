import { useState } from 'react';
import { styled } from 'styled-components';
import '@/App.css';

import Card from '@/components/Card';
import ReactSvgZoomMap from '@/components/ReactSvgZoomMap/index.jsx';

const Wrapper = styled.div`
    display: flex;
`;

const LeftWrapper = styled.div`
    flex-basis: 30%;
`;

const RightWrapper = styled.div`
    flex-basis: 60%;
`;

function App() {
    const [area, setArea] = useState(['', '', '']);
    const [county, town, village] = area;

    return (
        <Wrapper>
            <LeftWrapper>
                <Card />
            </LeftWrapper>
            <RightWrapper>
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
            </RightWrapper>
        </Wrapper>
    );
}

export default App;
