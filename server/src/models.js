import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({ body: { type: String, required: true }, suspectId: String, evidenceId: String }, { timestamps: true });
const suspectSchema = new mongoose.Schema({ id: String, name: String, age: Number, occupation: String, profile: String, relationship: String, motive: String, alibi: String, suspiciousBehavior: String }, { _id: false });
const evidenceSchema = new mongoose.Schema({ id: String, title: String, category: String, description: String, content: mongoose.Schema.Types.Mixed, relatedSuspects: [String], importance: String, reliability: String, clue: String, mediaUrl: String }, { _id: false });
const solutionSchema = new mongoose.Schema({ culpritId: String, motive: String, explanation: String, timeline: [String], importantClues: [String], misleadingClues: [String], supportingEvidence: [String], conclusion: String }, { _id: false });

export const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, password: { type: String, required: true }
}, { timestamps: true }));

export const Investigation = mongoose.model('Investigation', new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, caseId: { type: String, required: true, unique: true },
  title: String, description: String, incidentType: String, location: String, incidentAt: String, introduction: String, difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  suspects: [suspectSchema], evidence: [evidenceSchema], solution: { type: solutionSchema, required: true }, notes: [noteSchema],
  status: { type: String, enum: ['active', 'completed'], default: 'active' }, selectedSuspectId: String, result: Boolean, completedAt: Date
}, { timestamps: true }));
