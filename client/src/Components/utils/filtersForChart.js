export class FilterForChart {
    fetch(dataset) {
      const onLoadDataset = [];
      let timestamp;
  
      for (let i = 0; i < dataset.length; i++) {
        const { name, datapoints } = dataset[i];
        const tempDataset = { name: name, datapoints: [] };
  
        tempDataset.datapoints.push(datapoints[0]);
        timestamp = datapoints[0][0];
        console.log('ts before one month', timestamp);
  
        //convert timestamp to UTC to get the month
        const month = new Date(timestamp).getMonth();
  
        console.log('month', month);
  
        timestamp = timestamp + 2.628e9; // timestamp with month difference
  
        do {
          const filteredMonthlyRecord = datapoints.find(
            (x) => x[0] === timestamp
          );
  
          if (filteredMonthlyRecord) {
            // if record is found increse time stamp by one month
            timestamp = timestamp + 2.628e9; // timestamp with one month difference
            tempDataset.datapoints.push(filteredMonthlyRecord);
          } else {
            tempDataset.datapoints.push(datapoints[datapoints.length - 1]);
            timestamp = datapoints[datapoints.length - 1][0];
            timestamp = undefined; // timestamp with one month difference
  
            onLoadDataset.push(tempDataset);
          }
        } while (timestamp != undefined);
      }
  
      if (onLoadDataset.length) {
        return onLoadDataset;
      }
    }
    fetchTimeRangeData(starttime, endtime, datasource) {
      const timeRangeResult = [];
      for (let i = 0; i < datasource.length; i++) {
        const { name, datapoints } = datasource[i];
        const tempDataset = { name: name, datapoints: [] };
        const filteredPoints = datapoints.filter(
          (p) => p[0] >= starttime && p[0] <= endtime
        );
        if (filteredPoints.length) {
          tempDataset.datapoints = filteredPoints;
          timeRangeResult.push(tempDataset);
        }
      }
      return timeRangeResult;
    }
  }
  