import mongoose, {Schema} from "mongoose";

const todoItemSchema = new mongoose.Schema({
    text: String,
    open: Boolean,
    visible: Boolean,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
})

const TodoItem = mongoose.models.todoItems || mongoose.model('TodoItem', todoItemSchema);
export default TodoItem;