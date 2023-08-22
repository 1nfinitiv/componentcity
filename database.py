import psycopg2
connection = psycopg2.connect(
        host = '127.0.0.1',
        database = 'component',
        user = 'postgres',
        password = '123456789',
        port = 5432
    )
