const chartOptions = {
    scrollbar: {
      liveRedraw: false,
    },
  
    title: {
      text: 'Stock Chart',
    },
  
    subtitle: {
      text: 'Lazy loading of multiple signals',
    },
  
    rangeSelector: {
      dropdown: 'always',
      buttons: [
        {
          type: 'hour',
          count: 1,
          text: '1 Hour',
        },
        {
          type: 'hour',
          count: 2,
          text: '2 Hours',
        },
        {
          type: 'hour',
          count: 3,
          text: '3 Hours',
        },
        {
          type: 'hour',
          count: 6,
          text: '6 Hours',
        },
      ],
      inputEnabled: false, // it supports only days
      selected: 0, // all
    },
  
    yAxis: {
      floor: 0,
      opposite: false,
      title: {
        text: 'Engineering Unit %',
      },
    },
    tooltip: {
      useHTML: true,
      borderWidth: 0,
      distance: 0,
      pointFormat: `<div style="color:{series.color}"><b>{series.name}</b></div>
                    <div> <b>value:{point.y}</b></div>`,
  
      valueDecimals: 2,
      padding: 2,
      split: true,
    },
    plotOptions: {
      series: {
        // compare: 'percent',
        showInNavigator: true,
        dataGrouping: {
          enabled: false,
        },
      },
    },
  };
  
  export { chartOptions };