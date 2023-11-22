import { useState } from 'react';
import './App.css';
import ReactSvgZoomMap from './components/ReactSvgZoomMap';

function App() {
    const [area, setArea] = useState(['', '', '']);
    const [county, town, village] = area;

    return (
        <>
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
        </>
    );
}

export default App;
