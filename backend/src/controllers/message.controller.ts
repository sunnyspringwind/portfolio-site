import { Request, Response } from "express";
import Message from "../models/message.schema";

interface MessageRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const createMessage = async (
  req: Request<{}, {}, MessageRequestBody>,
  res: Response
) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json(newMessage);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const getAllMessage = async (req: Request, res: Response) => {
  try {
    const messsages = await Message.find();
    res.status(200).json(messsages);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Core logic function that returns the response (great for testing)
// dont need the return values in express as far as i can tell
export const deleteMessageLogic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id as string;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }

    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

export { createMessage, getAllMessage };

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  await deleteMessageLogic(req, res);
}
