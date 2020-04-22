import React, {useState} from "react";
import Modal from "react-bootstrap/Modal"
import Table from 'react-bootstrap/Table'
import style from './Positioning.module.css';
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css';
function Positioning({linkTo,from,to}) {

  const [photo, setphoto] = useState(null);
  const [modalShow, setmodalShow] = useState(false);
  const [resultList, setresultList] = useState(null);
  const [firstResult, setfirstResult] = useState(null);
  const [showMore, setshowMore] = useState(false);
  function handleUploadPhoto(event){
    setphoto(event.target.files[0]);
    const data = new FormData();
    data.append('photo', event.target.files[0]);

    fetch('http://192.168.0.115:3002/api/upload', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload success', response);
        setfirstResult(<div className={style.firstResult}>
          <div className={style.firstResultElement}>{response.data[0].position}</div>
          <div className={style.firstResultElement}><Button onClick={() => {
            handleSearch(response.data[0].position)
          }}>From</Button><Button onClick={() => {
            handleSearch(response.data[0].position,'to')
          }}>To</Button></div>
        </div>)
        setresultList(response.data.map((data) =>
          <tr><td className={style.resultBox}><div className={style.resultText}>{data.position}</div><div className={style.resultButton}><Button onClick={() => {
          handleSearch(data.position,'from')
          }}>From</Button><Button onClick={() => {
            handleSearch(data.position,'to')
          }}>To</Button><br/></div></td></tr>));
        setmodalShow(true);
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  }
  function handleSearch(room, mode){
    console.log("Start handle search")
    fetch('https://pathadvisor.ust.hk/api/nodes?name='+room,{
      methods:'GET'
    })
      .then(response => response.json())
      .then(response => {
        if(response.meta.count === 0)
          console.log("No result get");
        else{
          if(mode === 'from') {
            from = {
              name: response.data[0].name,
              data: {
                id: response.data[0]._id,
                floor: response.data[0].floorId,
                value: response.data[0].name,
                type: 'id',
                coordinates: response.data[0].centerCoordinates,
              },
            }
            linkTo({
              from: from,
              search: true,
              x: response.data[0].centerCoordinates[0],
              y: response.data[0].centerCoordinates[1],
              floor: from.data.floor
            });
          }
          else {
            to = {
              name: response.data[0].name,
              data: {
                id: response.data[0]._id,
                floor: response.data[0].floorId,
                value: response.data[0].name,
                type: 'id',
                coordinates: response.data[0].centerCoordinates,
              },
            }
            linkTo({
              to: to,
              search: true,
              x: response.data[0].centerCoordinates[0],
              y: response.data[0].centerCoordinates[1],
              floor: to.data.floor
            });
          }
          setmodalShow(false);
        }
        console.log("fetch complete");
      })
      .catch(error => {
        console.log(error);
      });
    console.log("start link");

  }
  return <div>
    <div className={style.pluginHeader}>
      Image-based Positioning System
    </div>
    <div>
      Please upload your photo
    </div>
    <input type = 'file' onChange={handleUploadPhoto}/>
    <Modal
      scrollable = 'true'
      show = {modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Image Localization Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {!showMore && firstResult}
        {showMore && <Table striped bordered>
          <tbody>
          {resultList}
          </tbody>
        </Table>}
      </Modal.Body>
      <Modal.Footer>
        {!showMore && <Button onClick={() => {
          setshowMore(true)
        }}>Show More Result</Button>}
        <Button onClick={() => {
          setmodalShow(false);
          setshowMore(false);
        }}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>;
}

const PrimaryPanelPlugin = {
  Component: Positioning,
  connect: ["linkTo", 'from','to']
};

const name = "positioning";
const defaultOff = false;
const platform = ['DESKTOP'];
const core = false;

export {
  name,
  defaultOff,
  platform,
  core,
  PrimaryPanelPlugin,
}
