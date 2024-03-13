import React, { useEffect, useState } from "react";
import "../css/modal.css";
import Close from "../icons/close.png";
import DownArrow from "../icons/down-arrow.png";
import Document from "../icons/document.png";
import Photo from "../icons/photo.png";
import Clock from "../icons/clock.png";

function Modal(props) {
    const [importDropdownOpen, setImportDropdownOpen] = useState(false);
    const [importName, setImportName] = useState("");
    const [file, setFile] = useState();
    const [toleranceSwitchOn, setToleranceSwitchOn] = useState("OFF");
    const [socialDistancing, setSocialDistancing] = useState(true);
    const [splitSchedule, setSplitSchedule] = useState("multiple");
    const [tOneClientDropdown, setTOneClientDropdown] = useState(false);
    const [tTwoClientDropdown, setTTwoClientDropdown] = useState(false)
    const [tThreeClientDropdown, setTThreeClientDropdown] = useState(false)
    const [tFourClientDropdown, setTFourClientDropdown] = useState(false)
    const [tOneClientName, setTOneClientName] = useState("Select Client");
    const [tTwoClientName, setTTwoClientName] = useState("Select Client");
    const [tThreeClientName, setTThreeClientName] = useState("Select Client");
    const [tFourClientName, setTFourClientName] = useState("Select Client");

    //closes modal when pressing escape
    document.addEventListener("keydown", (event) => {
        if(event.key === 'Escape') {
            props.onModalClose();
        }
    })

    //function to close all of the dropdowns on click on the modal
    const closeDropDowns = () => {
        setImportDropdownOpen(false);
        setTOneClientDropdown(false);
        setTTwoClientDropdown(false);
        setTThreeClientDropdown(false);
        setTFourClientDropdown(false);
    }

    //use effect for functionality of the dropdown menus
    useEffect(() => {
        if(importDropdownOpen) {
            document.querySelector(".import-dropdown .dropdown-content").classList.add("import-dropdown-open");
        } else {
            document.querySelector(".import-dropdown .dropdown-content").classList.remove("import-dropdown-open");
        }

        if(splitSchedule === "single") {
            if(tOneClientDropdown) {
                document.querySelector(".split-schedule-dropdown-1 .dropdown-content").classList.add("schedule-dropdown-open");
            } else if(tOneClientDropdown === false){
                document.querySelector(".split-schedule-dropdown-1 .dropdown-content").classList.remove("schedule-dropdown-open");
            }
        } else {
            if(tOneClientDropdown) {
                document.querySelector(".split-schedule-dropdown-1 .dropdown-content").classList.add("schedule-dropdown-open");
            } else if(tOneClientDropdown === false){
                document.querySelector(".split-schedule-dropdown-1 .dropdown-content").classList.remove("schedule-dropdown-open");
            }
            if(tTwoClientDropdown) {
                document.querySelector(".split-schedule-dropdown-2 .dropdown-content").classList.add("schedule-dropdown-open");
            } else if(tTwoClientDropdown === false) {
                document.querySelector(".split-schedule-dropdown-2 .dropdown-content").classList.remove("schedule-dropdown-open");
            }
            if(tThreeClientDropdown) {
                document.querySelector(".split-schedule-dropdown-3 .dropdown-content").classList.add("schedule-dropdown-open");
            } else if(tThreeClientDropdown === false) {
                document.querySelector(".split-schedule-dropdown-3 .dropdown-content").classList.remove("schedule-dropdown-open");
            }
            if(tFourClientDropdown) {
                document.querySelector(".split-schedule-dropdown-4 .dropdown-content").classList.add("schedule-dropdown-open");
            } else if(tFourClientDropdown === false) {
                document.querySelector(".split-schedule-dropdown-4 .dropdown-content").classList.remove("schedule-dropdown-open");
            }
        }
        

        document.querySelector(".modal-body").onclick = function() {closeDropDowns()};
    }, [splitSchedule, importDropdownOpen, tOneClientDropdown, tTwoClientDropdown, tThreeClientDropdown, tFourClientDropdown])

    //radio switch button useEffect
    useEffect(() => {
        if(toleranceSwitchOn === "ON") {
            document.querySelector(".switch-label").style.backgroundColor = "green";
            document.querySelector(".switch-button").classList.add("right");
        } else { 
            document.querySelector(".switch-label").style.backgroundColor = "grey";
            document.querySelector(".switch-button").classList.remove("right");
        }
    }, [toleranceSwitchOn])

    //handles the uploading of file (drag&drop)
    function handleFileUpload(event) {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    //formats the file size to its corresponding byte size
    function formatBytes(bytes) {
        var marker = 1024; // Change to 1000 if required
        var decimal = 3; // Change as required
        var kiloBytes = marker; // One Kilobyte is 1024 bytes
        var megaBytes = marker * marker; // One MB is 1024 KB
        var gigaBytes = marker * marker * marker; // One GB is 1024 MB
      
        // return bytes if less than a KB
        if(bytes < kiloBytes) return bytes + " Bytes";
        // return KB if less than a MB
        else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
        // return MB if less than a GB
        else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
        // return GB if less than a TB
        else return(bytes / gigaBytes).toFixed(decimal) + " GB";
    }

    //formats the name if it is too long 
    function formatName(name) {
        var nameConv = `${name}`
        if (nameConv.length > 30) return nameConv.slice(0, 30) + "...";
        else return name;
    }

    return (
      <div className="modal" onClick={() => {props.onModalClose()}}>
        <div className="modal-body" onClick={(event) => event.stopPropagation()}>
            <div className="close-icon" onClick={() => props.onModalClose()}>
                <img src={Close} alt="close icon from flaticon.com" width="30px" height="30px" />
            </div>
            <h1 className="header">Document Upload</h1>
            <div className="columns">
                <div className="column-1">
                    <div className="import-dropdown" onClick={() => setImportDropdownOpen(!importDropdownOpen)}>
                        <h5>Select Import Name: &emsp;{importName}</h5>
                        <img src={DownArrow} alt="down arrow from flaticon.com" width="25px" height="25px" />
                        <div className="dropdown-content">
                            <p onClick={(event) => {event.stopPropagation(); setImportName("1st option"); closeDropDowns();}}>1st option</p>
                            <p onClick={(event) => {event.stopPropagation(); setImportName("2nd option"); closeDropDowns();}}>2nd option</p>
                            <p onClick={(event) => {event.stopPropagation(); setImportName("3rd option"); closeDropDowns();}}>3rd option</p>
                            <p onClick={(event) => {event.stopPropagation(); setImportName("4th option"); closeDropDowns();}}>4th option</p>
                        </div>
                    </div>
                    <hr style={{width: "60%", margin: "15px 0 0 25px", borderWidth: "0", height: "2px", color: "rgba(46, 46, 161, 0.137)", backgroundColor: "rgba(46, 46, 161, 0.137)"}}/>
                    <div className="file-import">
                        <h5>Select a manifest that you'd like to import</h5>
                        <div className='upload-box'>
                            <div className="drag-drop-box">
                                <input className="file-input" style={{height: "100%", width: "100%", zIndex: "12", opacity: "0"}} type="file" onChange={handleFileUpload}/>  
                                <img src={Document} alt="document from flaticon.com" width="25px"/>
                                <label htmlFor="file">Drag & Drop Here Or <strong>Browse</strong></label>
                            </div>
                            <div className="upload-btn">Upload Manifest</div>
                        </div>
                        <hr style={{width: "100%", margin: "10px 0 0", borderWidth: "0", height: "1px", color: "rgba(46, 46, 161, 0.137)", backgroundColor: "rgba(46, 46, 161, 0.137)"}}/>
                        {file ? <div className="uploaded-file"><img src={Photo} alt="photograph icon from flaticon.com" /><div className="file-progress"><p>{formatName(file.name)}&emsp;&emsp;&emsp;&emsp;</p><hr style={{marginLeft: "0", width: "70%", borderWidth: "0", height: "2px", color: "rgba(152, 2, 172, 0.404)", backgroundColor: "rgba(152, 2, 172, 0.404)"}}></hr></div><p className="size">{formatBytes(file.size)}</p></div> : null }
                        <hr style={{width: "100%", margin: "0", borderWidth: "0", height: "1px", color: "rgba(46, 46, 161, 0.137)", backgroundColor: "rgba(46, 46, 161, 0.137)"}}/>
                    </div>
                    <hr style={{width: "40%", margin: "10px 0 0 25px", borderWidth: "0", height: "2px", color: "rgba(46, 46, 161, 0.137)", backgroundColor: "rgba(46, 46, 161, 0.137)"}}/>
                    <div className="elapse-data-checking">
                        <h5>Elapse Data Checking:</h5>
                        <p style={{color: "rgb(2, 194, 2)"}}>No Elapsed Dates!</p>
                    </div>
                    <hr style={{width: "40%", margin: "10px 0 0 25px", borderWidth: "0", height: "2px", color: "rgba(46, 46, 161, 0.137)", backgroundColor: "rgba(46, 46, 161, 0.137)"}}/>
                    <div className="tolerance-window">
                        <h5>Tolerance Window:</h5>
                        <div className="tolerance-switch">
                            <input className="switch-checkbox" checked={toleranceSwitchOn==="ON"} id={`switch-new`} type="checkbox"/>
                            <div className="toggle">
                                <label className="switch-label" htmlFor={`switch-new`} onClick={() => {toleranceSwitchOn === "ON" ? setToleranceSwitchOn("OFF") : setToleranceSwitchOn("ON")}}>
                                    <span className="switch-button" />  
                                </label>
                                <h4 style={{margin: "0 15px", paddingRight: "10px", textAlign: "center", borderRight: "2.5px solid rgba(46, 46, 161, 0.137)", fontWeight: "normal"}}>Toggle {toleranceSwitchOn}</h4>
                                <img src={Clock} alt="clock from flaticon.com" width="25px"/>
                                <h5 style={{marginLeft: "10px", fontWeight: "normal"}}>Select Tolerance Level</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column-2">
                    <div className="schedule-split">
                        <h5>Split schedule using social distancing?</h5>
                        <div className="schedule-split-checkbox">
                            <label>
                                <input className="checkbox-round yes" type="checkbox" onChange={() => {}} checked={socialDistancing} onClick={() => setSocialDistancing(true)}/><span onClick={() => setSocialDistancing(true)}>Yes</span>
                            </label>
                            <label>
                                <input className="checkbox-round no" type="checkbox" onChange={() => {}} checked={!socialDistancing} onClick={() => setSocialDistancing(false)}/><span onClick={() => setSocialDistancing(true)}>No</span>
                            </label>
                        </div>
                    </div>
                    <hr style={{width: "70%", margin: "15px 0", borderWidth: "0", height: "2px", color: "rgba(46, 46, 161, 0.137)", backgroundColor: "rgba(46, 46, 161, 0.137)"}}/>
                    <div className="location-checking">
                        <h5>Location Checking:</h5>
                        <h6>All Available!</h6>
                    </div>
                    <hr style={{width: "70%", margin: "15px 0", borderWidth: "0", height: "2px", color: "rgba(46, 46, 161, 0.137)", backgroundColor: "rgba(46, 46, 161, 0.137)"}}/>
                    <div className="client-selection">
                        <div className="client-selection">
                            <h5>Client:</h5>
                            <div className="client-selection-checkbox">
                                <label>
                                    <input className="checkbox-round yes" type="checkbox" onChange={() => {}} checked={Boolean(splitSchedule==="single")} onClick={() => setSplitSchedule("single")}/><span onClick={() => setSplitSchedule("single")}>Single</span>
                                </label>
                                <label>
                                    <input className="checkbox-round no" type="checkbox" onChange={() => {}} checked={Boolean(splitSchedule==="multiple")} onClick={() => setSplitSchedule("multiple")}/><span onClick={() => setSplitSchedule("multiple")}>Multiple</span>
                                </label>
                            </div>
                            {splitSchedule === "single" ? <div className="dropdown"><span>Testing Center 1</span>
                                                            <div className="split-schedule-dropdown-1" onClick={() => setTOneClientDropdown(!tOneClientDropdown)}>
                                                                <h5>&emsp;{tOneClientName}</h5>
                                                                <img src={DownArrow} alt="down arrow from flaticon.com" width="25px" height="25px" />
                                                                <div className="dropdown-content">
                                                                    <p onClick={(event) => {event.stopPropagation(); setTOneClientName("1st option"); closeDropDowns();}}>1st option</p>
                                                                    <p onClick={(event) => {event.stopPropagation(); setTOneClientName("2nd option"); closeDropDowns();}}>2nd option</p>
                                                                    <p onClick={(event) => {event.stopPropagation(); setTOneClientName("3rd option"); closeDropDowns();}}>3rd option</p>
                                                                    <p onClick={(event) => {event.stopPropagation(); setTOneClientName("4th option"); closeDropDowns();}}>4th option</p>
                                                                </div>
                                                            </div>
                                                            <img src={Clock} alt="clock from flaticon.com" width="25px" height="25px" style={{margin: "auto 15px"}}/>
                                                          </div> : 
                            <div className="dropdowns">
                                <div className="dropdown">
                                    <span>Testing Center 1</span>
                                    <div className="split-schedule-dropdown-1" onClick={() => setTOneClientDropdown(!tOneClientDropdown)}>
                                        <h5>&emsp;{tOneClientName}</h5>
                                        <img src={DownArrow} alt="down arrow from flaticon.com" width="25px" height="25px" />
                                        <div className="dropdown-content">
                                            <p onClick={(event) => {event.stopPropagation(); setTOneClientName("1st option"); closeDropDowns();}}>1st option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTOneClientName("2nd option"); closeDropDowns();}}>2nd option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTOneClientName("3rd option"); closeDropDowns();}}>3rd option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTOneClientName("4th option"); closeDropDowns();}}>4th option</p>
                                        </div>
                                    </div>
                                    <img src={Clock} alt="clock from flaticon.com" width="25px" height="25px" style={{margin: "auto 15px"}}/>
                                </div>
                                <div className="dropdown">
                                    <span>Testing Center 2</span>
                                    <div className="split-schedule-dropdown-2" onClick={() => setTTwoClientDropdown(!tTwoClientDropdown)}>
                                        <h5>&emsp;{tTwoClientName}</h5>
                                        <img src={DownArrow} alt="down arrow from flaticon.com" width="25px" height="25px" />
                                        <div className="dropdown-content">
                                            <p onClick={(event) => {event.stopPropagation(); setTTwoClientName("1st option"); closeDropDowns();}}>1st option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTTwoClientName("2nd option"); closeDropDowns();}}>2nd option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTTwoClientName("3rd option"); closeDropDowns();}}>3rd option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTTwoClientName("4th option"); closeDropDowns();}}>4th option</p>
                                        </div>
                                    </div>
                                    <img src={Clock} alt="clock from flaticon.com" width="25px" height="25px" style={{margin: "auto 15px"}}/>
                                </div>
                                <div className="dropdown">
                                    <span>Testing Center 3</span>
                                    <div className="split-schedule-dropdown-3" onClick={() => setTThreeClientDropdown(!tThreeClientDropdown)}>
                                        <h5>&emsp;{tThreeClientName}</h5>
                                        <img src={DownArrow} alt="down arrow from flaticon.com" width="25px" height="25px" />
                                        <div className="dropdown-content">
                                            <p onClick={(event) => {event.stopPropagation(); setTThreeClientName("1st option"); closeDropDowns();}}>1st option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTThreeClientName("2nd option"); closeDropDowns();}}>2nd option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTThreeClientName("3rd option"); closeDropDowns();}}>3rd option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTThreeClientName("4th option"); closeDropDowns();}}>4th option</p>
                                        </div>
                                    </div>
                                    <img src={Clock} alt="clock from flaticon.com" width="25px" height="25px" style={{margin: "auto 15px"}}/>
                                </div>
                                <div className="dropdown">
                                    <span>Testing Center 4</span>
                                    <div className="split-schedule-dropdown-4" onClick={() => setTFourClientDropdown(!tFourClientDropdown)}>
                                        <h5>&emsp;{tFourClientName}</h5>
                                        <img src={DownArrow} alt="down arrow from flaticon.com" width="25px" height="25px" />
                                        <div className="dropdown-content">
                                            <p onClick={(event) => {event.stopPropagation(); setTFourClientName("1st option"); closeDropDowns();}}>1st option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTFourClientName("2nd option"); closeDropDowns();}}>2nd option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTFourClientName("3rd option"); closeDropDowns();}}>3rd option</p>
                                            <p onClick={(event) => {event.stopPropagation(); setTFourClientName("4th option"); closeDropDowns();}}>4th option</p>
                                        </div>
                                    </div>
                                    <img src={Clock} alt="clock from flaticon.com" width="25px" height="25px" style={{margin: "auto 15px"}}/>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-row">
                <h3>Data in the import file is correct. Please press Continue to import.</h3>
                <div className="continue-cancel-btns">
                    <div className="continue-btn">
                        <h5>Continue Import</h5>
                    </div>
                    <div className="cancel-btn">
                        <h5>Cancel</h5>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Modal;
  