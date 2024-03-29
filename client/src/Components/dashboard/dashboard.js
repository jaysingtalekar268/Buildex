import './dashboard.css'
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";


function Dashboard() {

    const username = JSON.parse(localStorage.getItem("user"));
    const [userProjectData, setUPdata] = useState("");
    const [compTask, setCTask] = useState(0);
    const [incoTask, setITask] = useState(0);
    const [overTask, setOTask] = useState(0);
    const [totalTask, setTTask] = useState(0);
    const [catg, setCatg] = useState([]);
    const [catgCount, setCCount] = useState([]);

    const [barChartData, setBChart] = useState(
        {
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: catg
                    // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                }
            },
            series: [{
                name: 'series-1',
                //   data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
                data: catgCount
            }]
        }

    );
    const [pieData, setPData] = useState([]);

    const [pieCharData, setPChart] = useState(
        {
            options: { labels: ["Completed", 'Incompleted'] },
            series: pieData

        }

    );

    const getProject = async () => {
        let userProjectResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/getuserprojectstatus`, {
            method: "post",
            body: JSON.stringify({
                name: username.name,

            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        // userProjectResult = await userProjectResult.json();
        userProjectResult = await userProjectResult.json();
        console.warn("before da " + userProjectResult);
        if (userProjectResult) {
            setUPdata(userProjectResult);

        }

        console.warn("after da " + userProjectData);
    };

    useEffect(() => {
        getProject()
    }, []);

    useEffect(() => {
        setCTask(0);
        setITask(0);
        setOTask(0);
        setTTask(0);
        getProjectStatus();
    }, [userProjectData]);



    const getProjectStatus = () => {

        // alert("its projectstaus");  
        let c = 0;
        let i = 0;
        let o = 0;
        let t = 0;
        if (userProjectData[0]) {
            console.warn(" its if ");
            userProjectData.map(x => x.project_id.map(y => {

                console.warn("y  " + y.pstatus)
                if (y.pstatus == "comp") {
                    c++;
                }
                else if (y.pstatus == "incomp") {
                    i++;
                    console.log("catg " + catg.find(ele => ele == y.catg));
                    if (catg.find(ele => ele == y.catg)) {
                        catg.map((item, index) => {
                            if (item == y.catg) {
                                console.log("be catg " + catg[index] + " count " + catgCount[index]);
                                let temp = catgCount;
                                temp[index]++;
                                setCCount(temp);

                                console.log("afcatg " + catg[index] + " count " + catgCount[index]);
                            }
                        });

                    }
                    else {
                        let temp = catg;
                        temp.push(y.catg);
                        setCatg(temp);
                        temp = catgCount;
                        temp.push(1);
                        setCCount(temp);
                    }


                }
                else if (y.pstatus == "ovdue") {
                    o++;
                }

                // console.log("catg " + catg.find(ele => ele == y.catg));
                // if (catg.find(ele => ele == y.catg)) {
                //     catg.map((item, index) => {
                //         if (item == y.catg) {
                //             console.log("be catg " + catg[index] + " count " + catgCount[index]);
                //             let temp = catgCount;
                //             temp[index]++;
                //             setCCount(temp);

                //             console.log("afcatg " + catg[index] + " count " + catgCount[index]);
                //         }
                //     });

                // }
                // else {
                //     let temp = catg;
                //     temp.push(y.catg);
                //     setCatg(temp);
                //     temp = catgCount;
                //     temp.push(1);
                //     setCCount(temp);
                // }

            }));

        }
        else {
        }
        setCTask(c);
        setITask(i);
        setOTask(o);
        setTTask(c + i + o);
        setPData([c, i])


    };
    return (
        <div class="container row row-cols-1 row-cols-md-2 g-4 bg-gradient bg-opacity-75 text-black">
            <div class="col">
                <div class="card">
                    <div class="card-header">Completed Tasks</div>
                    <div class="card-body">{compTask}</div>
                    {/* <button onClick={getProjectStatus}>get project</button> */}
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header">Incompleted Tasks</div>
                    <div class="card-body">{incoTask}</div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header">Overdue Tasks</div>
                    <div class="card-body">{overTask}</div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header">Total Tasks</div>
                    <div class="card-body">{totalTask}</div>
                </div>
            </div>

            <div class="col">
                <div class='card'>
                    {catg[0] ? (
                        <Chart options={barChartData.options} series={barChartData.series} type="bar" width={500} height={320} />
                    ) : (
                        <div>Waiting for data</div>
                    )}
                </div>
            </div>
            <div class='col'>
                <div class='card'>
                    <Chart options={pieCharData.options} series={pieData} type="donut" width="380" />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;