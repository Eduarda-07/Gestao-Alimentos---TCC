create database mesaplus;
use mesaplus;
show tables;


create table tbl_usuarios (
    id int auto_increment primary key,
    nome varchar(100),
    email varchar(100),
    senha varchar(45),
    cpf varchar(15),
    telefone varchar(15)
);

create table tbl_ongs (
    id int auto_increment primary key,
    nome varchar(100),
    email varchar(100),
    senha varchar(45),
    telefone varchar(15)
);

create table tbl_empresas (
    id int auto_increment primary key,
    nome varchar(100),
    email varchar(100),
    senha varchar(45),
    cnpj_mei varchar(15),
    telefone varchar(15),
    endereco varchar(150)
);
