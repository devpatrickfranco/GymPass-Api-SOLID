# Gymspass - Backend

Sobre o Projeto

Este é o backend de um aplicativo inspirado no Gympass, focado em proporcionar uma experiência completa de gestão de academias e check-ins para usuários e administradores. O sistema foi desenvolvido com funcionalidades robustas para cadastro, autenticação, busca e check-in de academias, além de validação de administradores e regras específicas para uso eficiente.

O objetivo deste projeto é criar uma API que permita o gerenciamento de academias e check-ins de maneira eficiente e segura, utilizando as melhores práticas de desenvolvimento de software moderno.

## Tecnologias Utilizadas
<div style="display: flex; justify-content: space-around;"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" height="40"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" height="40"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" height="40"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" height="40"/> <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" height="40"/> <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" height="40"/> <img src="https://img.shields.io/badge/Vitest-6E4EAF?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" height="40"/> </div>

## Arquitetura e Boas Práticas
Este projeto foi desenvolvido seguindo boas práticas de desenvolvimento de software, com foco em:

- Código limpo e organizado, utilizando princípios SOLID;
- Testes automatizados com Vitest(Unitários e E2E), garantindo confiabilidade das funcionalidades;
- Integração de banco de dados com Prisma, facilitando a comunicação e operações no PostgreSQL;
- Segurança: Utilização de JWT para autenticação e senhas criptografadas para proteção dos dados dos usuários;
- Containerização: Configuração do ambiente de desenvolvimento e produção com Docker, garantindo consistência entre os ambientes.

## RFs (Requisitos funcionais)

- [X] Deve ser possivel se cadastrar;
- [X] Deve ser possivel se authenticar;
- [X] Deve ser possivel obter o perfil de um usuario logado;
- [X] Deve ser possivel obter o numero de check-ins realizados pelo usuario;
- [X] Deve ser possivel o usuario obter seu historico de check-ins;
- [X] Deve ser possivel o usuario buscar academias proximas (até 10km) ;
- [X] Deve ser possivel o usuario buscar academias pelo nome;
- [X] Deve ser possivel o usuario realizar check-in em uma academia;
- [X] Deve ser possivel validar o check-in de um usuario;
- [X] Deve ser possivel cadastrar uma academia
## RNs (Regras de negocio)

- [X] O usuario não deve poder se cadastrar com um email duplicado;
- [X] O usuario não deve poder fazer check-in no mesmo dia;
- [X] O usuario não pode fazer check-in se não estiver perto(100m) da academia;
- [X] O check-in só pode ser valido até 20 minutos depois de criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só podo ser cadastrada por administradores;
## RNFs (Requesitos não funcionais)
- [X] A senha do usuario precisa estar criptografado;
- [X] Os dados da aplicação precisam estar presistidos em um banco PostgreSQL;
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [X] O usuario deve ser identificado por um JWT (JSON Web Token)   
