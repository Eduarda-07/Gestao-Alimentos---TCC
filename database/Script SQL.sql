create database Mesa_Plus;
use Mesa_Plus;
show tables;



create table tbl_usuarios (
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha text  not null,
    cpf varchar(15) not null,
    telefone varchar(15) not null,
    foto varchar(250)
);

create table tbl_ongs (
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha text not null,
    telefone varchar(15) not null,
    foto varchar (250)
);

create table tbl_empresas (
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha text not null,
    cnpj_mei varchar(15) not null,
    telefone varchar(15) not null,
    endereco varchar(150) not null,
    foto varchar (250)
);

create table tbl_endereco (
    id int auto_increment primary key,
    estado varchar(45) not null,
    cidade varchar(100) not null,
    bairro varchar(100) not null,
    cep varchar(15) not null,
    logradouro varchar(200) not null,
    complemento varchar(80),
    numero varchar(20) not null,
    id_cliente int null,
    id_empresa int null,
    
    constraint fk_endereco_cliente foreign key
    (id_cliente) references tbl_cliente(id),
    constraint fk_endereco_empresa foreign key 
    (id_empresa) references tbl_empresa(id),
    
    constraint chk_um_dono check (
        (id_cliente is not null) + 
        (id_empresa is not null) = 1
    )
);