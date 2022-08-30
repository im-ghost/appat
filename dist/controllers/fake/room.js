"use strict";
//
var fs = require("fs");
var path = require("path");
var filepath = path.resolve(__dirname, "../../fakedata.json");
//Read
const readFile = async (file) => {
    try {
        const res = await fs.readFileSync(path.resolve(__dirname, file), "utf8");
        return JSON.parse(res);
    }
    catch (e) {
        console.log(e);
        return;
    }
};
const cota = async () => {
    let dddr = await readFile("../../fakedata.json");
    return dddr;
};
//Create 
const addRoom = async (body) => {
    cota()
        .then(async (dat) => {
        let req = body;
        let dd = dat;
        dd.rooms.push(req);
        await fs.writeFile(filepath, JSON.stringify(dd), (err) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log("saved");
        });
    });
};
//Update 
const UpdateRoom = async (id, body) => {
    cota()
        .then(async (dat) => {
        let dd = dat.rooms.map((room) => {
            if (room._id === id) {
                room = { ...body };
            }
        });
        await fs.writeFile(filepath, JSON.stringify(dd), (err) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log("saved");
        });
    });
};
const deleteRoom = async (id) => {
    cota()
        .then(async (dat) => {
        let dd = dat.rooms.filter((room) => room._id === id);
        await fs.writeFile(filepath, JSON.stringify(dd), (err) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log("saved");
        });
    });
};
module.exports = {
    readFile,
    addRoom,
    UpdateRoom,
    deleteRoom
};
//
//
//
