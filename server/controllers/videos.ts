import { AxiosResponse } from "axios";
import request from "../request";
import { Request,Response } from "express";

const getPopularVideos = async(req:Request, res:Response) => {
    try {
      const token = req.query.pageToken
        const result: AxiosResponse<any> = await request.get("/videos", {
          params: {
         
            part: "snippet, contentDetails, statistics",
            chart: "mostPopular",
            regionCode: "IN",
            pageToken: token,
            maxResults: 10,
            key: process.env.API_KEY
          },
        });
       
        res.status(200).json(result.data)
      } catch (err:any) {
        res.status(404).json({err:'can not get videos', msg:err})
        return;
      }
}
const getVideosByCategory = async(req:Request, res:Response) => {

    try {
      const id = req.query.categoryId
      const token = req.query.pageToken
        const result: AxiosResponse<any> = await request.get("/videos", {
          params: {
         
            part: "snippet, statistics, contentDetails",
            regionCode: "IN",
            maxResults: 10,
            videoCategoryId: id,
            pageToken:token,
            chart: "mostPopular",
            key: process.env.API_KEY
          },
        });
        res.status(200).json(result.data)
      } catch (err:any) {
        res.status(404).json({err:'can not get videos', msg:err})
        return;
      }
}

const getVideosById = async(req:Request, res:Response) => {
    try {
        const result: AxiosResponse<any> = await request.get("/videos", {
          params: {
            part: "snippet, statistics, contentDetails",
            id:req.params.id,
            key: process.env.API_KEY
          },
        });
       
        res.status(200).json(result.data)
      } catch (err:any) {
        res.status(404).json({err:'can not get video', msg:err})
        return;
      }
}

const getComments = async(req:Request, res:Response) => {
    try {
        const result: AxiosResponse<any> = await request.get("/commentThreads", {
          params: {
            part: "snippet,replies",
            videoId: req.params.id,
            maxResults: 10,
            key: process.env.API_KEY
          },
        });
       
        res.status(200).json(result.data.items)
      } catch (err:any) {
        res.status(403).json({err:'can not get comments', msg:err})
        return;
      }
}







module.exports = {getPopularVideos,  getVideosById,getVideosByCategory, getComments}