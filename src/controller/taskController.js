import prisma from "../utils/prisma.js";

export const addTask = async (req, res) => {
    const {
        title,
        description,
        category,
        createdTime,
        dueDate,
    } = await req.body;

    try {
        const task = await prisma.task.create({
            data: {
                title: title,
                description: description,
                category: category,
                createdTime: createdTime,
                dueDate: dueDate,
                createdBy: {
                    connect: {
                        id: req.user
                    }
                }
            }
        })

        return res.json(task);
    } catch (error) {
        console.log("error adding the data", error)
        return res.json(error)
    }

}

export const getTask = async (req, res) => {
    try {
        const userId = req.user;

        const tasks = await prisma.task.findMany({
            where: {
                userId: userId,
            },
        });

        return res.json(tasks);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return res.status(500).json({ message: "Something went wrong", error });
    }
};


export const deleteTask = async (req, res) => {
    let id = parseInt(req.params.id);

    try {
        // Check if the task exists first
        const task = await prisma.task.findUnique({
            where: { id: id },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Task exists, so delete it
        const deletedTask = await prisma.task.delete({
            where: {
                id: id,
            },
        });

        return res.json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        console.log("error deleting the task", error);
        return res.status(500).json({ message: "Failed to delete task", error: error.message });
    }
};
