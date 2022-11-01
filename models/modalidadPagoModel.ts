import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { ModaliddadPagoInterface } from "../interfaces/modalidadPago";

// crear esquema
const Schema = mongoose.Schema;

const modalidadPagoSchema = new Schema({
  idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
  nombre: {
    type: String,
    required: [true, "EL nombre es necesario"],
  },
  estado: { type: Boolean, default: true },
  foranea: { type: Schema.Types.ObjectId, ref: "userWorker" },
});

// validacion para único elemento
modalidadPagoSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<ModaliddadPagoInterface>(
  "modalidadPago",
  modalidadPagoSchema
);
