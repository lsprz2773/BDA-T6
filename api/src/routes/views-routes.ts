import { Router } from 'express';
import { ViewsController } from '../controller/views-controller';

const router = Router();
const viewsController = new ViewsController();

router.get('/ventas-categoria', viewsController.getVentasPorCategoria.bind(viewsController));
router.get('/analisis-clientes', viewsController.getAnalisisClientes.bind(viewsController));
router.get('/productos-bajo-stock', viewsController.getProductosBajoStock.bind(viewsController));
router.get('/ordenes-estado', viewsController.getOrdenesEstado.bind(viewsController));
router.get('/top-productos-categoria', viewsController.getTopProductosCategoria.bind(viewsController));

export default router;
