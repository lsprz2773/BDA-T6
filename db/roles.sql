CREATE USER user_views WITH PASSWORD 'viewspass23';
GRANT CONNECT ON DATABASE tarea6_db TO user_views;
GRANT USAGE ON SCHEMA public TO user_views;

REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM user_views;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM user_views;

GRANT SELECT ON view_ventas_por_categoria TO user_views;
GRANT SELECT ON view_analisis_de_clientes TO user_views;
GRANT SELECT ON view_productos_bajo_stock TO user_views;
GRANT SELECT ON view_analisis_ordenes_estado TO user_views;
GRANT SELECT ON view_top_productos_categoria TO user_views;