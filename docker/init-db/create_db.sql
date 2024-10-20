-- Criando o banco de dados
CREATE DATABASE "test-serasa-dois";

\c "test-serasa-dois";

-- Criando o schema
CREATE SCHEMA serasa AUTHORIZATION postgres;

-- Criando a tabela farmers

CREATE TABLE serasa.farmers (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	document_type varchar(4) NOT NULL,
	"document" varchar(14) NOT NULL,
	farmer_name varchar(255) NOT NULL,
	farm_name varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	state_code varchar(2) NOT NULL,
	total_area numeric NOT NULL,
	arable_area numeric NOT NULL,
	vegetation_area numeric NOT NULL,
	crops_planted varchar(11) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT farmers_document_unique UNIQUE ("document"),
	CONSTRAINT farmers_total_area_check CHECK ((total_area >= (0)::numeric)),
	-- CONSTRAINT farmers_check CHECK (((arable_area >= (0)::numeric) AND (arable_area <= total_area))),
	-- CONSTRAINT farmers_check1 CHECK (((vegetation_area >= (0)::numeric) AND (vegetation_area <= total_area))),
	CONSTRAINT farmers_crops_planted_check CHECK (((crops_planted)::text = ANY (ARRAY[('SOJA'::character varying)::text, ('MILHO'::character varying)::text, ('ALGODAO'::character varying)::text, ('CAFE'::character varying)::text, ('CANA_ACUCAR'::character varying)::text]))),
	CONSTRAINT farmers_document_type_check CHECK (((document_type)::text = ANY ((ARRAY['CPF'::character varying, 'CNPJ'::character varying])::text[]))),
	CONSTRAINT farmers_pkey PRIMARY KEY (id)
	-- CONSTRAINT farmers_state_code_check CHECK (((state_code)::text = ANY ((ARRAY['AC'::character varying, 'AL'::character varying, 'AP'::character varying, 'AM'::character varying, 'BA'::character varying, 'CE'::character varying, 'DF'::character varying, 'ES'::character varying, 'GO'::character varying, 'MA'::character varying, 'MT'::character varying, 'MS'::character varying, 'MG'::character varying, 'PA'::character varying, 'PB'::character varying, 'PR'::character varying, 'PE'::character varying, 'PI'::character varying, 'RJ'::character varying, 'RN'::character varying, 'RS'::character varying, 'RO'::character varying, 'RR'::character varying, 'SC'::character varying, 'SP'::character varying, 'SE'::character varying, 'TO'::character varying])::text[]))),

);

-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '74946826190', 'Farmer Lima', 'Farm Feliz', 'City Bela', 'CE', 770.93, 391.3, 75.57, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '8727073832987', 'Farmer Lima', 'Farm Bonita', 'City Bela', 'SC', 77.94, 61.67, 11.82, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '72661964932', 'Farmer Silva', 'Farm Feliz', 'City Grande', 'MG', 374.43, 355.31, 1.97, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '70893588954', 'Farmer Souza', 'Farm Feliz', 'City Grande', 'CE', 703.81, 277.81, 39.87, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '08970816682', 'Farmer Silva', 'Farm Bonita', 'City Alta', 'PI', 833.29, 784.7, 27.69, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '6745842820466', 'Farmer Silva', 'Farm Bonita', 'City Nova', 'SC', 609.49, 465.19, 137.12, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '1019793705718', 'Farmer Oliveira', 'Farm Bonita', 'City Alta', 'MG', 91.92, 54.07, 2.67, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '8148367165176', 'Farmer Lima', 'Farm do Sol', 'City Grande', 'PI', 163.91, 42.95, 14.75, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7506342563563', 'Farmer Souza', 'Farm Bonita', 'City Alta', 'TO', 787.19, 656.35, 97.33, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7019516351345', 'Farmer Lima', 'Farm Verde', 'City Grande', 'GO', 905.93, 47.61, 543.17, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7284034908775', 'Farmer Lima', 'Farm Bonita', 'City Grande', 'MG', 723.7, 645.93, 61.06, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '22568071346', 'Farmer Lima', 'Farm do Sol', 'City Grande', 'TO', 191.29, 75.21, 27.88, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '8620335896452', 'Farmer Souza', 'Farm Bonita', 'City Bela', 'MG', 764.85, 173.48, 82.11, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '3675336325041', 'Farmer Silva', 'Farm Verde', 'City Bela', 'SC', 368.98, 80.3, 19.04, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '46368151145', 'Farmer Lima', 'Farm Verde', 'City Alta', 'AP', 341.19, 332.03, 8.01, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '21599033020', 'Farmer Lima', 'Farm Bonita', 'City Nova', 'MG', 670.01, 600.58, 59.4, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '38218707964', 'Farmer Silva', 'Farm do Sol', 'City Grande', 'AM', 800.23, 494.87, 2.28, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '29222982304', 'Farmer Souza', 'Farm Verde', 'City Grande', 'GO', 481.23, 70.6, 169.24, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '0855347802930', 'Farmer Silva', 'Farm Verde', 'City Bela', 'RS', 987.06, 197.77, 710.99, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '3871543962403', 'Farmer Lima', 'Farm Verde', 'City Alta', 'ES', 957.78, 923.82, 4.25, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '4551851114995', 'Farmer Lima', 'Farm Verde', 'City Alta', 'AM', 404.39, 114.61, 69.33, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '5721478863874', 'Farmer Lima', 'Farm Feliz', 'City Alta', 'AP', 977.54, 718.3, 70.91, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '4345746069821', 'Farmer Oliveira', 'Farm Bonita', 'City Nova', 'MG', 697.37, 383.26, 20.73, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '4685339418337', 'Farmer Oliveira', 'Farm Verde', 'City Nova', 'MG', 819.9, 0.57, 75.04, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '89738608520', 'Farmer Lima', 'Farm Verde', 'City Alta', 'ES', 676.78, 55.13, 69.71, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '0393049088997', 'Farmer Souza', 'Farm do Sol', 'City Nova', 'AM', 652.38, 216.76, 394.61, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '84475471591', 'Farmer Lima', 'Farm Verde', 'City Grande', 'CE', 765.22, 489.26, 153.57, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7690365640885', 'Farmer Silva', 'Farm Bonita', 'City Grande', 'AP', 566.62, 188.54, 227.75, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '1122708899822', 'Farmer Silva', 'Farm Feliz', 'City Alta', 'PI', 857.51, 664.44, 40.01, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '5229178809797', 'Farmer Lima', 'Farm do Sol', 'City Bela', 'MG', 244.44, 112.72, 5.84, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '23403328856', 'Farmer Souza', 'Farm Feliz', 'City Nova', 'RS', 94.15, 15.86, 53.92, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '6815109131594', 'Farmer Oliveira', 'Farm Bonita', 'City Grande', 'SC', 321.46, 42.15, 272.46, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '4972816278896', 'Farmer Lima', 'Farm Bonita', 'City Alta', 'SC', 834.81, 118.8, 354.92, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '6173378611725', 'Farmer Silva', 'Farm Bonita', 'City Grande', 'MG', 137.47, 10.59, 46.25, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '3623891250038', 'Farmer Silva', 'Farm Bonita', 'City Bela', 'RS', 107.78, 94.5, 11.85, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '8275303919114', 'Farmer Lima', 'Farm do Sol', 'City Alta', 'PI', 440.02, 238.18, 127.81, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '08632422944', 'Farmer Silva', 'Farm Feliz', 'City Bela', 'RS', 198.99, 125.79, 37.6, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '62524211703', 'Farmer Souza', 'Farm Feliz', 'City Bela', 'SC', 87.37, 24.41, 41.63, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '5665076241173', 'Farmer Souza', 'Farm Bonita', 'City Alta', 'RS', 782.93, 642.64, 35.19, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '15079984732', 'Farmer Oliveira', 'Farm Feliz', 'City Grande', 'MG', 450.06, 162.7, 137.2, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '4937927199589', 'Farmer Silva', 'Farm Bonita', 'City Bela', 'SC', 203.85, 124.49, 30.11, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '3440183871899', 'Farmer Oliveira', 'Farm Bonita', 'City Bela', 'MG', 258.14, 23.83, 227.22, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '56677742830', 'Farmer Lima', 'Farm Feliz', 'City Grande', 'AM', 739.97, 358.79, 177.29, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '04749008869', 'Farmer Silva', 'Farm Feliz', 'City Grande', 'GO', 760.63, 485.89, 118.94, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '2862027782150', 'Farmer Souza', 'Farm Bonita', 'City Nova', 'PI', 853.15, 42.41, 537.63, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '94772476008', 'Farmer Lima', 'Farm do Sol', 'City Alta', 'CE', 71.59, 65.01, 6.57, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '48513664006', 'Farmer Lima', 'Farm Verde', 'City Alta', 'MG', 418.37, 134.15, 261.3, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '04029367798', 'Farmer Oliveira', 'Farm Verde', 'City Nova', 'RS', 734.06, 514.1, 15.77, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '23452072134', 'Farmer Souza', 'Farm Feliz', 'City Grande', 'SC', 659.97, 401.82, 41.01, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7927398138211', 'Farmer Oliveira', 'Farm Verde', 'City Bela', 'MG', 195.16, 94.7, 69.56, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '37077517918', 'Farmer Lima', 'Farm do Sol', 'City Nova', 'MG', 480.37, 210.28, 43.94, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7112926906184', 'Farmer Oliveira', 'Farm Bonita', 'City Alta', 'AP', 901.64, 27.75, 98.61, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '12299079475', 'Farmer Silva', 'Farm Verde', 'City Nova', 'PI', 822.08, 312.72, 277.47, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '8934819377312', 'Farmer Souza', 'Farm Verde', 'City Grande', 'SC', 756.92, 413.2, 118.34, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '84517191710', 'Farmer Oliveira', 'Farm do Sol', 'City Grande', 'AP', 682.95, 566.08, 106.33, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '81438061544', 'Farmer Oliveira', 'Farm Bonita', 'City Nova', 'MG', 687.77, 622.14, 9.43, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '63041353199', 'Farmer Souza', 'Farm Feliz', 'City Alta', 'TO', 116.77, 104.96, 8.52, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '48676216924', 'Farmer Souza', 'Farm do Sol', 'City Grande', 'AP', 528.29, 20.56, 235.43, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '1979630915560', 'Farmer Silva', 'Farm Verde', 'City Grande', 'MG', 430.11, 191.73, 211.77, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7609139795596', 'Farmer Souza', 'Farm do Sol', 'City Grande', 'TO', 294.94, 108.99, 179.96, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '1269495060920', 'Farmer Souza', 'Farm Bonita', 'City Nova', 'MG', 921.42, 198.62, 310.2, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '0078032738818', 'Farmer Souza', 'Farm Feliz', 'City Bela', 'AP', 469.04, 230.85, 35.73, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '56133739657', 'Farmer Lima', 'Farm Feliz', 'City Grande', 'SC', 930.55, 457.9, 103.45, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '79020251350', 'Farmer Silva', 'Farm Bonita', 'City Grande', 'MG', 51.82, 10.58, 15.54, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '8666394023522', 'Farmer Oliveira', 'Farm Bonita', 'City Alta', 'SC', 210.65, 149.24, 52.96, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '1555427418890', 'Farmer Souza', 'Farm Feliz', 'City Bela', 'CE', 789.76, 504.0, 170.86, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '0706917755816', 'Farmer Lima', 'Farm Bonita', 'City Grande', 'MG', 483.35, 237.39, 61.78, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '32643781830', 'Farmer Souza', 'Farm Bonita', 'City Alta', 'SC', 786.92, 386.01, 204.54, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '28544396003', 'Farmer Lima', 'Farm Feliz', 'City Bela', 'GO', 772.31, 550.9, 191.57, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '8312942712567', 'Farmer Souza', 'Farm Bonita', 'City Grande', 'ES', 256.57, 160.76, 7.4, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '4438254932325', 'Farmer Silva', 'Farm Feliz', 'City Nova', 'PI', 663.78, 595.55, 47.8, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '94932892810', 'Farmer Silva', 'Farm do Sol', 'City Grande', 'MG', 229.13, 25.29, 37.08, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '47961325700', 'Farmer Oliveira', 'Farm Bonita', 'City Alta', 'MG', 936.7, 492.02, 121.43, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '44917701236', 'Farmer Souza', 'Farm Bonita', 'City Grande', 'MG', 516.1, 350.66, 86.32, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '93011842493', 'Farmer Souza', 'Farm Bonita', 'City Nova', 'AM', 764.76, 568.74, 128.6, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '9312872584498', 'Farmer Lima', 'Farm Bonita', 'City Alta', 'MG', 500.39, 369.06, 127.03, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '29451705660', 'Farmer Lima', 'Farm Verde', 'City Bela', 'CE', 188.5, 63.48, 86.98, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7710292805900', 'Farmer Souza', 'Farm Verde', 'City Alta', 'AM', 691.63, 653.6, 28.81, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7302625017521', 'Farmer Silva', 'Farm Verde', 'City Nova', 'GO', 410.09, 323.67, 44.91, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '30984939920', 'Farmer Souza', 'Farm Bonita', 'City Alta', 'AP', 175.86, 33.39, 45.79, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '6787088132466', 'Farmer Souza', 'Farm Verde', 'City Bela', 'MG', 342.21, 249.66, 45.82, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '85589870925', 'Farmer Oliveira', 'Farm Feliz', 'City Nova', 'ES', 531.72, 362.27, 35.49, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '90877056897', 'Farmer Souza', 'Farm do Sol', 'City Nova', 'CE', 577.5, 315.34, 161.43, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '3262005913623', 'Farmer Oliveira', 'Farm Bonita', 'City Alta', 'MG', 842.42, 681.5, 97.47, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '5718806290697', 'Farmer Oliveira', 'Farm Verde', 'City Alta', 'ES', 846.96, 325.87, 152.14, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '06307076186', 'Farmer Silva', 'Farm Verde', 'City Bela', 'GO', 124.03, 3.66, 93.38, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '9771751613536', 'Farmer Oliveira', 'Farm Bonita', 'City Grande', 'RS', 375.73, 226.1, 124.16, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '6493116587448', 'Farmer Oliveira', 'Farm Verde', 'City Bela', 'CE', 868.38, 313.5, 361.15, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '7155696973806', 'Farmer Oliveira', 'Farm do Sol', 'City Grande', 'MG', 201.18, 121.46, 21.58, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '8176227244354', 'Farmer Oliveira', 'Farm do Sol', 'City Nova', 'AM', 922.57, 534.4, 288.48, 'MILHO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '4678427541936', 'Farmer Lima', 'Farm Bonita', 'City Nova', 'SC', 344.4, 70.73, 180.91, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '32672168261', 'Farmer Souza', 'Farm Feliz', 'City Bela', 'RS', 927.37, 294.18, 313.83, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '31559247304', 'Farmer Silva', 'Farm Bonita', 'City Grande', 'SC', 170.0, 69.4, 33.0, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '34579099036', 'Farmer Lima', 'Farm Bonita', 'City Bela', 'TO', 611.21, 580.72, 1.87, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CPF', '76153839940', 'Farmer Souza', 'Farm Feliz', 'City Alta', 'MG', 603.69, 517.46, 23.01, 'ALGODAO');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '4712264026616', 'Farmer Souza', 'Farm Bonita', 'City Alta', 'ES', 775.27, 693.43, 60.08, 'SOJA');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '0797114009950', 'Farmer Souza', 'Farm do Sol', 'City Bela', 'RS', 76.88, 6.23, 18.2, 'CANA_ACUCAR');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '0174712765042', 'Farmer Lima', 'Farm Feliz', 'City Bela', 'ES', 951.11, 948.63, 1.88, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '3762939599032', 'Farmer Lima', 'Farm Verde', 'City Nova', 'PI', 604.21, 494.93, 70.1, 'CAFE');
-- INSERT INTO serasa.farmers (document_type, document, farmer_name, farm_name, city, state_code, total_area, arable_area, vegetation_area, crops_planted) VALUES ('CNPJ', '1083274740913', 'Farmer Oliveira', 'Farm Bonita', 'City Bela', 'TO', 736.52, 601.81, 57.73, 'MILHO');
