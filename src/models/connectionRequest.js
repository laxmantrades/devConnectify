const mongoose = require("mongoose");

const ConnectionRequestSchema = mongoose.Schema(
  {
    fromUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      maxLength: true,
    },
    toUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      maxLength: 20,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);
ConnectionRequestSchema.index({fromUserID:1},{toUserID:1})
ConnectionRequestSchema.pre("save", function (next) {
  // dont' write arrow functions on schema
  const ConnectionRequest = this;
  if (ConnectionRequest.fromUserID.equals(ConnectionRequest.toUserID)) {
    throw new Error("You can not send request to yourself");
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", ConnectionRequestSchema);
