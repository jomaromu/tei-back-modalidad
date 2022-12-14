import { Request, Response } from "express";
import { CallbackError } from "mongoose";
const mongoose = require("mongoose");
import Server from "./server";

// Intefaces
import { ModaliddadPagoInterface } from "../interfaces/modalidadPago";

// Modelos
import modalidadPagoModel from "../models/modalidadPagoModel";

export class ModalidadPagoClass {
  constructor() {}

  crearModalidadPago(req: any, resp: Response): void {
    const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const nombre: string = req.body.nombre;
    const estado: boolean = req.body.estado;

    const nuevaModalidad = new modalidadPagoModel({
      idCreador,
      foranea,
      nombre,
      estado,
    });

    nuevaModalidad.save(
      (err: CallbackError, modalidadDB: ModaliddadPagoInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        } else {
          const server = Server.instance;
          server.io.emit("cargar-modalidad", {
            ok: true,
          });
          return resp.json({
            ok: true,
            mensaje: `Modalidad de pago creada`,
            modalidadDB,
          });
        }
      }
    );
  }

  editarModalidad(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.body.id);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const nombre: string = req.body.nombre;
    const estado: boolean = req.body.estado;

    const query = {
      nombre,
      estado,
    };

    modalidadPagoModel.findOne(
      { _id, foranea },
      (err: CallbackError, modalidadDB: ModaliddadPagoInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!modalidadDB) {
          return resp.json({
            ok: false,
            mensaje: `No se encontrĂ³ una modalidad de pago con ese ID`,
          });
        }

        if (!query.nombre) {
          query.nombre = modalidadDB.nombre;
        }

        modalidadPagoModel.findOneAndUpdate(
          { _id, foranea },
          query,
          { new: true },
          (err: CallbackError, modalidadDB: any) => {
            if (err) {
              return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err,
              });
            } else {
              const server = Server.instance;
              server.io.emit("cargar-modalidades", {
                ok: true,
              });
              return resp.json({
                ok: true,
                mensaje: "Modalidad actuaizada",
                modalidadDB,
              });
            }
          }
        );
      }
    );
  }

  obtenerModalidad(req: any, resp: Response) {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    modalidadPagoModel.findOne(
      { _id, foranea },
      (err: CallbackError, modalidadDB: ModaliddadPagoInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!modalidadDB) {
          return resp.json({
            ok: false,
            mensaje: `No se encontrĂ³ una modalidad de pago con ese ID`,
          });
        }

        return resp.json({
          ok: true,
          modalidadDB,
        });
      }
    );
  }

  obtenerModalidades(req: any, resp: Response) {
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
    modalidadPagoModel
      .find({ foranea })
      .populate("idCreador")
      .exec(
        (err: CallbackError, modalidadesDB: Array<ModaliddadPagoInterface>) => {
          if (err) {
            return resp.json({
              ok: false,
              mensaje: `Error interno`,
              err,
            });
          }

          return resp.json({
            ok: true,
            modalidadesDB,
          });
        }
      );
  }

  eliminarModalidad(req: any, resp: Response) {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    modalidadPagoModel.findOneAndDelete(
      { _id, foranea },
      {},
      (err: CallbackError, modalidadDB: any) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        } else {
          const server = Server.instance;
          server.io.emit("cargar-modalidades", {
            ok: true,
          });
          return resp.json({
            ok: true,
            mensaje: "Modalidad eliminada",
            modalidadDB,
          });
        }
      }
    );
  }
}
