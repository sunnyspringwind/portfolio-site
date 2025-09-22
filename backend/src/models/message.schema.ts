import mongoose, { Schema } from "mongoose";

export interface IMessage extends Document {
    name: string;
    email: string;
    message: string;
    subject: string;
    dateCreated: Date;
}

const MessageSchema = new Schema<IMessage>({
    name: { 
        type: String, 
        required: true,
        minLength: [2, 'Name must be at least 2 characters'],
        maxLength: [50, 'Name cannot exceed 50 characters']
    },
    email: { 
        type: String, 
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    message: { 
        type: String, 
        required: true,
        minLength: [10, 'Message must be at least 10 characters'],
        maxLength: [1000, 'Message cannot exceed 500 characters']
    },
    subject: { 
        type: String, 
        required: true,
        minLength: [2, 'Subject must be at least 2 characters'],
        maxLength: [100, 'Subject cannot exceed 50 characters']
    },
    dateCreated: { type: Date, default: Date.now()}
});

export default mongoose.model<IMessage>('Message', MessageSchema)