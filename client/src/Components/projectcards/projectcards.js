import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import './projectcards.css';
function ProjectCards() {

    let username = localStorage.getItem("user");
    const [userProjectList, setPList] = useState();
    username = JSON.parse(username);
    const getuserproject = async () => {
        let userProjectResult = await fetch("http://localhost:3001/getuserproject", {
            method: 'post',
            body: JSON.stringify({
                name: username.name
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        userProjectResult = await userProjectResult.json();
        if (userProjectResult) {
            console.warn("i resp" + userProjectResult[0].project_id[0].name)
            if (userProjectResult[0].project_id) {
                setPList(userProjectResult);
            }

        }

        console.warn("after user" + userProjectResult[0].project_id)

        // userProjectResult = await userProjectResult.json();

        // if (userProjectResult.project_id) {
        //     console.warn(userProjectResult.project_id);
        //     setPList(userProjectResult.project_id);
        // }

    };

    useEffect(() => {
        getuserproject();
    }, []);

    const ename = (names) => {
       
         if (userProjectList) {

            console.warn("ulist" + userProjectList[0].project_id.name);


            // return names.map(name => <option value={name._id}>{name.name + " " + name._id}</option>);
            return (
                names.map(name =>
                    (
                        name.project_id.map( xname=>
                    <Card className="cardContainer ">
                        <Card.Body>


                            <Card.Title> {xname.name}</Card.Title>
                            <Card.Text>
                                {xname.desc}
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>

                    </Card>
                        )
                    )
                )
            )


        }
        else {
            return (<span>wating to get user projects</span>);
        }
    }

    return (
        <div className="cardDiv ">

            {/* <Card className="cardContainer ">
                <Card.Body>


                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>

            </Card> */}
            {ename(userProjectList)}
        </div>
    );
}

export default ProjectCards;