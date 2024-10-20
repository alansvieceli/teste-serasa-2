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
	crops_planted varchar(11)[] NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT farmers_document_farmname_unique UNIQUE (document, farm_name),
	CONSTRAINT farmers_total_area_check CHECK ((total_area >= (0)::numeric)),
	-- CONSTRAINT farmers_check CHECK (((arable_area >= (0)::numeric) AND (arable_area <= total_area))),
	-- CONSTRAINT farmers_check1 CHECK (((vegetation_area >= (0)::numeric) AND (vegetation_area <= total_area))),
	CONSTRAINT farmers_crops_planted_check CHECK (ARRAY['SOJA', 'MILHO', 'ALGODAO', 'CAFE', 'CANA_ACUCAR']::varchar[] @> crops_planted),
	CONSTRAINT farmers_document_type_check CHECK (((document_type)::text = ANY ((ARRAY['CPF'::character varying, 'CNPJ'::character varying])::text[]))),
	CONSTRAINT farmers_pkey PRIMARY KEY (id)
	-- CONSTRAINT farmers_state_code_check CHECK (((state_code)::text = ANY ((ARRAY['AC'::character varying, 'AL'::character varying, 'AP'::character varying, 'AM'::character varying, 'BA'::character varying, 'CE'::character varying, 'DF'::character varying, 'ES'::character varying, 'GO'::character varying, 'MA'::character varying, 'MT'::character varying, 'MS'::character varying, 'MG'::character varying, 'PA'::character varying, 'PB'::character varying, 'PR'::character varying, 'PE'::character varying, 'PI'::character varying, 'RJ'::character varying, 'RN'::character varying, 'RS'::character varying, 'RO'::character varying, 'RR'::character varying, 'SC'::character varying, 'SP'::character varying, 'SE'::character varying, 'TO'::character varying])::text[]))),
);


INSERT INTO serasa.farmers (id,document_type,"document",farmer_name,farm_name,city,state_code,total_area,arable_area,vegetation_area,crops_planted,created_at) VALUES
	 ('1aa8c91f-4102-46dc-83e1-121ea487c29b'::uuid,'CNPJ','24945402000127','Farmer Silva','Farm Bom Futuro','City P','MG',860.50,610.33,150.11,'{ALGODAO,CANA_ACUCAR,SOJA,MILHO}','2024-10-20 00:37:21.449196'),
	 ('8ffbf962-12c0-47be-8955-fea4aa4c14d5'::uuid,'CNPJ','64197205000191','Farmer Souza','Farm Esperança Verde','City B','SC',760.10,550.50,100.30,'{CANA_ACUCAR,SOJA,MILHO}','2024-10-20 00:37:21.449196'),
	 ('6acce615-8a5d-4f66-87c2-ef5353884c32'::uuid,'CNPJ','92318607000132','Farmer Oliveira','Farm Girassol','City D','SP',900.90,600.60,150.40,'{SOJA,MILHO,ALGODAO}','2024-10-20 00:37:21.449196'),
	 ('ed53b3d3-e3dc-4680-a99f-ba07692b1449'::uuid,'CNPJ','58964463000153','Farmer Lima','Farm Bela Vista','City F','SC',670.40,450.25,120.50,'{SOJA,ALGODAO,CAFE}','2024-10-20 00:37:21.449196'),
	 ('3bcdd4bc-f3c3-46c2-8f2d-4a4e7f538c02'::uuid,'CNPJ','95553274000114','Farmer Souza','Farm Boa Esperança','City L','MG',780.45,580.40,110.25,'{CAFE,ALGODAO,SOJA}','2024-10-20 00:37:21.449196'),
	 ('0aa22957-8a8e-4575-a6a0-dc5c72377b05'::uuid,'CNPJ','69979315000129','Farmer Souza','Farm Estrela do Norte','City P','SP',670.40,450.25,120.50,'{MILHO,SOJA,ALGODAO}','2024-10-20 00:37:21.449196'),
	 ('12d9bb3f-a168-428e-9a1f-f02d8cdfb1e9'::uuid,'CNPJ','74937926000144','Farm Monte Alegre','Farmer Oliveira','City H','MG',620.25,480.50,90.15,'{CAFE,SOJA,ALGODAO}','2024-10-20 00:37:21.449196'),
	 ('6371da94-4c04-46f5-a899-cdec5e67f4b5'::uuid,'CPF','92110178078','Farmer Souza','Farm Montes Claros','City I','MG',450.99,300.12,120.55,'{SOJA,MILHO,ALGODAO,CAFE}','2024-10-20 00:37:21.449196'),
	 ('3a66ecd7-bbc5-4bfb-845c-388a8fe40e56'::uuid,'CPF','85413749040','Farmer Silva','Farm Vento Sul','City K','MG',630.88,500.12,80.5,'{ALGODAO,SOJA,CANA_ACUCAR,MILHO}','2024-10-20 00:37:21.449196'),
	 ('8d946b88-ad19-46cf-87c3-cf2b76f848c5'::uuid,'CPF','69294382001','Farmer Costa','Farm Horizonte Azul','City M','CE',910.34,640.45,160.12,'{MILHO,CAFE,CANA_ACUCAR,ALGODAO}','2024-10-20 00:37:21.449196');
INSERT INTO serasa.farmers (id,document_type,"document",farmer_name,farm_name,city,state_code,total_area,arable_area,vegetation_area,crops_planted,created_at) VALUES
	 ('443e18f6-0553-4f82-8f23-c52cb661bc6a'::uuid,'CPF','10777600005','Farmer Souza','Farm São Bento','City O','RS',700.78,500.34,90.56,'{CAFE,SOJA,MILHO,CANA_ACUCAR}','2024-10-20 00:37:21.449196'),
	 ('de52a138-2165-47a3-8e4a-7f806bfa36c9'::uuid,'CPF','70858432099','Farmer Lima','Farm Rio Verde','City Q','MG',510.77,380.23,120.67,'{MILHO,SOJA,ALGODAO,CANA_ACUCAR}','2024-10-20 00:37:21.449196'),
	 ('3bd6aaef-9b3a-4713-9d0e-dcc67e93d573'::uuid,'CPF','61730179037','Farmer Lima','Farm Sol Nascente','City A','CE',500.50,400.20,50.30,'{SOJA,MILHO,CAFE}','2024-10-20 00:37:21.449196'),
	 ('818fc623-49a7-4f01-a7d3-cd1b9eb9b923'::uuid,'CPF','64683264005','Farmer Silva','Farm Horizonte Azul','City C','MG',300.30,250.25,30.10,'{ALGODAO,SOJA,CAFE}','2024-10-20 00:37:21.449196'),
	 ('dbf9e283-19c3-4ae8-abcd-628cba970b0c'::uuid,'CPF','22217426052','Farmer Costa','Farm Bom Sucesso','City E','GO',480.50,350.30,80.20,'{CANA_ACUCAR,MILHO,CAFE}','2024-10-20 00:37:21.449196'),
	 ('fe727077-a094-44dc-afb6-404983488d87'::uuid,'CPF','56498732083','Farmer Souza','Farm Vento Leste','City G','RS',780.60,550.45,110.35,'{MILHO,SOJA,CANA_ACUCAR}','2024-10-20 00:37:21.449196'),
	 ('2fecfe6e-e325-4f16-af8c-7f8b2f9d8e2e'::uuid,'CPF','85978569045','Farmer Silva','Farm Aurora','City I','RS',550.75,400.30,100.25,'{CANA_ACUCAR,MILHO,ALGODAO}','2024-10-20 00:37:21.449196'),
	 ('187c92af-11f1-43a3-bbf0-5c67d0cd96ef'::uuid,'CPF','62490603086','Farmer Costa','Farm São José','City K','GO',650.60,520.50,120.35,'{MILHO,SOJA,CANA_ACUCAR}','2024-10-20 00:37:21.449196'),
	 ('aaf17193-5e12-4419-b454-6f8b9cf72483'::uuid,'CPF','93975028084','Farmer Silva','Farm Rio Verde','City M','RS',590.55,470.30,100.40,'{CANA_ACUCAR,SOJA,MILHO}','2024-10-20 00:37:21.449196'),
	 ('54c25710-86dd-475d-88a6-c8f5e3e356d8'::uuid,'CPF','50360243037','Farmer Costa','Farm Pedra Branca','City O','CE',780.20,550.15,90.30,'{CANA_ACUCAR,ALGODAO,SOJA}','2024-10-20 00:37:21.449196');
INSERT INTO serasa.farmers (id,document_type,"document",farmer_name,farm_name,city,state_code,total_area,arable_area,vegetation_area,crops_planted,created_at) VALUES
	 ('9d8ccc10-ad31-41b5-9d6a-395b4b545d9e'::uuid,'CPF','85626363041','Farmer Silva','Farm Lago Azul','City Q','RS',630.30,480.25,90.50,'{CANA_ACUCAR,SOJA,MILHO}','2024-10-20 00:37:21.449196'),
	 ('1f2c9a55-3739-4a57-9444-ac32a2fb3d88'::uuid,'CNPJ','49144759000137','Farm Vale Verde','Farmer Oliveira','City D','SP',609.49,465.19,137.12,'{CANA_ACUCAR}','2024-10-20 00:37:21.449196'),
	 ('2858f4c0-9521-4ffe-afe6-6e72a33ba959'::uuid,'CNPJ','59585112000102','Farm Aurora','Farmer Lima','City L','GO',780.55,550.23,90.67,'{CAFE,ALGODAO,SOJA,MILHO}','2024-10-20 00:37:21.449196'),
	 ('63e222a5-0097-4e28-92f0-39bada2cbafb'::uuid,'CNPJ','02236287000189','Farm Esperança','Farmer Oliveira','City N','RS',450.44,340.22,100.33,'{SOJA,ALGODAO,MILHO,CANA_ACUCAR}','2024-10-20 00:37:21.449196'),
	 ('41618d65-2b23-4b14-8069-f5f838add9db'::uuid,'CNPJ','31754355000108','Farm Bela Vista','Farmer Costa','City R','SC',990.21,760.55,200.33,'{CAFE,ALGODAO,MILHO,SOJA}','2024-10-20 00:37:21.449196'),
	 ('087214c1-edf5-444f-bb0d-740908d899a4'::uuid,'CNPJ','37358559000106','Farm Santo Antônio','Farmer Lima','City J','SP',900.30,700.45,130.20,'{SOJA,ALGODAO,CAFE}','2024-10-20 00:37:21.449196'),
	 ('dbc08349-2626-49b4-8100-b8319dd0b85b'::uuid,'CNPJ','98011373000162','Farm Nova Aliança','Farmer Oliveira','City N','GO',430.40,320.30,50.25,'{SOJA,MILHO,CAFE}','2024-10-20 00:37:21.449196'),
	 ('26fd9740-7b1f-460f-bf24-69bc383fd17c'::uuid,'CPF','55059290018','Farm Esperança','Farmer Silva','City B','SC',77.94,61.67,11.82,'{CAFE}','2024-10-20 00:37:21.449196'),
	 ('e62def7e-1f51-4138-a447-9529c9231359'::uuid,'CNPJ','81852128000185','Farmer Oliveira','Farm Estrela do Sol','City J','SP',860.23,700.34,130.22,'{CANA_ACUCAR,SOJA,MILHO,ALGODAO}','2024-10-20 00:37:21.449196'),
	 ('f096b39d-fe8f-4f30-b615-590119bdbddf'::uuid,'CPF','58069084022','Farm Horizonte','Farmer Souza','City C','MG',374.43,355.31,1.97,'{ALGODAO}','2024-10-20 00:37:21.449196');
INSERT INTO serasa.farmers (id,document_type,"document",farmer_name,farm_name,city,state_code,total_area,arable_area,vegetation_area,crops_planted,created_at) VALUES
	 ('a96ad326-1547-4e48-98b6-e8f10ae73099'::uuid,'CPF','73781081036','Farm Girassol','Farmer Costa','City E','GO',905.93,47.61,543.17,'{SOJA}','2024-10-20 00:37:21.449196'),
	 ('808e9271-10df-4551-b201-11e7df7599a5'::uuid,'CNPJ','23445476000131','Farmer Oliveira','Farm Girassol','City B','MG',750.40,600.20,100.30,'{ALGODAO,SOJA,MILHO}','2024-10-20 00:38:57.468148'),
	 ('0968c07e-86f5-48ec-adaf-86c14c81c29c'::uuid,'CNPJ','29627575000110','Farmer Lima','Farm Boa Vista','City D','RS',690.50,550.35,110.50,'{SOJA,CAFE,ALGODAO}','2024-10-20 00:38:57.468148'),
	 ('75266224-aeaf-4a1a-9e5f-bc850e37cc5d'::uuid,'CNPJ','57208491000188','Farmer Oliveira','Farm São Bento','City H','MG',620.20,490.30,80.45,'{ALGODAO,CANA_ACUCAR,SOJA}','2024-10-20 00:38:57.468148'),
	 ('6cd5d00c-b069-4b97-bfef-3969e4aee9cd'::uuid,'CNPJ','86043039000101','Farmer Costa','Farm Sol Nascente','City J','RS',430.35,350.45,70.20,'{SOJA,CAFE,MILHO}','2024-10-20 00:38:57.468148'),
	 ('66ea8758-a105-4d50-bbdc-78cfd3ab0386'::uuid,'CNPJ','21238437000138','Farmer Silva','Farm Estrela do Sul','City L','SC',490.55,370.45,110.50,'{SOJA,MILHO,ALGODAO}','2024-10-20 00:38:57.468148'),
	 ('ec93409d-7ee6-47e7-ad8e-d98c9261cea2'::uuid,'CNPJ','62478648000125','Farmer Souza','Farm Rio Verde','City N','MG',790.60,610.45,130.40,'{MILHO,SOJA,ALGODAO}','2024-10-20 00:38:57.468148'),
	 ('6c94f8e3-20ad-45e7-930a-fb318700f2d3'::uuid,'CPF','86271268013','Farmer Souza','Farm Horizonte','City C','SC',390.25,320.45,60.15,'{CANA_ACUCAR,SOJA,MILHO}','2024-10-20 00:38:57.468148'),
	 ('8c8029ae-168b-4481-9efc-1474ad43d7e4'::uuid,'CPF','45381493061','Farmer Costa','Farm Estrela','City E','MG',470.30,370.25,90.40,'{MILHO,ALGODAO,SOJA}','2024-10-20 00:38:57.468148'),
	 ('dd9106fd-882e-4207-9d0d-25bb57025868'::uuid,'CPF','90931306094','Farmer Silva','Farm Vento Norte','City G','RS',760.45,580.40,120.35,'{SOJA,CAFE,MILHO}','2024-10-20 00:38:57.468148');
INSERT INTO serasa.farmers (id,document_type,"document",farmer_name,farm_name,city,state_code,total_area,arable_area,vegetation_area,crops_planted,created_at) VALUES
	 ('94c64f35-e6dc-42c6-9330-4cd91964bff2'::uuid,'CPF','19744611065','Farmer Lima','Farm Monte Alegre','City I','SC',580.60,470.35,100.50,'{MILHO,ALGODAO,CAFE}','2024-10-20 00:38:57.468148'),
	 ('385b5295-f83c-4764-b126-b3274da7bdfb'::uuid,'CPF','94506196031','Farmer Oliveira','Farm Pedra Branca','City M','RS',630.20,480.45,90.35,'{SOJA,CAFE,MILHO}','2024-10-20 00:38:57.468148'),
	 ('8cdd2f1d-ddf2-497f-94f4-ae563cc1d3dc'::uuid,'CPF','59287140090','Farmer Souza','Farm Santo Antônio','City K','MG',670.70,437.65,120.40,'{ALGODAO,MILHO,CANA_ACUCAR}','2024-10-20 00:38:57.468148'),
	 ('ee9a72a1-4a86-4261-8f41-535f5704245a'::uuid,'CPF','43713573000','Farm Bela Vista','Farmer Silva','City A','RS',540.30,420.10,80.20,'{SOJA,MILHO,CAFE}','2024-10-20 00:38:57.468148'),
	 ('aba4fa94-97b8-4573-9c35-0c2c8f4cf464'::uuid,'CNPJ','01809105000159','Farmer Costa','Farm Estrela Brilhante','City P','MG',410.40,320.20,70.10,'{SOJA,MILHO,CAFE}','2024-10-20 00:38:57.468148'),
	 ('72f35e4e-9eaa-4fb4-821a-b6cd9ccff060'::uuid,'CNPJ','04609011000124','Farmer Souza','Farm Nova Esperança','City F','SC',550.55,350.30,100.40,'{CANA_ACUCAR,SOJA,MILHO}','2024-10-20 00:38:57.468148'),
	 ('67378bed-e825-4d08-9e21-46b4d3a316a0'::uuid,'CNPJ','10154960000160','Farm Girassol','Farmer Lima','City R','RS',470.25,370.30,80.50,'{ALGODAO,SOJA,CAFE}','2024-10-20 00:38:57.468148'),
	 ('2ee5fe9c-836a-4cf0-81d5-e42479ccf5a1'::uuid,'CPF','22226277021','Farm Boa Vista','Farmer Lima','City A','CE',770.93,391.3,75.57,'{SOJA}','2024-10-20 00:37:21.449196'),
	 ('a0869b36-451f-4a8a-8760-359ef91af1aa'::uuid,'CPF','12180729030','Farmer Silva','Farm Santo Antônio','City O','RS',530.70,150.25,100.50,'{CAFE,MILHO,ALGODAO}','2024-10-20 00:38:57.468148'),
	 ('8b63904b-e635-479a-bdb5-8011cb70fb51'::uuid,'CPF','34228158056','Farmer Souza','Farm Monte Azul','City Q','SC',720.80,90.35,330.40,'{CANA_ACUCAR,SOJA,MILHO}','2024-10-20 00:38:57.468148');
INSERT INTO serasa.farmers (id,document_type,"document",farmer_name,farm_name,city,state_code,total_area,arable_area,vegetation_area,crops_planted,created_at) VALUES
	 ('48d48869-0c1d-48d3-8231-d81c08d6a55d'::uuid,'CPF','28670012006','Farmer Costa','Farm Sol Nascente','City S','MG',560.50,80.20,135.40,'{MILHO,ALGODAO,SOJA}','2024-10-20 00:38:57.468148'),
	 ('a64df846-7706-4cc7-aec8-3b1eaccff0b1'::uuid,'CNPJ','50574093000136','Farmer Silva','Farm Vento Norte','City T','SC',630.70,420.4,119.92,'{SOJA,CAFE,MILHO}','2024-10-20 00:38:57.468148');
