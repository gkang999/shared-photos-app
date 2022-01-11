import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import './Albums.css';

const PUBLIC_IMAGE_URL = "https://shared-photos.herokuapp.com/public/images/"
const PUBLIC_ALBUM_URL = "https://shared-photos.herokuapp.com/public/albums/"
const ALBUM_URL = "https://shared-photos.herokuapp.com/albums/"
const IMAGE_URL = "https://shared-photos.herokuapp.com/images/"

function LoggedInCheck() {
  if (localStorage.getItem('currentAccount') != null && localStorage.getItem('SPDKSessionKey') != null) {
      return 0;
  }
  return 1;
}

function Albums() {
  const [publicStatus, setPublicStatus] = useState('private');
  const [publicView, setPublicView] = useState(true);
  const [myView, setMyView] = useState(false);
  const [publicAlbums, setPublicAlbums] = useState([]);
  const [myAlbums, setMyAlbums] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [value, setValue] = useState('public');
  const [albumExists, setAlbumExists] = useState(false);
  const [albumOwner, setAlbumOwner] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [albumShow, setAlbumShow] = useState(false);
  const [albumCreate, setAlbumCreate] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageExt, setImageExt] = useState("");
  const [imageEnc, setImageEnc] = useState("");
  const [imageView, setImageView] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageDelete, setImageDelete] = useState(false);
  const handleCloseUpload = () => setImageUpload(false);
  const handleShowUpload = (e) => {
    setAlbumName(e);
    setImageUpload(true);
  };
  const handleCloseImage = () => setImageView(false);
  const handleShowImage = (e, albumOwner) => {
    setAlbumOwner(albumOwner);
    setAlbumName(e);
    setImageView(true);
  };
  const handleCloseAlbum = () => setAlbumShow(false);
  const handleShowAlbum = () => setAlbumShow(true);
  const username = localStorage.getItem('currentAccount');
  const handleChange = (e) => {
    setPublicView(!publicView);
    setMyView(!myView);
    setValue(e.target.value);
  };

  const handleImageChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var binaryStr = e.target.result;
      setImageEnc(window.btoa(binaryStr));
      console.log(imageEnc);
    };
    reader.readAsBinaryString(file);
    setImageExt(file.type);
    console.log(imageExt);
  };

  // const handleAlbumSubmit2 = (e) => {
  //   e.preventDefault();

  //   checkAlbumExistence();
  //   handleAlbumSubmit();
  // }

  // const checkAlbumExistence = () => {
  //   const reqBody = JSON.stringify({
  //     accountName: username,
  //     albumName: albumName
  //   })
  //   axios.post(ALBUM_URL + "read", reqBody, {headers: {
  //     'Content-Type': 'application/json',
  //     "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
  //     "SPDKKeyAccount": localStorage.getItem('currentAccount')
  //   }})
  //   .then((response) => {
  //     console.log(response);
  //     for (let album of response.data) {
  //       console.log(album.albumName);
  //       console.log(album.albumName === albumName);
  //       if (album.albumName === albumName) {
  //         setAlbumExists(true);
  //         console.log(albumExists);
  //       }
  //     }
  //   },
  //   (error) => {
  //     console.log(error);
  //   })
  // }

  const handleAlbumSubmit = (e) => {
    e.preventDefault();
    if (albumExists === false) {
      const reqBody = JSON.stringify({
        accountName: username,
        albumName: albumName
      })
      axios.post(ALBUM_URL + "create", reqBody, {headers: {
        'Content-Type': 'application/json',
        "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
        "SPDKKeyAccount": localStorage.getItem('currentAccount')
      }})
      .then((response) => {
        if (publicStatus === 'public') {
          handleAlbumStatus("public", albumName);
        }
        handleCloseAlbum();
        setAlbumCreate(!albumCreate);
        setAlbumExists(false);
        console.log(response);
      },
      (error) => {
        console.log(error);
      })
    }
    else {
      console.log("ALBUM ALREADY EXISTS");
    }
    // else if (publicStatus === 'public') {
    //   const reqBody = JSON.stringify({
    //     albumName: albumName
    //   })
    //   axios.post(PUBLIC_ALBUM_URL + "create", reqBody, {headers: {
    //     'Content-Type': 'application/json'
    //   }})
    //   .then((response) => {
    //     if (response.data[0] === 0) {
    //       handleCloseAlbum();
    //       setAlbumCreate(!albumCreate);
    //     }
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   })
    // }
  };

  useEffect(() => {
    const loadPublicAlbums = () => {
      axios.get(PUBLIC_ALBUM_URL + "read")
      .then((response) => {
        setPublicAlbums(response.data);
        console.log(response);
      },
      (error) => {
        console.log(error);
      })
    };
    loadPublicAlbums();
  }, [albumShow, albumCreate]);

  useEffect(() => {
    if (localStorage.getItem('currentAccount') != null && localStorage.getItem('SPDKSessionKey') != null) {
      const loadAlbums = () => {
        const reqBody = JSON.stringify({
          accountName: username
        })
        axios.post(ALBUM_URL + "read", reqBody, {headers: {
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
      };
      loadAlbums();
    }
  }, [albumShow, albumCreate, username]); 

  const deleteAlbum = (e) => {
    const reqBody = JSON.stringify({
      accountName: username,
      albumName: e
    })
    axios.post(ALBUM_URL + "delete", reqBody, {headers: {
      'Content-Type': 'application/json',
      "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
      "SPDKKeyAccount": localStorage.getItem('currentAccount')
    }})
    .then((response) => {
      setAlbumCreate(!albumCreate);
      console.log(response);
    },
    (error) => {
        console.log(error);
    });
  };

  const handleAlbumStatus = (status, albumName) => {
    const reqBody = JSON.stringify({
      accountName: username,
      albumName: albumName
    })
    axios.post(ALBUM_URL + status, reqBody, {headers: {
      'Content-Type': 'application/json',
      "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
      "SPDKKeyAccount": localStorage.getItem('currentAccount')
    }})
    .then((response) => {
      setAlbumCreate(!albumCreate);
      console.log(response);
    },
    (error) => {
        console.log(error);
    });
  }

  useEffect(() => {
    const loadPublicImages = () => {
      const reqBody = JSON.stringify({
        accountName: albumOwner,
        albumName: albumName
      })
      axios.post(PUBLIC_IMAGE_URL + "read", reqBody, {headers: {
        'Content-Type': 'application/json',
        "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
        "SPDKKeyAccount": localStorage.getItem('currentAccount')
      }})
      .then((response) => {
        setMyImages(response.data);
        console.log(response);
      },
      (error) => {
          console.log(error);
      });
    };
    loadPublicImages();
  }, [imageView, imageDelete, albumOwner, albumName])

  useEffect(() => {
    if (localStorage.getItem('currentAccount') != null && localStorage.getItem('SPDKSessionKey') != null) {
      const loadImages = () => {
        const reqBody = JSON.stringify({
          accountName: username,
          albumName: albumName
        })
        axios.post(IMAGE_URL + "read", reqBody, {headers: {
          'Content-Type': 'application/json',
          "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
          "SPDKKeyAccount": localStorage.getItem('currentAccount')
        }})
        .then((response) => {
          setMyImages(response.data);
          console.log(response);
        },
        (error) => {
            console.log(error);
        });
      };
      loadImages();
    }
  }, [imageView, imageDelete, username, albumName]);

  const uploadImage = (e) => {
    e.preventDefault();
    const reqBody = JSON.stringify({
      accountName: username,
      albumName: albumName,
      pictureName: imageName,
      base64Encoding: "data:"+imageExt+";base64,"+imageEnc
    })
    axios.post(IMAGE_URL + "create", reqBody, {headers: {
      'Content-Type': 'application/json',
      "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
      "SPDKKeyAccount": localStorage.getItem('currentAccount')
    }})
    .then((response) => {
      handleCloseUpload();
      console.log(response);
    },
    (error) => {
        console.log(error);
    });
  };

  const deleteImage = (e) => {
    const reqBody = JSON.stringify({
      accountName: username,
      albumName: albumName,
      pictureName: e,
    })
    axios.post(IMAGE_URL + "delete", reqBody, {headers: {
      'Content-Type': 'application/json',
      "SPDKSessionKey": localStorage.getItem('SPDKSessionKey'),
      "SPDKKeyAccount": localStorage.getItem('currentAccount')
    }})
    .then((response) => {
      setImageDelete(!imageDelete);
      console.log(response);
    },
    (error) => {
        console.log(error);
    });
  }

  const displayPublicAlbums = () => {
    if (publicAlbums.length === 0) {
      return (
        <div>click 'create new album' to add an album</div>
      );
    }
    return (
      publicAlbums.map(album =>
      <div className="albumBorder" key={album.albumName}>
        <div className="albumEntry" key={album.albumName}>
          &nbsp;{album.albumName} -&nbsp;
          <Button className="albumButton" value={album.albumName} onClick={e => handleShowImage(e.target.value, album.accountName)}>view</Button>
        </div>
      </div>)
    );
  }

  const displayMyAlbums = () => {
    if (localStorage.getItem('currentAccount') == null && localStorage.getItem('SPDKSessionKey') == null) {
      return (
        <div>login to view your albums</div>
      );
    }
    else if (myAlbums.length === 0) {
      return (
        <div>click 'create new album' to add an album</div>
      );
    }
    return (
      myAlbums.map(album => 
      <div className="albumBorder" key={album.albumName}>
        <div className="albumEntry" key={album.albumName}>
          &nbsp;{album.albumName} -&nbsp;
          <Button className="albumButton" value={album.albumName} onClick={e => handleShowImage(e.target.value)}>view</Button>
          {album.publicStatus === 0 ? 
          <Button className="albumButton" id="statusButton" value="public" onClick={e => handleAlbumStatus(e.target.value, album.albumName)}>make public</Button> : 
          <Button className="albumButton" id="statusButton" value="unpublic" onClick={e => handleAlbumStatus(e.target.value, album.albumName)}>make private</Button>}
          <Button className="albumButton" id="uploadButton" value={album.albumName} onClick={e => handleShowUpload(e.target.value)}>upload</Button>
          <Button className="albumButton" id="deleteButton" value={album.albumName} onClick={e => deleteAlbum(e.target.value)}>delete</Button>
        </div>
      </div>)
    );
  }

  const displayImages = () => {
    if (myImages.length === 0) {
      return (
        <div className="Albums">empty</div>
      );
    }
    return (
      myImages.map(image => 
      <div className="Albums" key={image.pictureName}>
        {image.pictureName} - 
        <Button id="deleteImage" value={image.pictureName} onClick={e => deleteImage(e.target.value)}>delete</Button><br/>
        <img key={image.pictureName} alt={image.pictureName} src={`data:image/${image.pictureExtension};base64,${image.base64Encoding}`}/>
      </div>)
    );
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
          {(publicView && !myView) ? displayPublicAlbums() : displayMyAlbums()}
        </div>
      </div>
      <Modal show={imageView} onHide={handleCloseImage} animation={false} backdropClassName="backdrop" dialogClassName="imageModal">
        <div id="albumInImage">{albumName} Album</div>
        <div className="images">
          {displayImages()}
        </div>
      </Modal>
      <Modal show={imageUpload} onHide={handleCloseUpload} animation={false} backdropClassName="backdrop" dialogClassName="uploadImageModal">
        <form className="uploadImage" onSubmit={uploadImage}>
          <input type="file" onChange={handleImageChange}/><br/>
          <label htmlFor="newImage">New image name:</label><br/>
          <input type="text" name="newImage" onChange={e => setImageName(e.target.value)}/><br/><br/>
          <input id="imageSubmit" type="submit" value="Upload"/>
        </form>
      </Modal>
      {LoggedInCheck() === 0 ? <Button id="newAlbum" onClick={handleShowAlbum}>create new album <b>+</b></Button> : null}
      <Modal show={albumShow} onHide={handleCloseAlbum} animation={false} backdropClassName="backdrop" dialogClassName="createAlbumModal">
        <form className="createAlbum" onSubmit={handleAlbumSubmit}>
          <label htmlFor="newAlbum">New album name:</label><br/>
          <input type="text" name="newAlbum" onChange={e => setAlbumName(e.target.value)}/><br/>
          <div>
            <input type="radio" value="private" name="private" checked={publicStatus === 'private'} onChange={e => setPublicStatus(e.target.value)}/> private
            <input type="radio" value="public" name="public" checked={publicStatus === 'public'} onChange={e => setPublicStatus(e.target.value)}/> public 
          </div><br/>
          <input id="albumSubmit" type="submit"/>
        </form>
      </Modal>
    </div>
  );
}

export default Albums;