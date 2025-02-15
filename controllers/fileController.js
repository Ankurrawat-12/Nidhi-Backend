const File = require("../models/File");

// Get all files/folders
exports.getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: "Error fetching files" });
    }
};

// Create a new file/folder
exports.createFile = async (req, res) => {
    try {
        const { name, type, parentId } = req.body;
        const newFile = new File({ name, type, parentId: parentId || null });
        await newFile.save();
        res.status(201).json(newFile);
    } catch (error) {
        res.status(500).json({ message: "Error creating file" });
    }
};

// Rename file/folder
exports.renameFile = async (req, res) => {
    try {
        const { name } = req.body;
        const file = await File.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!file) return res.status(404).json({ message: "File not found" });
        res.json(file);
    } catch (error) {
        res.status(500).json({ message: "Error renaming file" });
    }
};

// Delete file/folder
exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });
        res.json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting file" });
    }
};

exports.moveFile = async (req, res) => {
    try {
        const { parentId } = req.body;  // Get the new parentId from the request body
        const file = await File.findByIdAndUpdate(
            req.params.id,
            { parentId },
            { new: true } // Return the updated file
        );

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        res.json(file);  // Return the updated file details
    } catch (error) {
        res.status(500).json({ message: "Error moving file", error });
    }
};
