## Índices

### 1. idx_ordenes_usuario_id
```sql
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);
```
Sirve para acelerar el JOIN entre tablas ordenes y usuarios, usado en la vista 2.
Gracias al indice se evita buscar en toda la tabla, saltando al usuario especifico.

### 2. idx_productos_categoria_id
```sql
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);
```
Optimiza el JOIN entre productos y categorias, usado en vista 1, 3 y 5
Encuentra rapidamente los productos de una categoria especificada, en lugar de revisar toda la tabla.

### 3. idx_ordenes_status
```sql
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);
```
Acelera el agrupamiento por estado de orden, usado en la vista 4.
Usado debido a que el agrupamiento por estado es mas rapido ya que agrupa las ordenes sin haber ordenado la tabla antes.

### 4. idx_orden_detalles_producto_id
```sql
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);
```
Optimiza el JOIN entre orden_detalles y productos, usado en la vista 1, 3 y 5
Este indice evita buscar manualmente entre todos los registros cuando se elige cada detalle de orden.

### 5.  idx_productos_stock
```sql
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);
```
Acelera los filtros por cantidad de stock, usado en la vista 3.
En este caso sirve para agilizar los filtrador por productos, por ejemplo, al realizar: `p.stock < 100`.
