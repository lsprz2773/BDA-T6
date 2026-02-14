# Proyecto de Base de Datos con vistas de analisis


### VERIFICACION DE LAS VISTAS
```bash
                    List of relations
 Schema |             Name             | Type |  Owner
--------+------------------------------+------+----------
 public | view_analisis_de_clientes    | view | postgres
 public | view_analisis_ordenes_estado | view | postgres
 public | view_productos_bajo_stock    | view | postgres
 public | view_top_productos_categoria | view | postgres
 public | view_ventas_por_categoria    | view | postgres
(5 rows)
```

## Trade-offs: SQL vs Next.js
- **Calculado en SQL:** Se usaron funciones de agregacion (SUM, AVG, COUNT) y porcentajes de participación por categoría en las vistas
- **Calculado en SQL:** Rankings y window functions (`RANK() OVER`, `ROW_NUMBER()`) para aprovechar las optimizaciones nativas de PostgreSQL y reducir transferencia de datos al cliente
- **Calculado en SQL:** Joins entre múltiples tablas (productos, categorías, órdenes, usuarios) para minimizar consultas al servidor

## Performance Evidence
### Evidencia 1: Vista de Análisis de Clientes con Window Function
```bash
                                                                       QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------------------------------------  
 Subquery Scan on view_analisis_de_clientes  (cost=89.95..90.70 rows=60 width=362) (actual time=0.370..0.374 rows=15 loops=1)
   ->  Sort  (cost=89.95..90.10 rows=60 width=366) (actual time=0.368..0.370 rows=15 loops=1)
         Sort Key: (rank() OVER (?))
         Sort Method: quicksort  Memory: 26kB
         InitPlan 1 (returns $0)
           ->  Aggregate  (cost=18.00..18.01 rows=1 width=32) (actual time=0.009..0.009 rows=1 loops=1)
                 ->  Seq Scan on ordenes  (cost=0.00..16.40 rows=640 width=16) (actual time=0.003..0.004 rows=30 loops=1)
         ->  WindowAgg  (cost=68.37..70.17 rows=60 width=366) (actual time=0.320..0.341 rows=15 loops=1)
               ->  Sort  (cost=68.37..68.52 rows=60 width=294) (actual time=0.278..0.279 rows=15 loops=1)
                     Sort Key: (sum(o.total)) DESC
                     Sort Method: quicksort  Memory: 26kB
                     ->  GroupAggregate  (cost=59.29..66.59 rows=60 width=294) (actual time=0.232..0.243 rows=15 loops=1)
                           Group Key: u.id
                           ->  Sort  (cost=59.29..60.89 rows=640 width=242) (actual time=0.200..0.202 rows=30 loops=1)
                                 Sort Key: u.id, o.id
                                 Sort Method: quicksort  Memory: 26kB
                                 ->  Hash Join  (cost=11.35..29.46 rows=640 width=242) (actual time=0.142..0.148 rows=30 loops=1)
                                       Hash Cond: (o.usuario_id = u.id)
                                       ->  Seq Scan on ordenes o  (cost=0.00..16.40 rows=640 width=24) (actual time=0.054..0.055 rows=30 loops=1)
                                       ->  Hash  (cost=10.60..10.60 rows=60 width=222) (actual time=0.062..0.062 rows=16 loops=1)
                                             Buckets: 1024  Batches: 1  Memory Usage: 9kB
                                             ->  Seq Scan on usuarios u  (cost=0.00..10.60 rows=60 width=222) (actual time=0.047..0.048 rows=16 loops=1)   
 Planning Time: 3.371 ms
 Execution Time: 0.696 ms
(24 rows)
```

**Explicación:** La vista tarda menos de 1 milisegundo en ejecutarse. Procesa 15 clientes con 30 órdenes usando solo 26kB de memoria. El `RANK()` necesita ordenar los datos primero, lo cual es muy rápido porque hay pocos registros.


### Evidencia 2: Vista de Ventas por Categoría
```bash
                                                                    QUERY PLAN
--------------------------------------------------------------------------------------------------------------------------------------------------
 WindowAgg  (cost=40.42..42.29 rows=17 width=330) (actual time=0.569..0.583 rows=5 loops=1)
   ->  GroupAggregate  (cost=40.42..41.82 rows=17 width=266) (actual time=0.540..0.559 rows=5 loops=1)
         Group Key: c.nombre
         Filter: (sum(od.subtotal) >= '100'::numeric)
         ->  Sort  (cost=40.42..40.55 rows=51 width=242) (actual time=0.529..0.540 rows=51 loops=1)
               Sort Key: c.nombre, o.id
               Sort Method: quicksort  Memory: 27kB
               ->  Hash Join  (cost=19.02..38.97 rows=51 width=242) (actual time=0.457..0.478 rows=51 loops=1)
                     Hash Cond: (od.producto_id = p.id)
                     ->  Hash Join  (cost=2.15..21.46 rows=51 width=28) (actual time=0.298..0.313 rows=51 loops=1)
                           Hash Cond: (o.id = od.orden_id)
                           ->  Seq Scan on ordenes o  (cost=0.00..16.40 rows=640 width=4) (actual time=0.012..0.022 rows=30 loops=1)
                           ->  Hash  (cost=1.51..1.51 rows=51 width=28) (actual time=0.273..0.273 rows=51 loops=1)
                                 Buckets: 1024  Batches: 1  Memory Usage: 11kB
                                 ->  Seq Scan on orden_detalles od  (cost=0.00..1.51 rows=51 width=28) (actual time=0.255..0.258 rows=51 loops=1)
                     ->  Hash  (cost=16.31..16.31 rows=45 width=222) (actual time=0.152..0.153 rows=45 loops=1)
                           Buckets: 1024  Batches: 1  Memory Usage: 10kB
                           ->  Hash Join  (cost=2.01..16.31 rows=45 width=222) (actual time=0.142..0.146 rows=45 loops=1)
                                 Hash Cond: (c.id = p.categoria_id)
                                 ->  Seq Scan on categorias c  (cost=0.00..12.80 rows=280 width=222) (actual time=0.036..0.036 rows=7 loops=1)
                                 ->  Hash  (cost=1.45..1.45 rows=45 width=8) (actual time=0.045..0.046 rows=45 loops=1)
                                       Buckets: 1024  Batches: 1  Memory Usage: 10kB
                                       ->  Seq Scan on productos p  (cost=0.00..1.45 rows=45 width=8) (actual time=0.035..0.038 rows=45 loops=1)
 Planning Time: 7.585 ms
 Execution Time: 0.747 ms
(25 rows)
```


**Explicación:** La vista se ejecuta en 0.747ms procesando 5 categorías con 51 productos vendidos. Usa Hash Join para combinar las tablas rápidamente con gasto de  27kB de memoria. El filtro `HAVING` se aplica después del `GROUP BY`, eliminando categorías con pocas ventas.


## Threat Model Mínimo
Medidas de seguridad implementadas para proteger la aplicación:

- **SQL Injection Prevention:** Fue algo inicial, todas las queries en API routes de Next.js usan queries parametrizadas(`$1`, `$2`) en lugar de concatenación de strings.
- **Credenciales Seguras:** Variables de entorno almacenadas en `.env`
- **Privilegios Mínimos:** Usuario de base de datos creado especialmente con permisos limitados: solo `SELECT` en vistas,sin permisos de ningun tipo en tablas 
restantes de la BD
- **Validación de Input:** Limpieza de todos los parámetros de API con Zod antes de pasarlos a SQL, rechazando caracteres especiales sospechosos y validando tipos de datos

# Bitacora de IA

## Prompts principales (resumen ya que al usar archivos de referencia como esquemas, son mensajes demasiado largos)
- Debido a que no sabia que views crear, solicité a la IA que me diera 5 views objetivos que me pidieran con lo establecido en la asignación, cabe recalcar que
simplemente pedí la indicación, mas no la respuesta
- Mientras iba creando las views, fui mandando mis resultados y pidiendo recomendaciones y mejoras 
- Para tener mas datos en las vistas de Next, mandé de referencia el archivo seed y el archivo schema para que me generara mas registros en el archivo seed, sin
romper o agregar datos que no existieran
- Tambien requerí varias explicaciones como funciona `EXPLAIN ANALYZE` ya que es algo confuso de entender
- Solicité tambien ejemplos del uso de Zod, ejemplos de paginado y uso de funciones usando `use server`


## Instalación y Configuración

```bash
# 1. Abrir una terminal de Git Bash

# 2. Clonar repositorio
git clone <tu-repo>
cd <tu-proyecto>

# 3. Crear el archivo .env con las credenciales correctas al mismo nivel del archivo docker-compose.yml

# 4. Correr el comando
docker compose up  --build

```