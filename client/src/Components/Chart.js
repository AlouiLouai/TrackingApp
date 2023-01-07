import React, { useState, useEffect, useRef, Fragment } from 'react';
import { MenuItem, Select } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { chartOptions } from './utils/chartOptions';
import { I } from '../mock-data/i';
import { J } from '../mock-data/j';
import { FilterForChart } from './utils/filtersForChart';




function Chart() {
    
const names = ['i', 'j']; // these are the name I want to filter from sourcedata
const mainDataSource = [
    { name: 'i', datapoints: I.datapoints },
    { name: 'j', datapoints: J.datapoints },
];

const datasource = mainDataSource.filter(
    (elem) => !!names.find((name) => name == elem.name)
);

const filter = new FilterForChart();
    const externalZoomDropdown = [
        { value: 3.6e6, text: '1 Hour' },
        { value: 7.2e6, text: '2 Hours' },
        { value: 1.08e7, text: '3 Hours' },
        { value: 2.16e7, text: '6 Hours' },
    ];
    let currentTimestamp = 1636047000000;
    const chartComponentRef = useRef(null);
    const [selectedExternalZoomLevel, setSelectedExternalZoomLevel] = useState({
        value: 0,
        text: 'select',
    });
    const [options, setOptions] = useState(null);

    useEffect(() => {
        setSelectedExternalZoomLevel(externalZoomDropdown[0]);
        const cts5 = currentTimestamp - externalZoomDropdown[0].value; // 1 hour diff
        loadInitialData(cts5, currentTimestamp);
    }, []);

    function loadInitialData(starttime, endtime) {
        const seriesOptions = [];
        // This has to be an API call.
        //const dataset = backend.fetch(datasource);
        const dataset = filter.fetchTimeRangeData(starttime, endtime, datasource);
        console.log('assume you have gotten dataset from BE');
        console.log('found records', dataset);

        for (const sd of dataset) {
            // success(sd.datapoints, sd.signalname, true);
            var i = names.indexOf(sd.name);
            seriesOptions[i] = {
                name: sd.name,
                data: sd.datapoints,
            };
        }
        setOptions({
            ...chartOptions,
            chart: {
                zoomType: 'x',
            },
            xAxis: {
                events: {
                    afterSetExtremes,
                },
                minRange: 3600, // one second
            },
            series: seriesOptions
        });
    }

    function afterSetExtremes(starttime, endtime, e) {
        if (!starttime || !endtime) {
            return;
        }
        console.log('highchart........', Highcharts);
        const seriesOptions = [];
        // const { chart } = e.target;
        // chart.showLoading('Loading data from server...');
        const startttime = Math.round(starttime);
        const endttime = Math.round(endtime);

        const dataset = filter.fetchTimeRangeData(
            startttime,
            endttime,
            datasource
        );
        console.log('found records', dataset);
        if (dataset.length) {
            for (const sd of dataset) {
                // success(sd.datapoints, sd.signalname, true);
                var i = names.indexOf(sd.name);
                seriesOptions[i] = {
                    name: sd.name,
                    data: sd.datapoints,
                };
            }

            const chart = chartComponentRef?.current?.chart;

            if (chart) {
                setOptions({
                    series: seriesOptions,
                });

                chart.zoomOut();
            }
        }
    }

    const onZoomLevelChange = (e) => {
        console.log('dropdown change event');
        const f = externalZoomDropdown.find((x) => x.value === e.target.value);
        if (f) {
            setSelectedExternalZoomLevel(f);
            afterSetExtremes(currentTimestamp - e.target.value, currentTimestamp);
        }
    };

    return (
        <Fragment>
            <div> External Dropdown </div>
            <Select
                value={selectedExternalZoomLevel.value}
                onChange={onZoomLevelChange}
            >
                {externalZoomDropdown.map((tf) => (
                    <MenuItem value={tf.value}>{tf.text}</MenuItem>
                ))}
            </Select>
            <hr />
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </Fragment>
    );
};

export default Chart  