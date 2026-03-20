const Task = require("../models/task.model");
const sendResponse = require("../utils/response");

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const userId = req.user.id;

        await Task.create({
            title,
            description,
            userId
        });

        return sendResponse(res, 201, true, "Task created successfully")
    } catch (error) {
        return sendResponse(res, 500, false, "Failed to create task")
    }
}

exports.fetchTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ userId });
        return sendResponse(res, 200, true, "Tasks fetched successfully", tasks);

    } catch (error) {
        return sendResponse(res, 500, false, "Failed to fetch tasks")
    }
}

exports.updateTask = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, description, status } = req.body;
        const userId = req.user.id;

       const updatedTask = await Task.findOneAndUpdate({
            _id: id, userId
        }, {
            title, description, status
        })

        if (!updatedTask) {
            return sendResponse(
                res,
                404,
                false,
                "Task not found or not authorized"
            );
        }

        return sendResponse(res, 200, true, "Task updated successfully");


    } catch (error) {
        console.log(error,"here us error");
        
        return sendResponse(res, 500, false, "Failed to update task");
    }
}

exports.deleteTask = async(req, res) => {
    try {
        const {id} = req.params;

        await Task.findByIdAndDelete(id);

    return sendResponse(res, 200, true, "Task deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, false, "Failed to delete task");
    }
}