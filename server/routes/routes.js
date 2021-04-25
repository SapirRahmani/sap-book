const express = require('express');
const app = express();
const router = express.Router();
//const  User = require('../models/user');
const PostModel = require('../models/post');
const path = require('path');
//var http = require('http').Server(app);

module.exports = (io) => {
    const insertPost = (req, res) => {
        const file = req.files.file;
        const newPost = req.body;

        if (file) {
            const filePath = `${__dirname}\\media\\${file.name}`;
            file.mv(filePath, (err) => {
                console.log(err);
            })
            newPost.file_name = file.name;
        }

        PostModel.create(newPost, (e, newEntry) => {
            if (e) {
                console.log(e);
                res.sendStatus(500);
            } else {
                console.log("insert new post");
                io.sockets.emit("insertPost", newEntry)
                res.sendStatus(200);
            }
        });
    };

    const getPostByPage = (req, res) => {
        const pageNo = parseInt(req.params.pageNo)
        const pageSize = parseInt(req.params.pageSize)

        if (pageNo < 0 || pageNo === 0) {
            let response = {
                success: false,
                message: 'Invalid Page Number'
            };
            res.sendStatus(400).json(response);
        } else {
            let query = {};
            query.skip = pageSize * (pageNo - 1);
            query.limit = pageSize;
            query.sort = { date_published: -1 };

            PostModel.find({}, {}, query, (e, data) => {
                if (e) {
                    console.log(e);
                    res.sendStatus(500);
                }
                else {
                    console.log(`get ${pageSize} posts in page ${pageNo}`);
                    res.status(200);
                    res.send(data);
                }
            });
        }
    };

    const getAllPosts = (req, res) => {
        let query = res.locals.query || {};
        query.sort = { date_published: -1 };

        PostModel.find(query, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                console.log("get all posts");
                result = result.sort((a, b) => b.date_published - a.date_published)
                res.status = 200;
                res.send(result);
            }
        });
    };

    const getOnePost = (req, res) => {
        const { _id } = req.params;

        PostModel.findById(_id, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                console.log(`get post with id: ${_id}`);
                res.status = 200;
                res.send(result);
            }
        });
    };

    const getMediaFile = (req, res) => {
        const fileName = req.params.file_name;
        if (fileName) {
            const filePath = path.join(__dirname, '/media', fileName);
            console.log(`get media file ${fileName}`);
            res.status = 200;
            res.sendFile(filePath);
        }
        else {
            res.sendStatus(500);
        }
    };

    const removePost = (req, res) => {
        const _id = req.params._id;
        PostModel.remove({ _id: _id }, (e) => {
            if (e) {
                res.sendStatus(500);
                console.log(e.message);
            }
            else {
                io.sockets.emit("removePost", _id)
                res.sendStatus(200);
            }
        })
    };

    const updatePost = (req, res) => {
        const changedEntry = req.body;
        const _id = req.params._id;
        PostModel.updateOne({ _id: _id }, { $set: changedEntry }, (e) => {
            if (e) {
                res.sendStatus(500);
                console.log(e.message);
            }
            else {
                console.log(`update post with id: ${_id}`);
                io.sockets.emit("updatePost", changedEntry)
                res.sendStatus(200);
            }
        });
    };

    router.post('/', insertPost);
    router.get('/', getAllPosts);
    router.get('/:_id', getOnePost);
    router.get('/posts/:pageSize/:pageNo', getPostByPage);
    router.get('/media/:file_name', getMediaFile);
    router.put('/:_id', updatePost);
    router.delete('/:_id', removePost);

    return router;

}
