import { Request, Response } from 'express';
import * as db from '../config/db';


export const getVentasPorCategoria =  async (req: Request, res: Response) => {
  try {
    //const validated = schemas.;
    const searchTerm = 1;
    const result = await db.query(`
      SELECT nombre_categoria, total_productos_vendidos, ingreso_total, ticket_promedio
      numero_de_ordenes, porcentaje_participacion FROM view_ventas_por_categoria
      WHERE nombre_categoria ILIKE $1
      ORDER BY ingreso_total DESC`,
      [searchTerm]
    )

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al obtener ventas por categoría',
    })
  }
};