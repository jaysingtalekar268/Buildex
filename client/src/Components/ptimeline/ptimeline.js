import { Container } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useRef, useState, useEffect } from 'react';

function Ptimeline() {
    const username = JSON.parse(localStorage.getItem("user"));
    const isLoading = useRef(true); // Loading state
    const [TLData, setTData] = useState("");
    const [TLArray, setTLArray] = useState("");
    const gettimeline = async () => {
        let TimeResult = await fetch("http://localhost:3001/getusertimeline", {
            method: 'post',
            body: JSON.stringify({
                name: username.name

            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        TimeResult = await TimeResult.json();


        if (TimeResult) {
            console.warn("date " + TimeResult[0].project_id[0].deadline);
            setTData(TimeResult);
            isLoading.current = false;

        }

    };

    useEffect(() => {
        if (isLoading.current) {
            gettimeline();

            isLoading.current = false;

        }

    }, []);

    useEffect(() => {
        sortdate();

    }, [TLData])


    const sortdate = () => {
        let temp_array = [];
        if (TLData) {
            TLData.map(user =>
                user.project_id.map((project,pindex) => {
                    {
                        // console.warn("craeted " + project.created)
                        temp_array.push({ date: project.created, type: "pcreated" ,pid:pindex,tid:-1})
                    } {
                        // console.warn("deadline" + project.deadline)
                        temp_array.push({ date: project.deadline, type: "pdeadline" ,pid:pindex,tid:-1})
                    }
                    {
                        project.timeline.map((t,tindex) => {
                            // console.warn("TMline" + t.time)
                            temp_array.push({ date: t.time, type: "timeline" ,pid:pindex,tid:tindex})
                        }
                        )
                    }
                }

                ));

                for (let i=0 ;i<temp_array.length;i++) {
                    for(let j=0;j<temp_array.length;j++)
                    {
                        if(j+1<temp_array.length && new Date(temp_array[j].date).getTime()>new Date(temp_array[j+1].date).getTime())
                        {
                            let temp=temp_array[j].date;
                            temp_array[j].date=temp_array[j+1].date;
                            temp_array[j+1].date=temp;

                            temp=temp_array[j].type;
                            temp_array[j].type=temp_array[j+1].type;
                            temp_array[j+1].type=temp;

                             temp=temp_array[j].pid;
                            temp_array[j].pid=temp_array[j+1].pid;
                            temp_array[j+1].pid=temp;

                             temp=temp_array[j].tid;
                            temp_array[j].tid=temp_array[j+1].tid;
                            temp_array[j+1].tid=temp;
                        }
                   
                    }
                  }

                  console.warn(new Date(temp_array[0].date));
                  console.warn(new Date(temp_array[temp_array.length-1].date));

                  setTLArray(temp_array);
        }
    };


    const STimeline = () => {

        if (TLData && TLArray) {
            return (
                 
                
                    <VerticalTimeline >
                        { 
                        TLArray.map(titem =>
                            
                        <VerticalTimelineElement >
                            <h3 className="vertical-timeline-element-title">{TLData[0].project_id[titem.pid].name}</h3>
                        <h4 className="vertical-timeline-element-subtitle">{TLData[0].project_id[titem.pid].desc}</h4>
                            {titem.tid>=0?<p>{TLData[0].project_id[titem.pid].timeline[titem.tid].timeline_body+"-"+TLData[0].project_id[titem.pid].timeline[titem.tid].timeline_sender}</p>:null }
                            {titem.type=="pcreated"?<p>Created on {TLData[0].project_id[titem.pid].created}</p>:null }
                            {titem.type=="pdeadline"?<p>deadline {TLData[0].project_id[titem.pid].deadline+" status "+TLData[0].project_id[titem.pid].pstatus}</p>:null }
                        </VerticalTimelineElement>
                        )
                }
            
                    </VerticalTimeline>
                
            );

        }

    };


    if (TLData) {
        return (
            <Container>
                <STimeline></STimeline>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date="2011 - present"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title">Creative Director</h3>
                        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                        <p>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date="2011 - present"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title">Creative Director</h3>
                        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                        <p>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </Container>
        );
    }
    else {
        <Container>Wating for data </Container>
    }
};

export default Ptimeline;