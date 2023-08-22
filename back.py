# from pars import *
from  database import connection
connection.autocommit = True
l =0

try:
    #edd new car mark
    # with connection.cursor() as cursor:
    #     cursor.execute ("""
    #         CREATE TABLE IF NOT EXISTS I_categories(
    #             categories_id SERIAL PRIMARY KEY,
    #             categories_name varchar(255));""" ,
    #                     print('table 3 was created')
    #     )
    # with connection.cursor() as cursor:    
    #     for m in range(len(category)):
    #         print(category[m])
    #         cursor.execute("""INSERT INTO I_categories (categories_name) VALUES (%s)""", [category[m]] )
            
    # print ('table_1 was created')
    # #edd charecter for car 
    # with connection.cursor() as cursor:
    #     cursor.execute (
    #         """CREATE TABLE IF NOT EXISTS I_item(
    #             id SERIAL PRIMARY KEY,
    #             item_id varchar(50),
    #             item_name TEXT,
    #             description TEXT,
    #             item_price varchar (50),
    #             image TEXT);"""
    #     )
    # with connection.cursor() as cursor:
        
    #     for i in range(len(goods_mass)):
    #         for k in goods_mass[i][category[i]]:
    #             cursor.execute("""INSERT INTO I_item (item_id, item_name, description, item_price, image) VALUES (%s,%s,%s,%s,%s)""", [k['item_id'],k['name'],k['description'],k['price'],k['image']])
                
    # print ('table_2 was created')                  
        # connection.commit()
    with connection.cursor() as cursor:
        cursor.execute ("""
            CREATE TABLE IF NOT EXISTS I_users(
                id SERIAL PRIMARY KEY ,
                users_name text ,
                access_token text ,
                refresh_token text ,
                users_surname text ,
                users_login text ,
                users_password text,
                point_of_issue text);"""
        )
    print('table 3 was created')
except Exception as _ex:
    print ('ERROR',_ex)
finally:
    if connection:
        connection.close()
        print ('Psql was closed')
