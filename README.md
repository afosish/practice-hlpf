# practice-hlpf
## Student
- Name: Максим Тимощук
- Group: 232/1

# **Практичне заняття: Підготовка середовища для розробки**

**<вивід docker --version>**
```
Docker version 29.2.1, build a5c7197
<вивід docker compose version>
Docker Compose version v5.0.2
```
**<вивід docker run --rm hello-world (ключові рядки, які показують успіх)>**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```
**<вивід docker compose run --rm npm npm -v>**
```
Container practice-hlpf-npm-run-4bd738ed1ce4 Creating 
Container practice-hlpf-npm-run-4bd738ed1ce4 Created 
11.11.0
```

**<вивід docker compose run --rm npm node --version>**
```
Container practice-hlpf-npm-run-2bbc5502af52 Creating 
Container practice-hlpf-npm-run-2bbc5502af52 Created 
v25.8.0
```


# **Практичне заняття: NestJS + PostgreSQL + Redis у Docker**

Примітка: У навчальних цілях файл .env залишено в репозиторії. Для справжніх проєктів не забудьте додати його в .gitignore.

**<вивід docker compose ps>**
```
NAME                       IMAGE                COMMAND                  SERVICE    CREATED          STATUS                    PORTS
practice-hlpf-postgres-1   postgres:16-alpine   "docker-entrypoint.s…"   postgres   16 seconds ago   Up 12 seconds (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
practice-hlpf-redis-1      redis:7-alpine       "docker-entrypoint.s…"   redis      16 seconds ago   Up 12 seconds (healthy)   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp
```
**<вивід docker compose exec postgres psql -U nestuser -d nestdb -c '\l'>**
```
                                                      List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+------------+------------+------------+-----------+-----------------------
 nestdb    | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 postgres  | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 template0 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
 template1 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
(4 rows)
```
**<вивід d**<docker compose logs -f app>**>**
```
[Nest] 29  - 03/26/2026, 9:45:44 AM     LOG [NestApplication] Nest application successfully started +3ms
```
**<вивід curl http://localhost:3000>>**
```
StatusCode        : 200
StatusDescription : OK
Content           : Hello World!
```
**<вивід docker compose logs -f app>>**
```
app-1       | [Nest] 34  - 03/26/2026, 10:15:21 AM     LOG [NestFactory] Starting Nest application...
app-1       | [Nest] 34  - 03/26/2026, 10:15:21 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +137ms
```
**<вивід docker compose ps | фінальна перевірка>>**
```
NAME                       IMAGE                COMMAND                  SERVICE    CREATED         STATUS                   PORTS
practice-hlpf-postgres-1   postgres:16-alpine   "docker-entrypoint.s…"   postgres   3 minutes ago   Up 2 minutes (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
practice-hlpf-redis-1      redis:7-alpine       "docker-entrypoint.s…"   redis      3 minutes ago   Up 2 minutes (healthy)   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp
```


# **Практична 3. CRUD REST API для MiniShop: Entity, міграції, контролери**


**<вивід docker compose exec postgres psql -U nestuser -d nestdb -c "\dt">>**
```
           List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | categories | table | nestuser
 public | migrations | table | nestuser
 public | products   | table | nestuser
(3 rows)
```
**<вивід docker compose exec postgres psql -U nestuser -d nestdb -c "\d products""\dt">>**
```
                                         Table "public.products"
   Column    |            Type             | Collation | Nullable |               Default
-------------+-----------------------------+-----------+----------+--------------------------------------
 id          | integer                     |           | not null | nextval('products_id_seq'::regclass)
 name        | character varying(255)      |           | not null |
 description | text                        |           |          |
 price       | numeric(10,2)               |           | not null |
 stock       | integer                     |           |          | 0
 category_id | integer                     |           |          |
 createdAt   | timestamp without time zone |           |          | now()
 updatedAt   | timestamp without time zone |           |          | now()
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
```
**<вивід docker compose exec postgres psql -U nestuser -d nestdb -c "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'products';">>**
```
 column_name |          data_type          | is_nullable 
-------------+-----------------------------+-------------
 isActive    | boolean                     | NO
 updatedAt   | timestamp without time zone | NO
 id          | integer                     | NO
 price       | numeric                     | NO
 stock       | integer                     | NO
 category_id | integer                     | YES
 createdAt   | timestamp without time zone | NO
 name        | character varying           | NO
 description | text                        | YES
(9 rows)
```