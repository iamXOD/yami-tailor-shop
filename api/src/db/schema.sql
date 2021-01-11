BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "fix" (
	"fix_id"	INTEGER,
	"date"	TEXT NOT NULL,
	"costumer"	INTEGER,
	"price"	NUMERIC NOT NULL,
	"payed"	NUMERIC NOT NULL,
	"type"	TEXT NOT NULL,
	"status"	REAL NOT NULL,
	"description"	TEXT,
	FOREIGN KEY("costumer") REFERENCES "actor"("actor_id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
	PRIMARY KEY("fix_id")
);
CREATE TABLE IF NOT EXISTS "material" (
	"material_id"	INTEGER,
	"type"	INTEGER,
	"color"	TEXT NOT NULL,
	"description"	TEXT,
	FOREIGN KEY("type") REFERENCES "material_type"("material_type_id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
	PRIMARY KEY("material_id")
);
CREATE TABLE IF NOT EXISTS "order" (
	"order_id"	INTEGER,
	"date"	TEXT NOT NULL,
	"costumer"	INTEGER,
	"material"	INTEGER,
	"price"	NUMERIC NOT NULL,
	"payed"	NUMERIC NOT NULL,
	"status"	REAL NOT NULL,
	"piece"	TEXT NOT NULL,
	FOREIGN KEY("material") REFERENCES "material"("material_id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
	FOREIGN KEY("costumer") REFERENCES "actor"("actor_id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
	PRIMARY KEY("order_id")
);
CREATE TABLE IF NOT EXISTS "actor" (
	"actor_id"	INTEGER,
	"name"	TEXT NOT NULL,
	"mobile_phone"	TEXT,
	"home_phone"	TEXT,
	"gender"	TEXT DEFAULT 'F' CHECK("gender" IN ('F', 'M')),
	"email"	TEXT,
	PRIMARY KEY("actor_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "investment" (
	"investment_id"	INTEGER,
	"date"	TEXT NOT NULL,
	"supplier"	INTEGER,
	"material"	INTEGER,
	"ammount"	REAL NOT NULL,
	"total_price"	NUMERIC NOT NULL,
	"description"	TEXT,
	FOREIGN KEY("supplier") REFERENCES "actor"("actor_id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
	FOREIGN KEY("material") REFERENCES "material"("material_id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
	PRIMARY KEY("investment_id")
);
CREATE TABLE IF NOT EXISTS "user" (
	"user_id"	INTEGER,
	"salted_password"	TEXT NOT NULL,
	"admin"	INTEGER DEFAULT 0,
	PRIMARY KEY("user_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "material_type" (
	"material_type_id"	INTEGER,
	"name"	TEXT NOT NULL,
	"unit"	TEXT DEFAULT 'unit',
	PRIMARY KEY("material_type_id")
);
INSERT INTO "material" ("material_id","type","color","description") VALUES (1,1,'Unknown','Unknown material');
INSERT INTO "actor" ("actor_id","name","mobile_phone","home_phone","gender","email") VALUES (1,'Unknown',NULL,NULL,'F',NULL);
INSERT INTO "material_type" ("material_type_id","name","unit") VALUES (1,'tela','m^2'),
 (2,'elástico','m'),
 (3,'hilo','cono'),
 (4,'decorativo','unit');
COMMIT;
