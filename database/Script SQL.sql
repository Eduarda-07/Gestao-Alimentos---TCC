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
    data_modificacao DATETIME
);

create table tbl_empresas(
    id int auto_increment primary key,
    nome varchar(200) not null,
    email varchar(150) not null unique,
    senha text not null,
    cnpj_mei varchar (20) not null unique,
    telefone varchar (20) not null,
    foto text null,
    data_modificacao DATETIME
);

create table tbl_ongs (
    id int auto_increment primary key,
    nome varchar(200) not null,
    email varchar(150) not null unique,
    senha text not null,
    telefone varchar (20) not null,
    foto text null,
    data_modificacao DATETIME
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