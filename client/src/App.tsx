import React from 'react';
import './App.css';

import {Form} from "./components/form";
import {useSearch} from "./useSearch";


const Room = (props: {
    hotelName: string,
    price: number,
    beds:string
}) => {
    return <div>
        hotelName:{props.hotelName}
        price:{props.price}
        beds:{props.beds}
    </div>
}

function App() {
    const {onSearch, results} = useSearch()

    return (
        <div className="App">
            <Form onSearch={onSearch}/>
            {
                results.map(result => <Room key={result.id} hotelName={result.hotelName} price={result.price} beds={result.beds}/>)
            }
        </div>
    );
}

export default App;
