import React, {useState} from "react";
import Modal from "react-bootstrap/Modal"
import Table from 'react-bootstrap/Table'
import style from './Positioning.module.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
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

    fetch('http://113.255.193.44:3002/api/upload', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload success', response);
        setshowMore(false);
        setfirstResult(<div className={style.firstResult}>
          <div className={style.firstResultElement}>{response.data[0].position}</div>
          <div className={style.firstResultElement}><div className={style.firstResultButton}> <Button onClick={() => {
            handleSearch(response.data[0].position, 'from')
          }}>From</Button></div><div className={style.firstResultButton}> <Button onClick={() => {
            handleSearch(response.data[0].position,'to')
          }}>To</Button></div></div>
        </div>)
        setresultList(response.data.map((data) =>
          <tr><td><div className={style.resultText}>{data.position}</div></td><td><div className={style.resultText}>{data.confidence}</div></td><td><div className={style.buttonbox}><div className={style.resultButton}><Button onClick={() => {
          handleSearch(data.position,'from')
          }}>From</Button></div><div className={style.resultButton}><Button onClick={() => {
            handleSearch(data.position,'to')
          }}>To</Button></div><br/></div></td></tr>));
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
          <thead>
          <tr>
            <th>Location</th>
            <th>Confidence</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {resultList}
          <tr><td colSpan={3}> <InputGroup size={'lg'}>
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder={"Or please tell us the correct location"}/></InputGroup></td></tr>
          </tbody>
        </Table>}
      </Modal.Body>
      <Modal.Footer>
        {showMore && <Form>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Join User-experience Enhancement Program" />
          </Form.Group>
        </Form>}
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
