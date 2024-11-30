import mongoose from "mongoose";

const AppraisalSchema = new mongoose.Schema(
  {
    questions: [{ type: String }], // Array of question strings
    answers: [
      {
        user: {
          name: { type: String, required: true },
          email: { type: String, required: true },
          _id: { type: mongoose.Schema.Types.ObjectId, required: true },
          role: { type: String, required: true },
        },
        answers: [{ type: String }], // Array of answers corresponding to the questions
      },
    ],
  },
  { timestamps: true }
);

const Appraisal = mongoose.model("Appraisal", AppraisalSchema);
export default Appraisal;
