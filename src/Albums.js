import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import './Albums.css';

const API_URL = "http://localhost:3308/albums/";

function Albums() {
  const [updateAlbums, setUpdateAlbums] = useState(true);
  const [publicView, setPublicView] = useState(true);
  const [myView, setMyView] = useState(false);
  const [myAlbums, setMyAlbums] = useState([]);
  const [value, setValue] = useState('public');
  const [albumName, setAlbumName] = useState("");
  const [albumShow, setAlbumShow] = useState(false);
  const handleCloseAlbum = () => setAlbumShow(false);
  const handleShowAlbum = () => setAlbumShow(true);
  const username = localStorage.getItem('currentAccount');
  const handleChange = (e) => {
    setPublicView(!publicView);
    setMyView(!myView);
    setValue(e.target.value);
  };
  const handleUpdateAlbums = () => {
    loadAlbums();
    setUpdateAlbums(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const reqBody = JSON.stringify({
      accountName: username,
      albumName: albumName
    })
    axios.post(API_URL + "create", reqBody, {headers: {
      'Content-Type': 'application/json',
      "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
      "SPDKKeyAccount": localStorage.getItem('currentAccount')
    }})
    .then((response) => {
      if (response.data[0] === 0) {
        handleCloseAlbum();
        setUpdateAlbums(true);
      }
      console.log(response);
    },
    (error) => {
      console.log(error);
    })
  };
  const loadAlbums = () => {
    const reqBody = JSON.stringify({
      accountName: username
    })
    axios.post(API_URL + "read", reqBody, {headers: {
      'Content-Type': 'application/json',
      "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
      "SPDKKeyAccount": localStorage.getItem('currentAccount')
    }})
    .then((response) => {
      setMyAlbums(response.data);
      console.log(response);
    },
    (error) => {
        console.log(error);
    });
  }
  const deleteAlbum = () => {

  }

  return (
    <div className="Albums">
      <div>
        <select className="view" id="albumMenu" onChange={handleChange} value={value}>
            <option value="public" >public albums</option>
            <option value="my">my albums</option>
        </select>
        <div className="view" id="border"></div>
        <div className="album">
          {updateAlbums ? handleUpdateAlbums() : null}
          <AlbumView publicView={publicView} myView={myView} myAlbums={myAlbums}/>
        </div>
      </div>
      <Button id="newAlbum" onClick={handleShowAlbum}>create new album <b>+</b></Button>
      <Modal show={albumShow} onHide={handleCloseAlbum} backdropClassName="backdrop">
        <form className="createAlbum" onSubmit={handleSubmit}>
          <label htmlFor="newAlbum">New album name:</label><br/>
          <input type="text" name="newAlbum" onChange={e => setAlbumName(e.target.value)}/><br/>
          <input type="submit"/>
        </form>
      </Modal>
    </div>
  );
}

function AlbumView(props) {
  const publicView = props.publicView;
  const myView = props.myView;
  const myAlbums = props.myAlbums;

  if(publicView && !myView){
    return(<div>public</div>);
  }
  else{
    return(
      // <ul>
      //   {myAlbums.map(album => <li key={album.albumName}>{album.albumName}</li>)}
      // </ul>
      myAlbums.map(album => 
      <div className="albumBorder" key={album.albumName}>
        <div className="albumEntry" key={album.albumName}>{album.albumName}</div>
      </div>
      )
    );
  }
}

export default Albums;