import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants/url.constants';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Point from '@arcgis/core/geometry/Point';
import { Trap } from '../interfaces/trap.interface';
import axiosApiInstance from '../helpers/axios.config';
import { useSelector } from 'react-redux';
import { ImageList, ImageListItem } from '@mui/material';


function ViewAudit() {

  const params: { audit: string} = useParams();
  const [auditId, setAuditId] = useState('');
  const [audit, setAudit] = useState({})
  const [traps, setTraps] = useState([]);
  const [trap, setTrap] = useState({} as Trap);
  const [assets, setAssets] = useState([] as Array<any>);
  const [category, setCategory] = useState({} as any)

  const _category = useSelector((state: any) => state.categories)
  

  const map = new Map({
    basemap: "topo-vector"
  });
  
  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 4
  });

  

 const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40],  // Orange
    outline: {
        color: [255, 255, 255], // White
        width: 1
    }
 };

 const graphicsLayer = new GraphicsLayer();
 map.add(graphicsLayer)
 view.popup.autoOpenEnabled = false;
 view.on("click", function (evt) {
  traps.forEach((trap: Trap) => {
    if(Math.floor(parseFloat(trap.latitude)) === Math.floor(evt.mapPoint.latitude) && Math.floor(parseFloat(trap.longitude)) === Math.floor(evt.mapPoint.longitude)) {
      console.log('opening trap details')
      view.popup.open({
        title: `Camera ${trap.camera_id}`,
        location: evt.mapPoint,
        content: `
        <b>Project Name:</b> ${trap.project_name}<br><b>Surveyor Name:</b> ${trap.surveyor_name}<br><b>Setup:</b> ${new Date(trap.setup).toDateString()}<br><b>Camera Procedure:</b> ${trap.cam_procedure}<br><b>Camera attached to:</b> ${trap.cam_attached} <br>
        <b>Camera make:</b> ${trap.cam_make}<br><b>Camera Feature:</b> ${trap.cam_feature}<br><b>Camera Trap Test:</b> ${trap.cam_trap_test}<br><b>Camera Working:</b> ${trap.cam_working}<br><b>Comments:</b> ${trap.comments}<br>
        `
      });
    }
  })
});


  const constructPoints = (traps: Array<Trap>) => {
    traps.forEach((trap: Trap) => {
      const point = new Point({ //Create a point
        longitude: parseFloat(trap.longitude),
        latitude: parseFloat(trap.latitude)
      });
      const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
      });
      graphicsLayer.add(pointGraphic);
  })
}

  constructPoints(traps);

  
  useEffect(() => {
    setCategory(_category)
    setAuditId(params.audit);
    axios.get(`${BACKEND_URL}audits/1`)
    .then((res) => {
      setAuditId(res.data?.id)
      setAudit(res.data)
    }) 
    axios.get(`${BACKEND_URL}traps`)
    .then((res) => {
      setTraps(res.data)
      constructPoints(res.data)
    })

    axiosApiInstance.get(`https://api.mediavalet.com/categories`)
    .then((res) => {
      res.data?.payload?.forEach((element: any) => {
        if(element.tree.path.includes('pranesh-submission') && element?.assetCount > 0) {
          axiosApiInstance.get(`https://api.mediavalet.com/assets`)
          .then((res) => {
            let _assets: Array<any> = [];
            res.data.payload.assets.forEach((asset: any) => {
              if((asset.categories as Array<any>).includes(element.id)) {
                _assets.push(asset)
              }
            });
            console.log(_assets);
            setAssets(_assets)
          })
        }
      });
    })
  }, [])

  return (
    <>
       <div id="viewDiv" className='w-full' style={{height: '500px'}}></div>
       <div className='trapImages'>
        {
          assets.length > 0 && (
            <ImageList sx={{ width: '100%', height: 450 }} cols={4} rowHeight={264}>
            {assets.map((asset, index) => (
              <ImageListItem key={index}>
                <img
                  src={asset.media.medium}
                  alt={asset.file.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          )
        }
       </div>
    </>
  );
}

export default ViewAudit;