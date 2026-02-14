-- VIEW 1: Resumen de Ventas por Categoría
-- Objetivo: Analizar el rendimiento de ventas por categoría de productos.
-- Requisitos específicos:
--  Debe mostrar: nombre de categoría, total de productos vendidos, ingreso total, ticket promedio, y número de órdenes
--   Usar COUNT, SUM, AVG
--   Usar GROUP BY por categoría
--   Usar HAVING para filtrar solo categorías que han generado más de $100 en ventas
-- Campo calculado: porcentaje de participación de cada categoría sobre el total de ventas
-- NO usar SELECT *
-- Listar columnas con aliases legibles en español


-- DEVUELVE: Ventas por categoria
-- GRAIN: Categoria
-- METRICAS: Productos vendidos por categoria, Ingreso total por categoria, Precio del ticket promedio, Porcentaje de participacion de categoria sobre ventas totales
-- POR QUE USA GROUP BY/HAVING: GROUP BY para agrupar y ordenar la tabla resultado con la categoria y HAVING para solo mostrar las categorias que hayan tenido una venta total mayor a 100
-- QUERIES DE VERIFICACION:

--   DEBEN COINCIDIR
--     SELECT SUM(ingreso_total) FROM view_ventas_por_categoria;
--     SELECT SUM(subtotal) FROM orden_detalles;

CREATE OR REPLACE VIEW view_ventas_por_categoria AS
SELECT 
    c.nombre AS nombre_categoria,
    SUM(od.cantidad) AS total_productos_vendidos,
    SUM(od.subtotal) AS ingreso_total,
    ROUND(SUM(od.subtotal)/COUNT(DISTINCT o.id),2) AS ticket_promedio,
    COUNT(DISTINCT o.id) AS numero_de_ordenes,
    ROUND((SUM(od.subtotal) / SUM(SUM(od.subtotal)) OVER ()) * 100, 2) AS porcentaje_participacion
FROM orden_detalles od 
INNER JOIN productos p ON od.producto_id = p.id 
INNER JOIN categorias c ON p.categoria_id = c.id
INNER JOIN ordenes o ON od.orden_id = o.id
GROUP BY c.nombre
HAVING SUM(od.subtotal) >= 100;






-- Vista 2: Análisis de Clientes (con CASE y Window Function)
-- Objetivo: Clasificar clientes según su comportamiento de compra.
-- Requisitos específicos:
--   Debe mostrar: nombre del cliente, total gastado, número de órdenes, ticket promedio
--   Usar CASE para crear una columna de segmentación: 'VIP' (>$1000), 'Regular' ($100-$1000), 'Nuevo' (<$100)
--   Usar ROW_NUMBER() o RANK() para rankear clientes por total gastado
--   Usar COUNT y SUM
-- Campo calculado: diferencia entre el total gastado y el promedio general de todos los clientes
-- NO usar SELECT *


-- DEVUELVE: Analisis de ventas por cliente
-- GRAIN: Cliente
-- METRICAS: Total gastado, ticket promedio, rango de cliente, ranking y diferencia contra promedio
-- POR QUE USA GROUP BY/HAVING: GROUP BY para poder ordenar la tabla resultado a traves del nombre (y por que son los unicos campos del SELECT sin funciones) y como extra se uso un ORDER BY para ordenar la tabla resultado basandose en quien ha gastado mas
-- QUERIES DE VERIFICACION:

--   DEBE COINCIDIR:
--     SELECT SUM(total_gastado) FROM view_analisis_de_clientes;
--     SELECT SUM(total) FROM ordenes;

-- VIEW 2: 

CREATE OR REPLACE VIEW view_analisis_de_clientes AS
SELECT 
    u.nombre AS nombre_cliente,
    SUM(o.total) AS total_gastado,
    COUNT(DISTINCT o.id) AS numero_de_ordenes,
    ROUND(AVG(o.total),2) AS ticket_promedio,
    CASE 
        WHEN SUM(o.total) >= 1000 THEN 'VIP'
        WHEN SUM(o.total) >= 100 THEN 'REGULAR'
        ELSE 'NUEVO'
    END AS rango_cliente,
    RANK() OVER (ORDER BY SUM(o.total) DESC) AS ranking,
    ROUND(SUM(o.total)-(SELECT AVG(total) FROM ordenes),2) AS diferencia_vs_promedio
FROM usuarios u 
INNER JOIN ordenes o ON u.id = o.usuario_id
GROUP BY u.id, u.nombre
ORDER BY ranking;






-- Vista 3: Productos con Bajo Stock (con COALESCE y HAVING)
-- Objetivo: Identificar productos que necesitan reabastecimiento.
-- Requisitos específicos:
--   Debe mostrar: código, nombre del producto, categoría, stock actual, unidades vendidas
--   Usar COALESCE para manejar productos sin ventas (mostrar 0 en lugar de NULL)
--   Usar COUNT o SUM para calcular unidades vendidas
--   Usar GROUP BY por producto
-- Campo calculado: ratio de rotación (ventas / stock actual)
-- Usar CASE para clasificar urgencia: 'Crítico' (stock < 50), 'Bajo' (50-99), 'Normal' (>=100)


-- DEVUELVE: Reporte de productos con bajo stock
-- GRAIN: Producto
-- METRICAS: Unidades vendidas, unidades restantes, radio de rotacion y urgencia
-- POR QUE USA GROUP BY/HAVING: GROUP BY para poder ordenar la tabla resultado a traves del nombre e id (y por que son los unicos campos del SELECT sin funciones) y como extra se uso un ORDER BY para ordenar la tabla resultado basandose en el stock disponible
-- QUERIES DE VERIFICACION: 

--   DEBE SER MENOR A 100
--     SELECT MAX(stock_actual) FROM view_productos_bajo_stock;

-- VIEW 3: 
CREATE OR REPLACE VIEW view_productos_bajo_stock AS
SELECT
    p.id AS id_producto,
    p.nombre AS nombre_producto,
    c.nombre AS categoria,
    p.stock AS stock_actual,
    COALESCE(SUM(od.cantidad), 0) AS unidades_vendidas,
    p.stock - COALESCE(SUM(od.cantidad), 0) AS unidades_restantes,
    ROUND(CAST(COALESCE(SUM(od.cantidad), 0) AS NUMERIC) / NULLIF(p.stock, 0),2) AS radio_rotacion,
    CASE
        WHEN (p.stock - COALESCE(SUM(od.cantidad), 0)) < 50 THEN 'Critico'
        WHEN (p.stock - COALESCE(SUM(od.cantidad), 0)) < 100 THEN 'Bajo'
        ELSE 'Normal'
    END AS urgencia
FROM productos p
LEFT JOIN categorias c ON c.id = p.categoria_id 
LEFT JOIN orden_detalles od ON p.id = od.producto_id
WHERE p.stock < 100
GROUP BY p.id, p.nombre, c.nombre, p.stock
ORDER BY p.stock ASC;








-- Vista 4: Análisis de Órdenes por Estado (con CTE)
-- Objetivo: Analizar la distribución de órdenes según su estado usando Common Table Expression.
-- Requisitos específicos:
--   Usar WITH (CTE) para crear una subconsulta base
--   Debe mostrar: estado de orden, cantidad de órdenes, valor total, valor promedio, valor máximo, valor mínimo
--   Usar COUNT, SUM, AVG, MAX, MIN
--   Usar GROUP BY por estado
-- Campo calculado: porcentaje de órdenes en cada estado respecto al total
-- Usar CASE para traducir status a español ('pendiente' → 'Pendiente', 'pagado' → 'Pagado', etc.)
-- NO usar SELECT *


-- DEVUELVE: Ordenes agrupadas por estado
-- GRAIN: Estado
-- METRICAS: Cantidad de ordenes, valor total, valor promedio, valor maximo, valor minimo y porcentaje de ordenes
-- POR QUE USA GROUP BY/HAVING: GROUP BY para poder ordenar la tabla resultado a traves del estado (y por que son los unicos campos del SELECT sin funciones)
-- QUERIES DE VERIFICACION: 

--   DEBE COINCIDIR:
--     SELECT SUM(cantidad_ordenes) FROM view_analisis_ordenes_estado;
--     SELECT COUNT(*) FROM ordenes;

-- VIEW 4: 

CREATE OR REPLACE VIEW view_analisis_ordenes_estado AS
WITH ordenes_base AS (
    SELECT 
        o.id,
        o.status,
        o.total,
        CASE 
            WHEN o.status = 'pendiente' THEN 'Pendiente'
            WHEN o.status = 'pagado' THEN 'Pagado'
            WHEN o.status = 'enviado' THEN 'Enviado'
            WHEN o.status = 'entregado' THEN 'Entregado'
            WHEN o.status = 'cancelado' THEN 'Cancelado'
            ELSE 'Desconocido'
        END AS estado_traducido
    FROM ordenes o
),
total_ordenes AS (
    SELECT COUNT(*) AS total FROM ordenes
)
SELECT 
    ob.estado_traducido AS estado,
    COUNT(ob.id) AS cantidad_ordenes,
    SUM(ob.total) AS valor_total,
    ROUND(AVG(ob.total),2) AS valor_promedio,
    MAX(ob.total) AS valor_maximo,
    MIN(ob.total) AS valor_minimo,
    ROUND(
        (COUNT(ob.id)::NUMERIC / (SELECT total FROM total_ordenes)) * 100,
        2
    ) AS porcentaje_ordenes
FROM ordenes_base ob
GROUP BY ob.estado_traducido
ORDER BY cantidad_ordenes DESC;






-- Vista 5: Top Productos por Categoría (con Window Function y HAVING)
-- Objetivo: Identificar los productos más vendidos dentro de cada categoría.
-- Requisitos específicos:
--   Debe mostrar: categoría, nombre del producto, unidades vendidas, ingresos generados, ranking dentro de su categoría
--   Usar SUM o COUNT para calcular ventas
--   Usar RANK() o ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY ventas DESC) para rankear dentro de cada categoría
--   Usar GROUP BY por categoría y producto
--   Usar HAVING para filtrar solo productos con al menos 1 venta
-- Campo calculado: porcentaje de ventas del producto respecto al total de su categoría
-- Usar COALESCE para manejar productos sin ventas


-- DEVUELVE: Ranking de productos por categoria
-- GRAIN: Producto
-- METRICAS: Unidades vendidas, ingresos generados, ranking de categoria y porcentaje de categoria
-- POR QUE USA GROUP BY/HAVING: GROUP BY para poder ordenar la tabla resultado a traves de la categoria y producto (y por que son los unicos campos del SELECT sin funciones) y HAVING para filtrar con productos con al menos una venta
-- QUERIES DE VERIFICACION:

--   DEBE COINCIDIR:
--     SELECT SUM(ingresos_generados) FROM view_top_productos_categoria;
--     SELECT SUM(subtotal) FROM orden_detalles;

-- VIEW 5: 
CREATE OR REPLACE VIEW view_top_productos_categoria AS
SELECT 
    COALESCE(c.nombre, 'Sin categoría') AS categoria,
    p.nombre AS nombre_producto,
    COALESCE(SUM(od.cantidad), 0) AS unidades_vendidas,
    COALESCE(SUM(od.subtotal), 0) AS ingresos_generados,
    RANK() OVER (
        PARTITION BY c.id 
        ORDER BY COALESCE(SUM(od.subtotal), 0) DESC
    ) AS ranking_categoria,
    ROUND((COALESCE(SUM(od.subtotal), 0) / NULLIF(SUM(COALESCE(SUM(od.subtotal), 0)) OVER (PARTITION BY c.id),0)) * 100,2) AS porcentaje_categoria
FROM productos p
LEFT JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN orden_detalles od ON p.id = od.producto_id
GROUP BY p.id, p.nombre, c.id, c.nombre
HAVING COALESCE(SUM(od.cantidad), 0) >= 1
ORDER BY categoria, ranking_categoria;

