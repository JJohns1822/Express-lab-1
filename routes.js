"use strict";


const express = require("express");

const routes = express.Router();

const carItems = [
    {
        id: 1,
        product: "Ford",
        price: 12000,
        quantity: 50,
    },
    {
        id: 2,
        product: "Toyota",
        price: 10000,
        quantity: 25,
    },
    {
        id: 3,
        product: "Chevy",
        price: 8000,
        quantity: 75,
    },
    {
        id: 4,
        product: "BMW",
        price: 20000,
        quantity: 10,
    },
]
let nextId = 5;


routes.get("/car-items", (req, res)=>{
    let filteredItems = carItems;
    let maxPrice = req.query.maxPrice;
    let prefix = req.query.prefix;
    let pageSize = req.query.pageSize;
    if(maxPrice) {
        filteredItems = filteredItems.filter((item)=>{
          return item.price <= parseInt(maxPrice);
       });
    }
    if(prefix){
        filteredItems = filteredItems.filter((item)=>{
            return item.product.toLowerCase().startsWith(prefix.toLowerCase().trim());
        })
      }
    if(pageSize){
        filteredItems = filteredItems.slice(0, pageSize)
      }
  res.json(filteredItems);
});


routes.get("/car-items/:id", (req, res)=>{
    let id = parseInt(req.params.id);
    let foundProduct = carItems.find((item)=>{
      return item.id === id;
    });
    if(foundProduct){
      res.json(foundProduct)
    } else {
      res.send(`No product with id ${id} exists`)
    }
  });

routes.post("/car-items", (req, res)=>{
    let item = req.body;
    item.id = nextId++;
    carItems.push(item);
    res.status(201);
    res.json(item)
});

routes.put("/car-items/:id", (req, res)=>{
    let id = parseInt(req.params.id);
    let updatedCar = req.body;
    updatedCar.id = id;
    let index = carItems.findIndex((item)=>{
      return item.id === id;
    });
    if(index === -1){
      res.status(404);
      res.send(`No product found with id: ${id}`)
    }else {
    carItems[index]= updatedCar;
    res.json(updatedCar);
    }  
  });

routes.delete("/car-items/:id", (req, res)=>{
    let id = parseInt(req.params.id);
    let index = carItems.findIndex((item)=>{
        return item.id === id;
    });
    if(index === -1){
        res.status(404);
        res.send(`No products found with id: ${id}`)
    }else {
        carItems.splice(index,1);
    res.sendStatus(204);
    }
});





module.exports = routes;