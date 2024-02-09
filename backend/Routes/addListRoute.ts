import { addToMyList, checkIfInList, deleteFromMyList, getAllList } from "../Logic/addListLogic";
import express, { NextFunction, Request, Response } from "express";

const watchRoute = express.Router();

watchRoute.get(
  "/myList",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in Games route");
    return response.status(200).json(await getAllList());
  }
); // http://localhost:4000/nifweb/api/v1/mylist



watchRoute.delete(
  "/deleteFromList/:id", 
  async (request:Request, response: Response, next: NextFunction)=>{
    const { id  } = request.params;
    console.log("ID To delete: ", id);
    const deleteFavorite = await deleteFromMyList(Number(id));
    return response.status(200).json(deleteFavorite);
  }
) // http://localhost:4000/nifweb/api/v1/deleteFromList/555

watchRoute.post(
  "/addToList",
  async (request: Request, response: Response, next: NextFunction) => {
    const newItem = request.body;
    console.log(newItem);

    const result = await addToMyList(newItem);
    return response.status(201).json(`${result}`);
    //http://localhost:4000/nifweb/api/v1/addToList
    
  }
);


watchRoute.get(
  "/checkIfInList/:movieorshow_id", 
  async (request:Request, response: Response, next: NextFunction)=>{
    const id = +request.params.movieorshow_id;
    return response.status(200).json(await checkIfInList(id));
  }
) // http://localhost:4000/nifweb/api/v1/checkIfInList/220074


export default watchRoute;
