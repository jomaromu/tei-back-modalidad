import { Router, Request, Response } from "express";
import { verificaToken } from "../auth/auth";
import { ModalidadPagoClass } from "../class/modalidadPagoClass";

const modalidadPagoRoute = Router();

modalidadPagoRoute.post(
  "/crearModalidadPago",
  [verificaToken],
  (req: Request, resp: Response) => {
    const crearModalidadPago = new ModalidadPagoClass();
    crearModalidadPago.crearModalidadPago(req, resp);
  }
);

modalidadPagoRoute.put(
  "/editarModalidad",
  [verificaToken],
  (req: Request, resp: Response) => {
    const editarModalidad = new ModalidadPagoClass();
    editarModalidad.editarModalidad(req, resp);
  }
);

modalidadPagoRoute.get(
  "/obtenerModalidad",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerModalidad = new ModalidadPagoClass();
    obtenerModalidad.obtenerModalidad(req, resp);
  }
);

modalidadPagoRoute.get(
  "/obtenerModalidades",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerModalidades = new ModalidadPagoClass();
    obtenerModalidades.obtenerModalidades(req, resp);
  }
);

modalidadPagoRoute.delete(
  "/eliminarModalidad",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarModalidad = new ModalidadPagoClass();
    eliminarModalidad.eliminarModalidad(req, resp);
  }
);

export default modalidadPagoRoute;
