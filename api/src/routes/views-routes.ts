import { Router } from 'express';
import * as vwsController from '../controller/views-controller';

const router = Router();

router.get('/ventas-por-categoria', vwsController.getVentasPorCategoria);
router.get('/analisis-de-clientes', vwsController.getAnalisisDeClientes);
router.get('/productos-bajo-stock', vwsController.getProductosBajoStock);
router.get('/ordenes-estado', vwsController.getAnalisisOrdenesEstado);
router.get('/top-productos-categoria', vwsController.getTopProductosPorCategoria);

export default router;