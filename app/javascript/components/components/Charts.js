import { Chart } from "react-google-charts";
import React, { useEffect, useState } from "react";


const Charts = ({ chart, current_user, readChart }) => {

  const chartData = () => {
    let data = [["Style", "Amount"]]
    chart?.map((entry)=> {
    return data.push(entry)
  })
  return data
} 
useEffect(() => {
  readChart(current_user.id);
}, []);

  const options = {
    title: "Your Liked Beer Styles",
  };

  return (
    <>
    <Chart
      chartType="PieChart"
      data={chartData()}
      options={options}
      width={"100vw"}
      height={"50vh"}
    />
    </>
  )
  
}
export default Charts