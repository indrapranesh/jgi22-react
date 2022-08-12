import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/Map';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Print from '@arcgis/core/widgets/Print';
import { Button, Dialog, DialogContent, DialogTitle, ImageList, ImageListItem, Snackbar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants/url.constants';
import axiosApiInstance from '../helpers/axios.config';
import { Trap } from '../interfaces/trap.interface';
import qs from 'qs';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

function CameraTraps() {
    const params: { audit: string} = useParams();
    const [dialog, setDialog] = useState(false);
    const [asset, setAsset] = useState({} as any);
    const loggedIn = useSelector((state: any) => state.session.isLoggedIn)
    const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

    const {search} = useLocation()
  const query = qs.parse(search.slice(1))
    const auditId = params.audit || query.auditId;
    const [traps, setTraps] = useState([]);
    
    const [assets, setAssets] = useState([] as Array<any>)
    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    
    if(assets.length === 0 && !selected) {
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

         const print = new Print({
          view: view,
          // specify your own print service
          printServiceUrl:
             "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        });
        
        // Adds widget below other elements in the top left corner of the view
        view.ui.add(print, {
          position: "top-left"
        });
        
         const graphicsLayer = new GraphicsLayer();
         map.add(graphicsLayer)
         view.popup.autoOpenEnabled = false;
         view.on("click", function (evt) {
          console.log('clicked')
          traps.forEach((trap: Trap) => {
            if(Math.floor(parseFloat(trap.latitude)) === Math.floor(evt.mapPoint.latitude) && Math.floor(parseFloat(trap.longitude)) === Math.floor(evt.mapPoint.longitude)) {
              console.log('opening trap details')
              setSelected(true)
              getMediaValet(trap);
              view.popup.dockEnabled = true;
              view.popup.open({
                title: `Camera ${trap.camera_id}`,
                location: evt.mapPoint,
                
                content: `
                <b>Project Name:</b> ${trap.project_name}<br><b>Surveyor Name:</b> ${trap.surveyor_name}<br><b>Setup:</b> ${new Date(trap.setup).toDateString()}<br><b>Camera Procedure:</b> ${trap.cam_procedure}<br><b>Camera attached to:</b> ${trap.cam_attached} <br>
                <b>Camera make:</b> ${trap.cam_make}<br><b>Camera Feature:</b> ${trap.cam_feature}<br><b>Camera Trap Test:</b> ${trap.cam_trap_test}<br><b>Camera Working:</b> ${trap.cam_working}<br><b>Comments:</b> ${trap.comments}<br>
                `,
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
    }
    
      
    
     


      const getMediaValet = (trap) => {
        // axios.get(`${BACKEND_URL}trap/images?auditId=${auditId}&trapId=${trap?.id}`)
        // .then((res: any) => {
        //   if(Object.keys(res.data).length === 0) {
          console.log(trap)
            axiosApiInstance.get(`https://api.mediavalet.com/categories`)
            .then((res) => {
            res.data?.payload?.forEach((element: any) => {
                if(element.tree.path.includes('pranesh-submission') && element?.assetCount > 0 && element?.name.includes(`CAMERA${trap?.camera_id}`)) {
                axiosApiInstance.get(`https://api.mediavalet.com/assets`)
                .then((res) => {
                    let _assets: Array<any> = [];
                    let _images: Array<any> = [];
                    res.data.payload.assets.forEach((asset: any) => {
                    if((asset.categories as Array<any>).includes(element.id)) {
                        _assets.push(asset)
                        _images.push(asset.media.medium)
                    }
                    });
                    setAssets(_assets);
                    // axios.post(`${BACKEND_URL}trap/images`, {
                    //   images: _images,
                    //   auditId: auditId,
                    //   trapId: trap?.id
                    // })
                    // .then((res) => {
                    //     setAssets(res.data)
                    // })
                })
                }
            });
            })
        }

      useEffect(() => {
        axios.get(`${BACKEND_URL}traps`)
            .then((res) => {
            setTraps(res.data)
            })
      }, [])

      const openDialog = (asset) => {
        setDialog(true);
        setAsset(asset)
      }

      const deleteAsset = (asset) => {
        axiosApiInstance.delete(`https://api.mediavalet.com/assets/${asset?.id}?isHardDelete=true`)
        .then((res) => {
          setOpen(true)
          setMessage(`${asset.title} deleted from library`)
          console.log(res);
        })
        openDialog(false);
        setAssets([]);
      }

  return (
    <>
        <div id="viewDiv" className='w-full' style={{height: '500px'}}></div>
        <div className='trapImages'>
            <p className='m-0 text-xl font-semibold py-5'>Trap Images</p>
            {
            selected ? (
                loading ? (
                <></>
                ) : (
                assets.length > 0 && (
                    <ImageList sx={{ width: '100%', height: 450 }} cols={4} rowHeight={264}>
                    {assets.length && assets.map((asset, index) => (
                    <ImageListItem key={index} className="cursor-pointer">
                        <img
                        onClick={() => openDialog(asset)}
                        src={asset.media.medium}
                        alt={asset.title}
                        loading="lazy"
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
                )
                ) 
            ) : (
                <div className='flex items-center justify-center font-sans font-medium' style={{'height': '300px'}}>
                No Traps Selected. Please select a trap on the map to view the images of the trap.
                </div>
            )
            }

<Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogTitle className="font-bold">{asset?.title}</DialogTitle>
        <div className='absolute right-4 top-4 cursor-pointer'>
            <CloseIcon onClick={() => setDialog(false)}></CloseIcon>
        </div>
        {
          loggedIn && (
            <div className='absolute right-12 top-4 cursor-pointer'>
            <DeleteIcon onClick={() => deleteAsset(asset)}></DeleteIcon>
        </div>
          )
        }
        <DialogContent>
            <img src={asset?.media?.large} alt={'img'} />
          </DialogContent>
        </Dialog>
        </div>

        <Snackbar
         autoHideDuration={3000}
        open={open}
        message={message}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default CameraTraps;