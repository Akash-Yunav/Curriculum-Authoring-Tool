import React, { useContext, useState } from "react";
import "./index.scss";
import RightArrow from "./svg/right-arrow.svg";
import LeftArrow from "./svg/left-arrow.svg";
import Move from "./svg/move.svg";
import Trash from "./svg/trash.svg";
import { MyContext } from "../appContext";

export default function MainView() {

  // HOOKS start
  const [Stan, setStan] = useState("");
  const [defaultInd, setdefaultInd] = useState("CHAPTER");
  const [DragingIds, setDragingIds] = useState([]);
  const [DragingIdsStart, setDragingIdsStart] = useState([]);
  // HOOKS end
  
  const getCon = useContext(MyContext);
  const { subject, children, childrenAllIdsOrder } = getCon.state;
  const { triggerDragDrop } = getCon;
  
  
  const chapter = children;
  const chapterAllIds = childrenAllIdsOrder;
  

  const changeOutdentInput = () => {
    if (defaultInd === "SUBHEADING") setdefaultInd("HEADING");
    else if (defaultInd === "HEADING") setdefaultInd("CHAPTER");
  };


  const changeIndentInput = () => {
    if (defaultInd === "CHAPTER") setdefaultInd("HEADING");
    else if (defaultInd === "HEADING") setdefaultInd("SUBHEADING");
  };

  // 
  // 
  // 
  // 


  const handleDragingIds = (ids) => {
    setDragingIds([...ids]);
  };
  
  const handleDragDropStartIds = (ids) => {
    setDragingIdsStart([...ids]);
  };


  const dragDropEndHandler = () => {
    if (DragingIds.length !== DragingIdsStart.length) {
      alert(
        "Parent element cannot be a chilren E.g Chapter cannot be Heading or Subheading."
      );

    }
    else {
      triggerDragDrop(DragingIdsStart, DragingIds);
    }
  };








  const {
    handleIndent,
    handleOutdent,
    HandleChangeStandard,
    trashStandard,
    addStandard,
  } = getCon;


  


  const setMarginLeft = (standardType) => {   
    const UNITS = "em";
    if (standardType === "CHAPTER") return 0 + UNITS;
    else if (standardType === "HEADING") return 1 + UNITS;
    else if (standardType === "SUBHEADING") return 2 + UNITS;

    return "";
  };

  const handleStandardSummit = (event) => {
    event.preventDefault();
    addStandard(defaultInd, Stan);
    setStan("");
  };










  return (

    
    <div className="MainView-wrap">
      <div className="subject-heading">
        <b>{subject}</b>
      </div>
      <div className="subjects-wrapper">
      
        
        
        <div className="subjects-heading">
          <div className="heading-wrapper">
            <div className="main-heading-actions">Actions</div>
            <div className="sub-heading-actions">Move, Indent,<br/> Outdent, Delete </div>
          </div>
          <div className="heading-wrapper">
            <div className="main-heading-standard">Standard</div>
            <div className="sub-heading-standard">The text of the standard</div>
          </div>
        </div>
      
      
        
        <div className="subject-body">

          {chapterAllIds.map((chapterId) => {
            
            // Chapter Means Children From API
            
            const { name } = chapter[chapterId];
           
            const heading = chapter[chapterId].children;
           
            const headingAllIds = chapter[chapterId].childrenAllIdsOrder;

            return (
              <div className="subject-box" key={chapterId}>
                <div className="subject-row">
                  <div
                    className="subject-col"
                    onDragOver={() => {
                      handleDragingIds([chapterId]);
                    }}
                  >

                    <div className="tip-wrapper">
                      <img
                        className="cursor-pointer"
                        src={Move}
                        alt="move"
                        onDragStart={() => {
                          handleDragDropStartIds([chapterId]);
                        }}
                        onDragEnd={() => {
                          dragDropEndHandler();
                        }}
                      />
                      <span className="tiptext">Move</span>
                    </div>{" "}
                    <div className="tip-wrapper">
                      <img
                        className="cursor-pointer"
                        src={LeftArrow}
                        alt="left indent"
                        onClick={() => {
                          handleOutdent(chapterId);
                        }}
                      />
                      <span className="tiptext">Outdent</span>
                    </div>{" "}
                    <div className="tip-wrapper">
                      <img
                        className="cursor-pointer"
                        src={RightArrow}
                        alt="right indent"
                        onClick={() => {
                          handleIndent(chapterId);
                        }}
                      />{" "}
                      <span className="tiptext">Indent</span>
                    </div>
                    <div className="tip-wrapper">
                      <img
                        className="cursor-pointer"
                        src={Trash}
                        alt="dustbin"
                        onClick={() => {
                          trashStandard(chapterId);
                          setdefaultInd("CHAPTER");
                        }}
                      />
                      <span className="tiptext">Delete</span>
                    </div>
                  </div>
                  <div className="subject-col">
                    <div
                      className="level"
                      style={{ marginLeft: `${setMarginLeft("CHAPTER")}` }}
                    />
                  </div>
                  <div className="subject-col">
                    <input
                      className="chapter"
                      type="text"
                      value={name}
                      onChange={(event) =>
                        HandleChangeStandard(event, chapterId)
                      }
                    />
                  </div>
                </div>
                <div className="heading-box">
                  {headingAllIds.map((headingId) => {
                    const { name } = heading[headingId];
                    const subHeadingAllIds =
                      heading[headingId].childrenAllIdsOrder;
                    const subHeading = heading[headingId].children;
                    return (
                      <React.Fragment key={headingId}>
                        <div className="heading-row" key={headingId}>
                          <div
                            className="heading-col"
                            onDragOver={() => {
                              handleDragingIds([chapterId, headingId]);
                            }}
                          >
                            <div className="tip-wrapper">
                              <img
                                className="cursor-pointer"
                                src={Move}
                                alt="move"
                                onDragStart={() => {
                                  handleDragDropStartIds([
                                    chapterId,
                                    headingId,
                                  ]);
                                }}
                                onDragEnd={() => {
                                  dragDropEndHandler();
                                }}
                              />{" "}
                              <span className="tiptext">Move</span>
                            </div>

                            <div className="tip-wrapper">
                              <img
                                className="cursor-pointer"
                                src={LeftArrow}
                                alt="left arrow"
                                onClick={() => {
                                  handleOutdent(chapterId, headingId);
                                }}
                              />{" "}
                              <span className="tiptext">Outdent</span>
                            </div>
                            <div className="tip-wrapper">
                              <img
                                className="cursor-pointer"
                                src={RightArrow}
                                alt="right arrow"
                                onClick={() => {
                                  handleIndent(chapterId, headingId);
                                }}
                              />{" "}
                              <span className="tiptext">Indent</span>
                            </div>
                            <div className="tip-wrapper">
                              <img
                                className="cursor-pointer"
                                src={Trash}
                                alt="dustbin"
                                onClick={() => {
                                  trashStandard(chapterId, headingId);
                                  setdefaultInd("HEADING");
                                }}
                              />
                              <span className="tiptext">Delete</span>
                            </div>
                          </div>
                          <div className="heading-col">
                            <div
                              className="level"
                              style={{
                                marginLeft: `${setMarginLeft("HEADING")}`,
                              }}
                            />
                          </div>
                          <div className="heading-col">
                            <input
                              className="heading"
                              type="text"
                              value={name}
                              onChange={(event) =>
                                HandleChangeStandard(
                                  event,
                                  chapterId,
                                  headingId
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="sub-heading-box">
                          {subHeadingAllIds &&
                            subHeadingAllIds.map((subHeadingId) => {
                              const { name } = subHeading[subHeadingId];
                              return (
                                <div
                                  className="sub-heading-row"
                                  key={subHeadingId}
                                >
                                  <div
                                    className="sub-heading-col"
                                    onDragOver={() => {
                                      handleDragingIds([
                                        chapterId,
                                        headingId,
                                        subHeadingId,
                                      ]);
                                    }}
                                  >
                                    <div className="tip-wrapper">
                                      <img
                                        className="cursor-pointer"
                                        src={Move}
                                        alt="move"
                                        onDragStart={() => {
                                          handleDragDropStartIds([
                                            chapterId,
                                            headingId,
                                            subHeadingId,
                                          ]);
                                        }}
                                        onDragEnd={() => {
                                          dragDropEndHandler();
                                        }}
                                      />{" "}
                                      <span className="tiptext">Move</span>
                                    </div>
                                    <div className="tip-wrapper">
                                      <img
                                        className="cursor-pointer"
                                        src={LeftArrow}
                                        alt="left arrow"
                                        onClick={() => {
                                          handleOutdent(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          );
                                        }}
                                      />{" "}
                                      <span className="tiptext">
                                        Outdent
                                      </span>
                                    </div>
                                    <div className="tip-wrapper">
                                      <img
                                        className="cursor-pointer"
                                        src={RightArrow}
                                        alt="right arrow"
                                        onClick={() =>
                                          handleIndent(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          )
                                        }
                                      />{" "}
                                      <span className="tiptext">
                                        Indent
                                      </span>
                                    </div>
                                    <div className="tip-wrapper">
                                      <img
                                        className="cursor-pointer"
                                        src={Trash}
                                        alt="dustbin"
                                        onClick={() => {
                                          trashStandard(
                                            chapterId,
                                            headingId,
                                            subHeadingId
                                          );
                                          setdefaultInd("SUBHEADING");
                                        }}
                                      />
                                      <span className="tiptext">
                                        Delete
                                      </span>
                                    </div>
                                  </div>
                                  <div className="sub-heading-col">
                                    <div
                                      className="level"
                                      style={{
                                        marginLeft: `${setMarginLeft(
                                          "SUBHEADING"
                                        )}`,
                                      }}
                                    />
                                  </div>
                                  <div className="sub-heading-col">
                                    <input
                                      className="sub-heading"
                                      type="text"
                                      value={name}
                                      onChange={(event) =>
                                        HandleChangeStandard(
                                          event,
                                          chapterId,
                                          headingId,
                                          subHeadingId
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="enter-standard">
        <form onSubmit={handleStandardSummit}>
          <div className="standard-row">
            <div className="standard-col">
              <div className="tip-wrapper">
                <img className="cursor-pointer" src={Move} alt="move" />
                <span className="tiptext">Move</span>
              </div>{" "}
              <div className="tip-wrapper">
                <img
                  className="cursor-pointer"
                  src={LeftArrow}
                  alt="left arrow"
                  onClick={() => changeOutdentInput()}
                />{" "}
                <span className="tiptext">Outdent</span>
              </div>{" "}
              <div className="tip-wrapper">
                <img
                  className="cursor-pointer"
                  src={RightArrow}
                  alt="right arrow"
                  onClick={() => changeIndentInput()}
                />{" "}
                <span className="tiptext">Indent</span>
              </div>{" "}
              <div className="tip-wrapper">
                <img
                  className="cursor-pointer"
                  src={Trash}
                  alt="dustbin"
                  onClick={() => trashStandard()}
                />
                <span className="tiptext">delete</span>
              </div>{" "}
            </div>
            <div className="standard-col">
              <div
                className="level"
                style={{ marginLeft: 100 }}
              />
            </div>
            <div className="standard-col">
              <input
                className={defaultInd === "CHAPTER"? "chapter": defaultInd === "HEADING"? "heading": "sub-heading"
                }
                type="text"
                placeholder="Type standard here(e.g. Numbers) "
                required
                autoFocus
                value={Stan}
                onChange={(e) => setStan(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="add-Stan">
            &#8853; <span className="Stan-text"> Add a standard </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
