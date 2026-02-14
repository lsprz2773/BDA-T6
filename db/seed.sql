-- ============================================
-- SEED.SQL - Datos Iniciales (EXPANDIDO)
-- ============================================
-- Equipo: [Nombre del equipo]
-- Fecha: [Fecha]
-- ============================================
-- ORDEN DE INSERCIÓN:
-- 1. Catálogos (sin dependencias)
-- 2. Entidades principales
-- 3. Relaciones/transacciones
-- ============================================


-- ============================================
-- 1. CATÁLOGOS
-- ============================================

INSERT INTO categorias (nombre, descripcion) VALUES
    ('Electrónica', 'Dispositivos electrónicos y accesorios'),
    ('Ropa', 'Vestimenta y accesorios de moda'),
    ('Hogar', 'Artículos para el hogar y decoración'),
    ('Deportes', 'Equipamiento y ropa deportiva'),
    ('Libros', 'Libros físicos y digitales'),
    ('Juguetes', 'Juguetes y entretenimiento infantil'),
    ('Alimentos', 'Productos alimenticios no perecederos');


-- ============================================
-- 2. ENTIDADES PRINCIPALES
-- ============================================

-- Usuarios (15 usuarios para variedad)
INSERT INTO usuarios (email, nombre, password_hash) VALUES
    ('ada@example.com', 'Ada Lovelace', 'hash_placeholder_1'),
    ('alan@example.com', 'Alan Turing', 'hash_placeholder_2'),
    ('grace@example.com', 'Grace Hopper', 'hash_placeholder_3'),
    ('linus@example.com', 'Linus Torvalds', 'hash_placeholder_4'),
    ('margaret@example.com', 'Margaret Hamilton', 'hash_placeholder_5'),
    ('donald@example.com', 'Donald Knuth', 'hash_placeholder_6'),
    ('bjarne@example.com', 'Bjarne Stroustrup', 'hash_placeholder_7'),
    ('guido@example.com', 'Guido van Rossum', 'hash_placeholder_8'),
    ('dennis@example.com', 'Dennis Ritchie', 'hash_placeholder_9'),
    ('ken@example.com', 'Ken Thompson', 'hash_placeholder_10'),
    ('john@example.com', 'John McCarthy', 'hash_placeholder_11'),
    ('edsger@example.com', 'Edsger Dijkstra', 'hash_placeholder_12'),
    ('tim@example.com', 'Tim Berners-Lee', 'hash_placeholder_13'),
    ('larry@example.com', 'Larry Page', 'hash_placeholder_14'),
    ('sergey@example.com', 'Sergey Brin', 'hash_placeholder_15');


-- Productos (40+ productos variados)
INSERT INTO productos (codigo, nombre, descripcion, precio, stock, categoria_id) VALUES
    -- Electrónica (categoria_id = 1) - 10 productos
    ('ELEC-001', 'Laptop Pro 15"', 'Laptop de alto rendimiento', 1299.99, 50, 1),
    ('ELEC-002', 'Mouse Inalámbrico', 'Mouse ergonómico Bluetooth', 29.99, 200, 1),
    ('ELEC-003', 'Teclado Mecánico', 'Teclado RGB switches azules', 89.99, 75, 1),
    ('ELEC-004', 'Monitor 27"', 'Monitor 4K IPS', 399.99, 30, 1),
    ('ELEC-005', 'Webcam HD', 'Cámara 1080p con micrófono', 59.99, 5, 1),
    ('ELEC-006', 'Auriculares Bluetooth', 'Audio Hi-Fi inalámbrico', 149.99, 80, 1),
    ('ELEC-007', 'Tablet 10"', 'Tablet Android última generación', 299.99, 45, 1),
    ('ELEC-008', 'Smartphone Pro', 'Teléfono 5G 128GB', 899.99, 25, 1),
    ('ELEC-009', 'Cargador Rápido', 'Cargador 65W USB-C', 34.99, 150, 1),
    ('ELEC-010', 'Cable HDMI 4K', 'Cable premium 2 metros', 19.99, 300, 1),
    
    -- Ropa (categoria_id = 2) - 10 productos
    ('ROPA-001', 'Camiseta Básica', 'Camiseta 100% algodón', 19.99, 8, 2),
    ('ROPA-002', 'Jeans Clásico', 'Pantalón de mezclilla', 49.99, 200, 2),
    ('ROPA-003', 'Sudadera Tech', 'Sudadera con capucha', 39.99, 15, 2),
    ('ROPA-004', 'Zapatos Casual', 'Calzado cómodo diario', 69.99, 100, 2),
    ('ROPA-005', 'Gorra Deportiva', 'Gorra ajustable', 14.99, 300, 2),
    ('ROPA-006', 'Chaqueta Impermeable', 'Chaqueta técnica outdoor', 129.99, 60, 2),
    ('ROPA-007', 'Pantalón Deportivo', 'Pants cómodo gimnasio', 44.99, 90, 2),
    ('ROPA-008', 'Calcetines Pack 5', 'Pack calcetines deportivos', 24.99, 200, 2),
    ('ROPA-009', 'Cinturón Cuero', 'Cinturón elegante negro', 34.99, 70, 2),
    ('ROPA-010', 'Bufanda Lana', 'Bufanda tejida artesanal', 29.99, 50, 2),
    
    -- Hogar (categoria_id = 3) - 10 productos
    ('HOME-001', 'Lámpara LED', 'Lámpara de escritorio regulable', 34.99, 80, 3),
    ('HOME-002', 'Silla Ergonómica', 'Silla de oficina ajustable', 249.99, 3, 3),
    ('HOME-003', 'Organizador', 'Set de organizadores', 24.99, 120, 3),
    ('HOME-004', 'Planta Artificial', 'Decoración verde', 19.99, 200, 3),
    ('HOME-005', 'Cuadro Decorativo', 'Arte moderno 50x70cm', 44.99, 60, 3),
    ('HOME-006', 'Alfombra Sala', 'Alfombra moderna 2x3m', 89.99, 35, 3),
    ('HOME-007', 'Cojines Decorativos', 'Set 4 cojines variados', 39.99, 95, 3),
    ('HOME-008', 'Espejo Pared', 'Espejo decorativo redondo', 79.99, 40, 3),
    ('HOME-009', 'Reloj Pared', 'Reloj minimalista silencioso', 49.99, 75, 3),
    ('HOME-010', 'Cortinas Blackout', 'Cortinas bloqueadoras luz', 59.99, 55, 3),
    
    -- Deportes (categoria_id = 4) - 8 productos
    ('DEP-001', 'Balón Fútbol', 'Balón profesional FIFA', 49.99, 40, 4),
    ('DEP-002', 'Pesas 10kg', 'Par de mancuernas ajustables', 79.99, 7, 4),
    ('DEP-003', 'Colchoneta Yoga', 'Mat antideslizante premium', 34.99, 85, 4),
    ('DEP-004', 'Bicicleta Estática', 'Bicicleta indoor spinning', 399.99, 15, 4),
    ('DEP-005', 'Cuerda Saltar', 'Cuerda profesional speed', 14.99, 120, 4),
    ('DEP-006', 'Guantes Gym', 'Guantes protección entrenamiento', 24.99, 90, 4),
    ('DEP-007', 'Banda Elástica', 'Set 5 bandas resistencia', 29.99, 110, 4),
    ('DEP-008', 'Botella Deportiva', 'Botella térmica 1L', 19.99, 200, 4),
    
    -- Libros (categoria_id = 5) - 6 productos
    ('LIB-001', 'Clean Code', 'Robert C. Martin', 44.99, 25, 5),
    ('LIB-002', 'Design Patterns', 'Gang of Four', 54.99, 18, 5),
    ('LIB-003', 'The Pragmatic Programmer', 'Hunt & Thomas', 49.99, 30, 5),
    ('LIB-004', 'JavaScript: The Good Parts', 'Douglas Crockford', 29.99, 40, 5),
    ('LIB-005', 'Introduction to Algorithms', 'CLRS', 89.99, 12, 5),
    ('LIB-006', 'Refactoring', 'Martin Fowler', 54.99, 22, 5);


-- ============================================
-- 3. TRANSACCIONES/RELACIONES
-- ============================================

-- Órdenes (30 órdenes con diferentes estados y fechas)
INSERT INTO ordenes (usuario_id, total, status, created_at) VALUES
    -- Cliente VIP: Ada (>$1000 en total)
    (1, 1419.96, 'entregado', '2026-01-15 10:30:00'),
    (1, 179.98, 'entregado', '2026-01-20 14:15:00'),
    (1, 899.99, 'pagado', '2026-02-10 09:00:00'),
    
    -- Cliente VIP: Margaret
    (5, 1299.99, 'entregado', '2026-01-18 16:45:00'),
    (5, 249.98, 'pagado', '2026-02-05 11:20:00'),
    
    -- Cliente REGULAR: Alan ($100-$1000)
    (2, 139.97, 'enviado', '2026-01-25 13:30:00'),
    (2, 299.99, 'pagado', '2026-02-08 10:15:00'),
    
    -- Cliente REGULAR: Grace
    (3, 284.98, 'entregado', '2026-01-22 15:00:00'),
    (3, 89.99, 'pagado', '2026-02-12 14:30:00'),
    
    -- Cliente REGULAR: Linus
    (4, 99.98, 'pendiente', '2026-02-13 18:00:00'),
    (4, 399.99, 'enviado', '2026-02-01 12:00:00'),
    
    -- Cliente REGULAR: Donald
    (6, 399.99, 'entregado', '2026-01-30 09:45:00'),
    (6, 119.98, 'pagado', '2026-02-11 16:20:00'),
    
    -- Cliente REGULAR: Bjarne
    (7, 549.97, 'pagado', '2026-02-03 11:00:00'),
    
    -- Cliente NUEVO: Guido (<$100)
    (8, 79.99, 'enviado', '2026-02-09 10:30:00'),
    
    -- Cliente NUEVO: Dennis
    (9, 44.99, 'entregado', '2026-01-28 14:00:00'),
    
    -- Cliente NUEVO: Ken
    (10, 89.99, 'pagado', '2026-02-07 13:15:00'),
    
    -- Cliente NUEVO: John
    (11, 54.99, 'pendiente', '2026-02-13 15:45:00'),
    
    -- Cliente NUEVO: Edsger
    (12, 34.99, 'cancelado', '2026-02-05 17:00:00'),
    
    -- Cliente REGULAR: Tim
    (13, 249.97, 'entregado', '2026-01-19 10:00:00'),
    (13, 179.98, 'pagado', '2026-02-10 12:30:00'),
    
    -- Cliente REGULAR: Larry
    (14, 299.97, 'pagado', '2026-02-04 09:15:00'),
    
    -- Cliente REGULAR: Sergey
    (15, 449.96, 'entregado', '2026-01-26 11:45:00'),
    (15, 129.99, 'enviado', '2026-02-11 14:00:00'),
    
    -- Más órdenes para variedad de estados
    (1, 59.99, 'cancelado', '2026-01-21 16:30:00'),
    (2, 49.99, 'cancelado', '2026-02-02 10:00:00'),
    (7, 299.99, 'pendiente', '2026-02-13 09:30:00'),
    (8, 149.99, 'pendiente', '2026-02-13 11:00:00'),
    (14, 89.99, 'enviado', '2026-02-12 13:30:00'),
    (15, 199.98, 'pendiente', '2026-02-13 16:00:00');


-- Detalle de órdenes (distribución variada de productos)
INSERT INTO orden_detalles (orden_id, producto_id, cantidad, precio_unitario) VALUES
    -- Orden 1: Ada - Laptop + Accesorios
    (1, 1, 1, 1299.99),   -- Laptop
    (1, 2, 2, 29.99),     -- 2 Mouse
    (1, 5, 1, 59.99),     -- Webcam
    
    -- Orden 2: Ada - Ropa
    (2, 11, 3, 19.99),    -- 3 Camisetas
    (2, 13, 2, 39.99),    -- 2 Sudaderas
    (2, 15, 2, 14.99),    -- 2 Gorras
    
    -- Orden 3: Ada - Smartphone
    (3, 8, 1, 899.99),    -- Smartphone
    
    -- Orden 4: Margaret - Laptop
    (4, 1, 1, 1299.99),
    
    -- Orden 5: Margaret - Hogar
    (5, 22, 1, 249.99),   -- Silla (BAJO STOCK - solo quedan 3)
    
    -- Orden 6: Alan - Electrónica variada
    (6, 5, 1, 59.99),     -- Webcam (BAJO STOCK)
    (6, 9, 2, 34.99),     -- 2 Cargadores
    (6, 10, 1, 19.99),    -- Cable
    
    -- Orden 7: Alan - Tablet
    (7, 7, 1, 299.99),
    
    -- Orden 8: Grace - Hogar
    (8, 22, 1, 249.99),   -- Silla
    (8, 21, 1, 34.99),    -- Lámpara
    
    -- Orden 9: Grace - Hogar decorativo
    (9, 27, 1, 89.99),    -- Alfombra
    
    -- Orden 10: Linus - Ropa
    (10, 12, 1, 49.99),   -- Jeans
    (10, 13, 1, 39.99),   -- Sudadera (BAJO STOCK)
    (10, 15, 2, 14.99),   -- 2 Gorras
    
    -- Orden 11: Linus - Monitor
    (11, 4, 1, 399.99),
    
    -- Orden 12: Donald - Monitor
    (12, 4, 1, 399.99),
    
    -- Orden 13: Donald - Accesorios
    (13, 2, 2, 29.99),
    (13, 5, 1, 59.99),
    
    -- Orden 14: Bjarne - Setup completo
    (14, 4, 1, 399.99),   -- Monitor
    (14, 3, 1, 89.99),    -- Teclado
    (14, 5, 1, 59.99),    -- Webcam
    
    -- Orden 15: Guido - Deportes
    (15, 33, 1, 79.99),   -- Pesas (BAJO STOCK)
    
    -- Orden 16: Dennis - Libro
    (16, 41, 1, 44.99),
    
    -- Orden 17: Ken - Hogar
    (17, 27, 1, 89.99),
    
    -- Orden 18: John - Libro
    (18, 42, 1, 54.99),
    
    -- Orden 19: Edsger - Lámpara (cancelada)
    (19, 21, 1, 34.99),
    
    -- Orden 20: Tim - Deportes
    (20, 34, 1, 399.99),  -- Bicicleta
    (20, 35, 3, 14.99),   -- 3 Cuerdas
    (20, 38, 2, 19.99),   -- 2 Botellas
    
    -- Orden 21: Tim - Libros
    (21, 43, 2, 49.99),   -- 2 Libros
    (21, 41, 1, 44.99),
    (21, 44, 1, 29.99),
    
    -- Orden 22: Larry - Electrónica
    (22, 6, 2, 149.99),   -- 2 Auriculares
    
    -- Orden 23: Sergey - Hogar completo
    (23, 28, 2, 39.99),   -- 2 Set cojines
    (23, 29, 1, 79.99),   -- Espejo
    (23, 30, 2, 49.99),   -- 2 Relojes
    (23, 31, 2, 59.99),   -- 2 Cortinas
    (23, 25, 2, 44.99),   -- 2 Cuadros
    
    -- Orden 24: Sergey - Ropa invierno
    (24, 16, 1, 129.99),  -- Chaqueta
    
    -- Orden 25: Ada - Webcam (cancelada)
    (25, 5, 1, 59.99),
    
    -- Orden 26: Alan - Jeans (cancelado)
    (26, 12, 1, 49.99),
    
    -- Orden 27: Bjarne - Tablet (pendiente)
    (27, 7, 1, 299.99),
    
    -- Orden 28: Guido - Auriculares (pendiente)
    (28, 6, 1, 149.99),
    
    -- Orden 29: Larry - Hogar (enviado)
    (29, 27, 1, 89.99),
    
    -- Orden 30: Sergey - Deportes (pendiente)
    (30, 33, 2, 79.99),   -- 2 Pesas
    (30, 38, 2, 19.99);   -- 2 Botellas


-- ============================================
-- 4. EDGE CASES
-- ============================================

-- Caso: String largo pero válido
INSERT INTO usuarios (email, nombre, password_hash) VALUES
    ('usuario.con.email.muy.largo.pero.valido@subdominio.empresa.ejemplo.com', 
     'Usuario Con Nombre Extremadamente Largo Para Probar Límites', 
     'hash_muy_largo_12345678901234567890');

-- Caso: Producto con stock muy bajo (crítico)
INSERT INTO productos (codigo, nombre, precio, stock, categoria_id) VALUES
    ('EDGE-001', 'Producto Gratuito', 0.00, 0, 1);


-- ============================================
-- FIN DEL SEED
-- ============================================
