import express from "express";
import AppraisalController from "../controller/appraisal.controller.js";

const appraisalController = new AppraisalController();
const router = express.Router();

// Admin creates questions
router.post("/", appraisalController.addAppraisal);

// Participants submit answers
router.post("/submit", appraisalController.submitAnswers);

// Retrieve the latest appraisal questions
router.get("/", appraisalController.seeAppraisal);

// Retrieve participation data for a specific user
router.get("/participate", appraisalController.seeParticipate);

// Retrieve all participation data for the latest appraisal
router.get("/participations", appraisalController.seeAllParticipate);

export default router;
