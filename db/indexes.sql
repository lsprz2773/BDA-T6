-- Indices para optimizar vistas

-- Optimiza JOINs entre orden_detalles y productos (Vistas 1, 3, 5)

CREATE INDEX idx_orden_detalles_producto_id ON orden_detalles(producto_id);

-- Optimiza filtros por stock en Vista 3
CREATE INDEX idx_productos_stock ON productos(stock);

-- Optimiza JOINs y GROUP BY en Vista 2
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);

-- Optimiza GROUP BY en Vista 4
CREATE INDEX idx_ordenes_status ON ordenes(status);

-- Optimiza JOINs productos-categorías (Vistas 1, 3, 5)
CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);
