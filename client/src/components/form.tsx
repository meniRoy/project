import React, {useEffect, useRef, useState} from 'react';
import Select from "react-select";
import {options} from "../options";

type SearchParams = {
    startDate: string,
    endDate: string,
    locationId: number,
    groupSize: number
};
type props = {
    onSearch: (search: SearchParams) => any
}
const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US');
}

export const Form = (props: props) => {
    const [startDate, setStartDate] = useState<string>()
    const [endDate, setEndDate] = useState<string>()
    const [groupSize, setGroupSize] = useState<number>(1)
    const [locationId, setLocationId] = useState<{ value: number, label: string }>()


    return <div>
        <div>
            <label>group size</label>
            <input value={groupSize} onChange={e => setGroupSize((parseInt(e?.target?.value)))} type="number"
                   name="groupSize"/>
        </div>
        <div>
            <label>Start date:</label>

            <input type="date" onChange={e => setStartDate(e.target.value)}/>
        </div>
        <div>
            <label>end date:</label>

            <input type="date"
                   onChange={e => setEndDate(e.target.value)}
            />
        </div>
        <Select
            value={locationId}
            onChange={(param: any) => setLocationId(param)}
            options={options as any}
        />
        {/*should be disabled until all fields are full*/}
        <button onClick={() => props.onSearch({
            startDate: formatDate(startDate!),
            endDate: formatDate(endDate!),
            locationId: locationId?.value!,
            groupSize: groupSize!
        })}>search
        </button>
    </div>
}