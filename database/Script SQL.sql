create database Mesa_Plus;
use Mesa_Plus;
show tables;


drop database Mesa_Plus;

create database Mesa_Plus;
use Mesa_Plus;
show tables;


create table tbl_usuarios(
    id int auto_increment primary key,
    nome varchar(200) not null,
    email varchar(150) not null unique,
    senha text not null,
    cpf varchar (15) not null unique,
    telefone varchar (20) not null,
    foto text null,
    data_modificacao DATETIME,
    codigo_recuperacao text,
    codigo_expiracao datetime
);

create table tbl_empresas(
    id int auto_increment primary key,
    nome varchar(200) not null,
    email varchar(150) not null unique,
    senha text not null,
    cnpj_mei varchar (20) not null unique,
    telefone varchar (20) not null,
    foto text null,
    data_modificacao DATETIME,
    codigo_recuperacao text,
    codigo_expiracao datetime
);

create table tbl_ongs (
    id int auto_increment primary key,
    nome varchar(200) not null,
    email varchar(150) not null unique,
    senha text not null,
    telefone varchar (20) not null,
    foto text null,
    data_modificacao DATETIME,
    codigo_recuperacao text,
    codigo_expiracao datetime
);

create table tbl_endereco (
id int auto_increment primary key,
logradouro varchar(200) not null,
complemento varchar(80),
bairro varchar(100) not null,
cidade varchar(100) not null,
numero varchar(6) not null,
estado varchar(80) not null,
CEP varchar(15) not null,
id_usuario int not null,
id_empresa int not null,
id_ong int not null,

constraint endereco_usuario foreign key(id_usuario) references tbl_usuarios(id)  
	on delete cascade,  
  
constraint endereco_empresa foreign key(id_empresa) references tbl_empresas(id)  
	on delete cascade,  
  
constraint endereco_ong foreign key(id_ong) references tbl_ongs(id)  
	on delete cascade,  
	  
constraint check_dono check (  
	(id_usuario is not null) + (id_empresa is not null) + (id_ong is not null) = 1  
)

);

create table tbl_categoria (
id int auto_increment primary key,
nome varchar(255) not null
);

create table tbl_alimentos (
id int auto_increment primary key,
nome varchar(150) not null,
quantidade int not null,
peso varchar (20),
id_tipo_peso int not null,
data_de_validade date,
descricao text,
imagem text,
id_empresa int not null,

constraint fk_alimento_empresa foreign key (id_empresa) references tbl_empresas(id),
constraint fk_alimento_tipoPeso foreign key (id_tipo_peso) references tbl_tipo_peso(id)

);

create table tbl_alimento_categoria (
id int auto_increment primary key,
id_alimento int not null,
id_categoria int not null,

constraint fk_alimento foreign key (id_alimento) references tbl_alimentos(id),  
constraint fk_categoria foreign key (id_categoria) references tbl_categoria(id)

);

create table tbl_tipo_peso(
	id int auto_increment primary key,
    tipo varchar (45) not null
);


--  mostra a data que o usuario atualizou os dados
delimiter //									
create trigger trg_update_usuarios			
before update on tbl_usuarios					
for each row									
begin											
	set new.data_modificacao = now();			
end //											
delimiter ;										
												
delimiter //									
create trigger trg_update_empresas				
before update on tbl_empresas					
for each row									
begin											
	set new.data_modificacao = now();			
end //											
delimiter ; 									
												
delimiter //									
create trigger trg_update_ongs					
before update on tbl_ongs						
for each row								
begin											
	set new.data_modificacao = now();			
end //											
delimiter ; 

--	--	--	--	--	--	--	--	--	--	--	--	--


--  vai ajudar nos inserts dos usuarios  
delimiter //							 
create procedure inserir_usuario(		 
    in d_nome varchar (200),			 
    in d_email varchar(150),			
    in d_senha text,				 
    in d_cpf varchar(15),				 
    in d_telefone varchar(20)			 
)										 
begin									 
	insert into tbl_usuarios (nome, email,
    senha, cpf, telefone) values (d_nome,
    d_email, d_senha, d_cpf, d_telefone);
end //									 
delimiter ; 							 
						 
delimiter //							 
create procedure inserir_empresa(		 
    in d_nome varchar (200),			 
    in d_email varchar(150),			 
    in d_senha text,				 
    in d_cnpj_mei varchar(20),				 
    in d_telefone varchar(20)			 
)										 
begin									 
	insert into tbl_empresas (nome, email,
    senha, cnpj_mei, telefone) values (d_nome,
    d_email, d_senha, d_cnpj_mei, d_telefone);
end //									 
delimiter ; 							 
										 
delimiter //
create procedure inserir_ong(		     
    in d_nome varchar (200),			 
    in d_email varchar(150),			 
    in d_senha text,				 
    in d_telefone varchar(20)			 
)										 
begin									
	insert into tbl_ongs (nome, email,   
    senha, telefone) values (d_nome,
    d_email, d_senha, d_telefone);
end //									 
delimiter ;
						 
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -


ALTER TABLE tbl_usuarios
ADD COLUMN token_recuperacao VARCHAR(255),
ADD COLUMN token_expiracao DATETIME;

-----------------------------------------------------

-- deletar o usuario sem interferencia da chave estrageira 
delimiter //											
create procedure deletar_usuario (						
	in d_id int											
)													
begin													
	delete from tbl_usuarios where id = d_id;			
end //													
delimiter ; 											
														
delimiter //											
create procedure deletar_empresa (						
	in d_id int											
)														
begin												
	delete from tbl_empresas where id = d_id;			
end //													
delimiter ; 										
													
delimiter //											
create procedure deletar_ong (							
	in d_id int											
)														
begin													
	delete from tbl_ongs where id = d_id;				
end //													
delimiter ; 											
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -


-- view para ver uma tabela unificada de clientes e empresas
CREATE VIEW vw_usuarios AS
SELECT id, nome, email, 'Usuario' AS tipo_usuario FROM tbl_usuarios
UNION
SELECT id, nome, email, 'Empresa' AS tipo_usuario FROM tbl_empresas
UNION
SELECT id, nome, email, 'ONG' AS tipo_usuario FROM tbl_ongs;		  

SELECT * FROM vw_usuarios;
 -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
 
CALL inserir_usuario('Ana Paula', 'ana4@email.com', 'senhaAna', '111.222.333-44', '11912345678');
CALL inserir_empresa('Super Tech', 'contato@supertech.com', 'senhaSuper', '12.345.67801-90', '11333221100');
CALL inserir_ongs('Mundo Melhor', 'contato@mundomelhor.org', 'senhaMundo', '11988776655');

-- Consultar para conferir os dados
SELECT * FROM tbl_cliente;
SELECT * FROM tbl_empresa;
SELECT * FROM tbl_ONGs;
SELECT * FROM vw_usuarios;

-- Testar update para ver se data_modificacao atualiza
UPDATE tbl_cliente SET telefone = '11999999999' WHERE id = 1;
UPDATE tbl_empresa SET telefone = '11444444444' WHERE id = 1;
UPDATE tbl_ONGs SET telefone = '11900001111' WHERE id = 1;

-- Verificar data_modificacao atualizada
SELECT id, nome, telefone, data_modificacao FROM tbl_cliente WHERE nome = 'Ana Paula';
SELECT id, nome, telefone, data_modificacao FROM tbl_empresa WHERE nome = 'Super Tech';
SELECT id, nome, telefone, data_modificacao FROM tbl_ONGs WHERE nome = 'Mundo Melhor';

-- Testar delete via procedure
CALL deletar_cliente((SELECT id FROM tbl_cliente WHERE nome = 'Ana Paula'));
CALL deletar_empresa((SELECT id FROM tbl_empresa WHERE nome = 'Super Tech'));
CALL deletar_ONGs((SELECT id FROM tbl_ONGs WHERE nome = 'Mundo Melhor'));

-- Conferir se deletou
SELECT * FROM vw_usuarios;


------------------------------------------
delimiter //
create procedure inserir_alimentos(
	in d.nome varchar(150) not null,
	in d.quantidade int not null,
    in d.peso int
	in d.data_de_validade date not null,
	in d.descricao text not null,
	in d.imagem text not null
)
begin 
	insert into tbl_alimentos(nome, quantidade, 
    data_de_validade, descricao,imagem) values(
    d.nome, d.quantidade, d.peso, d.data_de_validade, 
    d.descricao, d.imagem);
end //
delimiter ;

delimiter //
create procedure alimentos_categorias(
	in p_id_alimentos int,
	in p_id_categorias int

)
begin 
	insert into tbl_alimentos_categorias
    (id_alimentos, id_categorias)
    values (p_id_alimentos, p_id_categorias) 
end //
delimiter ;

delimiter //
create procedure inserir_categoria(
	in p_nome int
)
begin 
	insert into tbl_categorias
    (nome)
    values (p_nome) 
end //
delimiter ;

--------------------------------------------------------

delimiter //
create procedure deletar_alimento (							
	in d_id_alimentos int											
)														
begin													
	delete from tbl_alimento_categoria
    where id_alimento = d_id_alimentos;
    delete from tbl_alimentos
    where id = d_id_alimentos;
end //													
delimiter ; 	

delimiter //
create procedure deletar_categoria (							
	in d_id_categorias int											
)														
begin													
	delete from tbl_alimentos_categorias 
    where id_categorias = d_id_categorias
    delete from tbl_categorias
    where id = p_id_categorias
end //													
delimiter ;



DELIMITER //
CREATE PROCEDURE filtrar_alimentos_categoria (
    IN id_categoria_filtro INT
)
BEGIN
    SELECT 
        a.id AS id_alimento, 
        a.nome AS nome_alimento, 
        a.quantidade AS quantidade, 
        a.peso AS peso,
        a.id_tipo_peso AS id_tipo_peso, 
		t.tipo AS tipoPeso,
        a.data_de_validade AS data_de_validade, 
        a.descricao AS descricao, 
        a.imagem AS imagem, 
        a.id_empresa AS id_empresa, 
        e.nome AS nome_empresa, 
        e.foto AS foto_empresa, 
        c.nome AS nome_categoria
    FROM 
        tbl_alimentos a
    
    -- 1. JOIN com a tabela de relacionamento (usaremos o filtro aqui)
    JOIN 
        tbl_alimento_categoria ac ON ac.id_alimento = a.id
    
    -- 2. JOIN com a tabela de categoria (necessário para pegar o nome da categoria, c.nome)
    JOIN 
        tbl_categoria c ON c.id = ac.id_categoria
    
    -- 3. JOIN com a tabela de empresa (para obter os detalhes)
    JOIN 
        tbl_empresas e ON e.id = a.id_empresa 
        
	-- 4. JOIN com a tabela de tipoPeso (para obter os detalhes)
    JOIN 
        tbl_tipo_peso t ON t.id = a.id_tipo_peso
    
    -- O FILTRO é aplicado na coluna id_categoria da tabela de relacionamento (ac)
    WHERE 
        ac.id_categoria = id_categoria_filtro
        
	ORDER BY a.id desc;
END //

DELIMITER ;



DELIMITER //
CREATE PROCEDURE filtrar_alimentos_empresa (
    IN id_empresa_filtro INT
)
BEGIN
    SELECT 
        a.id AS id_alimento, 
        a.nome AS nome_alimento, 
        a.quantidade AS quantidade, 
        a.peso AS peso,
        a.id_tipo_peso AS id_tipo_peso, 
        t.tipo AS tipoPeso,
        a.data_de_validade AS data_de_validade, 
        a.descricao AS descricao, 
        a.imagem AS imagem, 
        a.id_empresa AS id_empresa, 
        e.nome AS nome_empresa, 
        e.foto AS foto_empresa
    FROM 
        tbl_alimentos a
    

    -- 3. JOIN com a tabela de empresa (para obter os detalhes)
    JOIN 
        tbl_empresas e ON e.id = a.id_empresa 
        
	-- 3. JOIN com a tabela de tipoPeso (para obter os detalhes)
    JOIN 
        tbl_tipo_peso t ON t.id = a.id_tipo_peso
    
    WHERE 
        e.id = id_empresa_filtro
        
	ORDER BY a.id desc;
END //

DELIMITER ; 



-- atualizar todos os tipos de usuario:

delimiter //
create trigger trg_update_ongs
before update on tbl_ongs
for each row
begin
    set new.data_modificacao = now();
end;
//
delimiter ;


DELIMITER //

CREATE PROCEDURE atualizar_ong (
    IN p_id INT,                  
    IN p_nome VARCHAR(200),        
    IN p_email VARCHAR(150),       
    IN p_senha TEXT,               
    IN p_telefone VARCHAR(20),     
    IN p_foto TEXT                
)
BEGIN
    DECLARE old_nome VARCHAR(200);
    DECLARE old_email VARCHAR(150);
    DECLARE old_senha TEXT;
    DECLARE old_telefone VARCHAR(20);
    DECLARE old_foto TEXT;
    
    -- 1. Tenta recuperar os dados antigos
    SELECT 
        nome, email, senha, telefone, foto
    INTO
        old_nome, old_email, old_senha, old_telefone, old_foto
    FROM
        tbl_ongs
    WHERE
        id = p_id;
        
    -- Se o parâmetro for NULL ou vazio, mantém o valor antigo.
    SET p_nome = IF(p_nome IS NULL OR p_nome = '', old_nome, p_nome);
    SET p_email = IF(p_email IS NULL OR p_email = '', old_email, p_email);
    SET p_senha = IF(p_senha IS NULL OR p_senha = '', old_senha, p_senha);
    SET p_telefone = IF(p_telefone IS NULL OR p_telefone = '', old_telefone, p_telefone);

    SET p_foto = IF(p_foto IS NULL, old_foto, p_foto);


    UPDATE tbl_ongs
    SET
        nome = p_nome,
        email = p_email,
        senha = p_senha,
        telefone = p_telefone,
        foto = p_foto
    WHERE
        id = p_id;
        
END //

DELIMITER ;