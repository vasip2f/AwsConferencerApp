const { default: mongoose } = require('mongoose');

const EventSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
        
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    roomName: {
        type: String,
        required: [true, "Please Select Your Room"]
    },
    StartTime: {
        type: Date,
        required: [true, "Start time is missing"],
        validate: {
            validator: async function (value) {
                const events = await this.constructor.find({
                    _id: { $ne: this._id },
                    roomName: this.roomName,
                    $or: [
                        { StartTime: { $lte: value }, EndTime: { $gt: value } },
                        { StartTime: { $lt: this.EndTime }, EndTime: { $gte: this.EndTime } }
                    ]
                });
                return events.length === 0;
            },
            message: props => `The time slot ${props.value} is already booked`
        }
    },
    EndTime: {
        type: Date,
        required: [true, "End time is missing"],
        validate: {
            validator: async function (value) {
                const events = await this.constructor.find({
                    _id: { $ne: this._id },
                    roomName: this.roomName,
                    $or: [
                        { StartTime: { $lt: this.StartTime }, EndTime: { $gte: this.StartTime } },
                        { StartTime: { $lt: value }, EndTime: { $gte: value } }
                    ]
                });
                return events.length === 0;
            },
            message: props => `The time slot ${props.value} is already booked`
        }
    },
    availability: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: ['𝐈𝐧𝐢𝐭𝐢𝐚𝐭𝐞𝐝', '𝐂𝐨𝐧𝐟𝐢𝐫𝐦𝐞𝐝', '𝐑𝐞𝐣𝐞𝐜𝐭𝐞𝐝'],
        default: '𝐈𝐧𝐢𝐭𝐢𝐚𝐭𝐞𝐝'
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    }
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;



