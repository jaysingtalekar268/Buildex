import { useEffect, useState } from "react";
import { Container, Tabs, Tab, nav, div } from "react-bootstrap";


function Profile() {

    const username = JSON.parse(localStorage.getItem("user"));

    const [tabKey, setTab] = useState("personal");

    const [UName, setUName] = useState("")
    const [UEmail, setUEmail] = useState("")
    const [UPhone, setUPhone] = useState("")
    const [UPwd, setUPwd] = useState("")

    const [UData, setUData] = useState("");


    const getuserdetails = async () => {
        let userdata = await fetch(`${process.env.REACT_APP_SERVER_URL}/getuseraccount`, {
            method: 'post',
            body: JSON.stringify({
                _id: username._id


            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        userdata = await userdata.json();

        if (userdata) {
            setUData(userdata);
            setUName(userdata.name);
            setUEmail(userdata.email);
            setUPhone(userdata.phone);
        }

    };

    const modifyDetails = async () => {
        let modifyResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/usermodify`, {
            method: 'post',
            body: JSON.stringify({
                _id: username._id,
                name: UName,
                phone: UPhone,
                email: UEmail


            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        modifyResult = await modifyResult.json();

        if (modifyResult) {
            alert("Details modified");
        }

    };
    const modifyPwd = async () => {
        if (UPwd.length == 0) {
            alert(" Enter Password");
        }
        else {
            let modifyResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/usermodify`, {
                method: 'post',
                body: JSON.stringify({
                    _id: username._id,
                    password: UPwd

                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            modifyResult = await modifyResult.json();

            if (modifyResult) {
                alert("password modified");
            }
        }

    };

    useEffect(() => {
        getuserdetails();
    }, []);

    return (
<div class="bg-opacity-75 position-absolute top-50 start-50 translate-middle shadow bg-body rounded bg-info">
    <div class='fs-5 text-center'>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setTab("personal")}>
                    Personal
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setTab("security")}>
                    Security
                </a>
            </li>
        </ul>
        <div class="accountMenuInfo">
            <div class='card align-items-center p-3'>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        {
                            UData._id ?
                                <>
                                    <div class="form-floating mb-3">
                                        <input type="text" className="form-control input" onChange={e => setUName(e.target.value)} value={UName} defaultValue={UData.name} placeholder="loading.." />
                                        <label for="floatingName">User Name</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input type="email" className="form-control input" onChange={e => setUEmail(e.target.value)} value={UEmail} defaultValue={UData.email} placeholder="loading.." />
                                        <label for="floatingEmail">Email</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input type="tel" className="form-control input" onChange={e => setUPhone(e.target.value)} value={UPhone} defaultValue={UData.phone} placeholder="loading.." />
                                        <label for="floatingPhone">Phone</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input type="tel" className="form-control input" value={username.role} defaultValue={UData.phone} placeholder="loading.." />
                                        <label for="floatingPhone">Role</label>
                                    </div>

                                    <button class="btn btn-primary" onClick={modifyDetails}>Change Details</button>
                                </>
                                : <p>loading data</p>
                        }
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        {
                            UData._id ?
                                <div class="form-floating mb-3">
                                    <input type="password" className="form-control input" id="floatingPassword" placeholder="Password" onChange={e => setUPwd(e.target.value)} value={UPwd} />
                                    <label for="floatingPassword">Enter New Password</label>
                                    <button class="btn btn-primary mt-3" onClick={modifyPwd}>Change Password</button>
                                </div>
                                : <p>loading data</p>
                        }
                    </div>
                    <div class="tab-pane fade" id="DProject" role="tabpanel" aria-labelledby="pills-profile-tab">
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    );
}

export default Profile;