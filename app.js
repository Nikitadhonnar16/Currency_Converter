import React, { useState } from "react";
import  ReactDOM  from "react-dom/client";
import {useEffect, useState} from "react";
import { IoMdSwap } from "react-icons/io";

const AppLayout=()=>
{

    useEffect(()=>{
        fetchData();
    },[])

    // to store value of json data, so that we can use it outside.
    const [getvalue, setValue]=useState({}); 

    // to store value of converted rate.
    const [rate, setRate]=useState();

    // fetching realtime currency rate from api
    const fetchData= async()=>
    {
            const data= await fetch(
                "https://www.floatrates.com/daily/usd.json"
                );
           //convert Data into json  
             json = await data.json();
            setValue(json);    
     
    };

    // Converting rate from one currency to another.
    const convertedrate=()=>{
      const from=(document.getElementById("from")).value;
      const to=(document.getElementById("to")).value;
      const amount=(document.getElementById("amount")).value;
      const rate_after_conversion = parseFloat(amount) * parseFloat(getvalue[to].rate) / parseFloat(getvalue[from].rate)
      console.log("****")
      console.log(parseFloat(amount))
      console.log(parseFloat(getvalue[from].rate))
      console.log(parseFloat(getvalue[to].rate))
      console.log(rate_after_conversion)
      setRate(amount + " " + from + " " + "=" + " " +  rate_after_conversion + " " +  to)
    }

    // creating dropdown list of all options from json api which we fetched earlier. 
    const optionslist = [];
    for (const cur in getvalue){
        optionslist.push(<option key={cur} value={cur}>{cur}</option>)
     }


     const changevalue=()=>
     {
      var from=document.getElementById("from");
	    var to=document.getElementById("to");
	    var temp;
	    temp=from.value;
	    from.value=to.value;
	    to.value=temp;
     }

    return(
        <div className="app">
          <div className="container">
            <h1 className="my-5">Currency Converter</h1>
              <div className="row">
                <div className="col-sm-3">
                  <h3>Amount</h3>
                  <input className=" dropdown" type="text" name="" id="amount" placeholder="Please enter amount" />
                    <div className="my-3">
                      <button className="mt-2 convert" id="amounts" onClick={convertedrate}>Convert</button>
                    </div>
                  <h4>Converted Amount : <br></br>{rate}</h4>
                </div> 
                <div className="col-sm-3 dropdown ">
                  <div className="col-sm-3 ">
                    <h3>From</h3>
                    <select name="" id="from" className="dropdown">
                      {optionslist}
                    </select>
                  </div>

                </div>

                <div className="col-sm-3 mt-5  " >
                    {/* <button className="btn-primary " onClick={changevalue}>swap</button> */}
                    <IoMdSwap  className="swap ce" onClick={changevalue}/>
                  </div>
                <div className="col-sm-3 ">

                  <h3>To</h3>
                  <select className="dropdown" name="" id="to">
                    {optionslist}
                  </select>
                </div>
              </div>
          </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout/>);